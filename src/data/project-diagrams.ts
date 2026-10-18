import type { DiagramSpec } from "./diagrams";

/**
 * Architecture diagrams for the seven AI projects, drawn from what each
 * repository's code actually does. Rendered by <ArchDiagram>.
 */

/* AdviShopping — the six-stage text retrieval pipeline */
export const advishoppingPipeline: DiagramSpec = {
  width: 980,
  height: 360,
  nodes: [
    { id: "q", x: 20, y: 140, w: 120, h: 64, label: "Search query", sub: "+ filters", tone: "accent" },
    { id: "ret", x: 170, y: 60, w: 250, h: 224, label: "PARALLEL RETRIEVAL", tone: "group" },
    { id: "kw", x: 190, y: 100, w: 210, h: 64, label: "Keyword search", sub: "Postgres FTS · tsvector + GIN" },
    { id: "sem", x: 190, y: 180, w: 210, h: 64, label: "Semantic search", sub: "pgvector · gte-small 384d" },
    { id: "merge", x: 440, y: 140, w: 100, h: 64, label: "Merge", sub: "union" },
    { id: "rrf", x: 565, y: 140, w: 105, h: 64, label: "RRF", sub: "rank fusion" },
    { id: "rerank", x: 695, y: 140, w: 140, h: 64, label: "Cross-encoder", sub: "ms-marco-MiniLM" },
    { id: "llm", x: 860, y: 140, w: 110, h: 64, label: "LLM", sub: "Groq · reasons", tone: "accent" },
    {
      id: "band",
      x: 20,
      y: 312,
      w: 950,
      h: 34,
      label: "Supabase · Postgres + pgvector — GIN and HNSW indexes · RLS · filters applied inside both subqueries",
      tone: "band",
    },
  ],
  edges: [
    { from: "q", to: "ret", sides: ["right", "left"] },
    { from: "ret", to: "merge", sides: ["right", "left"] },
    { from: "merge", to: "rrf" },
    { from: "rrf", to: "rerank" },
    { from: "rerank", to: "llm" },
  ],
};

/* NimbusPay — support agent with safety layers */
export const nimbuspayAgent: DiagramSpec = {
  width: 1000,
  height: 450,
  nodes: [
    { id: "msg", x: 20, y: 153, w: 130, h: 64, label: "Customer message", tone: "accent" },
    { id: "pii", x: 180, y: 153, w: 130, h: 64, label: "PII redaction", sub: "Presidio" },
    { id: "agent", x: 340, y: 70, w: 380, h: 230, label: "AGENT LOOP · TRACED PER STAGE", tone: "group" },
    { id: "loop", x: 360, y: 106, w: 160, h: 52, label: "Tool-use loop", sub: "plans · calls · reads" },
    { id: "kb", x: 540, y: 106, w: 160, h: 52, label: "KB search", sub: "RAG · grounded" },
    { id: "acct", x: 360, y: 176, w: 160, h: 52, label: "Account tools", sub: "balance · txns · card" },
    { id: "act", x: 540, y: 176, w: 160, h: 52, label: "State-changing", sub: "block card · dispute", tone: "accent" },
    { id: "gate", x: 360, y: 244, w: 340, h: 44, label: "Human approval gate before any change" },
    { id: "db", x: 760, y: 153, w: 175, h: 64, label: "PostgreSQL", sub: "accounts · cards · txns" },
    { id: "guard", x: 340, y: 330, w: 380, h: 56, label: "Output guardrails", sub: "regex · schema · semantic LLM judge" },
    { id: "res", x: 760, y: 330, w: 200, h: 56, label: "AgentResult", sub: "answer · tools · cost · trace" },
    {
      id: "band",
      x: 20,
      y: 408,
      w: 940,
      h: 34,
      label: "Authorization enforced at the tool layer — every session scoped to the signed-in customer",
      tone: "band",
    },
  ],
  edges: [
    { from: "msg", to: "pii" },
    { from: "pii", to: "agent", sides: ["right", "left"] },
    { from: "agent", to: "db", sides: ["right", "left"] },
    { from: "agent", to: "guard", sides: ["bottom", "top"] },
    { from: "guard", to: "res" },
  ],
};

