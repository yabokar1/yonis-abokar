export type WorkLink = {
  label: string
  href: string
}

export type SystemColumn = {
  label: string
  items: string[]
}

export type CaseStudy = {
  slug: string
  index: string
  title: string
  kicker: string
  summary: string
  role: string
  period: string
  stack: string[]
  status: string
  links: WorkLink[]
  problem: string
  built: string[]
  hardPart: {
    title: string
    body: string
  }
  system: SystemColumn[]
  shows: string[]
  talkAbout: string[]
}

export const caseStudies: CaseStudy[] = [
  {
    slug: "proactive-drivers",
    index: "01",
    title: "Proactive Drivers",
    kicker: "Freelance · client product",
    summary:
      "Booking, student accounts, and an admin desk for an Ontario driving school. Web, API, and mobile app in one TypeScript monorepo.",
    role: "Freelance full-stack developer",
    period: "May 2026 — Present",
    stack: ["React", "TypeScript", "Node.js", "PostgreSQL", "Prisma", "React Native"],
    status: "Private client repository. Running in production.",
    links: [],
    problem:
      "The school needed one place to sell lesson packages, let students book a real instructor slot, and let staff run the schedule. A marketing page was not enough. Students, instructors, and admins each needed a different view of the same calendar, and two people could not be allowed to take the same hour.",
    built: [
      "Public site for services, service areas, pricing, and a contact form that lands in the admin inbox.",
      "Student dashboard to book lessons, review upcoming and past lessons, upload licence details, and message the school.",
      "Admin tools for students, packages, the weekly schedule, lesson changes, and the message inbox.",
      "React Native app for booking, lesson history, and instructor location, talking to the same API.",
      "Invite-only student accounts. A person sets a password from the invite link before they can sign in. Roles are student, instructor, and admin.",
      "Shared TypeScript package so the web app, mobile app, and API agree on the same types.",
    ],
    hardPart: {
      title: "Two students booking the same slot",
      body: "A free slot on screen is not a free slot by the time the request arrives. Booking runs in a database transaction. The API claims the slot with a conditional update that succeeds only if that slot is still open, and it rejects the lesson if the instructor already has an overlapping booking. Cancelling a lesson releases the slot. Package assignment stays on the admin side, so a student cannot attach a bundle to their own account.",
    },
    system: [
      { label: "Clients", items: ["React 19 web app", "React Native + Expo"] },
      { label: "API", items: ["Express", "JWT sessions", "Zod validation"] },
      { label: "Data", items: ["PostgreSQL", "Prisma", "Supabase"] },
      { label: "Hosting", items: ["AWS Amplify", "Transactional email"] },
    ],
    shows: [
      "A product a client is using, with the source kept in a private repository.",
      "Auth that is different on web and mobile: httpOnly cookies in the browser, tokens on the phone.",
      "A concurrency bug with a concrete fix you can walk through on a whiteboard.",
    ],
    talkAbout: [
      "Walk through the slot claim: find an open window, update it only if it is still free, and treat a zero-row update as a lost race.",
      "Why the monorepo has a shared package instead of duplicating types in three apps.",
      "What had to be locked down before real students used it: invite flow, role checks, and the database not exposed as a public API.",
    ],
  },
  {
    slug: "safegpt",
    index: "02",
    title: "SafeGPT",
    kicker: "DITA Research Lab · York University",
    summary:
      "A service that removes personal data from text before that text is sent to a language model.",
    role: "Software engineer",
    period: "2023 — 2024",
    stack: ["Python", "Flask", "Docker", "AWS SageMaker", "React"],
    status: "Public research repositories.",
    links: [
      {
        label: "Backend on GitHub",
        href: "https://github.com/yabokar1/SafeGPT-Backend",
      },
      {
        label: "Frontend on GitHub",
        href: "https://github.com/yabokar1/SafeGPT-Frontend",
      },
    ],
    problem:
      "A language model is only as private as the prompt you send it. Names, account numbers, and other identifiers had to come out of the text first, including cases a single rules list would miss. The lab needed an API another system could call, not a one-off script.",
    built: [
      "Flask API that accepts text and returns an anonymized version.",
      "Microsoft Presidio to detect and replace sensitive spans, running in Docker.",
      "A fine-tuned model hosted on AWS SageMaker for anonymization the rule-based pass does not cover.",
      "A path to send the cleaned text on to a public model API, such as ChatGPT, without sending the original.",
      "A separate React frontend for trying the flow.",
    ],
    hardPart: {
      title: "Rules first, model second",
      body: "Presidio is predictable: it finds spans it was configured to find, and you can test those cases. A model covers messy wording the rules miss, and it is worse at explaining a miss. The service runs both. The rule pass handles the known entity types. The SageMaker model is there for the residue. The thing you send downstream is the anonymized string, not the source text.",
    },
    system: [
      { label: "Client", items: ["React frontend"] },
      { label: "API", items: ["Flask", "Public anonymize endpoint"] },
      { label: "Detection", items: ["Presidio in Docker", "SageMaker model"] },
      { label: "Downstream", items: ["Public LLM API", "Anonymized text only"] },
    ],
    shows: [
      "The same privacy problem as the DITA anonymization pipelines, with code a reviewer can open.",
      "A clear split between a deterministic detector and a hosted model.",
      "Docker for the local detectors and SageMaker for the model endpoint.",
    ],
    talkAbout: [
      "Which fields Presidio should catch every time, and which ones you would rather a model attempt.",
      "How you would test that a name in the input is absent from the output.",
      "Why the original text should never be the body of the downstream model call.",
    ],
  },
  {
    slug: "learnedwmp",
    index: "03",
    title: "LearnedWMP",
    kicker: "Research · SIGMOD Companion 2025",
    summary:
      "Workload memory prediction for a database engine. Estimate working memory for a batch of queries, not one query at a time.",
    role: "Co-author and research engineer",
    period: "2021 — 2025",
    stack: ["Python", "Deep learning", "IBM Db2", "Pandas", "NumPy"],
    status: "Published demo. SIGMOD Companion, Berlin, June 2025.",
    links: [
      {
        label: "Paper (DOI)",
        href: "https://doi.org/10.1145/3722212.3725096",
      },
    ],
    problem:
      "A database only has so much working memory for sorts and aggregates. If the estimate is low, queries spill or fail. If it is high, the engine turns work away that it could have run. Most estimators score one query. A real workload arrives as a set.",
    built: [
      "Co-authored the SIGMOD Companion 2025 demo with Shaikh Quader, Ghadeer Abuoda, Marin Litoiu, and Manos Papagelis.",
      "Pipelines that pull TPC-C query features from IBM Db2, including CPU, I/O, and buffer estimates.",
      "A comparison dashboard for model accuracy, inference time, and model size.",
      "Multi-threaded Python for running batch query workloads. On that runner, batch processing was 83% faster.",
      "A deep learning model that reached 91% prediction accuracy on unseen workloads.",
    ],
    hardPart: {
      title: "A workload is a distribution, not a list of isolated queries",
      body: "LearnedWMP groups historical queries into templates that share a similar memory demand, turns a workload into a histogram of those templates, and learns the memory of that distribution. The demo lets someone change the workload and see the estimate, instead of reading only a paper. My part of the lab work was the feature pipeline, the batch runner, the models, and the dashboard used to compare them.",
    },
    system: [
      { label: "Source", items: ["IBM Db2", "TPC-C workloads"] },
      { label: "Features", items: ["Plan features", "CPU, I/O, buffers"] },
      { label: "Model", items: ["Query templates", "Distribution regression"] },
      { label: "Demo", items: ["Comparison dashboard", "Accuracy and latency"] },
    ],
    shows: [
      "A peer-reviewed demo at SIGMOD Companion 2025, with a public DOI.",
      "Research that still has an engineering shape: pipelines, batch execution, and a dashboard.",
      "Numbers you can defend: 91% on unseen workloads, 83% faster batch processing.",
    ],
    talkAbout: [
      "Why estimating the whole workload can beat estimating every query on its own.",
      "What the dashboard made visible that a single accuracy number hides.",
      "Which part was yours: features from Db2, the multi-threaded runner, the model, the dashboard.",
    ],
  },
]

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
    title: "Freelance full-stack developer",
    place: "Toronto",
    period: "May 2026 — Present",
    points: [
      "Built and shipped the school's booking platform: React and TypeScript web app, Express API, PostgreSQL, and a React Native app.",
      "Stopped double-booked lessons with a transactional slot claim, and kept package assignment on the admin side.",
      "Deployed the web app on AWS Amplify and locked database access so clients go through the API.",
    ],
  },
  {
    org: "Mueller Co.",
    title: "Data analyst",
    place: "Toronto",
    period: "Feb 2025 — Present",
    points: [
      "Contract role. Built C# desktop tools that run real-time FFT acoustic signal processing.",
      "Ran sensitivity analysis across 15 prototype sensors, from 100 Hz to 1000 Hz, to judge field performance.",
      "Automated client email with AWS SES, and monitored leak-detection dashboards for 8 North American water sites.",
    ],
  },
  {
    org: "Tectmind",
    title: "Full-stack developer",
    place: "Toronto",
    period: "Sep 2024 — Feb 2025",
    points: [
      "Loaded regulatory CSV data into PostgreSQL with PostGIS for 3D map views.",
      "Built Node.js and Flask APIs and connected them to Mapbox for the visualization.",
      "Shipped Vue and Angular UI, including lazy loading that cut the initial bundle by 30%. Deployed on AWS with Jenkins and GitHub Actions.",
    ],
  },
  {
    org: "DITA Research Lab, York University",
    title: "Software engineer",
    place: "Toronto",
    period: "Jan 2023 — Apr 2024",
    points: [
      "Shipped an inference platform with an Angular client, a Flask API, Docker, and SageMaker endpoints.",
      "Built anonymization pipelines with the OpenAI API, S3, and Elasticsearch. SafeGPT is the public version of that work.",
      "Wrote Python services and Node.js services, with pytest and unittest coverage.",
    ],
  },
  {
    org: "DITA Research Lab, York University",
    title: "Machine learning research intern",
    place: "Toronto",
    period: "May 2021 — Aug 2022",
    points: [
      "Extracted TPC-C query features from IBM Db2 for the memory-prediction research that became LearnedWMP.",
      "Cut batch query processing time by 83% with multi-threaded Python.",
      "Reached 91% prediction accuracy on unseen workloads.",
    ],
  },
  {
    org: "CIBC",
    title: "Application developer intern",
    place: "Toronto",
    period: "Sep 2019 — Sep 2020",
    points: [
      "Built a C# and Selenium bridge from SharePoint to ServiceNow that cut ticket creation time by 95%.",
      "Automated Layer7 deploys with bash, XML parsing, and Jenkins.",
      "Wrote a Python scraper to compare mortgage, investment, and banking offers.",
    ],
  },
]

export const primarySkills = [
  "TypeScript",
  "JavaScript",
  "Python",
  "C#",
  "React",
  "React Native",
  "Node.js",
  "Express",
  "Flask",
  "Vue",
  "Angular",
  "PostgreSQL",
  "Prisma",
  "Docker",
  "AWS",
]

export const otherSkills = [
  "Java",
  "SQL",
  "MongoDB",
  "Redis",
  "IBM Db2",
  "Pandas",
  "NumPy",
  "Next.js",
  "GraphQL",
]

export function findStudy(slug: string | undefined) {
  return caseStudies.find((study) => study.slug === slug)
}
