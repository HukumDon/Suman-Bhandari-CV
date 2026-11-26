/**
 * ============================================================================
 *  YOUR CONTENT LIVES HERE
 * ============================================================================
 *  Everything on the website, and the downloadable PDF at /cv.pdf, is generated
 *  from this single file. Edit the values below and the whole site updates.
 *
 *  All text in this file is SAMPLE CONTENT. Replace every value with your own
 *  details, then set `sampleContent` to false.
 * ============================================================================
 */

export type SocialIcon = "github" | "linkedin" | "mail" | "x" | "globe";

export type Social = { label: string; href: string; icon: SocialIcon };

export type ExperienceItem = {
  role: string;
  company: string;
  url?: string;
  location: string;
  start: string;
  end: string;
  summary: string;
  achievements: string[];
  tech: string[];
};

export type EducationItem = {
  degree: string;
  institution: string;
  location: string;
  start: string;
  end: string;
  details?: string;
};

export type SkillItem = { name: string; /** 0 to 100 */ level: number };
export type SkillGroup = { title: string; items: SkillItem[] };

export type ProjectItem = {
  title: string;
  category: string;
  year: string;
  description: string;
  highlights?: string[];
  tags: string[];
  links: { live?: string; repo?: string };
  /** Shown larger when the "All" filter is selected. Use for one or two projects. */
  featured?: boolean;
  /** Optional screenshot. Without it, a generated abstract preview is shown. */
  image?: { src: string; alt: string };
};

export type Credential = { name: string; issuer: string; year: string; url?: string };
export type AwardItem = { title: string; org: string; year: string; description?: string };

export type Profile = {
  /** Set to false once you have replaced the sample content. */
  sampleContent: boolean;
  name: { first: string; last: string };
  fullName: string;
  headline: string;
  /** Rotating titles shown in the hero. */
  roles: string[];
  intro: string;
  location: string;
  email: string;
  phone?: string;
  availability: { open: boolean; label: string };
  photo: { src: string; alt: string };
  resumeFileName: string;
  keywords: string[];
  socials: Social[];
  about: {
    tagline: string;
    lead: string;
    body: string[];
    /** Use an even number of facts so the grid stays balanced. */
    facts: { label: string; value: string }[];
  };
  experience: ExperienceItem[];
  skills: { groups: SkillGroup[]; also: string[] };
  projects: ProjectItem[];
  education: EducationItem[];
  certifications: Credential[];
  awards: AwardItem[];
  contact: { intro: string; responseTime: string };
};

