const ProjectCard = ({ project }) => (
  <div className="group flex flex-col overflow-hidden rounded border border-slate-200 bg-white shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-[#0078D4]/40 hover:shadow-lg">
    {project.imageUrl && (
      <img src={project.imageUrl} alt={project.title} className="h-48 w-full object-cover" />
    )}
    {project.embedUrl && (
      <iframe
        className="aspect-video w-full"
        src={project.embedUrl}
        title={project.title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
    )}
    <div className="flex flex-1 flex-col gap-3 p-5">
      <h3 className="text-lg font-semibold text-[#1F1F1F]">{project.title}</h3>
      <p className="text-sm text-slate-500">{project.description}</p>
      <div className="flex flex-wrap gap-2">
        {project.techStack?.map((tech) => (
          <span key={tech} className="rounded bg-[#0078D4]/10 px-2 py-1 text-xs font-medium text-[#0078D4]">
            {tech}
          </span>
        ))}
      </div>
      <div className="mt-auto flex gap-4 pt-2 text-sm">
        {project.liveLink && (
          <a
            href={project.liveLink}
            target="_blank"
            rel="noreferrer"
            className="font-medium text-[#0078D4] hover:underline"
          >
            Live Demo
          </a>
        )}
        {project.githubLink && (
          <a
            href={project.githubLink}
            target="_blank"
            rel="noreferrer"
            className="font-medium text-[#0078D4] hover:underline"
          >
            GitHub
          </a>
        )}
      </div>
    </div>
  </div>
);

export default ProjectCard;
