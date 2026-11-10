// All the text on the site lives here. Edit this file to change what the page says.

export const profile = {
  name: "Ranjan Kumar Patel",
  intro:
    "I am VP, Technology at Think Talent. I lead the development, DevOps and QA teams, and I still build full stack solutions myself.",
  about: [
    "I have been building technology for leadership and talent assessment for more than 15 years. Today I run technology at Think Talent as VP. The development team lead, the DevOps manager and the QA team lead report to me.",
    "I decide the architecture, set the direction for the teams and own what goes to production. I also stay hands-on. I build full stack solutions: the frontend, the backend, the data and the infrastructure they run on. In the last few years AI has become a big part of that work, and today it is at the centre of the products we build. I am actively involved in it every day, from running models on my own machine to fine-tuning them for a specific job.",
    "I am not looking for a job. I made this page so that anyone who looks me up can see what I know and what I am working on.",
  ],
  facts: [
    { label: "Current role", value: "VP, Technology at Think Talent" },
    { label: "Teams that report to me", value: "Development, DevOps, QA" },
    { label: "Experience", value: "15+ years" },
    {
      label: "Industries I have worked with",
      value: "Banking and insurance, energy, manufacturing, consumer brands",
    },
  ],
  links: {
    linkedin: "https://www.linkedin.com/in/ranjankumarpatel",
    github: "https://github.com/ranjankumarpatel",
    company: "http://thinktalent.co",
  },
};

export const leading = [
  {
    title: "Development",
    text: "The development team lead reports to me. I set the architecture and review the design decisions that matter.",
  },
  {
    title: "DevOps and cloud",
    text: "The DevOps manager reports to me. I have dealt with all kinds of AWS scenarios over the years, so I can guide the team from my own experience.",
  },
  {
    title: "Quality",
    text: "The QA team lead reports to me. I push for automation so that a release does not depend on manual testing.",
  },
  {
    title: "Security",
    text: "Platform security is my responsibility as well. Nothing goes live without a review.",
  },
];

export type SkillGroup = {
  id: string;
  name: string;
  note: string;
  items: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    id: "ai",
    name: "AI solutions",
    note: "A big part of my work now. I take it from the first prompt to the evaluation that tells me if it really works.",
    items: [
      "LLM orchestration",
      "Agents and tool use",
      "RAG",
      "Prompt engineering",
      "LLM evaluation",
      "MCP servers",
      "Claude and OpenAI APIs",
      "AI coding workflows",
      "AI assessment pipelines",
    ],
  },
  {
    id: "aitools",
    name: "AI models and tools",
    note: "I work with AI every day, hands-on. I run models locally with Ollama and LM Studio, fine-tune them with Unsloth, and use Claude, Codex, Grok and Google AI Studio. I pick whichever fits the job.",
    items: [
      "Claude",
      "Codex",
      "Grok",
      "Google AI Studio",
      "Ollama",
      "LM Studio",
      "Unsloth",
    ],
  },
  {
    id: "ml",
    name: "Machine learning",
    note: "I build and use custom models for different solutions. A ready-made API is not always the right answer.",
    items: [
      "Custom-built models",
      "PyTorch",
      "Hugging Face Transformers",
      "scikit-learn",
      "NumPy and pandas",
    ],
  },
  {
    id: "backend",
    name: "Backend",
    note: "Java and Spring Boot have been my base for many years. For AI work I mostly use Python and FastAPI. When the same code is needed in many places, I build it as a library.",
    items: [
      "Java",
      "Spring Boot",
      "Custom Java libraries",
      "Python",
      "FastAPI",
      "Custom Python libraries",
      "REST APIs",
      "Data pipelines",
    ],
  },
  {
    id: "frontend",
    name: "Frontend",
    note: "I build the screens as well. This site is made with Next.js.",
    items: ["React", "Next.js", "Vite", "TypeScript", "Custom npm libraries"],
  },
  {
    id: "aws",
    name: "Cloud",
    note: "AWS is my main cloud and I have dealt with all kinds of AWS scenarios over the years. I also use Azure and Google Cloud for different use cases.",
    items: [
      "AWS",
      "Azure",
      "Google Cloud",
      "EC2",
      "S3",
      "RDS",
      "Lambda",
      "CloudFront",
      "Bedrock",
      "IAM",
      "VPC",
      "CloudWatch",
    ],
  },
  {
    id: "devops",
    name: "DevOps",
    note: "My DevOps manager runs this day to day. I like releases to be boring. Automate it once and stop worrying about it.",
    items: [
      "Docker",
      "Jenkins CI/CD",
      "Git",
      "Infrastructure as code",
      "Monitoring",
    ],
  },
  {
    id: "security",
    name: "Cybersecurity",
    note: "Our clients are large enterprises, so security checks are part of every release. I do the code reviews and testing myself as well.",
    items: [
      "Application security",
      "Secure code review",
      "OWASP Top 10",
      "VAPT",
      "Platform security",
    ],
  },
  {
    id: "testing",
    name: "Test automation",
    note: "My QA lead runs the team. If a test can be automated, we would rather not do it by hand.",
    items: ["Playwright", "QA automation"],
  },
];

export const building = [
  {
    title: "AI in assessment",
    text: "Rebuilding our core assessment products around what AI models can do today. Adding a chatbot on top of the old flow was never going to be enough.",
  },
  {
    title: "AI for enterprise talent teams",
    text: "Taking 15 years of assessment methods and turning them into solutions a large company can start using quickly.",
  },
  {
    title: "A team that runs without me",
    text: "Setting up onboarding, delivery and QA so the team can take a project from start to finish on its own.",
  },
];

export const writing =
  "I write on LinkedIn about AI and talent. Mostly these are notes from things I have actually built and deployed.";
