/**
 * ALL PERSONAL CONTENT LIVES HERE.
 * Replace placeholders with your real details before publishing.
 * Leave links as null when they do not exist: the UI will not create broken links.
 */
export type Project = {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  githubUrl: string | null;
  demoUrl: string | null;
  /** Optional: place an image under /public/images and use a relative file path. */
  image: string | null;
  category: string;
  placeholder?: boolean;
};

export type Experience = {
  id: string;
  role: string;
  company: string;
  period: string;
  location: string;
  responsibilities: string[];
  technologies: string[];
  placeholder?: boolean;
};

export const portfolio = {
  identity: {
    name: 'YOUR NAME',
    /** Shown in favicon artwork; update public/favicon.svg separately if desired. */
    initials: 'YN',
    title: 'Software Engineer',
    location: 'Vienna, Austria',
    university: 'University of Vienna',
    email: null as string | null,
    githubUrl: null as string | null,
    linkedinUrl: null as string | null,
    /** Example: 'resume.pdf'. Place the file inside /public/. */
    resumePath: null as string | null,
  },
  copy: {
    heroSubtitle:
      "I'm a Software Engineer and IT graduate from the University of Vienna, based in Austria. I enjoy solving challenging problems and turning ideas into clean, reliable, and meaningful software.",
    about:
      'My background in IT at the University of Vienna shaped the way I approach engineering: with curiosity, structure, and attention to the details that matter. I care about software that is thoughtfully designed, dependable, and genuinely useful to the people who use it.',
    education:
      'An academic foundation in information technology, combining analytical thinking, computing concepts, and a considered approach to building software.',
  },
  skills: [
    { id: 'languages', title: 'Programming Languages', items: [] as string[] },
    { id: 'frontend', title: 'Frontend Development', items: [] as string[] },
    { id: 'backend', title: 'Backend Development', items: [] as string[] },
    { id: 'databases', title: 'Databases', items: [] as string[] },
    { id: 'devops', title: 'Tools & DevOps', items: [] as string[] },
  ],
  projects: [
    {
      id: 'project-one',
      title: 'Your featured project',
      description: 'Add a concise overview of the problem, your approach, and what the project delivers.',
      technologies: [],
      githubUrl: null,
      demoUrl: null,
      image: null,
      category: 'FEATURED PROJECT / 01',
      placeholder: true,
    },
    {
      id: 'project-two',
      title: 'Another great project',
      description: 'Introduce the goal of this project and the engineering decisions behind it.',
      technologies: [],
      githubUrl: null,
      demoUrl: null,
      image: null,
      category: 'FEATURED PROJECT / 02',
      placeholder: true,
    },
    {
      id: 'project-three',
      title: 'Something you built',
      description: 'Highlight a challenge you solved and the value of the finished experience.',
      technologies: [],
      githubUrl: null,
      demoUrl: null,
      image: null,
      category: 'FEATURED PROJECT / 03',
      placeholder: true,
    },
  ] satisfies Project[],
  experience: [
    {
      id: 'experience-one',
      role: 'Your job title',
      company: 'Company / Organization',
      period: 'Start date — End date',
      location: 'Location / Remote',
      responsibilities: [
        'Replace this text with a responsibility, contribution, or outcome from your experience.',
        'Add another specific example of the work you did and the impact it had.',
      ],
      technologies: [],
      placeholder: true,
    },
  ] satisfies Experience[],
  githubIntegration: {
    /** Set enabled=true and your username to load real public repos at runtime. */
    enabled: false,
    username: '',
    /** If nonempty, fetch only these exact repository names, in this order. */
    repositories: [] as string[],
    maxProjects: 3,
  },
};
