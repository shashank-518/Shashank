/**
 * Single source of truth for portfolio content.
 * Every fact here comes from the resume (public/resume/Shashank_S_Resume.pdf).
 * Edit this file to update the site — components only render what is here.
 */

export type Accent = 'orange' | 'violet' | 'electric' | 'mint' | 'ink'

export const resume = {
  viewUrl: '/resume/Shashank_S_Resume.pdf',
  downloadName: 'Shashank_S_Resume.pdf',
}

export const profile = {
  name: 'Shashank S',
  firstName: 'Shashank',
  initials: 'SS',
  titles: ['AI / Machine Learning Engineer', 'Gen AI Engineer'],
  headline: 'I build production GenAI platforms.',
  intro:
    'Founding Team AI Engineer at Digitomics — architecting agents, RAG pipelines, model routing and real-time voice AI, and taking them from experimentation to production.',
  location: 'Bengaluru, India',
  status: 'Founding Team · Digitomics',
}

export const contact = {
  email: 'shashank5418shashu@gmail.com',
  phone: '+91-7411470233',
  /** Set to false to hide the phone number from the public site. */
  showPhone: true,
  github: 'https://github.com/shashank-518',
  githubHandle: 'shashank-518',
  linkedin: 'https://www.linkedin.com/in/shashank518',
  linkedinHandle: 'shashank518',
}

export const navItems = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'ai', label: 'AI Work' },
  { id: 'contact', label: 'Contact' },
] as const

/* ------------------------------------------------------------------ About */

export const about = {
  lead: 'I engineer GenAI systems that work in production — not just in notebooks.',
  body: [
    'As a founding team member at Digitomics, I architect a production-grade GenAI platform: intent classification, task-based model routing, tool calling, RAG and human-in-the-loop workflows.',
    'I work across backend and AI with FastAPI, databases and cloud services, and I mentor interns and team members through architecture discussions and code reviews.',
  ],
  keywords: ['intent classification', 'model routing', 'RAG', 'HITL workflows', 'real-time voice'],
  facts: [
    { label: 'Current role', value: 'Founding Team Member — AI Engineer', note: 'Digitomics', accent: 'orange' },
    { label: 'Experience', value: 'Apr 2026 – Present', note: 'Production GenAI platform', accent: 'mint' },
    { label: 'Primary focus', value: 'Agents, RAG & model routing', note: 'Text + real-time voice', accent: 'violet' },
    { label: 'Core stack', value: 'Python · FastAPI · Azure OpenAI', note: 'LangChain · LangGraph · pgvector', accent: 'electric' },
    { label: 'Location', value: 'Bengaluru, India', note: '', accent: 'ink' },
  ] satisfies { label: string; value: string; note: string; accent: Accent }[],
  builds: [
    { title: 'Agentic platforms', text: 'FinOps, DevOps and Generic agents with tool calling and approvals.', accent: 'violet' },
    { title: 'RAG pipelines', text: 'Multi-tenant retrieval with contextual chunking and vector search.', accent: 'electric' },
    { title: 'Real-time voice AI', text: 'Low-latency voice bots on GPT Realtime / Azure OpenAI Realtime.', accent: 'orange' },
    { title: 'Fine-tuned models', text: 'Domain LLMs with LoRA/PEFT, from dataset to served chat UI.', accent: 'mint' },
  ] satisfies { title: string; text: string; accent: Accent }[],
}

/* ------------------------------------------------------------- Experience */

export type Workstream = {
  title: string
  text: string
  /** Optional emphasised result, taken verbatim from the resume. */
  metric?: { value: string; label: string }
  tags: string[]
  accent: Accent
}

