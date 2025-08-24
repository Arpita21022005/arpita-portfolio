
import React, { useMemo, useState, useRef, useEffect } from "react";
import { motion, useMotionValue, useTransform, AnimatePresence } from "framer-motion";
import { Mail, Phone, Github, Linkedin, Globe, MapPin, ArrowRight, Code2, X, CheckCircle2, AlertTriangle } from "lucide-react";

/** Minimal UI (Tailwind-only) **/
const Button = ({ as = 'button', href, children, variant = 'solid', size = 'md', className = '', ...props }) => {
  const base = 'inline-flex items-center justify-center rounded-xl font-medium transition border';
  const sizes = { sm: 'px-3 py-1.5 text-sm', md: 'px-4 py-2 text-sm', lg: 'px-5 py-2.5 text-base' };
  const variants = {
    solid: 'bg-emerald-600 text-white border-emerald-600 hover:brightness-95',
    outline: 'bg-white text-gray-900 border-gray-200 hover:bg-gray-50',
    ghost: 'bg-transparent border-transparent hover:bg-black/5'
  };
  const cls = [base, sizes[size], variants[variant], className].join(' ');
  const Comp = href ? 'a' : as;
  return <Comp href={href} className={cls} {...props}>{children}</Comp>;
};
const Card = ({ className = '', children, ...props }) => (
  <div className={"bg-white/80 backdrop-blur border border-black/10 rounded-2xl " + className} {...props}>{children}</div>
);
const CardHeader = ({ className = '', children }) => (<div className={"p-4 " + className}>{children}</div>);
const CardTitle = ({ className = '', children }) => (<h3 className={"text-base font-semibold " + className}>{children}</h3>);
const Badge = ({ children }) => (<span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium bg-white/70 backdrop-blur border-black/10">{children}</span>);

/** Tabs (simple) **/
const Tabs = ({ tabs, defaultKey }) => {
  const [current, setCurrent] = useState(defaultKey || (tabs[0] && tabs[0].key));
  const active = tabs.find(t => t.key === current);
  return (
    <div>
      <div className="grid grid-cols-3 rounded-2xl border p-1 bg-white/70 backdrop-blur w-full max-w-md">
        {tabs.map(t => (
          <button key={t.key} onClick={() => setCurrent(t.key)}
            className={"px-3 py-2 text-sm rounded-xl transition " + (current === t.key ? 'bg-gray-900 text-white' : 'hover:bg-black/5')}>
            {t.label}
          </button>
        ))}
      </div>
      <div className="mt-6">{active && active.content}</div>
    </div>
  );
};

/** Dialog (modal) **/
const Dialog = ({ open, onClose, title, children }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-white w-full max-w-2xl rounded-2xl shadow-xl p-6 m-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">{title}</h3>
          <button onClick={onClose} className="p-1 rounded hover:bg-black/5" aria-label="Close"><X className="w-5 h-5" /></button>
        </div>
        {children}
      </div>
    </div>
  );
};

/** Inputs **/
const Input = (props) => <input {...props} className={"w-full border rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 " + (props.className || '')} />;
const Textarea = (props) => <textarea {...props} className={"w-full border rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 " + (props.className || '')} />;

