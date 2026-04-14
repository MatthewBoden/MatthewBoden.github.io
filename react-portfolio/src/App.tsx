import { useEffect } from "react"
import {
  ArrowRight,
  Bot,
  BriefcaseBusiness,
  Code2,
  Database,
  Github,
  Globe,
  Linkedin,
  Mail,
  Rocket,
  ScanEye,
  Sparkles,
  WandSparkles,
} from "lucide-react"

type Project = {
  title: string
  description: string
  stack: string[]
  liveUrl: string
  codeUrl: string
  gradient: string
  status: string
}

const projects: Project[] = [
  {
    title: "CarGenie AI Recommendation Engine",
    description:
      "Built a GPT-powered vehicle recommendation platform that translates buyer intent into ranked, explainable car matches.",
    stack: ["React", "TypeScript", "Node.js", "OpenAI API", "Supabase"],
    liveUrl: "https://cargenie.co",
    codeUrl: "https://github.com/MatthewBoden",
    gradient: "from-cyan-400/40 via-blue-500/30 to-indigo-700/40",
    status: "Live Product",
  },
  {
    title: "Classroom Agent System",
    description:
      "Designed a multi-agent grading workflow that reduces manual review cycles and improves feedback consistency for educators.",
    stack: ["Python", "LLM Agents", "Automation", "Prompt Engineering"],
    liveUrl: "https://github.com/MatthewBoden/Classroom-Agent-System",
    codeUrl: "https://github.com/MatthewBoden/Classroom-Agent-System",
    gradient: "from-violet-400/40 via-fuchsia-500/30 to-indigo-700/40",
    status: "Case Study Ready",
  },
  {
    title: "Mount & Mail VR",
    description:
      "Shipped a multiplayer VR climbing and delivery game for Meta Quest with synchronized sessions and physics-based traversal.",
    stack: ["Unity", "C#", "Fusion Networking", "Meta Quest SDK"],
    liveUrl: "https://github.com/MatthewBoden/DATT-3400/tree/main/3400_final_project",
    codeUrl: "https://github.com/MatthewBoden/DATT-3400/tree/main/3400_final_project",
    gradient: "from-emerald-400/40 via-cyan-500/30 to-blue-700/40",
    status: "Published Build",
  },
  {
    title: "OPS AI Wellness Companion",
    description:
      "Prototyped an AI wellness product focused on contextual support, actionable insights, and a clear user-centered product narrative.",
    stack: ["React", "AI APIs", "Product Design", "Rapid Prototyping"],
    liveUrl: "https://devpost.com/software/ops-ai-wellness-companion",
    codeUrl: "https://github.com/MatthewBoden",
    gradient: "from-amber-400/40 via-rose-500/30 to-purple-700/40",
    status: "Hackathon Finalist",
  },
]

const impactPoints = [
  {
    title: "Built AI system for internal operations",
    detail:
      "Led front-end and workflow design for the FRANK internal AI platform, streamlining task orchestration and decision support.",
    metric: "30% project efficiency gain",
  },
  {
    title: "Developed GPT car recommendation platform",
    detail:
      "At CarGenie, translated real buyer intent into tailored recommendations and product-ready user flows as acting CTO.",
    metric: "From concept to market-ready MVP",
  },
  {
    title: "Created VR applications for research and gaming",
    detail:
      "Delivered immersive VR systems used by research participants and shipped a Quest game on a compressed timeline.",
    metric: "500+ research participants",
  },
]

const skillGroups = [
  {
    label: "AI / ML",
    skills: ["OpenAI APIs", "LLM Workflows", "Prompt Engineering", "Agent Systems", "Automation"],
  },
  {
    label: "Frontend",
    skills: ["React", "TypeScript", "Tailwind", "UI/UX Systems", "Responsive Design"],
  },
  {
    label: "Backend",
    skills: ["Node.js", "Express", "Supabase", "REST APIs", "Database Design"],
  },
  {
    label: "Tools",
    skills: ["GitHub", "Vite", "Unity", "AWS", "Azure", "Figma"],
  },
]

const particles = Array.from({ length: 16 }, (_, i) => ({
  id: i,
  left: `${((i * 13) % 100) + 1}%`,
  top: `${((i * 19) % 100) + 1}%`,
  delay: `${(i % 7) * 0.7}s`,
  duration: `${7 + (i % 5)}s`,
}))