export const experience = [
  {
    company: 'Digitomics',
    role: 'Founding Team Member — AI Engineer',
    start: '2026-04',
    period: 'Apr 2026 – Present',
    location: 'Bengaluru, India',
    summary:
      'Architecting a production-grade GenAI platform with FinOps, DevOps, and Generic agents, implementing intent classification, task-based model routing, tool calling, RAG, and HITL workflows.',
    tech: ['FastAPI', 'Python', 'Azure AI', 'GPT Realtime', 'GPT-5.6 Luna', 'Jev', 'RAG', 'Vector Search', 'Tool Calling'],
    workstreams: [
      {
        title: 'Task-aware model routing',
        text: 'Implemented task-aware model routing using newer low-latency models including Jev and GPT-5.6 Luna.',
        metric: { value: 'Multi-second → sub-second', label: 'intent-classification latency' },
        tags: ['Jev', 'GPT-5.6 Luna', 'Intent classification'],
        accent: 'orange',
      },
      {
        title: 'Real-time voice bot',
        text: 'Built a real-time voice bot using GPT Realtime, enabling low-latency voice interactions that follow the same intent, retrieval, and agent workflow as the platform’s text-based chatbot.',
        tags: ['GPT Realtime', 'Voice AI'],
        accent: 'violet',
      },
      {
        title: 'Multi-tenant RAG pipeline',
        text: 'Built a multi-tenant RAG pipeline with contextual chunking, multi-query retrieval, vector search, and tenant-aware knowledge bases for secure document retrieval.',
        tags: ['Contextual chunking', 'Multi-query retrieval', 'Vector search'],
        accent: 'electric',
      },
      {
        title: 'FinOps & DevOps agents',
        text: 'Developed FinOps and DevOps agents with database/API integrations, approval workflows, prompt optimization, and platform-wide rate limiting.',
        tags: ['Agents', 'Approval workflows', 'Rate limiting'],
        accent: 'mint',
      },
      {
        title: 'Tenant subscription flow',
        text: 'Engineered the end-to-end tenant subscription flow, covering plan selection, onboarding, subscription state, access control, and tenant isolation.',
        tags: ['Onboarding', 'Access control', 'Tenant isolation'],
        accent: 'orange',
      },
      {
        title: 'Azure deployment & cloud ops',
        text: 'Deployed GPT-5.6 Luna through Azure AI infrastructure and managed cloud operations, including VM maintenance, environment configuration, and Stage-to-Production deployments.',
        tags: ['Azure AI', 'VMs', 'Stage → Prod'],
        accent: 'electric',
      },
      {
        title: 'Backend & AI development',
        text: 'Contributed to backend and AI development using FastAPI, databases, and cloud services, taking features from experimentation to production.',
        tags: ['FastAPI', 'Databases', 'Cloud services'],
        accent: 'violet',
      },
      {
        title: 'Leadership & mentoring',
        text: 'Led and mentored interns and team members through architecture discussions, code reviews, technical guidance, and end-to-end feature ownership.',
        tags: ['Mentoring', 'Code reviews', 'Ownership'],
        accent: 'mint',
      },
    ] satisfies Workstream[],
  },
]

/* ----------------------------------------------------------------- Skills */

export type SkillGroup = { title: string; blurb: string; items: string[]; accent: Accent; wide?: boolean }

export const skillGroups: SkillGroup[] = [
  {
    title: 'AI / GenAI',
    blurb: 'Models, training and prompting',
    items: ['LLMs', 'NLP', 'Transformers', 'PyTorch', 'Hugging Face', 'Generative AI', 'Prompt Engineering', 'Fine-Tuning'],
    accent: 'violet',
    wide: true,
  },
  {
    title: 'RAG / Agents',
    blurb: 'Retrieval, orchestration and tools',
    items: [
      'RAG', 'Embeddings', 'Vector Search', 'Hybrid Search', 'Reranking', 'FAISS', 'ChromaDB', 'pgvector',
      'LangChain', 'LangGraph', 'LlamaIndex', 'MCP', 'Tool Calling', 'Multi-Agent Systems',
    ],
    accent: 'electric',
    wide: true,
  },
  {
    title: 'LLM Evaluation',
    blurb: 'Measuring quality, not guessing',
    items: ['Ragas', 'DeepEval', 'LangSmith', 'Langfuse', 'LLM-as-a-Judge', 'Hallucination Detection', 'RAG Evaluation'],
    accent: 'mint',
  },
  {
    title: 'Backend',
    blurb: 'APIs and services',
    items: ['FastAPI', 'Node.js', 'Express.js', 'REST APIs', 'GraphQL', 'Microservices', 'Redis', 'Kafka', 'gRPC', 'Async Processing'],
    accent: 'orange',
    wide: true,
  },
  {
    title: 'Languages',
    blurb: 'Daily drivers',
    items: ['Python', 'TypeScript', 'JavaScript', 'SQL'],
    accent: 'ink',
  },
  {
    title: 'Databases',
    blurb: 'Relational, document, search, vector',
    items: ['PostgreSQL', 'MongoDB', 'MySQL', 'Elasticsearch', 'Redis', 'Vector Databases'],
    accent: 'electric',
  },
  {
    title: 'ML / MLOps',
    blurb: 'From training to monitoring',
    items: ['Scikit-learn', 'TensorFlow', 'MLflow', 'Docker', 'Kubernetes', 'CI/CD', 'Model Serving', 'Model Monitoring'],
    accent: 'violet',
    wide: true,
  },
  {
    title: 'Cloud',
    blurb: 'Where things ship',
    items: ['AWS', 'Azure', 'Azure OpenAI', 'Azure AI Foundry'],
    accent: 'orange',
  },
  {
    title: 'Tools',
    blurb: 'Workflow',
    items: ['Git', 'GitHub', 'Linux', 'PyTest', 'Postman', 'System Design'],
    accent: 'ink',
    wide: true,
  },
  {
    title: 'Product / Frontend',
    blurb: 'Used in shipped projects',
    items: ['React', 'TypeScript', 'WebRTC', 'nginx', 'Google OAuth'],
    accent: 'mint',
    wide: true,
  },
]

