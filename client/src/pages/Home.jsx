import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getProjects } from '../services/projectService';
import SkillsList from '../components/Home/SkillsList';
import ProjectCard from '../components/Projects/ProjectCard';
import Spinner from '../components/common/Spinner';

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
      <section className="mx-auto flex max-w-3xl flex-col items-center gap-6 px-4 py-20 text-center">
        <img
          src="/profile-pic.png"
          alt="Subas Kathayat"
          className="h-40 w-40 rounded-full border-2 border-blue-900/30 object-cover shadow-lg shadow-blue-900/10"
        />
        <h1 className="text-4xl font-semibold text-slate-900 sm:text-5xl">Subas Kathayat</h1>
        <p className="max-w-xl leading-relaxed text-slate-600">
          I'm Subas Kathayat, a Web and Mobile App Developer and Computer Science undergraduate
          from Nepal with 3 years of coding experience. I love creating clean, functional, and
          responsive apps — from Flutter mobile apps to React web applications, with a strong
          eye for UI/UX design in Figma.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <a
            href="/resume.pdf"
            download
            className="rounded-md bg-blue-900 px-6 py-3 font-medium text-white transition-colors hover:bg-blue-800"
          >
            Download Resume
          </a>
          <Link
            to="/contact"
            className="rounded-md border border-slate-300 px-6 py-3 font-medium text-slate-700 transition-colors hover:border-blue-900 hover:text-blue-900"
          >
            Get In Touch
          </Link>
        </div>
      </section>

      {/* Skills */}
      <section className="border-t border-slate-200 bg-slate-50 px-4 py-16">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-6 text-xl font-medium text-slate-900">Skills</h2>
          <SkillsList />
        </div>
      </section>

      {/* Featured Projects */}
      <section className="px-4 py-16">
        <div className="mx-auto max-w-5xl">
          <div className="mb-10 flex items-center justify-between">
            <h2 className="text-xl font-medium text-slate-900">Featured Projects</h2>
            <Link to="/projects" className="text-sm text-blue-900 hover:underline">
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
