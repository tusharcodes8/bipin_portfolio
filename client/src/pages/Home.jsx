import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getProjects } from '../services/projectService';
import SkillsList from '../components/Home/SkillsList';
import ProjectCard from '../components/Projects/ProjectCard';
import Spinner from '../components/common/Spinner';
import profilePic from '../assets/images/pp.jpeg';

const socials = [
  { label: 'GitHub', href: 'https://github.com/bipinpandey' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/bipinpandey' },
  { label: 'X', href: 'https://x.com/bipinpandey' },
];

const stats = [
  { value: '3+', label: 'Years Experience' },
  { value: '20+', label: 'Projects Built' },
  { value: 'MERN', label: 'Core Stack' },
];

const Home = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProjects()
      .then((data) => setProjects(data.slice(0, 3)))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#1F1F1F] text-white">
        {/* backdrop accents */}
        <div className="pointer-events-none absolute -top-24 -right-24 h-96 w-96 rounded-full bg-[#0078D4]/30 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 left-1/4 h-72 w-72 rounded-full bg-[#106EBE]/20 blur-3xl" />

        <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-6 py-20 lg:grid-cols-[1.1fr_0.9fr] lg:py-28">
          {/* Left: copy */}
          <div className="flex flex-col items-start gap-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-sm text-blue-100 backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-green-400" />
              Available for freelance & full-time
            </span>
            <h1 className="text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl">
              Bipin Pandey
            </h1>
            <p className="text-xl font-medium text-[#4db8ff]">
              Full Stack Developer — MERN Specialist
            </p>
            <p className="max-w-xl text-lg leading-relaxed text-slate-300">
              I build clean, scalable web applications end to end — from intuitive React
              interfaces to robust Node.js and MongoDB backends, with a focus on
              maintainable code and thoughtful user experiences.
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="/resume.pdf"
                download
                className="rounded bg-[#0078D4] px-6 py-3 font-medium text-white shadow-lg shadow-[#0078D4]/30 transition-all hover:bg-[#106EBE] hover:shadow-[#0078D4]/50"
              >
                Download Resume
              </a>
              <Link
                to="/contact"
                className="rounded border border-white/25 px-6 py-3 font-medium text-white transition-colors hover:bg-white/10"
              >
                Get In Touch
              </Link>
            </div>
            <div className="flex gap-5 pt-2 text-sm text-slate-400">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="transition-colors hover:text-[#4db8ff]"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          {/* Right: portrait */}
          <div className="relative mx-auto w-fit">
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-[#0078D4] to-[#004578] opacity-40 blur-2xl" />
            <div className="absolute -top-5 -left-5 h-24 w-24 rounded-2xl border border-[#0078D4]/40 bg-[#0078D4]/10" />
            <img
              src={profilePic}
              alt="Bipin Pandey"
              className="relative h-72 w-72 rounded-3xl object-cover shadow-2xl ring-1 ring-white/10 sm:h-80 sm:w-80"
            />
          </div>
        </div>

        {/* stats bar */}
        <div className="relative border-t border-white/10">
          <div className="mx-auto grid max-w-6xl grid-cols-3 divide-x divide-white/10 px-6">
            {stats.map((s) => (
              <div key={s.label} className="flex flex-col items-center gap-1 py-6 text-center">
                <span className="text-2xl font-semibold text-white sm:text-3xl">{s.value}</span>
                <span className="text-xs uppercase tracking-wider text-slate-400 sm:text-sm">
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills */}
      <section className="bg-[#F3F3F3] px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 max-w-xl">
            <span className="text-sm font-semibold uppercase tracking-wider text-[#0078D4]">
              What I work with
            </span>
            <h2 className="mt-2 text-3xl font-semibold text-[#1F1F1F]">Skills & Technologies</h2>
          </div>
          <SkillsList />
        </div>
      </section>

      {/* Featured Projects */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 flex flex-wrap items-end justify-between gap-4">
            <div className="max-w-xl">
              <span className="text-sm font-semibold uppercase tracking-wider text-[#0078D4]">
                Selected work
              </span>
              <h2 className="mt-2 text-3xl font-semibold text-[#1F1F1F]">Featured Projects</h2>
            </div>
            <Link
              to="/projects"
              className="rounded border border-slate-300 px-5 py-2.5 text-sm font-medium text-[#1F1F1F] transition-colors hover:border-[#0078D4] hover:text-[#0078D4]"
            >
              View all projects →
            </Link>
          </div>
          {loading ? (
            <Spinner />
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {projects.map((project) => (
                <ProjectCard key={project._id} project={project} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