/* --------------------------------------------------------------- Projects */

export type Project = {
  id: 'voice' | 'rag' | 'shuttle'
  name: string
  kicker: string
  year: string
  description: string
  problem: string
  contribution: string[]
  tech: string[]
  github: string
  live?: string
  metrics: { value: string; label: string }[]
  accent: Accent
}

export const projects: Project[] = [
  {
    id: 'voice',
    name: 'AI Voice Calendar Agent',
    kicker: 'Real-time voice · Full stack',
    year: '2026',
    description:
      'A multi-user voice agent that schedules meetings, calendar blocks, and reminders through Azure OpenAI Realtime over WebRTC with barge-in.',
    problem: 'Managing a calendar by voice — without the agent inventing meeting details.',
    contribution: [
      'Google OAuth sign-in that connects Calendar in the same flow.',
      'Actions grounded in FastAPI tools and Postgres, so meeting facts and Google Meet links come only from Calendar API responses.',
      'Optional candidate invites via calendar email updates; Dockerized React/nginx frontend and FastAPI/Postgres backend.',
    ],
    tech: ['React', 'TypeScript', 'FastAPI', 'Azure OpenAI Realtime', 'WebRTC', 'PostgreSQL', 'Docker'],
    github: 'https://github.com/shashank-518/Personal_Assistance',
    metrics: [
      { value: 'WebRTC', label: 'with barge-in' },
      { value: 'Multi-user', label: 'Google OAuth' },
    ],
    accent: 'violet',
  },
  {
    id: 'rag',
    name: 'RAG-Based Document Q&A',
    kicker: 'Retrieval · Evaluation',
    year: '2025',
    description:
      'A Retrieval-Augmented Generation system using LangChain, OpenAI embeddings, and ChromaDB to retrieve relevant document context and generate grounded answers.',
    problem: 'Getting grounded answers from documents instead of hallucinated ones.',
    contribution: [
      'Built the retrieval + generation pipeline with LangChain, OpenAI embeddings and ChromaDB.',
      'Evaluated 500+ queries and exposed the pipeline through a REST API.',
    ],
    tech: ['LangChain', 'OpenAI', 'ChromaDB', 'Python', 'REST API'],
    github: 'https://github.com/shashank-518/MultimodalRag',
    metrics: [
      { value: '92%', label: 'context accuracy' },
      { value: '40%', label: 'fewer hallucinations' },
      { value: '500+', label: 'queries evaluated' },
      { value: '<2s', label: 'API response' },
    ],
    accent: 'electric',
  },
  {
    id: 'shuttle',
    name: 'Shuttle — Badminton Domain LLM',
    kicker: 'Fine-tuning · LoRA / PEFT',
    year: '2026',
    description:
      'Fine-tuned SmolLM2-360M-Instruct on a 110-example badminton Q&A dataset using LoRA/PEFT, with a FastAPI-backed web chat UI for rules, strokes, tactics, and equipment.',
    problem: 'Domain-specific Q&A from a small model, trained on CPU.',
    contribution: [
      'End-to-end pipeline: dataset → LoRA training → inference.',
      'Shipped a FastAPI-backed web chat UI for domain Q&A.',
    ],
    tech: ['Python', 'PyTorch', 'PEFT/LoRA', 'SmolLM2', 'FastAPI'],
    github: 'https://github.com/shashank-518/FineTuning',
    metrics: [
      { value: '~1.2%', label: 'params trained (~4.3M / 366M)' },
      { value: '~3.0 → ~2.2', label: 'training loss, 3 epochs' },
      { value: '110', label: 'Q&A examples' },
    ],
    accent: 'mint',
  },
]