/** Data **/
const PERSONA = {
  icon: Code2,
  title: "Freelancer & Software Developer | AI Agents & Python Developer",
  name: "Arpita Ajay Lokhande",
  location: "Pune, Maharashtra, IN",
  blurb: "Freelance software developer building AI agents, Python backends, and full-stack apps with FastAPI/Flask, JS, and modern ML tools.",
  contacts: [
    { kind: "github", label: "github.com/Arpita21022005", href: "https://github.com/Arpita21022005" },
    { kind: "linkedin", label: "linkedin.com/in/ArpitaLokhande", href: "https://www.linkedin.com/in/ArpitaLokhande" },
    { kind: "mail", label: "lokhandearpita21@gmail.com", href: "mailto:lokhandearpita21@gmail.com" },
    ],
  skills: ["Python","JavaScript","Flask","FastAPI","MySQL","PostgreSQL","TensorFlow","LangChain","AI Agents","RAG","Vector DBs (FAISS, Pinecone)","OpenAI API","Selenium","Git/GitHub"],
  services: ["AI Agents","Web Apps","APIs","Automation","Chatbots","Freelance Projects"],
  projects: [
    { title: "AI Sales Agent", tags: ["AI Agents","LangChain","FastAPI"], cover: "https://images.unsplash.com/photo-1526378722484-bd91ca387e72?q=80&w=1600&auto=format&fit=crop", description: "Autonomous lead-qualifying agent with tools for email, CRM, and web search; deployable via REST API." },
    { title: "Resume Analyzer (GPT-4)", tags: ["Python","Flask","OpenAI"], cover: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=1600&auto=format&fit=crop", description: "Compares resumes to job descriptions using prompt engineering and a clean web UI." },
    { title: "Student AI Chatbot", tags: ["LangChain","Flask"], cover: "https://images.unsplash.com/photo-1526378722484-bd91ca387e72?q=80&w=1600&auto=format&fit=crop", description: "Generates summaries and quizzes with tone-aware responses for students." },
    { title: "Proctoring System", tags: ["Java","Python","C++"], cover: "https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=1600&auto=format&fit=crop", description: "Intelligent behavior tracking for secure online exams across platforms." },
  ],
  theme: { gradient: "from-emerald-200 via-teal-200 to-cyan-200", accent: "bg-emerald-600 text-white" },
};

/** Utilities **/
function ContactIcon({ kind }) {
  const map = { mail: Mail, phone: Phone, github: Github, linkedin: Linkedin, site: Globe };
  const Ico = map[kind] || Globe;
  return <Ico className="w-4 h-4" aria-hidden />;
}
function Pill({ children }) {
  return <span className="inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium bg-white/70 backdrop-blur border-black/10">{children}</span>;
}
function useTilt() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const handle = (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const dx = (x - rect.width / 2) / (rect.width / 2);
      const dy = (y - rect.height / 2) / (rect.height / 2);
      el.style.setProperty("--tilt-x", `${-dy * 8}deg`);
      el.style.setProperty("--tilt-y", `${dx * 8}deg`);
      el.style.setProperty("--tilt-scale", `1.03`);
    };
    const leave = () => {
      el.style.setProperty("--tilt-x", `0deg`);
      el.style.setProperty("--tilt-y", `0deg`);
      el.style.setProperty("--tilt-scale", `1`);
    };
    el.addEventListener("pointermove", handle);
    el.addEventListener("pointerleave", leave);
    el.addEventListener("pointercancel", leave);
    return () => {
      el.removeEventListener("pointermove", handle);
      el.removeEventListener("pointerleave", leave);
      el.removeEventListener("pointercancel", leave);
    };
  }, []);
  return ref;
}
function ProjectCard({ item }) {
  const [open, setOpen] = useState(false);
  const ref = useTilt();
  return (
    <div ref={ref} style={{ perspective: 1000 }} className="transform-style-3d">
      <Card className="overflow-hidden shadow-lg hover:shadow-2xl transition-transform rounded-2xl"
        style={{ transform: "rotateX(var(--tilt-x)) rotateY(var(--tilt-y)) scale(var(--tilt-scale))", transformStyle: "preserve-3d", willChange: "transform" }}>
        <button onClick={() => setOpen(true)} className="text-left w-full">
          <div className="aspect-[16/10] w-full overflow-hidden">
            <img src={item.cover} alt={item.title} className="w-full h-full object-cover hover:scale-105 transition-transform" loading="lazy" />
          </div>
          <CardHeader className="space-y-1">
            <CardTitle className="text-base">{item.title}</CardTitle>
            <div className="flex flex-wrap gap-2">
              {item.tags.map((t) => <Badge key={t}>{t}</Badge>)}
            </div>
          </CardHeader>
        </button>
      </Card>

      <Dialog open={open} onClose={() => setOpen(false)} title={item.title}>
        <div className="space-y-4">
          <img src={item.cover} alt="" className="rounded-xl" />
          <p className="text-sm text-gray-700">{item.description}</p>
          <div className="flex flex-wrap gap-2">{item.tags.map((t) => <Badge key={t}>{t}</Badge>)}</div>
        </div>
      </Dialog>
    </div>
  );
}

