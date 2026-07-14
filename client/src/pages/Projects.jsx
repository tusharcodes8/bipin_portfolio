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
    <div className="mx-auto max-w-5xl px-4 py-16">
      <h1 className="mb-10 text-center text-3xl font-semibold text-slate-900">Projects</h1>
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
