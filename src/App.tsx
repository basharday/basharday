import { useState } from 'react';
import {
  ArrowDown, ArrowRight, ArrowUpRight, BookOpen, BriefcaseBusiness, Check, ChevronRight,
  Code2, Copy, Database, Download, ExternalLink, GraduationCap, Layers3, Lightbulb,
  Mail, MapPin, ServerCog, Sparkles, SquareTerminal, Wrench,
  type LucideIcon,
} from 'lucide-react';
import { Header } from './components/Header';
import { HeroVisual } from './components/HeroVisual';
import { ProjectArtwork } from './components/ProjectArtwork';
import { Reveal } from './components/Reveal';
import { SectionHeading } from './components/SectionHeading';
import { SocialLink } from './components/SocialLink';
import { portfolio } from './data/portfolio';
import type { Project } from './data/portfolio';
import { useGithubProjects } from './hooks/useGithubProjects';
import { assetUrl, safeEmail, safeExternalUrl } from './lib/links';

const identity = portfolio.identity;
const aboutPoints: { icon: LucideIcon; title: string; description: string; tone: string }[] = [
  { icon: Code2, title: 'Software engineering', description: 'Building solutions with an emphasis on clarity, quality, and maintainability.', tone: 'blue' },
  { icon: Lightbulb, title: 'Problem solving', description: 'Breaking complex challenges into simple, meaningful steps.', tone: 'mint' },
  { icon: BookOpen, title: 'Always learning', description: 'Staying curious, experimenting, and continually improving my craft.', tone: 'lavender' },
];

const skillsIcons: Record<string, LucideIcon> = {
  languages: Code2, frontend: Layers3, backend: ServerCog, databases: Database, devops: Wrench,
};

function ContactButton({ className = '' }: { className?: string }) {
  const email = safeEmail(identity.email);
  return email ? (
    <a className={`btn btn-primary ${className}`} href={`mailto:${email}`}>Contact me <ArrowUpRight size={17} /></a>
  ) : (
    <span className="inline-flex flex-col items-start gap-1.5">
      <span className={`btn cursor-not-allowed bg-blue-300 text-white ${className}`} aria-disabled="true">Contact me <ArrowUpRight size={17}/></span>
      <span className="text-[11px] text-slate-500">Add your email to enable contact.</span>
    </span>
  );
}

function Hero() {
  const resume = identity.resumePath?.trim();
  const url = resume ? assetUrl(resume) : null;
  return (
    <section id="home" className="relative overflow-hidden border-b border-slate-100 bg-white">
      <div className="hero-background pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="container-shell relative grid min-h-[680px] items-center gap-12 pb-24 pt-16 lg:min-h-[730px] lg:grid-cols-[1.06fr_.94fr] lg:gap-8 lg:pb-24 lg:pt-20">
        <Reveal className="relative z-10 max-w-[680px]">
          <div className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-blue-100 bg-blue-50/70 py-2 pl-2.5 pr-4 text-xs font-semibold tracking-[.005em] text-slate-600">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 text-white"><Sparkles size={11} /></span>
            Hello, I'm {identity.name} <span aria-hidden="true">👋</span>
          </div>
          <h1 className="max-w-[670px] text-[clamp(43px,5.25vw,75px)] font-extrabold leading-[1.13] tracking-[-.07em] text-slate-800">
            Software Engineer.<span className="mt-2 block">Building <span className="text-blue-500">thoughtful</span> digital experiences.</span>
          </h1>
          <p className="mt-7 max-w-[540px] text-[15px] leading-[1.95] text-slate-500 sm:text-[16px]">{portfolio.copy.heroSubtitle}</p>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a href="#projects" className="btn btn-primary">View my projects <ArrowUpRight size={17}/></a>
            <a href="#contact" className="btn btn-outline">Get in touch <ArrowRight size={17}/></a>
          </div>
          <div className="mt-10 flex flex-wrap items-center gap-4 border-t border-slate-100 pt-6 sm:gap-5">
            <div className="flex items-center gap-2 text-[12px] font-medium text-slate-500"><MapPin size={15} className="text-blue-400" /> {identity.location}</div>
            <span className="hidden h-5 w-px bg-slate-200 sm:block" />
            <div className="flex gap-2"><SocialLink platform="github" url={identity.githubUrl}/><SocialLink platform="linkedin" url={identity.linkedinUrl}/></div>
            {url && <a href={url} download className="ml-1 inline-flex items-center gap-2 text-[12px] font-semibold text-blue-600 hover:text-blue-700"><Download size={15}/> Download CV</a>}
          </div>
        </Reveal>
        <Reveal className="relative mx-auto w-full max-w-[580px] px-4 pb-5 pt-1 sm:px-9 lg:px-1" delay={0.1}><HeroVisual /></Reveal>
        <a href="#about" className="absolute bottom-7 left-5 hidden items-center gap-2 text-[11px] font-bold uppercase tracking-[.16em] text-slate-400 transition-colors hover:text-blue-500 lg:flex" aria-label="Scroll to about section">Scroll to explore <ArrowDown size={14}/></a>
      </div>
    </section>
  );
}