export default function DeveloperPortfolio() {
  const persona = useMemo(() => PERSONA, []);
  const Icon = persona.icon;
  const heroRef = useTilt();

  // background parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const bgX = useTransform(mouseX, (v) => `${v / 30}px`);
  const bgY = useTransform(mouseY, (v) => `${v / 60}px`);
  useEffect(() => {
    const handle = (e) => {
      mouseX.set(e.clientX - window.innerWidth / 2);
      mouseY.set(e.clientY - window.innerHeight / 2);
    };
    window.addEventListener("mousemove", handle);
    return () => window.removeEventListener("mousemove", handle);
  }, [mouseX, mouseY]);

  // banners state
  const [banner, setBanner] = useState({ type: null, message: "", show: false });

  const closeBanner = () => setBanner({ type: null, message: "", show: false });

  return (
    <div className="min-h-screen text-gray-900 bg-gradient-to-br from-white to-gray-50">
      {/* slide-in banners */}
      <AnimatePresence>
        {banner.show && (
          <motion.div
            initial={{ y: -60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -60, opacity: 0 }}
            className={"fixed top-3 inset-x-0 z-50 mx-auto w-[95%] md:w-[42rem] rounded-2xl shadow-lg border " + (banner.type === 'success' ? 'bg-emerald-50 border-emerald-300 text-emerald-800' : 'bg-red-50 border-red-300 text-red-800')}
          >
            <div className="flex items-center gap-3 px-4 py-3">
              {banner.type === 'success' ? <CheckCircle2 className="w-5 h-5" /> : <AlertTriangle className="w-5 h-5" />}
              <div className="flex-1 text-sm">{banner.message}</div>
              <button onClick={closeBanner} className="text-sm px-2 py-1 rounded hover:bg-black/5">Close</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* animated gradient blob */}
      <motion.div style={{ x: bgX, y: bgY }}
        className="pointer-events-none fixed -z-10 left-1/2 top-10 w-[60rem] h-[60rem] -translate-x-1/2 rounded-full opacity-30 bg-gradient-to-tr from-emerald-200 via-teal-200 to-cyan-200 blur-3xl" />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className={`absolute inset-0 bg-gradient-to-br ${persona.theme.gradient} opacity-10`} />
        <div className="relative max-w-6xl mx-auto px-6 pt-16 pb-24">
          <div className="flex items-center gap-3">
            <Icon className="w-6 h-6" />
            <span className="text-sm uppercase tracking-widest">Portfolio</span>
          </div>

          <div className="grid md:grid-cols-2 gap-10 mt-10 items-center">
            <div>
              <motion.h1
                ref={heroRef}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="text-4xl md:text-5xl font-semibold tracking-tight"
                style={{ transform: "rotateX(var(--tilt-x)) rotateY(var(--tilt-y))", transformStyle: "preserve-3d" }}
              >
                {persona.name}
              </motion.h1>
              <p className="mt-2 text-lg md:text-xl text-gray-700">{persona.title}</p>
              <div className="mt-3 flex items-center gap-2 text-sm text-gray-600">
                <MapPin className="w-4 h-4" /> {persona.location}
              </div>
              <p className="mt-6 text-gray-800 max-w-xl leading-relaxed">{persona.blurb}</p>

              <div className="mt-6 flex flex-wrap gap-3">
                {persona.contacts.map((c) => (
                  <a key={c.label} href={c.href} target="_blank" rel="noreferrer"
                     className={`inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm border hover:-translate-y-0.5 transition ${persona.theme.accent}`}>
                    <ContactIcon kind={c.kind} />
                    <span className="truncate max-w-[14ch] md:max-w-none">{c.label}</span>
                  </a>
                ))}
              </div>

              <div className="mt-8 flex items-center gap-3 flex-wrap">
                <Button size="lg" className={`${persona.theme.accent} rounded-xl`} href="mailto:lokhandearpita21@gmail.com">
                  Hire Me <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
                <Button size="lg" variant="outline" className="rounded-xl" href="/Arpita_Lokhande_OnePage_Resume.pdf" target="_blank" rel="noreferrer">
                  Download Resume
                </Button>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="rounded-3xl p-6 bg-white/70 backdrop-blur border shadow-lg"
              style={{ transform: "translateZ(40px)" }}
            >
              <Tabs
                tabs={[
                  { key: "skills", label: "Skills", content: (
                      <div className="flex flex-wrap gap-2">
                        {persona.skills.map((s) => <Pill key={s}>{s}</Pill>)}
                      </div>
                    )
                  },
                  { key: "services", label: "Services", content: (
                      <div className="flex flex-wrap gap-2">
                        {persona.services.map((s) => <Pill key={s}>{s}</Pill>)}
                      </div>
                    )
                  },
                  { key: "about", label: "About", content: (
                      <div className="text-sm text-gray-700 space-y-2">
                        <p>I blend clean engineering with product sense. Comfortable owning projects end‑to‑end from spec → deploy.</p>
                        <ul className="list-disc pl-5 space-y-1">
                          <li>AI Agents & RAG with LangChain</li>
                          <li>Python APIs (FastAPI/Flask), automation</li>
                          <li>Relational DBs (MySQL/Postgres) & vector stores</li>
                        </ul>
                      </div>
                    )
                  },
                ]}
                defaultKey="skills"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Projects */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="flex items-end justify-between gap-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold">Selected Work</h2>
            <p className="text-gray-600 mt-1">A few projects that represent my process and taste.</p>
          </div>
          <Button variant="outline" className="rounded-xl" href="#projects">All Projects</Button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {persona.projects.map((item) => <ProjectCard item={item} key={item.title} />)}
        </div>
      </section>

      {/* Contact */}
      <section className="max-w-6xl mx-auto px-6 pb-20">
        <div className="rounded-3xl border bg-white p-6 md:p-10 shadow-sm">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl md:text-2xl font-semibold">Let’s build something great</h3>
              <p className="text-gray-600 mt-2">Tell me about your project—timeline, budget, and what success looks like.</p>
              <div className="mt-4 grid grid-cols-2 gap-2">
                <div className="text-sm text-gray-700">Response time: ~24h</div>
                <div className="text-sm text-gray-700">Availability: Limited</div>
              </div>
            </div>
            <ContactForm setBanner={setBanner} />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 pb-12">
        <div className="max-w-6xl mx-auto text-sm text-center text-gray-500">
          © {new Date().getFullYear()} {persona.name}. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

// Contact Form Component (with Formspree + success/error banners)
function ContactForm({ setBanner }) {
  const [submitting, setSubmitting] = useState(false);
  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        setSubmitting(true);
        const form = e.target;
        const data = new FormData(form);
        try {
          const response = await fetch("https://formspree.io/f/mqadzdyn", {
            method: "POST",
            body: data,
            headers: { Accept: "application/json" },
          });
          if (response.ok) {
            setBanner({ type: "success", message: "🎉 Thank you! Your message has been sent.", show: true });
            form.reset();
          } else {
            setBanner({ type: "error", message: "⚠️ Oops! Something went wrong. Please try again.", show: true });
          }
        } catch (err) {
          setBanner({ type: "error", message: "⚠️ Network issue. Please try again.", show: true });
        } finally {
          setSubmitting(false);
        }
      }}
      className="space-y-4 p-6 bg-white rounded-2xl shadow-xl border border-gray-200"
    >
      <div className="grid grid-cols-2 gap-4">
        <Input name="name" placeholder="Your name" required className="rounded-xl border-gray-300 focus:ring-2 focus:ring-emerald-400" />
        <Input type="email" name="email" placeholder="Email" required className="rounded-xl border-gray-300 focus:ring-2 focus:ring-emerald-400" />
      </div>
      <Input name="company" placeholder="Company / Org" className="rounded-xl border-gray-300 focus:ring-2 focus:ring-emerald-400" />
      <Input name="budget" placeholder="Project budget (USD)" className="rounded-xl border-gray-300 focus:ring-2 focus:ring-emerald-400" />
      <Textarea name="message" placeholder="Tell me about the work…" rows={5} required className="rounded-xl border-gray-300 focus:ring-2 focus:ring-emerald-400" />
      <Button disabled={submitting} className={"rounded-xl w-full bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:opacity-90 transition-all " + (submitting ? "opacity-70 cursor-not-allowed" : "")} type="submit">
        {submitting ? "Sending..." : "✉️ Send Inquiry"}
      </Button>
    </form>
  );
}