export const profile: Profile = {
  sampleContent: true,

  name: { first: "Suman", last: "Bhandari" },
  fullName: "SUMAN BHNADARI",
  headline: "Full-stack software engineer",
  roles: ["Full-stack engineer", "Interface craftsperson", "Open-source contributor"],
  intro:
    "I design and build fast, accessible web products, from the database schema to the last pixel. Six years of shipping SaaS platforms, developer tools and data-heavy interfaces.",

  location: "Remote, open to relocation",
  email: "Sumanbdh06@gmail.com",
  phone: "+977 9844269419",

  availability: { open: true, label: "Open to new opportunities" },
  photo: { src: "/profile.jpg", alt: "Portrait of Suman Bhandari" },
  resumeFileName: "Suman-Bhandari-CV.pdf",
  keywords: ["full-stack developer", "Next.js", "TypeScript", "React", "Node.js", "portfolio", "CV"],

  socials: [
    { label: "GitHub", href: "https://github.com/your-username", icon: "github" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/your-username", icon: "linkedin" },
    { label: "Email", href: "mailto:Sumanbdh06@gmail.com", icon: "mail" },
  ],

  about: {
    tagline: "An engineer with a designer's eye for detail.",
    lead: "I build web products that feel fast, look considered and hold up under real traffic.",
    body: [
      "My work sits where product, design and infrastructure meet. I like owning a feature end to end: shaping the idea with the people who will use it, modelling the data, building the API, and polishing the interface until it feels effortless.",
      "Outside of client and product work I maintain a few open-source tools, mentor early-career developers and write about performance and accessibility. I care about software that is quick, understandable and kind to the people who maintain it.",
    ],
    facts: [
      { label: "Based in", value: "Remote, flexible across time zones" },
      { label: "Focus", value: "Web platforms, design systems, developer tooling" },
      { label: "Languages", value: "English, plus one more you speak" },
      { label: "Currently", value: "Leading the dashboard platform team at Lumen Cloud" },
    ],
  },

  experience: [
    {
      role: "Senior Software Engineer",
      company: "Lumen Cloud",
      url: "https://example.com",
      location: "Remote",
      start: "Mar 2023",
      end: "Present",
      summary:
        "Lead engineer on the customer dashboard platform used by 40,000 teams. I own architecture, performance and the shared component library.",
      achievements: [
        "Cut p95 dashboard load time from 4.1s to 0.9s by moving heavy aggregation to streaming queries and caching at the edge.",
        "Designed a typed component library adopted by six product teams, removing about 30% of duplicated UI code.",
        "Introduced end-to-end testing with Playwright, lowering production regressions by 45% in two quarters.",
        "Mentored four engineers, two of whom were promoted within 18 months.",
      ],
      tech: ["TypeScript", "Next.js", "PostgreSQL", "AWS", "Playwright"],
    },
    {
      role: "Software Engineer",
      company: "Parcel & Co",
      url: "https://example.com",
      location: "Hybrid",
      start: "Jun 2020",
      end: "Feb 2023",
      summary:
        "Built the logistics tracking product from first prototype to 1.2 million monthly shipments.",
      achievements: [
        "Rebuilt the tracking map and live-status pipeline, improving data freshness from 5 minutes to under 10 seconds.",
        "Shipped a public REST and webhook API used by 300+ merchants, with documentation and SDKs.",
        "Led the migration from a monolith to services with zero customer-facing downtime.",
      ],
      tech: ["React", "Node.js", "GraphQL", "Redis", "Docker"],
    },
    {
      role: "Junior Web Developer",
      company: "Open Orbit Studio",
      location: "On-site",
      start: "Jul 2018",
      end: "May 2020",
      summary:
        "Delivered websites and web apps for agency clients across retail, education and non-profit sectors.",
      achievements: [
        "Delivered 20+ client sites with an average Lighthouse performance score above 95.",
        "Created a reusable starter kit that shortened new-project setup from two days to two hours.",
      ],
      tech: ["JavaScript", "Vue", "WordPress", "Sass"],
    },
  ],

  skills: {
    groups: [
      {
        title: "Frontend",
        items: [
          { name: "TypeScript", level: 95 },
          { name: "React and Next.js", level: 92 },
          { name: "Tailwind CSS", level: 90 },
          { name: "Accessibility (WCAG)", level: 85 },
        ],
      },
      {
        title: "Backend",
        items: [
          { name: "Node.js", level: 88 },
          { name: "PostgreSQL", level: 85 },
          { name: "REST and GraphQL APIs", level: 87 },
          { name: "Python", level: 70 },
        ],
      },
      {
        title: "Cloud and tooling",
        items: [
          { name: "Docker", level: 78 },
          { name: "AWS", level: 72 },
          { name: "CI/CD", level: 80 },
          { name: "Testing (Vitest, Playwright)", level: 82 },
        ],
      },
      {
        title: "Design and delivery",
        items: [
          { name: "Design systems", level: 86 },
          { name: "Figma to code", level: 84 },
          { name: "Performance tuning", level: 88 },
          { name: "Technical writing", level: 75 },
        ],
      },
    ],
    also: ["Prisma", "tRPC", "Redis", "Terraform", "Motion", "Git", "Agile delivery", "Mentoring"],
  },

  projects: [
    {
      title: "Orbit",
      category: "Web apps",
      year: "2025",
      description:
        "Real-time product analytics for small teams. Events stream in over WebSockets and land in dashboards that stay readable at ten million rows.",
      highlights: [
        "Sub-second queries on 10M+ events using pre-aggregated rollups.",
        "Shareable dashboards with live cursors and per-chart permissions.",
        "Self-hostable with a one-command Docker setup.",
      ],
      tags: ["Next.js", "TypeScript", "PostgreSQL", "WebSockets"],
      links: { live: "https://example.com", repo: "https://github.com/your-username/orbit" },
      featured: true,
    },
    {
      title: "Atlas CLI",
      category: "Developer tools",
      year: "2024",
      description:
        "A command-line tool that scaffolds production-ready services from templates, complete with CI, tests and infrastructure code.",
      tags: ["Node.js", "TypeScript", "Open source"],
      links: { repo: "https://github.com/your-username/atlas-cli" },
    },
    {
      title: "Lexi",
      category: "AI",
      year: "2025",
      description:
        "Semantic search for personal notes. Ask a question in plain language and get the passages that answer it, with sources.",
      tags: ["Python", "Embeddings", "FastAPI", "React"],
      links: { live: "https://example.com", repo: "https://github.com/your-username/lexi" },
    },
    {
      title: "Pulse",
      category: "Web apps",
      year: "2023",
      description:
        "An offline-first habit tracker that syncs across devices and turns streaks into calm, glanceable charts.",
      tags: ["PWA", "React", "IndexedDB"],
      links: { live: "https://example.com" },
    },
    {
      title: "Prism UI",
      category: "Developer tools",
      year: "2023",
      description:
        "An accessible, themeable React component library with 40 components, tested with screen readers and keyboard-only flows.",
      tags: ["React", "Storybook", "Accessibility"],
      links: { repo: "https://github.com/your-username/prism-ui" },
    },
  ],

  education: [
    {
      degree: "BSc Computer Science, First Class Honours",
      institution: "University of Example",
      location: "Your city, Your country",
      start: "2014",
      end: "2018",
      details:
        "Dissertation on real-time collaborative editing. Awarded the department prize for best final-year project.",
    },
    {
      degree: "Postgraduate Certificate, Human-Computer Interaction",
      institution: "Example Institute of Design",
      location: "Online",
      start: "2021",
      end: "2022",
      details: "Part-time study covering usability research, interaction design and accessibility.",
    },
  ],

  certifications: [
    { name: "AWS Certified Developer, Associate", issuer: "Amazon Web Services", year: "2024", url: "https://example.com" },
    { name: "Certified Kubernetes Application Developer", issuer: "CNCF", year: "2023", url: "https://example.com" },
    { name: "Professional Scrum Developer I", issuer: "Scrum.org", year: "2022" },
  ],

  awards: [
    {
      title: "Engineering Excellence Award",
      org: "Lumen Cloud",
      year: "2024",
      description: "Recognised for the dashboard performance programme.",
    },
    {
      title: "Best Developer Tool, Hack Night",
      org: "Open Orbit Community",
      year: "2021",
      description: "First place among 60 teams for a prototype of Atlas CLI.",
    },
    {
      title: "Dean's Scholarship",
      org: "University of Example",
      year: "2016",
      description: "Merit scholarship awarded for academic performance.",
    },
  ],

  contact: {
    intro:
      "Have a role, a project or a question? Send a message and I'll get back to you personally.",
    responseTime: "within two working days",
  },
};
