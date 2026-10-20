import {
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  graphql,
} from "graphql"

type Technician = { id: string; name: string; region: string }
type Site = { id: string; name: string; region: string }
type Job = { id: string; siteId: string; technicianId: string | null; status: string; window: string }

export type LoadMode = "each" | "batched"

const technicians: Technician[] = [
  { id: "t1", name: "Lina Ortiz", region: "Scarborough" },
  { id: "t2", name: "Jonah Adeyemi", region: "North York" },
  { id: "t3", name: "Priya Shah", region: "Etobicoke" },
]

const sites: Site[] = [
  { id: "s1", name: "Kennedy station", region: "Scarborough" },
  { id: "s2", name: "Finch yard", region: "North York" },
  { id: "s3", name: "Islington hub", region: "Etobicoke" },
]

const seed = (): Job[] => [
  { id: "j1", siteId: "s1", technicianId: "t1", status: "ASSIGNED", window: "08:00-10:00" },
  { id: "j2", siteId: "s1", technicianId: null, status: "OPEN", window: "10:00-12:00" },
  { id: "j3", siteId: "s2", technicianId: null, status: "OPEN", window: "08:00-10:00" },
  { id: "j4", siteId: "s3", technicianId: "t2", status: "ASSIGNED", window: "13:00-15:00" },
]

let jobs = seed()

export function resetFieldDesk() {
  jobs = seed()
}

type Context = {
  trace: string[]
  mode: LoadMode
  batch: Map<string, Technician> | null
}

const TechnicianType: GraphQLObjectType = new GraphQLObjectType({
  name: "Technician",
  fields: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    region: { type: new GraphQLNonNull(GraphQLString) },
  },
})

const JobType: GraphQLObjectType = new GraphQLObjectType({
  name: "Job",
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLID) },
    status: { type: new GraphQLNonNull(GraphQLString) },
    window: { type: new GraphQLNonNull(GraphQLString) },
    site: {
      type: new GraphQLNonNull(SiteType),
      resolve: (job: Job, _args: unknown, ctx: Context) => {
        ctx.trace.push(`Site.load ${job.siteId}`)
        const site = sites.find((item) => item.id === job.siteId)
        if (!site) throw new Error(`Unknown site ${job.siteId}`)
        return site
      },
    },
    technician: {
      type: TechnicianType,
      resolve: (job: Job, _args: unknown, ctx: Context) => {
        if (!job.technicianId) return null
        if (ctx.mode === "batched") {
          if (!ctx.batch) {
            ctx.trace.push(`Technician.load batch ${technicians.map((person) => person.id).join(", ")}`)
            ctx.batch = new Map(technicians.map((person) => [person.id, person]))
          }
          return ctx.batch.get(job.technicianId) ?? null
        }
        ctx.trace.push(`Technician.load ${job.technicianId}`)
        return technicians.find((person) => person.id === job.technicianId) ?? null
      },
    },
  }),
})

const SiteType: GraphQLObjectType = new GraphQLObjectType({
  name: "Site",
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLID) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    region: { type: new GraphQLNonNull(GraphQLString) },
    jobs: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(JobType))),
      resolve: (site: Site, _args: unknown, ctx: Context) => {
        ctx.trace.push(`Site.jobs ${site.id}`)
        return jobs.filter((job) => job.siteId === site.id)
      },
    },
  }),
})

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: "Query",
    fields: {
      sites: {
        type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(SiteType))),
        resolve: (_root: unknown, _args: unknown, ctx: Context) => {
          ctx.trace.push("Query.sites")
          return sites
        },
      },
      jobs: {
        type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(JobType))),
        resolve: (_root: unknown, _args: unknown, ctx: Context) => {
          ctx.trace.push("Query.jobs")
          return jobs
        },
      },
    },
  }),
  mutation: new GraphQLObjectType({
    name: "Mutation",
    fields: {
      assign: {
        type: new GraphQLNonNull(JobType),
        args: {
          jobId: { type: new GraphQLNonNull(GraphQLID) },
          technicianId: { type: new GraphQLNonNull(GraphQLID) },
        },
        resolve: (
          _root: unknown,
          args: { jobId: string; technicianId: string },
          ctx: Context,
        ) => {
          ctx.trace.push(`Mutation.assign ${args.jobId} -> ${args.technicianId}`)
          const job = jobs.find((item) => item.id === args.jobId)
          const technician = technicians.find((item) => item.id === args.technicianId)
          if (!job) throw new Error("Job not found.")
          if (!technician) throw new Error("Technician not found.")
          const clash = jobs.find(
            (item) =>
              item.id !== job.id &&
              item.technicianId === technician.id &&
              item.window === job.window &&
              item.status !== "CANCELLED",
          )
          if (clash) {
            throw new Error(
              `${technician.name} is already booked in ${job.window} on job ${clash.id}.`,
            )
          }
          job.technicianId = technician.id
          job.status = "ASSIGNED"
          return job
        },
      },
    },
  }),
})

export const sampleQuery = `query DispatchBoard {
  sites {
    name
    region
    jobs {
      id
      status
      window
      technician { name }
    }
  }
}`

export const assignQuery = `mutation AssignJonah {
  assign(jobId: "j2", technicianId: "t2") {
    id
    status
    window
    technician { name }
  }
}`

export const clashQuery = `mutation DoubleBookLina {
  assign(jobId: "j3", technicianId: "t1") {
    id
    status
    technician { name }
  }
}`

export async function runFieldDesk(source: string, mode: LoadMode) {
  const contextValue: Context = { trace: [], mode, batch: null }
  const result = await graphql({ schema, source, contextValue })
  return {
    data: result.data,
    errors: result.errors?.map((error) => error.message) ?? [],
    trace: contextValue.trace,
  }
}
