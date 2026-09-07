/**
 * Single source of truth for every piece of content on the site.
 * Editing this file changes the portfolio — no component edits needed.
 */

export const profile = {
  name: "Varchini Devi K",
  title: "Senior Software Engineer",
  tagline: "I build secure, high-scale .NET & Next.js platforms — and the AI systems that sit on top of them.",
  location: "Chennai, India",
  email: "varshinikannan2495@gmail.com",
  phone: "+91 80564 37139",
  linkedin: "https://www.linkedin.com/in/varchini-devi-b043542b1/",
  github: "https://github.com/Varshini0511",
  githubUser: "Varshini0511",
  yearsExperience: "7+",

  /** Shown under the hero as quick credibility hits. */
  stats: [
    { value: "7+", label: "Years shipping production software" },
    { value: "3", label: "Enterprise platforms led end-to-end" },
    { value: "15+", label: "Internal excellence awards" },
    { value: "7", label: "AI systems built from scratch" },
  ],

  about: [
    `I'm a Senior Software Engineer with ${"7+"} years building and sustaining high-performance, security-sensitive enterprise platforms. My day job is deep backend work: C#, ASP.NET Core/.NET 8, Web API, and cloud-native architecture on Azure — currently on a digital forensics platform where confidentiality, data integrity, and auditability of evidence are hard requirements, not nice-to-haves.`,
    `That background shapes how I approach AI. Over the past year I've built seven AI systems from the ground up — RAG pipelines, tool-calling agents, hybrid retrieval, multi-agent orchestration — and I kept building the parts most demos skip: evaluation harnesses, tracing and cost tracking, PII redaction, and layered guardrails. The engineering discipline transfers directly; an agent that can write to a database needs the same rigour as a forensics pipeline.`,
    `I've led migrations from .NET Framework to .NET 8, designed event-driven Azure workflows with Durable Functions and Service Bus, cut cloud costs 40% through an AWS EC2 migration, and shipped Angular and React/Next.js front ends against secure REST APIs. I like problems where correctness matters and the debugging is genuinely hard.`,
  ],

  /**
   * Projects. `flagship` renders the large multi-capability card.
   * `tags` drive the filter chips.
   */
  projects: [
    {
      id: "advishopping",
      flagship: true,
      name: "AdviShopping",
      subtitle: "Production-shaped retrieval for e-commerce",
      period: "2026",
      blurb:
        "A full-stack shopping platform built around a real retrieval stack rather than a SQL LIKE query. Three distinct search modalities — text, image, and voice — over the same Postgres + pgvector catalogue, each with its own pipeline.",
      repo: "https://github.com/Varshini0511/AdviShopping1",
      repoPrivate: true,
      demo: "https://advishopping1.onrender.com/search?q=sunglass",
      /** Render free tier spins down; measured ~48s on a cold request. */
      demoNote: "Hosted on Render's free tier — the first load can take up to a minute while the server wakes and loads the models.",
      stack: ["Next.js 15", "TypeScript", "Supabase", "pgvector", "Transformers.js", "CLIP", "Groq", "Tailwind"],
      tags: ["Vector Search", "RAG", "Agents", "Multimodal", "Full-Stack"],
      /** The three capabilities the user asked to showcase individually. */
      capabilities: [
        {
          name: "Hybrid Search",
          hook: "Keyword + semantic, fused and reranked",
          detail:
            "A six-stage pipeline: Postgres full-text (tsvector + GIN) and pgvector semantic search run as parallel candidate generators, get unioned, then sorted by Reciprocal Rank Fusion with tunable weights. A ms-marco-MiniLM cross-encoder reranks the top candidates behind a confidence guard, and an LLM writes the recommendation. Metadata filters (category, stock, max price) are pushed inside both retrieval subqueries — the correct way to combine search with structured constraints.",
          points: [
            "6-stage pipeline: FTS → pgvector → merge → RRF → cross-encoder rerank → LLM",
            "Evaluation harness scoring precision@k, recall@k and NDCG@k across four strategies",
            "Embeddings and reranking run on-device via Transformers.js — no API key needed",
            "Queries like “device to call someone” return phones despite zero shared words",
          ],
        },
        {
          name: "Visual Search",
          hook: "Find products by photo, not words",
          detail:
            "Upload or drop an image and the catalogue is searched by visual similarity. Product images are embedded offline into a CLIP vector space; a query image is embedded with the same model at request time and matched by cosine distance in pgvector. The hard constraint — and the thing that makes or breaks a vector search — is that query and corpus must share an embedding model.",
          points: [
            "CLIP image embeddings generated offline and indexed in pgvector",
            "Cosine similarity search over the same HNSW index used by text search",
            "Dedicated /visual-search route with drag-and-drop upload",
          ],
        },
        {
          name: "Voice Shopping Assistant",
          hook: "A tool-calling agent you can talk to",
          detail:
            "A conversational agent wired to the catalogue through typed tools. The model plans, calls tools to search products, inspect details and manage the cart, reads the results, and iterates until the request is satisfied. Speech-to-text on the way in and speech synthesis on the way out make it fully hands-free.",
          points: [
            "Typed tool schema — the LLM chooses which tool to call and with what arguments",
            "Multi-turn memory, so follow-ups resolve against earlier turns",
            "Browser speech recognition and synthesis for hands-free use",
            "Feature-flagged for deployment on memory-constrained hosts",
          ],
        },
      ],
      highlights: [],
    },
    {
      id: "nimbuspay",
      flagship: false,
      name: "NimbusPay",
      subtitle: "AI support agent with observability, evals & safety",
      period: "2026",
      blurb:
        "A customer-support agent for a fictional digital bank, built end-to-end with the production lifecycle most demos skip: tracing, cost tracking, an evaluation suite, and layered safety guardrails — over a real Postgres database.",
      repo: "https://github.com/Varshini0511/FinTectAIProject",
      repoPrivate: false,
      demo: "https://fintectaiproject-chatassistant.streamlit.app",
      demoNote: "Streamlit Community Cloud sleeps after inactivity — if you see a sleep screen, click “wake” and give it a moment. Sign in as alex@nimbuspay.demo / demo1234.",
      stack: ["Python", "Streamlit", "Groq", "PostgreSQL", "Presidio", "DeepEval", "LangSmith"],
      tags: ["Agents", "RAG", "Safety", "Evaluation", "Observability"],
      capabilities: [],
      highlights: [
        "Agentic tool-use loop over typed tools — balance, transactions, card status, block card, file dispute, KB search",
        "Defense in depth: PII redaction with Microsoft Presidio before the model, logs or DB ever see the data",
        "Authorization enforced at the tool layer — a jailbroken model still cannot read another customer's account",
        "Output guardrails: regex scrubbing, schema validation, and semantic LLM-as-judge for hallucinated fees or financial advice",
        "Human-in-the-loop gating on state-changing tools like block_card and file_dispute",
        "Golden dataset with adversarial prompt-injection cases; DeepEval faithfulness metrics caught a real subtle bug in development",
        "Per-stage trace trees with latency, token counts and exact cost from the API usage object",
      ],
    },
    {
      id: "travel-planner",
      flagship: false,
      name: "Multi-Agent Travel Planner",
      subtitle: "LangGraph orchestration with a reflection loop",
      period: "2026",
      blurb:
        "A LangGraph workflow that plans trips end to end: a guardrail, a planner that decomposes the request, specialised subagents that run in parallel and pick their own tools, a synthesiser, and a critic that reviews against budget and loops back for revisions.",
      repo: "https://github.com/Varshini0511/multi-agent-travel-planner",
      repoPrivate: false,
      demo: "https://multi-agent-travel-planner-85addqqurjuhryc5zjrvje.streamlit.app/",
      demoNote: "Streamlit Community Cloud sleeps after inactivity — if you see a sleep screen, click “wake” and give it a moment.",
      stack: ["LangGraph", "LangChain", "Groq", "Google Gemini", "Tavily", "Neon Postgres", "pgvector", "Streamlit"],
      tags: ["Agents", "Orchestration", "RAG", "Evaluation"],
      capabilities: [],
      highlights: [
        "Parallel fan-out / fan-in across flights, hotels, activities and visa subagents",
        "Reflection loop — the critic sends plans back to the planner when they miss budget",
        "Human-in-the-loop: the graph pauses on interrupt so you can approve or edit the research plan before searches run",
        "Long-term semantic memory across trips via pgvector + Gemini embeddings",
        "Dynamic tool selection — each subagent chooses web search vs currency conversion",
        "Provider fallback: Groq primary, Gemini fallback, with graceful degradation",
        "Evaluation harness with deterministic checks plus an LLM-as-judge rubric",
      ],
    },
    {
      id: "docexplainer",
      flagship: false,
      name: "DocExplainer",
      subtitle: "RAG document Q&A with a ReAct agent — on .NET",
      period: "2026",
      blurb:
        "Upload a document and ask questions about it. A ReAct agent reasons step by step, searches the document semantically, and answers strictly from what it retrieves. Notable for putting the whole RAG pipeline in C# rather than Python.",
      repo: "https://github.com/Varshini0511/DocExplainer",
      repoPrivate: false,
      demo: "https://doc-explainer-beta.vercel.app/",
      demoNote: null,
      stack: [".NET 8", "C#", "Next.js 14", "TypeScript", "PostgreSQL", "pgvector", "Gemini", "Groq"],
      tags: ["RAG", "Agents", "Full-Stack", ".NET"],
      capabilities: [],
      highlights: [
        "RAG pipeline implemented in .NET 8 Web API — chunking, embedding, retrieval and generation in C#",
        "ReAct loop: Thought → Action → Observation → Answer, with SearchDocuments as a typed tool",
        "Gemini gemini-embedding-001 producing 768-dim vectors stored in pgvector",
        "Top-3 nearest-chunk retrieval by cosine distance; answers grounded in retrieved text only",
        "Supports .txt, .md and .pdf upload with client-side chunking at ~800 characters",
      ],
    },
    {
      id: "expense-tracker",
      flagship: false,
      name: "ExpenseTracker",
      subtitle: "A tool-calling agent that takes real actions",
      period: "2026",
      blurb:
        "An expense system where the AI does more than answer: it checks company policy via RAG, decides whether an expense is compliant, and then writes it to the database itself. The agent has hands, not just a mouth.",
      repo: "https://github.com/Varshini0511/expense-tracker",
      repoPrivate: false,
      demo: "https://expense-tracker-chi-five-45.vercel.app/",
      demoNote: null,
      stack: [".NET 8", "C#", "Next.js", "PostgreSQL", "pgvector", "Groq", "Gemini", "Docker"],
      tags: ["Agents", "RAG", "Full-Stack", ".NET"],
      capabilities: [],
      highlights: [
        "Tool-calling agent with a JSON-schema tool menu; the model sequences policy check → save autonomously",
        "Real side effects — the agent calls SaveExpense and the C# layer performs an actual INSERT",
        "RAG policy compliance: Gemini embeddings + pgvector cosine search, with a 0.36 distance threshold so unrelated expenses don't match the wrong policy",
        "Structured output forced to strict JSON and parsed into typed C# records",
        "Fallback parser that salvages the malformed XML-style tool calls some models emit",
        "Stale-embedding handling — editing a policy clears its vector and forces a re-embed",
        "Clean layering: thin controller, ExpenseService for data + RAG, ExpenseAgentService for AI; Dockerised Postgres + pgvector",
      ],
    },
  ],

  experience: [
    {
      company: "Exterro R&D Private Ltd",
      role: "Senior Software Engineer",
      period: "Aug 2024 — Present",
      context:
        "FTKC, a security-critical digital forensics platform supporting the full investigative lifecycle, with strict requirements around confidentiality, integrity and auditability of evidence.",
      stack: ["C#", ".NET 8", "ASP.NET", "Web API", "Angular 14", "EF Core", "ADO.NET", "LINQ", "SQL Server"],
      points: [
        "Leading the migration from .NET Framework to .NET 8 — resolving breaking changes, refactoring legacy components and modernising APIs for long-term support.",
        "Engineered an end-to-end mobile data collection module: job orchestration, secure TCP/IP-based capture and transfer, progress tracking and encrypted output, built for fault tolerance.",
        "Integrated Apple APIs and macOS/iWork document handling, enabling secure browser-based review of macOS artifacts.",
        "Built endpoint-adjacent collection across Google Drive, OneDrive, network shares, mobile devices, Windows/Linux/macOS, Gmail, Outlook and Exchange.",
        "Implemented encryption and certificate-based security workflows to preserve forensic data integrity against internal and external standards.",
        "Enabled automated entity extraction and classification — people, emails, keywords, metadata — while maintaining traceability of extracted data.",
        "Designed Angular UI for evidence review, filtering, tagging and entity linking, with consistent API contracts and error handling.",
      ],
    },
    {
      company: "Wipro Limited",
      role: "Senior Software Engineer",
      period: "Feb 2022 — Jul 2024",
      context: "Digital oilfield solutions for Halliburton, plus HP Marcoms — drilling data processing, asset tracking and job scheduling.",
      stack: [".NET Core", "C#", "Angular 14", "React/Next.js", "Azure", "Cosmos DB", "Docker", "AKS"],
      points: [
        "Designed secure, event-driven workflows with Azure Blob Storage and Durable Orchestrations — file drops triggered automated decryption, hash-based duplicate detection, validation, splitting and structured SQL insertion.",
        "Used system- and user-assigned Managed Identities across Function Apps, Blob Storage, Cosmos DB and Key Vault, eliminating plain-text secrets and connection strings.",
        "Implemented Service Bus topics and subscriptions with retry policies and dead-letter queues for fault-tolerant downstream notification.",
        "Modelled and tuned Cosmos DB containers — partitioning, indexing and RU tuning for cost/performance balance.",
        "Built Angular 14 dashboards for real-time telemetry and integrated React/Next.js front ends with versioned .NET REST APIs.",
        "Enhanced diagnostics with Application Insights — custom telemetry, dependency tracking and KQL queries for proactive analysis.",
        "Built and supported Dockerised services on Azure Kubernetes Service for consistent, reliable deployments.",
      ],
    },
    {
      company: "Cognizant Technology Solutions",
      role: "Associate",
      period: "Feb 2018 — Feb 2022",
      context: "Insurance platform work for Travelers — claims, subrogation and payments.",
      stack: ["ASP.NET", "C#", "VB.NET", "Web API", "MongoDB", "DB2", "SQL Server", "Jenkins"],
      points: [
        "Led full SDLC across requirements, design, coding, testing, deployment, support and documentation.",
        "Built an Adverse Subrogation screen improving efficiency in managing complex legal cases, and integrated a secure online payment system for claim payments and refunds.",
        "Secured APIs with OAuth and JWT; used MongoDB for dynamic case data with high-performance Web APIs that cut case access and update time.",
        "Migrated applications to AWS EC2, achieving a 40% cost reduction and improved scalability.",
        "Upgraded apps to .NET 4.8 and migrated Windows Server 2012 → 2019, handling full environment setup and validation.",
        "Managed 100+ scheduled jobs in Tidal, optimising execution and dependencies to reduce system downtime by 40%.",
        "Tuned IIS for high-traffic apps, improving response time by 30%; automated CI/CD via Jenkins, Urban Code Deploy and Azure DevOps.",
        "Partnered with cybersecurity on reviews and testing, maintaining a 100% clean security record.",
      ],
    },
  ],

  skills: [
    {
      group: "AI Engineering",
      items: [
        "RAG pipelines", "Tool calling / function calling", "ReAct agents", "LangGraph multi-agent",
        "Hybrid search (RRF)", "Cross-encoder reranking", "Vector search (pgvector)", "CLIP multimodal",
        "Evaluation harnesses", "LLM-as-judge", "DeepEval", "Guardrails & PII redaction", "Tracing & cost tracking",
      ],
    },
    {
      group: ".NET & Backend",
      items: [
        "C#", "ASP.NET Core / .NET 8", "Web API", "ADO.NET", "Entity Framework Core", "LINQ",
        "VB.NET", "ASP.NET MVC", "Web Forms", "REST & microservices", "Python",
      ],
    },
    {
      group: "Front End",
      items: ["TypeScript", "JavaScript", "React", "Next.js", "Angular", "HTML", "CSS", "Tailwind", "Bootstrap", "AJAX"],
    },
    {
      group: "Cloud & DevOps",
      items: [
        "Azure App Services", "Azure Functions", "Durable Functions", "Service Bus", "Key Vault",
        "Blob Storage", "Cosmos DB", "Application Insights", "AWS EC2", "Docker", "Kubernetes (AKS)",
        "Azure DevOps", "Jenkins", "CI/CD",
      ],
    },
    {
      group: "Data",
      items: ["SQL Server", "PostgreSQL", "pgvector", "MongoDB", "DB2", "Query optimisation", "Stored procedures"],
    },
    {
      group: "Security",
      items: ["OAuth 2.0", "OpenID Connect", "JWT", "Certificate-based encryption", "Managed Identities", "Prompt-injection defense"],
    },
  ],

  education: {
    degree: "B.E. Electrical and Electronics Engineering",
    school: "Mepco Schlenk Engineering College (Autonomous), Sivakasi",
  },

  achievements: [
    "15+ internal excellence awards and multiple performance recognitions",
    "Best Employee and Bright Beginning Award for early project leadership",
    "40% cloud cost reduction via AWS EC2 migration",
    "~35% faster processing through SQL and backend optimisation",
    "30% IIS response-time improvement on high-traffic applications",
    "40% downtime reduction across 100+ scheduled jobs",
  ],

  languages: ["English", "Tamil", "Telugu"],
} as const;

export type Project = (typeof profile.projects)[number];
