// All the text on the site lives here. Edit this file to change what the page says.

export const profile = {
  name: "Ranjan Kumar Patel",
  intro:
    "I head technology at Think Talent. I build AI solutions, and I also take care of the cloud, DevOps and security work that keeps them running.",
  about: [
    "I have been building technology for leadership and talent assessment for more than 15 years. For the last few years most of my work has been on AI. It started with small experiments, and today AI is at the centre of the products we build.",
    "I still like to stay hands-on. I design the system, write code where it is needed, set up the pipelines and review security before anything goes live. My team handles Spring Boot backends, AWS infrastructure, AI pipelines, test automation and platform security, and I work across all of it.",
    "I am not looking for a job. I made this page so that anyone who looks me up can see what I know and what I am working on.",
  ],
  facts: [
    { label: "Current role", value: "VP, Technology at Think Talent" },
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
    note: "This is where most of my time goes now. I build the full solution, from the first prompt to the evaluation that tells me if it really works.",
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
    id: "ml",
    name: "Machine learning",
    note: "I work with the models directly too. It helps to know what is happening under the API.",
    items: [
      "PyTorch",
      "Hugging Face Transformers",
      "scikit-learn",
      "NumPy and pandas",
    ],
  },
  {
    id: "backend",
    name: "Backend",
    note: "Java and Spring Boot have been my base for many years. For AI work I mostly use Python and FastAPI.",
    items: [
      "Java",
      "Spring Boot",
      "Python",
      "FastAPI",
      "REST APIs",
      "Data pipelines",
    ],
  },
  {
    id: "frontend",
    name: "Frontend",
    note: "I build the screens as well. This site is made with Next.js.",
    items: ["React", "Next.js", "Vite", "TypeScript"],
  },
  {
    id: "aws",
    name: "AWS",
    note: "Our platforms run on AWS. I have set up and managed most of it myself.",
    items: ["EC2", "S3", "RDS", "Lambda", "IAM", "VPC", "CloudWatch"],
  },
  {
    id: "devops",
    name: "DevOps",
    note: "I like releases to be boring. Automate it once and stop worrying about it.",
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
    note: "If a test can be automated, I would rather not do it by hand.",
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