/* Multi-agent travel planner — LangGraph topology */
export const travelPlanner: DiagramSpec = {
  width: 1220,
  height: 500,
  nodes: [
    { id: "req", x: 20, y: 180, w: 120, h: 60, label: "Trip request", tone: "accent" },
    { id: "guard", x: 160, y: 180, w: 120, h: 60, label: "Input guardrail", sub: "injection defense" },
    { id: "plan", x: 300, y: 180, w: 120, h: 60, label: "Planner", sub: "decomposes task" },
    { id: "mem", x: 300, y: 60, w: 120, h: 50, label: "Trip memory", sub: "pgvector + Gemini", tone: "muted" },
    { id: "hitl", x: 450, y: 180, w: 140, h: 60, label: "Approve plan", sub: "human-in-the-loop", tone: "accent" },
    { id: "subs", x: 620, y: 40, w: 210, h: 340, label: "PARALLEL SUBAGENTS", tone: "group" },
    { id: "fl", x: 640, y: 80, w: 170, h: 52, label: "Flights", sub: "search · currency" },
    { id: "ho", x: 640, y: 150, w: 170, h: 52, label: "Hotels", sub: "search · currency" },
    { id: "ac", x: 640, y: 220, w: 170, h: 52, label: "Activities", sub: "search · currency" },
    { id: "vi", x: 640, y: 290, w: 170, h: 52, label: "Visa", sub: "search · currency" },
    { id: "syn", x: 860, y: 180, w: 140, h: 60, label: "Synthesizer" },
    { id: "cri", x: 860, y: 280, w: 140, h: 60, label: "Critic", sub: "budget review" },
    { id: "fin", x: 1040, y: 280, w: 140, h: 60, label: "Final plan", tone: "accent" },
    {
      id: "band",
      x: 20,
      y: 446,
      w: 1180,
      h: 34,
      label: "State persisted per trip — LangGraph Postgres checkpointer · long-term memory in pgvector · Groq with Gemini fallback",
      tone: "band",
    },
  ],
  edges: [
    { from: "req", to: "guard" },
    { from: "guard", to: "plan" },
    { from: "mem", to: "plan", sides: ["bottom", "top"], label: "recall" },
    { from: "plan", to: "hitl" },
    { from: "hitl", to: "subs", sides: ["right", "left"] },
    { from: "subs", to: "syn", sides: ["right", "left"] },
    { from: "syn", to: "cri", sides: ["bottom", "top"] },
    { from: "cri", to: "fin" },
    { from: "cri", to: "plan", dashed: true, sides: ["bottom", "bottom"], bend: 415, label: "over budget — revise" },
  ],
};

