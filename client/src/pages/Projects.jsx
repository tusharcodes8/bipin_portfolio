import { useEffect, useState } from 'react';
import { getProjects } from '../services/projectService';
import ProjectCard from '../components/Projects/ProjectCard';
import Spinner from '../components/common/Spinner';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProjects()
      .then(setProjects)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="mx-auto max-w-6xl px-6 py-20">
      <div className="mb-12 max-w-2xl">
        <span className="text-sm font-semibold uppercase tracking-wider text-[#0078D4]">
          Portfolio
        </span>
        <h1 className="mt-2 text-4xl font-semibold text-[#1F1F1F]">Projects</h1>
        <p className="mt-4 text-lg leading-relaxed text-slate-500">
          A collection of things I've designed and built — from full-stack web apps to
          experiments. Each one taught me something new.
        </p>
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
  );
};

export default Projects;
