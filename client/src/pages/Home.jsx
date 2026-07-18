import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getProjects } from '../services/projectService';
import SkillsList from '../components/Home/SkillsList';
import ProjectCard from '../components/Projects/ProjectCard';
import Spinner from '../components/common/Spinner';
import profilePic from '../assets/images/pp.jpeg';

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
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0078D4] via-[#106EBE] to-[#004578] text-white">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 px-4 py-24 text-center">
          <img
            src={profilePic}
            alt="Bipin Pandey"
            className="h-40 w-40 rounded-full border-4 border-white/80 object-cover shadow-xl"
          />
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">Bipin Pandey</h1>
          <p className="text-lg font-medium text-blue-100">
            Full Stack Developer — MERN Specialist
          </p>
          <p className="max-w-xl leading-relaxed text-blue-50/90">
            I'm Bipin Pandey, a full stack developer who builds clean, scalable, and
            performant web applications with the MERN stack. From crafting intuitive React
            interfaces to designing robust Node.js and MongoDB backends, I focus on writing
            maintainable code and delivering thoughtful user experiences.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href="/resume.pdf"
              download
              className="rounded bg-white px-6 py-3 font-medium text-[#0078D4] shadow-sm transition-all hover:bg-blue-50 hover:shadow-md"
            >
              Download Resume
            </a>
            <Link
              to="/contact"
              className="rounded border border-white/70 px-6 py-3 font-medium text-white transition-colors hover:bg-white/10"
            >
              Get In Touch
            </Link>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section className="border-t border-slate-200 bg-[#F3F3F3] px-4 py-16">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-6 text-xl font-semibold text-[#1F1F1F]">Skills</h2>
          <SkillsList />
        </div>
      </section>

      {/* Featured Projects */}
      <section className="px-4 py-16">
        <div className="mx-auto max-w-5xl">
          <div className="mb-10 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-[#1F1F1F]">Featured Projects</h2>
            <Link to="/projects" className="text-sm font-medium text-[#0078D4] hover:underline">
              View all →
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