/* GitHub Agent — MCP server, supervisor and specialists */
export const githubAgentDiagram: DiagramSpec = {
  width: 1150,
  height: 540,
  nodes: [
    { id: "user", x: 20, y: 70, w: 110, h: 54, label: "User" },
    { id: "ui", x: 160, y: 70, w: 180, h: 54, label: "Web UI + API", sub: "SSE · approve / reject", tone: "accent" },
    { id: "hook", x: 160, y: 150, w: 180, h: 54, label: "CI webhook", sub: "HMAC-signed", tone: "muted" },
    { id: "single", x: 380, y: 60, w: 190, h: 54, label: "Single agent", sub: "one model · all tools" },
    { id: "sup", x: 380, y: 150, w: 190, h: 54, label: "Supervisor", sub: "routes · owns memory" },
    { id: "specs", x: 600, y: 30, w: 210, h: 420, label: "FIVE SPECIALISTS", tone: "group" },
    { id: "qa", x: 618, y: 70, w: 174, h: 48, label: "repo_qa", sub: "read + search" },
    { id: "itri", x: 618, y: 142, w: 174, h: 48, label: "issue_triage", sub: "issues · labels" },
    { id: "cw", x: 618, y: 214, w: 174, h: 48, label: "code_writer", sub: "branch → edit → PR" },
    { id: "citri", x: 618, y: 286, w: 174, h: 48, label: "ci_triage", sub: "failure → report" },
    { id: "prr", x: 618, y: 358, w: 174, h: 48, label: "pr_reviewer", sub: "diff → review" },
    { id: "mcp", x: 850, y: 110, w: 280, h: 300, label: "MCP SERVER · 22 TOOLS", tone: "group" },
    { id: "gh", x: 870, y: 152, w: 240, h: 52, label: "GitHub client", sub: "retry · backoff · jitter" },
    { id: "rag", x: 870, y: 224, w: 240, h: 52, label: "Hybrid RAG", sub: "FAISS + BM25 · RRF · path:line" },
    { id: "api", x: 870, y: 320, w: 240, h: 44, label: "GitHub REST API", tone: "muted" },
    {
      id: "band",
      x: 20,
      y: 486,
      w: 1110,
      h: 36,
      label: "Per-thread + cross-conversation memory · guardrails (redaction · injection quarantine) · reflection · usage metering · approval + ALLOW_WRITES on every write",
      tone: "band",
    },
  ],
  edges: [
    { from: "user", to: "ui" },
    { from: "ui", to: "single", sides: ["right", "left"] },
    { from: "ui", to: "sup", sides: ["right", "left"] },
    { from: "hook", to: "sup", sides: ["right", "left"], dashed: true, label: "auto-triage" },
    { from: "single", to: "mcp", sides: ["right", "top"] },
    { from: "sup", to: "specs", sides: ["right", "left"] },
    { from: "specs", to: "mcp", sides: ["right", "left"], label: "MCP / stdio" },
    { from: "gh", to: "api", sides: ["bottom", "top"] },
    { from: "rag", to: "api", sides: ["bottom", "top"], dashed: true },
  ],
};

/* DocExplainer — ingest and ask */
export const docExplainerDiagram: DiagramSpec = {
  width: 1000,
  height: 360,
  nodes: [
    { id: "up", x: 20, y: 40, w: 130, h: 56, label: "Upload", sub: ".pdf · .txt · .md" },
    { id: "ch", x: 180, y: 40, w: 150, h: 56, label: "Chunk in browser", sub: "~800 chars" },
    { id: "ing", x: 360, y: 40, w: 170, h: 56, label: "POST /api/rag/ingest" },
    { id: "emb", x: 560, y: 40, w: 170, h: 56, label: "Gemini embedding", sub: "768-dim vectors" },
    { id: "pg", x: 775, y: 40, w: 200, h: 56, label: "PostgreSQL + pgvector", sub: "chunk text + vector", tone: "accent" },

    { id: "q", x: 20, y: 214, w: 130, h: 56, label: "Question" },
    { id: "ask", x: 180, y: 214, w: 170, h: 56, label: "POST /api/agent/ask", sub: ".NET 8 Web API" },
    { id: "re", x: 380, y: 150, w: 380, h: 170, label: "REACT LOOP", tone: "group" },
    { id: "n1", x: 400, y: 190, w: 160, h: 52, label: "Thought → Action", sub: "SearchDocuments[query]" },
    { id: "n2", x: 580, y: 190, w: 160, h: 52, label: "Observation", sub: "top-3 nearest chunks" },
    { id: "n3", x: 400, y: 258, w: 340, h: 46, label: "Final answer, grounded in retrieved chunks", tone: "accent" },
    { id: "srch", x: 780, y: 209, w: 190, h: 52, label: "Embed + cosine search", sub: "pgvector" },
  ],
  edges: [
    { from: "up", to: "ch" },
    { from: "ch", to: "ing" },
    { from: "ing", to: "emb" },
    { from: "emb", to: "pg" },
    { from: "q", to: "ask" },
    { from: "ask", to: "re", sides: ["right", "left"] },
    { from: "n1", to: "n2" },
    { from: "n2", to: "n3", sides: ["bottom", "top"] },
    { from: "re", to: "srch", sides: ["right", "left"], label: "tool call" },
    { from: "srch", to: "pg", sides: ["top", "bottom"], dashed: true },
  ],
};

