const ProjectCard = ({ project }) => (
  <div className="group flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-all duration-200 hover:-translate-y-1.5 hover:border-[#0078D4]/40 hover:shadow-xl">
    {project.imageUrl ? (
      <div className="overflow-hidden">
        <img
          src={project.imageUrl}
          alt={project.title}
          className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
    ) : project.embedUrl ? (
      <iframe
        className="aspect-video w-full"
        src={project.embedUrl}
        title={project.title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
    ) : (
      <div className="relative flex h-40 items-center justify-center overflow-hidden bg-gradient-to-br from-[#0078D4] to-[#004578]">
        <div className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-white/10" />
        <span className="text-5xl font-bold text-white/90">{project.title?.charAt(0)}</span>
      </div>
    )}
    <div className="flex flex-1 flex-col gap-3 p-5">
      <h3 className="text-lg font-semibold text-[#1F1F1F] transition-colors group-hover:text-[#0078D4]">
        {project.title}
      </h3>
      <p className="text-sm leading-relaxed text-slate-500">{project.description}</p>
      <div className="flex flex-wrap gap-2">
        {project.techStack?.map((tech) => (
          <span
            key={tech}
            className="rounded bg-[#0078D4]/10 px-2 py-1 text-xs font-medium text-[#0078D4]"
          >
            {tech}
          </span>
        ))}
      </div>
      <div className="mt-auto flex gap-4 border-t border-slate-100 pt-4 text-sm">
        {project.liveLink && (
          <a
            href={project.liveLink}
            target="_blank"
            rel="noreferrer"
            className="font-medium text-[#0078D4] hover:underline"
          >
            Live Demo →
          </a>
        )}
        {project.githubLink && (
          <a
            href={project.githubLink}
            target="_blank"
            rel="noreferrer"
            className="font-medium text-slate-600 hover:text-[#0078D4] hover:underline"
          >
            GitHub
          </a>
        )}
      </div>
    </div>
  </div>
);

export default ProjectCard;
