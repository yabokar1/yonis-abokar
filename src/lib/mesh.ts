export type ServiceName = "gateway" | "orders" | "billing" | "warehouse" | "notify"

export type LogLine = {
  service: ServiceName
  message: string
  tone: "ok" | "wait" | "bad"
}

type Order = { id: string; sku: string; key: string }

const charged = new Set<string>()

export function placeOrder(options: { failBillingOnce: boolean }): LogLine[] {
  const lines: LogLine[] = []
  const order: Order = { id: `ord_${Date.now().toString().slice(-6)}`, sku: "VALVE-18", key: "" }
  order.key = order.id
  lines.push({ service: "gateway", tone: "ok", message: `Accepted ${order.id} for ${order.sku}.` })
  lines.push({ service: "orders", tone: "ok", message: `Stored ${order.id}. Published order.placed.` })

  const firstAttempt = `pay:${order.key}:1`
  if (options.failBillingOnce && !charged.has(firstAttempt)) {
    charged.add(firstAttempt)
    lines.push({
      service: "billing",
      tone: "bad",
      message: `Charge for ${order.key} failed. Event returns to the bus.`,
    })
    lines.push({
      service: "billing",
      tone: "wait",
      message: `Retry 2 for ${order.key}. Idempotency key already recorded, so this is not a second charge.`,
    })
  }

  if (charged.has(order.key)) {
    lines.push({
      service: "billing",
      tone: "ok",
      message: `Duplicate delivery ignored for ${order.key}.`,
    })
  } else {
    charged.add(order.key)
    lines.push({
      service: "billing",
      tone: "ok",
      message: `Captured payment ${order.key}. Published payment.captured.`,
    })
  }

  lines.push({
    service: "warehouse",
    tone: "ok",
    message: `Reserved ${order.sku} for ${order.id}. Published stock.reserved.`,
  })
  lines.push({
    service: "notify",
    tone: "ok",
    message: `Sent dispatch notice for ${order.id}.`,
  })
  return lines
}

export function replaySameKey(key: string): LogLine[] {
  if (!charged.has(key)) {
    return [
      {
        service: "billing",
        tone: "wait",
        message: "Place an order first. There is no idempotency key to replay.",
      },
    ]
  }
  return [
    {
      service: "billing",
      tone: "ok",
      message: `Replay of ${key} ignored. The charge was already captured.`,
    },
  ]
}

export function lastChargedKey() {
  return [...charged].filter((key) => !key.includes(":")).at(-1) ?? null
}
