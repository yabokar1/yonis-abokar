import type { Project } from "../content"

const art: Record<Project["thumb"], { bg: string; fg: string; label: string }> = {
  drivers: { bg: "#111111", fg: "#ffffff", label: "BOOK" },
  agent: { bg: "#14532d", fg: "#ffffff", label: "PHI" },
  chat: { bg: "#292524", fg: "#ffffff", label: "CHAT" },
  paper: { bg: "#18181b", fg: "#ffffff", label: "SIG" },
}

export default function Thumb({ kind }: { kind: Project["thumb"] }) {
  const tone = art[kind]
  return (
    <div className="thumb" style={{ background: tone.bg, color: tone.fg }} aria-hidden="true">
      <svg viewBox="0 0 320 148" className="thumb-svg">
        {kind === "drivers" && (
          <>
            <circle cx="250" cy="36" r="48" fill="#e5e5e5" />
            <rect x="28" y="78" width="180" height="14" rx="7" fill="#ffffff" />
            <rect x="28" y="102" width="120" height="10" rx="5" fill="#a1a1aa" />
          </>
        )}
        {kind === "agent" && (
          <>
            <rect x="36" y="34" width="110" height="80" rx="12" fill="#052e16" />
            <rect x="174" y="34" width="110" height="80" rx="12" fill="#052e16" />
            <path d="M146 74 H174" stroke="#86efac" strokeWidth="4" />
            <circle cx="160" cy="74" r="6" fill="#86efac" />
          </>
        )}
        {kind === "chat" && (
          <>
            <rect x="24" y="54" width="52" height="40" rx="8" fill="#e7e5e4" />
            <rect x="98" y="54" width="52" height="40" rx="8" fill="#e7e5e4" />
            <rect x="172" y="54" width="52" height="40" rx="8" fill="#e7e5e4" />
            <rect x="246" y="54" width="52" height="40" rx="8" fill="#e7e5e4" />
            <path d="M76 74 H98 M150 74 H172 M224 74 H246" stroke="#d6d3d1" strokeWidth="3" />
          </>
        )}
        {kind === "paper" && (
          <>
            <rect x="40" y="96" width="28" height="24" fill="#e4e4e7" />
            <rect x="84" y="70" width="28" height="50" fill="#e4e4e7" />
            <rect x="128" y="48" width="28" height="72" fill="#fafafa" />
            <rect x="172" y="60" width="28" height="60" fill="#e4e4e7" />
            <rect x="216" y="36" width="28" height="84" fill="#e4e4e7" />
          </>
        )}
      </svg>
      <span className="thumb-label">{tone.label}</span>
    </div>
  )
}