function App() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal-visible")
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.2 }
    )

    const revealElements = document.querySelectorAll(".reveal")
    revealElements.forEach((element) => observer.observe(element))

    return () => observer.disconnect()
  }, [])

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-slate-950 text-slate-100">
      <div className="pointer-events-none fixed inset-0 -z-20 bg-[radial-gradient(circle_at_20%_15%,rgba(56,189,248,0.16),transparent_30%),radial-gradient(circle_at_80%_0%,rgba(139,92,246,0.2),transparent_35%),linear-gradient(180deg,#020617_0%,#0b1120_45%,#020617_100%)]" />
      <div className="pointer-events-none fixed inset-0 -z-10">
        {particles.map((particle) => (
          <span
            key={particle.id}
            className="particle-dot"
            style={{
              left: particle.left,
              top: particle.top,
              animationDelay: particle.delay,
              animationDuration: particle.duration,
            }}
          />
        ))}
      </div>

      <header className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/70 backdrop-blur-xl">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-4 md:px-8">
          <a href="#hero" className="text-sm font-semibold tracking-[0.2em] text-cyan-300">
            MATTHEW BODENSTEIN
          </a>
          <nav className="hidden items-center gap-6 text-sm text-slate-300 md:flex">
            <a href="#projects" className="hover:text-white transition-colors">Projects</a>
            <a href="#impact" className="hover:text-white transition-colors">Impact</a>
            <a href="#skills" className="hover:text-white transition-colors">Skills</a>
            <a href="#contact" className="hover:text-white transition-colors">Contact</a>
          </nav>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-6xl flex-col gap-24 px-5 pb-20 pt-10 md:gap-28 md:px-8">
        <section id="hero" className="reveal relative flex min-h-[80vh] flex-col justify-center">
          <div className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-cyan-300/30 bg-cyan-300/10 px-4 py-1 text-xs font-medium text-cyan-200">
            <Sparkles className="h-3.5 w-3.5" />
            Product-focused AI Developer
          </div>
          <h1 className="max-w-4xl text-4xl font-semibold leading-tight text-white sm:text-5xl md:text-6xl">
            I build AI-powered products that solve real-world problems.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-slate-300 md:text-xl">
            Full-stack AI engineer blending product strategy, UX, and systems thinking to launch tools that reduce
            manual work, drive adoption, and deliver measurable outcomes.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 rounded-full border border-cyan-300/30 bg-cyan-400/20 px-6 py-3 font-medium text-cyan-100 transition-all duration-300 hover:-translate-y-0.5 hover:bg-cyan-400/30"
            >
              View Projects
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3 font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/10"
            >
              Contact Me
            </a>
          </div>
        </section>

        <section className="reveal grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-7 backdrop-blur-sm">
            <h2 className="mb-4 text-2xl font-semibold text-white">Building at the intersection of AI and product</h2>
            <p className="text-slate-300">
              I am a Toronto-based developer focused on AI systems, web applications, VR experiences, and business
              automation. I care about turning technical complexity into product experiences users actually trust and
              adopt.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="value-card">
              <BriefcaseBusiness className="mb-3 h-5 w-5 text-cyan-300" />
              <h3 className="font-semibold text-white">CTO at CarGenie</h3>
              <p className="mt-1 text-sm text-slate-300">Shaped AI recommendation logic and end-to-end product flow.</p>
            </div>
            <div className="value-card">
              <Bot className="mb-3 h-5 w-5 text-violet-300" />
              <h3 className="font-semibold text-white">AI Developer at Maxim</h3>
              <p className="mt-1 text-sm text-slate-300">Built internal FRANK workflows for faster operations.</p>
            </div>
            <div className="value-card">
              <Rocket className="mb-3 h-5 w-5 text-emerald-300" />
              <h3 className="font-semibold text-white">Founder mindset</h3>
              <p className="mt-1 text-sm text-slate-300">Execute quickly from zero-to-one product validation.</p>
            </div>
            <div className="value-card">
              <ScanEye className="mb-3 h-5 w-5 text-amber-300" />
              <h3 className="font-semibold text-white">Human-centered UX</h3>
              <p className="mt-1 text-sm text-slate-300">Design systems that feel clear, modern, and intuitive.</p>
            </div>
          </div>
        </section>

        <section id="projects" className="reveal space-y-7">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.18em] text-cyan-200/90">Featured Projects</p>
              <h2 className="mt-2 text-3xl font-semibold text-white md:text-4xl">Products with real-world outcomes</h2>
            </div>
            <a
              href="https://github.com/MatthewBoden"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden rounded-full border border-white/15 px-4 py-2 text-sm text-slate-200 transition hover:bg-white/10 md:inline-flex"
            >
              All GitHub Projects
            </a>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            {projects.map((project) => (
              <article
                key={project.title}
                className="project-card group rounded-2xl border border-white/10 bg-slate-900/70 p-5 backdrop-blur-sm"
              >
                <div className={`mb-5 rounded-xl border border-white/10 bg-gradient-to-br ${project.gradient} p-5`}>
                  <div className="mb-8 flex items-center justify-between">
                    <WandSparkles className="h-5 w-5 text-white/90" />
                    <span className="rounded-full border border-white/30 bg-black/25 px-2.5 py-1 text-xs text-white/90">
                      {project.status}
                    </span>
                  </div>
                  <p className="text-sm text-white/90">Product Preview</p>
                </div>
                <h3 className="text-xl font-semibold text-white">{project.title}</h3>
                <p className="mt-2 text-slate-300">{project.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.stack.map((tag) => (
                    <span key={tag} className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-slate-200">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="mt-5 flex flex-wrap gap-3">
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-cyan-300/35 bg-cyan-400/15 px-4 py-2 text-sm text-cyan-100 transition hover:bg-cyan-400/25"
                  >
                    <Globe className="h-4 w-4" />
                    Live Demo
                  </a>
                  <a
                    href={project.codeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2 text-sm text-slate-100 transition hover:bg-white/10"
                  >
                    <Github className="h-4 w-4" />
                    View Code
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="impact" className="reveal grid gap-6 md:grid-cols-3">
          {impactPoints.map((point) => (
            <article key={point.title} className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
              <p className="mb-4 inline-flex rounded-full border border-emerald-300/30 bg-emerald-300/10 px-3 py-1 text-xs text-emerald-200">
                Impact
              </p>
              <h3 className="text-lg font-semibold text-white">{point.title}</h3>
              <p className="mt-3 text-sm text-slate-300">{point.detail}</p>
              <p className="mt-4 text-sm font-medium text-cyan-200">{point.metric}</p>
            </article>
          ))}
        </section>

        <section className="reveal rounded-2xl border border-violet-300/20 bg-violet-400/10 p-7 md:p-9">
          <p className="text-sm uppercase tracking-[0.15em] text-violet-200/90">Mini Case Study</p>
          <h2 className="mt-2 text-2xl font-semibold text-white md:text-3xl">CarGenie: from intent to recommendation</h2>
          <p className="mt-4 max-w-3xl text-slate-200">
            I built a recommendation workflow that captures user constraints, maps them to weighted selection logic,
            then returns explainable AI-assisted matches. The focus was not only model output quality, but product trust:
            clarity, speed, and actionable next steps for buyers.
          </p>
        </section>

        <section className="reveal rounded-2xl border border-cyan-300/20 bg-cyan-400/10 p-7 md:p-9">
          <p className="text-sm uppercase tracking-[0.15em] text-cyan-200/90">Currently Building</p>
          <h2 className="mt-2 text-2xl font-semibold text-white md:text-3xl">Agentic workflows for operations teams</h2>
          <p className="mt-3 max-w-3xl text-slate-200">
            Designing AI copilots that connect internal knowledge, execute multi-step tasks, and keep humans in control
            with transparent decision points.
          </p>
        </section>

        <section id="skills" className="reveal space-y-6">
          <h2 className="text-3xl font-semibold text-white md:text-4xl">Modern stack, product-first execution</h2>
          <div className="grid gap-5 md:grid-cols-2">
            {skillGroups.map((group, index) => (
              <div key={group.label} className="rounded-2xl border border-white/10 bg-slate-900/70 p-5">
                <div className="mb-4 flex items-center gap-2 text-white">
                  {index === 0 && <Bot className="h-4 w-4 text-cyan-300" />}
                  {index === 1 && <Code2 className="h-4 w-4 text-violet-300" />}
                  {index === 2 && <Database className="h-4 w-4 text-emerald-300" />}
                  {index === 3 && <Rocket className="h-4 w-4 text-amber-300" />}
                  <p className="font-semibold">{group.label}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <span key={skill} className="skill-pill">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="contact" className="reveal rounded-3xl border border-white/15 bg-white/[0.04] p-8 text-center md:p-12">
          <p className="text-sm uppercase tracking-[0.2em] text-cyan-200">Let&apos;s build something</p>
          <h2 className="mt-3 text-3xl font-semibold text-white md:text-4xl">Looking for an AI product engineer?</h2>
          <p className="mx-auto mt-4 max-w-2xl text-slate-300">
            I partner with teams that want to launch practical AI products, automate high-friction workflows, and ship
            experiences users love.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a href="mailto:m.bodenstein@outlook.com" className="contact-chip">
              <Mail className="h-4 w-4" />
              m.bodenstein@outlook.com
            </a>
            <a
              href="https://www.linkedin.com/in/matthew-bodenstein/"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-chip"
            >
              <Linkedin className="h-4 w-4" />
              LinkedIn
            </a>
            <a href="https://github.com/MatthewBoden" target="_blank" rel="noopener noreferrer" className="contact-chip">
              <Github className="h-4 w-4" />
              GitHub
            </a>
          </div>
        </section>
      </main>
    </div>
  )
}

export default App