/* ----------------------------------------------------- AI architecture */

export type PipelineNode = {
  id: string
  step: string
  title: string
  detail: string
  chips: string[]
  accent: Accent
}

/** The Digitomics platform flow, as described in the resume. */
export const pipeline: PipelineNode[] = [
  {
    id: 'input',
    step: '01',
    title: 'User — text or voice',
    detail:
      'Users reach the platform through the text chatbot or the real-time voice bot. Voice interactions follow the same intent, retrieval and agent workflow as text.',
    chips: ['Chatbot', 'GPT Realtime voice'],
    accent: 'orange',
  },
  {
    id: 'intent',
    step: '02',
    title: 'Intent classification',
    detail:
      'Every request is classified first. Moving to newer low-latency models took intent classification from multi-second inference to sub-second responses.',
    chips: ['Sub-second', 'Low-latency models'],
    accent: 'violet',
  },
  {
    id: 'routing',
    step: '03',
    title: 'Task-based model routing',
    detail: 'Task-aware routing picks the right model for the job, including Jev and GPT-5.6 Luna (deployed through Azure AI).',
    chips: ['Jev', 'GPT-5.6 Luna', 'Azure AI'],
    accent: 'electric',
  },
  {
    id: 'agents',
    step: '04',
    title: 'Agents',
    detail: 'FinOps, DevOps and Generic agents with database/API integrations, prompt optimization and platform-wide rate limiting.',
    chips: ['FinOps', 'DevOps', 'Generic'],
    accent: 'mint',
  },
  {
    id: 'rag',
    step: '05',
    title: 'RAG + tool calling',
    detail:
      'Multi-tenant RAG with contextual chunking, multi-query retrieval, vector search and tenant-aware knowledge bases — alongside tool calling.',
    chips: ['Multi-query', 'Vector search', 'Tenant-aware'],
    accent: 'electric',
  },
  {
    id: 'hitl',
    step: '06',
    title: 'Human-in-the-loop',
    detail: 'Approval workflows keep a human in control of agent actions before they execute.',
    chips: ['Approvals', 'HITL'],
    accent: 'orange',
  },
  {
    id: 'response',
    step: '07',
    title: 'Response',
    detail: 'The answer is returned to the user — as text in the chatbot, or as speech in the voice bot.',
    chips: ['Text', 'Voice'],
    accent: 'violet',
  },
]

export const aiCapabilities = [
  { title: 'LLM applications', text: 'Chatbot and voice products on Azure OpenAI and GPT Realtime.' },
  { title: 'Retrieval', text: 'Embeddings, hybrid search, reranking, FAISS, ChromaDB, pgvector.' },
  { title: 'Agent orchestration', text: 'LangChain, LangGraph, LlamaIndex, MCP, multi-agent systems.' },
  { title: 'Evaluation', text: 'Ragas, DeepEval, LangSmith, Langfuse, LLM-as-a-Judge.' },
  { title: 'Fine-tuning', text: 'LoRA / PEFT on SmolLM2 with PyTorch and Hugging Face.' },
  { title: 'Platform guardrails', text: 'Tenant isolation, access control, approvals, rate limiting.' },
]

/* ------------------------------------------------------------ Highlights */

export const highlights: { value: number; prefix?: string; suffix?: string; decimals?: number; label: string; source: string; accent: Accent }[] = [
  { value: 92, suffix: '%', label: 'Context accuracy', source: 'RAG Document Q&A', accent: 'electric' },
  { value: 40, suffix: '%', label: 'Fewer hallucinations', source: 'RAG Document Q&A', accent: 'mint' },
  { value: 500, suffix: '+', label: 'Queries evaluated', source: 'RAG Document Q&A', accent: 'violet' },
  { value: 1.2, prefix: '~', suffix: '%', decimals: 1, label: 'Params trained with LoRA', source: 'Shuttle fine-tuning', accent: 'orange' },
  { value: 3, label: 'Agent families shipped', source: 'FinOps · DevOps · Generic', accent: 'violet' },
  { value: 3, label: 'Featured projects', source: 'RAG · Voice · Fine-tuning', accent: 'electric' },
]

/* ------------------------------------------------------------- Education */

/** The resume does not list education — add entries here and the section will render. */
export const education: { school: string; degree: string; specialization?: string; year?: string; notes?: string[] }[] = []