function About() {
  return <section id="about" className="section-space bg-white">
    <div className="container-shell">
      <Reveal><SectionHeading number="01" eyebrow="About me" title="A little about who I am." /></Reveal>
      <div className="grid gap-10 lg:grid-cols-[.89fr_1.11fr] lg:gap-20">
        <Reveal>
          <p className="text-[clamp(20px,2.2vw,26px)] font-semibold leading-[1.75] tracking-[-.035em] text-slate-700">I believe the best software finds the right balance between <span className="text-blue-500">technical depth</span> and human simplicity.</p>
          <p className="mt-5 text-[15px] leading-[2] text-slate-500">{portfolio.copy.about}</p>
          <a href="#education" className="mt-6 inline-flex items-center gap-1.5 text-sm font-bold text-blue-600 transition-all hover:gap-2.5">More about my background <ArrowRight size={16} /></a>
        </Reveal>
        <div className="grid gap-3.5 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
          {aboutPoints.map(({ icon: Icon, title, description, tone }, i) => (
            <Reveal key={title} delay={i * .07}>
              <div className="about-card h-full rounded-[20px] border border-slate-100 bg-[#fbfcfe] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-blue-100 hover:shadow-[0_12px_34px_rgba(51,87,132,.07)] sm:p-5">
                <div className={`icon-tile icon-tile-${tone} mb-6`}><Icon size={21} strokeWidth={1.8}/></div>
                <h3 className="text-[14px] font-bold tracking-[-.025em] text-slate-800">{title}</h3>
                <p className="mt-2.5 text-[12px] leading-[1.85] text-slate-500">{description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  </section>;
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [imageFailed, setImageFailed] = useState(false);
  const github = safeExternalUrl(project.githubUrl);
  const demo = safeExternalUrl(project.demoUrl);
  const image = project.image ? (safeExternalUrl(project.image) || assetUrl(project.image)) : null;
  return (
    <article className="group flex h-full flex-col rounded-[24px] border border-slate-200/80 bg-white p-3.5 shadow-[0_7px_32px_rgba(42,75,115,.035)] transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-[0_18px_48px_rgba(42,75,115,.09)]">
      <div className="overflow-hidden rounded-[17px]">
        {image && !imageFailed ? <img src={image} alt={`Preview of ${project.title}`} loading="lazy" onError={() => setImageFailed(true)} className="h-[218px] w-full bg-slate-50 object-cover sm:h-[230px]"/> : <ProjectArtwork variant={index} />}
      </div>
      <div className="flex flex-1 flex-col px-3 pb-3 pt-6 sm:px-4">
        <div className="mb-3 flex items-center justify-between gap-2 text-[10px] font-extrabold tracking-[.16em] text-blue-500"><span>{project.category}</span>{project.placeholder && <span className="rounded-full bg-slate-100 px-2 py-1 text-[9px] font-semibold tracking-normal text-slate-500">EDIT ME</span>}</div>
        <h3 className="text-[20px] font-extrabold tracking-[-.05em] text-slate-800">{project.title}</h3>
        <p className="mt-2.5 min-h-[70px] text-[13px] leading-[1.9] text-slate-500">{project.description}</p>
        <div className="mt-4 flex min-h-[34px] flex-wrap items-start gap-1.5">
          {project.technologies.length ? project.technologies.map(t => <span key={t} className="tag">{t}</span>) : <span className="tag-placeholder">Add technologies</span>}
        </div>
        <div className="mt-auto flex items-center gap-5 border-t border-slate-100 pt-5">
          {github ? <a href={github} target="_blank" rel="noopener noreferrer" className="project-link">View code <ArrowUpRight size={14}/></a>
            : <span className="project-link !cursor-not-allowed !text-slate-300" title="Configure this project's GitHub URL">View code <ArrowUpRight size={14}/></span>}
          {demo ? <a href={demo} target="_blank" rel="noopener noreferrer" className="project-link">Live demo <ExternalLink size={13}/></a>
            : <span className="project-link !cursor-not-allowed !text-slate-300" title="No live demo configured">Live demo <ExternalLink size={13}/></span>}
        </div>
      </div>
    </article>
  );
}

function Projects() {
  const { status, projects: liveProjects } = useGithubProjects();
  const projects: Project[] = status === 'loaded' ? liveProjects : [...portfolio.projects];
  const github = safeExternalUrl(identity.githubUrl);
  return <section id="projects" className="section-space bg-[#f6f9fc]">
    <div className="container-shell">
      <Reveal><SectionHeading number="02" eyebrow="Selected work" title="Things I've built." description="A selection of projects and ideas, thoughtfully designed and carefully developed." right={github ? <a href={github} className="inline-flex items-center gap-2 whitespace-nowrap text-sm font-bold text-blue-600 hover:text-blue-700" target="_blank" rel="noopener noreferrer">All repositories <ArrowUpRight size={16}/></a> : undefined}/></Reveal>
      {status === 'loading' && <p className="mb-5 text-xs text-slate-500" role="status">Loading public repositories from GitHub…</p>}
      {(status === 'error' || status === 'empty') && <p className="mb-5 rounded-xl border border-amber-100 bg-amber-50 px-4 py-3 text-xs text-amber-800" role="status">{status === 'error' ? 'GitHub projects are temporarily unavailable. Showing your configured projects instead.' : 'No matching public repositories were found. Showing your configured projects instead.'}</p>}
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {projects.map((project, index) => <Reveal className="h-full" key={project.id} delay={index * .07}><ProjectCard project={project} index={index}/></Reveal>)}
      </div>
      <Reveal><div className="mt-9 flex items-center justify-center gap-2 text-center text-[12px] text-slate-400"><Sparkles size={13} className="text-blue-400"/> Quality over quantity. Every project has a story.</div></Reveal>
    </div>
  </section>;
}

function Skills() {
  return <section id="skills" className="section-space bg-white"><div className="container-shell">
    <Reveal><SectionHeading number="03" eyebrow="Technical toolkit" title="Tools of the trade." description="A considered toolkit for turning ideas into reliable, well-crafted software."/></Reveal>
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {portfolio.skills.map((group, index) => {
        const Icon = skillsIcons[group.id] || SquareTerminal;
        return <Reveal key={group.id} delay={(index % 3) * .05}><div className="skills-card flex min-h-[194px] flex-col rounded-[22px] border border-slate-100 bg-[#fbfcff] p-6 transition-colors hover:border-blue-100">
          <div className="mb-5 flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-xl border border-blue-100 bg-blue-50 text-blue-500"><Icon size={19} strokeWidth={1.8}/></span><h3 className="text-[14px] font-extrabold tracking-tight text-slate-700">{group.title}</h3></div>
          <div className="flex flex-wrap gap-2">{group.items.length ? group.items.map(skill => <span className="skill-tag" key={skill}>{skill}</span>) : <span className="skill-empty"><span className="mr-1.5 text-blue-400">+</span> Add your skills here</span>}</div>
          <div className="mt-auto pt-5 text-[10px] font-semibold uppercase tracking-[.12em] text-slate-300">{String(index + 1).padStart(2, '0')} / STACK</div>
        </div></Reveal>;
      })}
      <Reveal delay={.11}><div className="flex min-h-[194px] flex-col justify-between rounded-[22px] border border-blue-100 bg-blue-50/50 p-6"><span className="grid h-10 w-10 place-items-center rounded-xl bg-white text-blue-500"><Sparkles size={19}/></span><p className="text-[17px] font-bold leading-7 tracking-tight text-slate-700">Always curious.<br/><span className="text-blue-500">Always improving.</span></p><p className="text-xs text-slate-500">The best tool is the one that fits the problem.</p></div></Reveal>
    </div>
  </div></section>;
}

function Experience() {
  return <section id="experience" className="section-space bg-[#f6f9fc]"><div className="container-shell">
    <Reveal><SectionHeading number="04" eyebrow="Career journey" title="Experience & impact." description="A place for the roles, teams, and responsibilities that have shaped my engineering journey."/></Reveal>
    <div className="mx-auto max-w-[850px]">
      {portfolio.experience.map((job, i) => <Reveal key={job.id}><div className="relative border-l border-blue-200 pb-9 pl-8 last:pb-0 sm:pl-11">
        <span className="absolute -left-[6px] top-5 h-[11px] w-[11px] rounded-full border-[3px] border-white bg-blue-500 shadow-[0_0_0_2px_#bfdbfe]" />
        <div className="rounded-[22px] border border-slate-200/80 bg-white p-6 shadow-[0_8px_28px_rgba(48,75,106,.035)] sm:p-8">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3"><span className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[.15em] text-blue-500"><BriefcaseBusiness size={14}/> ROLE {String(i + 1).padStart(2, '0')}</span><span className="rounded-full bg-blue-50 px-3 py-1 text-[11px] font-semibold text-blue-600">{job.period}</span></div>
          <h3 className="text-xl font-extrabold tracking-[-.045em] text-slate-800">{job.role}</h3>
          <p className="mt-1.5 text-sm font-semibold text-slate-500">{job.company} <span className="mx-1 text-slate-300">·</span> {job.location}</p>
          <ul className="mt-5 space-y-2.5">{job.responsibilities.map(item => <li key={item} className="flex items-start gap-3 text-[13px] leading-[1.8] text-slate-500"><ChevronRight size={15} className="mt-1 shrink-0 text-blue-400"/>{item}</li>)}</ul>
          <div className="mt-5 flex flex-wrap items-center gap-2">{job.technologies.map(tech => <span className="tag" key={tech}>{tech}</span>)}{job.placeholder && <span className="text-[11px] font-semibold italic text-slate-400">Editable example — replace with your real experience</span>}</div>
        </div>
      </div></Reveal>)}
    </div>
  </div></section>;
}

function Education() {
  return <section id="education" className="section-space bg-white"><div className="container-shell">
    <Reveal><SectionHeading number="05" eyebrow="My foundation" title="Education." /></Reveal>
    <Reveal><div className="relative flex flex-col gap-6 overflow-hidden rounded-[26px] border border-blue-100 bg-gradient-to-br from-[#f8fbff] via-white to-[#f3f9ff] p-7 sm:flex-row sm:items-center sm:gap-8 sm:p-10">
      <div className="absolute -right-16 -top-32 h-72 w-72 rounded-full border-[40px] border-blue-50/70" aria-hidden="true" />
      <div className="relative grid h-[76px] w-[76px] shrink-0 place-items-center rounded-[22px] bg-white text-blue-500 shadow-[0_8px_25px_rgba(64,108,176,.09)]"><GraduationCap size={34} strokeWidth={1.6}/></div>
      <div className="relative flex-1"><div className="mb-2 text-[11px] font-bold uppercase tracking-[.17em] text-blue-500">University of Vienna · Austria</div><h3 className="text-[23px] font-extrabold tracking-[-.04em] text-slate-800">IT Graduate</h3><p className="mt-3 max-w-[690px] text-[13px] leading-[1.9] text-slate-500">{portfolio.copy.education}</p></div>
      <div className="relative hidden shrink-0 items-center gap-2 rounded-full border border-blue-100 bg-white px-4 py-2.5 text-[12px] font-semibold text-slate-500 lg:flex"><MapPin size={14} className="text-blue-500"/> Vienna, Austria</div>
    </div></Reveal>
  </div></section>;
}

function Contact() {
  const [copied, setCopied] = useState(false);
  const email = safeEmail(identity.email);

  async function copyEmail() {
    if (!email) return;
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard access can be blocked. Keep the selectable email and mailto fallback.
      setCopied(false);
    }
  }

  return <section id="contact" className="relative overflow-hidden border-t border-blue-100 bg-[#eef6ff] py-24 sm:py-28 lg:py-32">
    <div className="contact-glow pointer-events-none absolute inset-0" aria-hidden="true" />
    <div className="container-shell relative text-center">
      <Reveal>
        <span className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white/75 px-4 py-2 text-[11px] font-bold uppercase tracking-[.15em] text-blue-600"><span className="h-1.5 w-1.5 rounded-full bg-blue-500"/> Let's connect</span>
        <h2 className="mx-auto mt-7 max-w-[780px] text-[clamp(35px,5vw,58px)] font-extrabold leading-[1.2] tracking-[-.065em] text-slate-800">Let's build something <span className="text-blue-500">great</span> together.</h2>
        <p className="mx-auto mt-5 max-w-[550px] text-[15px] leading-[1.95] text-slate-500">I'm always interested in meaningful conversations, exciting technology, and opportunities to collaborate.</p>
        <div className="mt-8 flex items-center justify-center"><ContactButton className="!px-7" /></div>
        <div className="mx-auto mt-10 flex w-fit flex-col items-center gap-5 border-t border-blue-200/70 pt-7 sm:flex-row sm:gap-7">
          <SocialLink platform="github" url={identity.githubUrl} variant="text"/>
          <span className="hidden h-4 w-px bg-blue-200 sm:block"/>
          <SocialLink platform="linkedin" url={identity.linkedinUrl} variant="text"/>
          <span className="hidden h-4 w-px bg-blue-200 sm:block"/>
          {email ? <div className="flex max-w-[90vw] items-center gap-2"><a href={`mailto:${email}`} className="break-all text-sm font-semibold text-slate-600 transition-colors hover:text-blue-600">{email}</a><button type="button" onClick={() => void copyEmail()} className="rounded-lg p-2 text-slate-500 transition-colors hover:bg-white hover:text-blue-600" title={copied ? 'Email copied' : 'Copy email address'} aria-label={copied ? 'Email copied' : 'Copy email address'}>{copied ? <Check size={16}/> : <Copy size={16}/>}</button><span className="sr-only" role="status">{copied ? 'Email address copied' : ''}</span></div>
            : <span className="flex items-center gap-2 text-xs italic text-slate-500"><Mail size={15}/> Add your email in portfolio.ts</span>}
        </div>
      </Reveal>
    </div>
  </section>;
}

function Footer() {
  return <footer className="border-t border-slate-100 bg-white py-8"><div className="container-shell flex flex-col items-center justify-between gap-5 text-center sm:flex-row sm:text-left">
    <div><a href="#home" className="text-[16px] font-extrabold tracking-[-.05em] text-slate-800">{identity.name}<span className="text-blue-500">.</span></a><p className="mt-1.5 text-[11px] text-slate-400">© {new Date().getFullYear()} · Built with care in {identity.location}.</p></div>
    <div className="flex items-center gap-6"><a href="#home" className="text-[12px] font-semibold text-slate-500 hover:text-blue-500">Back to top ↑</a><SocialLink platform="github" url={identity.githubUrl} variant="text"/><SocialLink platform="linkedin" url={identity.linkedinUrl} variant="text"/></div>
  </div></footer>;
}

export default function App() {
  return <>
    <a href="#main" className="skip-link">Skip to content</a>
    <Header />
    <main id="main" tabIndex={-1}>
      <Hero />
      <About />
      <Projects />
      <Skills />
      <Experience />
      <Education />
      <Contact />
    </main>
    <Footer />
  </>;
}