/* ExpenseTracker — an agent that takes real actions */
export const expenseAgentDiagram: DiagramSpec = {
  width: 1000,
  height: 410,
  nodes: [
    { id: "sub", x: 20, y: 148, w: 130, h: 64, label: "Expense submitted", tone: "accent" },
    { id: "loop", x: 190, y: 50, w: 520, h: 260, label: "TOOL-CALLING AGENT LOOP · MAX 5 ITERATIONS", tone: "group" },
    { id: "chk", x: 210, y: 96, w: 220, h: 64, label: "CheckPolicy", sub: "Gemini embed · distance < 0.36" },
    { id: "ver", x: 470, y: 96, w: 220, h: 64, label: "LLM verdict", sub: "policy text → compliant?" },
    { id: "save", x: 470, y: 184, w: 220, h: 64, label: "SaveExpense", sub: "real INSERT, run by C#", tone: "accent" },
    { id: "ctl", x: 210, y: 262, w: 480, h: 36, label: "finish_reason: tool_calls → act again · stop → done", tone: "muted" },
    { id: "db", x: 750, y: 148, w: 200, h: 64, label: "PostgreSQL", sub: "expenses · policies · vectors" },
    { id: "json", x: 300, y: 350, w: 300, h: 44, label: "Structured JSON → Next.js dashboard" },
  ],
  edges: [
    { from: "sub", to: "loop", sides: ["right", "left"] },
    { from: "chk", to: "ver" },
    { from: "ver", to: "save", sides: ["bottom", "top"] },
    { from: "save", to: "db", sides: ["right", "left"] },
    { from: "loop", to: "json", sides: ["bottom", "top"] },
  ],
};

/* RideSmartAgent — compare, decide, race */
export const rideSmartDiagram: DiagramSpec = {
  width: 1100,
  height: 430,
  nodes: [
    { id: "in", x: 20, y: 160, w: 140, h: 60, label: "Pickup + drop-off", tone: "accent" },
    { id: "geo", x: 190, y: 160, w: 130, h: 60, label: "Geocode", sub: "Google · Nominatim" },
    { id: "prov", x: 350, y: 40, w: 260, h: 300, label: "PROVIDERS · PARALLEL · TIME-BOXED", tone: "group" },
    { id: "ub", x: 370, y: 82, w: 220, h: 48, label: "Uber", sub: "Playwright live scrape" },
    { id: "ol", x: 370, y: 142, w: 220, h: 48, label: "Ola", sub: "Playwright live scrape" },
    { id: "ra", x: 370, y: 202, w: 220, h: 48, label: "Rapido", sub: "fare estimate" },
    { id: "ny", x: 370, y: 262, w: 220, h: 48, label: "Namma Yatri", sub: "fare estimate" },
    { id: "cmp", x: 640, y: 160, w: 130, h: 60, label: "Comparator", sub: "cab vs auto" },
    { id: "ai", x: 800, y: 160, w: 140, h: 60, label: "AI layer", sub: "z-score · prediction" },
    { id: "race", x: 970, y: 160, w: 110, h: 60, label: "Race booking", sub: "first wins", tone: "accent" },
    { id: "hist", x: 800, y: 270, w: 140, h: 56, label: "SQLite", sub: "ride history", tone: "muted" },
    { id: "llm", x: 965, y: 270, w: 130, h: 56, label: "Groq chat", sub: "prompt from history" },
    {
      id: "band",
      x: 20,
      y: 380,
      w: 1060,
      h: 34,
      label: "Race: providers within ₹50 of the cheapest · first confirmed driver wins · others closed · 120s timeout",
      tone: "band",
    },
  ],
  edges: [
    { from: "in", to: "geo" },
    { from: "geo", to: "prov", sides: ["right", "left"] },
    { from: "prov", to: "cmp", sides: ["right", "left"] },
    { from: "cmp", to: "ai" },
    { from: "ai", to: "race" },
    { from: "hist", to: "ai", sides: ["top", "bottom"] },
    { from: "hist", to: "llm", sides: ["right", "left"] },
  ],
};

