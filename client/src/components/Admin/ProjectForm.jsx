import { useState, useEffect } from 'react';

const emptyProject = {
  title: '',
  description: '',
  imageUrl: '',
  githubLink: '',
  liveLink: '',
  embedUrl: '',
  techStack: '',
};

const ProjectForm = ({ initialProject, onSubmit, onCancel }) => {
  const [values, setValues] = useState(emptyProject);

  useEffect(() => {
    if (initialProject) {
      setValues({
        ...emptyProject,
        ...initialProject,
        techStack: (initialProject.techStack || []).join(', '),
      });
    } else {
      setValues(emptyProject);
    }
  }, [initialProject]);

  const handleChange = (e) => {
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...values,
      techStack: values.techStack
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <input
        name="title"
        placeholder="Title"
        value={values.title}
        onChange={handleChange}
        required
        className="rounded-md border border-slate-300 bg-white px-3 py-2 text-slate-900 focus:border-blue-900 focus:outline-none"
      />
      <textarea
        name="description"
        placeholder="Description"
        value={values.description}
        onChange={handleChange}
        required
        rows={3}
        className="rounded-md border border-slate-300 bg-white px-3 py-2 text-slate-900 focus:border-blue-900 focus:outline-none"
      />
      <input
        name="imageUrl"
        placeholder="Image URL"
        value={values.imageUrl}
        onChange={handleChange}
        className="rounded-md border border-slate-300 bg-white px-3 py-2 text-slate-900 focus:border-blue-900 focus:outline-none"
      />
      <input
        name="githubLink"
        placeholder="GitHub Link"
        value={values.githubLink}
        onChange={handleChange}
        className="rounded-md border border-slate-300 bg-white px-3 py-2 text-slate-900 focus:border-blue-900 focus:outline-none"
      />
      <input
        name="liveLink"
        placeholder="Live Demo Link"
        value={values.liveLink}
        onChange={handleChange}
        className="rounded-md border border-slate-300 bg-white px-3 py-2 text-slate-900 focus:border-blue-900 focus:outline-none"
      />
      <input
        name="embedUrl"
        placeholder="YouTube Embed URL (optional)"
        value={values.embedUrl}
        onChange={handleChange}
        className="rounded-md border border-slate-300 bg-white px-3 py-2 text-slate-900 focus:border-blue-900 focus:outline-none"
      />
      <input
        name="techStack"
        placeholder="Tech Stack (comma separated)"
        value={values.techStack}
        onChange={handleChange}
        className="rounded-md border border-slate-300 bg-white px-3 py-2 text-slate-900 focus:border-blue-900 focus:outline-none"
      />
      <div className="flex gap-3">
        <button
          type="submit"
          className="rounded-md bg-blue-900 px-4 py-2 font-medium text-white hover:bg-blue-800"
        >
          Save
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="rounded-md border border-slate-300 px-4 py-2 text-slate-600 hover:bg-slate-50"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default ProjectForm;
