export type Project = {
  slug: string
  title: string
  summary: string
  status: string
  href: string
  thumb: "drivers" | "agent" | "graphql" | "mesh" | "pipeline" | "paper"
}

export const projects: Project[] = [
  {
    slug: "proactive-drivers",
    title: "Proactive Drivers",
    summary: "Production booking platform for a driving school.",
    status: "Live site",
    href: "https://proactivedriversinc.com/",
    thumb: "drivers",
  },
  {
    slug: "safegpt-agent",
    title: "SafeGPT Health Agent",
    summary: "A health-note site. The agent reads tokens, not names.",
    status: "Live site",
    href: "https://yabokar1.github.io/safegpt-agent/",
    thumb: "agent",
  },
  {
    slug: "field-desk",
    title: "Field Desk",
    summary: "A dispatch site. A technician cannot be booked twice in one window.",
    status: "Live site",
    href: "https://yabokar1.github.io/field-desk/",
    thumb: "graphql",
  },
  {
    slug: "northline",
    title: "Northline",
    summary: "A shipment site. One order is charged once.",
    status: "Live site",
    href: "https://yabokar1.github.io/northline/",
    thumb: "mesh",
  },
  {
    slug: "copperline",
    title: "Copperline ETL",
    summary: "A pipeline site. Bad sensor rows are held. Clean hours are loaded.",
    status: "Live site",
    href: "https://yabokar1.github.io/copperline/",
    thumb: "pipeline",
  },
  {
    slug: "learnedwmp",
    title: "LearnedWMP",
    summary: "Workload memory prediction. SIGMOD Companion 2025.",
    status: "Published",
    href: "https://doi.org/10.1145/3722212.3725096",
    thumb: "paper",
  },
]

export const proactiveSite = "https://proactivedriversinc.com/"

export const learnedPaper = "https://doi.org/10.1145/3722212.3725096"

export type Role = {
  org: string
  title: string
  place: string
  period: string
  points: string[]
}

export const roles: Role[] = [
  {
    org: "Proactive Drivers",
    title: "Freelance Full Stack Developer",
    place: "Toronto",
    period: "May 2026 — Present",
    points: [
      "Shipped the school's site, student booking, admin desk, and React Native app.",
      "Booking claims a slot only if it is still open, so two students cannot take the same hour.",
      "Web app is on AWS Amplify. The database is reached through the API.",
    ],
  },
  {
    org: "Mueller Co.",
    title: "Data Analyst",
    place: "Toronto",
    period: "Feb 2025 — Present",
    points: [
      "Contract role. Built C# desktop tools for real-time FFT acoustic processing.",
      "Compared 15 prototype sensors from 100 Hz to 1000 Hz.",
      "Automated client email with AWS SES and watched leak dashboards for 8 sites.",
    ],
  },
  {
    org: "Tectmind",
    title: "Full Stack Developer",
    place: "Toronto",
    period: "Sep 2024 — Feb 2025",
    points: [
      "Loaded regulatory CSV data into PostgreSQL with PostGIS for 3D maps.",
      "Built Node.js and Flask APIs and connected them to Mapbox.",
      "Shipped Vue and Angular UI. Lazy loading cut the initial bundle by 30%.",
    ],
  },
  {
    org: "DITA Research Lab, York University",
    title: "Software Engineer",
    place: "Toronto",
    period: "Jan 2023 — Apr 2024",
    points: [
      "Shipped an inference platform with Angular, Flask, Docker, and SageMaker.",
      "Built anonymization pipelines. SafeGPT is the public version of that work.",
      "Wrote Python and Node services with pytest and unittest coverage.",
    ],
  },
  {
    org: "DITA Research Lab, York University",
    title: "Machine Learning Research Intern",
    place: "Toronto",
    period: "May 2021 — Aug 2022",
    points: [
      "Extracted TPC-C query features from IBM Db2 for the work that became LearnedWMP.",
      "Cut batch query processing time by 83% with multi-threaded Python.",
      "Reached 91% prediction accuracy on unseen workloads.",
    ],
  },
  {
    org: "CIBC",
    title: "Application Developer Intern",
    place: "Toronto",
    period: "Sep 2019 — Sep 2020",
    points: [
      "Built a C# and Selenium bridge from SharePoint to ServiceNow. Ticket creation time dropped by 95%.",
      "Automated Layer7 deploys with bash and Jenkins.",
      "Wrote a Python scraper to compare banking offers.",
    ],
  },
]