/* RideSmart Android — read live fares off the ride apps' own screens */
export const rideSmartAndroidDiagram: DiagramSpec = {
  width: 1000,
  height: 390,
  nodes: [
    { id: "ui", x: 20, y: 133, w: 130, h: 64, label: "Compose UI", sub: "home · results", tone: "accent" },
    { id: "svc", x: 190, y: 50, w: 430, h: 230, label: "ACCESSIBILITY SERVICE · RUNS THE LOOP", tone: "group" },
    { id: "open", x: 210, y: 100, w: 190, h: 56, label: "Open app on route", sub: "deep link, else drive UI" },
    { id: "read", x: 430, y: 100, w: 170, h: 56, label: "Read fare list", sub: "price · ETA · vehicle" },
    { id: "store", x: 430, y: 190, w: 170, h: 56, label: "Prices state", sub: "StateFlow · persisted" },
    { id: "next", x: 210, y: 190, w: 190, h: 56, label: "Next app", sub: "10s cap · 35s watchdog" },
    { id: "est", x: 660, y: 40, w: 140, h: 56, label: "FareEstimator", sub: "fallback model", tone: "muted" },
    { id: "cmp", x: 660, y: 133, w: 140, h: 64, label: "SmartComparator", sub: "live beats estimate" },
    { id: "race", x: 825, y: 133, w: 165, h: 64, label: "RaceBooker", sub: "request · watch · cancel", tone: "accent" },
    { id: "sig", x: 815, y: 250, w: 185, h: 56, label: "Screen text + alerts", sub: "driver-assigned signals", tone: "muted" },
    {
      id: "band",
      x: 20,
      y: 332,
      w: 960,
      h: 34,
      label: "Route and prices persisted to disk — survive OEM process kills (Vivo / iQOO, Xiaomi, Oppo)",
      tone: "band",
    },
  ],
  edges: [
    { from: "ui", to: "svc", sides: ["right", "left"] },
    { from: "open", to: "read" },
    { from: "read", to: "store", sides: ["bottom", "top"] },
    { from: "store", to: "next", sides: ["left", "right"], label: "loop" },
    { from: "next", to: "open", sides: ["top", "bottom"] },
    { from: "svc", to: "cmp", sides: ["right", "left"] },
    { from: "est", to: "cmp", sides: ["bottom", "top"] },
    { from: "cmp", to: "race" },
    { from: "sig", to: "race", sides: ["top", "bottom"] },
  ],
};

/* RideSmart Mobile — estimate, then hand off */
export const rideSmartMobileDiagram: DiagramSpec = {
  width: 980,
  height: 390,
  nodes: [
    { id: "in", x: 20, y: 130, w: 150, h: 64, label: "Location input", sub: "Nominatim · GPS" },
    { id: "est", x: 200, y: 130, w: 180, h: 64, label: "Fare model", sub: "fare cards · surge" },
    { id: "res", x: 400, y: 130, w: 195, h: 64, label: "Results", sub: "ranked · filters · savings", tone: "accent" },
    { id: "dl", x: 620, y: 130, w: 160, h: 64, label: "Deep link", sub: "route pre-filled" },
    { id: "app", x: 805, y: 130, w: 165, h: 64, label: "Ride app", sub: "Uber · Ola · Rapido", tone: "muted" },
    { id: "db", x: 417, y: 250, w: 160, h: 56, label: "SQLite", sub: "history · price stats" },
    {
      id: "band",
      x: 20,
      y: 332,
      w: 940,
      h: 34,
      label: "App not installed? Falls back to the Play Store, then the provider's web page",
      tone: "band",
    },
  ],
  edges: [
    { from: "in", to: "est" },
    { from: "est", to: "res" },
    { from: "res", to: "dl" },
    { from: "dl", to: "app" },
    { from: "res", to: "db", sides: ["bottom", "top"] },
  ],
};
