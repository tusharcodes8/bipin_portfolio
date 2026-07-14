import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
} from '../services/projectService';
import { getSkills, createSkill, updateSkill, deleteSkill } from '../services/skillService';
import { getMessages, markMessageRead, deleteMessage } from '../services/messageService';
import ProjectForm from '../components/Admin/ProjectForm';
import SkillForm from '../components/Admin/SkillForm';
import { getSkillColor } from '../constants/skillColors';
import Spinner from '../components/common/Spinner';

const tabs = [
  { key: 'projects', label: 'Projects' },
  { key: 'skills', label: 'Skills' },
  { key: 'messages', label: 'Messages' },
];

const AdminDashboard = () => {
  const { logout } = useAuth();
  const [tab, setTab] = useState('projects');
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [messages, setMessages] = useState([]);
  const [editingProject, setEditingProject] = useState(null);
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [editingSkill, setEditingSkill] = useState(null);
  const [showSkillForm, setShowSkillForm] = useState(false);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    setLoading(true);
    try {
      const [projectData, skillData, messageData] = await Promise.all([
        getProjects(),
        getSkills(),
        getMessages(),
      ]);
      setProjects(projectData);
      setSkills(skillData);
      setMessages(messageData);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSaveProject = async (data) => {
    try {
      if (editingProject) {
        await updateProject(editingProject._id, data);
        toast.success('Project updated');
      } else {
        await createProject(data);
        toast.success('Project created');
      }
      setShowProjectForm(false);
      setEditingProject(null);
      loadData();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to save project');
    }
  };

  const handleDeleteProject = async (id) => {
    if (!confirm('Delete this project?')) return;
    try {
      await deleteProject(id);
      toast.success('Project deleted');
      loadData();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to delete project');
    }
  };

  const handleSaveSkill = async (data) => {
    try {
      if (editingSkill) {
        await updateSkill(editingSkill._id, data);
        toast.success('Skill updated');
      } else {
        await createSkill(data);
        toast.success('Skill added');
      }
      setShowSkillForm(false);
      setEditingSkill(null);
      loadData();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to save skill');
    }
  };

  const handleDeleteSkill = async (id) => {
    if (!confirm('Delete this skill?')) return;
    try {
      await deleteSkill(id);
      toast.success('Skill deleted');
      loadData();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to delete skill');
    }
  };

  const handleMarkRead = async (id) => {
    await markMessageRead(id);
    loadData();
  };

  const handleDeleteMessage = async (id) => {
    if (!confirm('Delete this message?')) return;
    await deleteMessage(id);
    loadData();
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-slate-900">Admin Dashboard</h1>
        <button onClick={logout} className="text-sm text-slate-500 hover:text-blue-900">
          Logout
        </button>
      </div>

      <div className="mb-6 flex gap-2">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`rounded-md px-4 py-2 text-sm font-medium ${
              tab === t.key ? 'bg-blue-900 text-white' : 'bg-slate-100 text-slate-600'
            }`}
          >
            {t.label}
            {t.key === 'messages' &&
              ` (${messages.filter((m) => !m.readStatus).length} unread)`}
          </button>
        ))}
      </div>

      {loading ? (
        <Spinner />
      ) : tab === 'projects' ? (
        <div className="flex flex-col gap-4">
          {showProjectForm ? (
            <ProjectForm
              initialProject={editingProject}
              onSubmit={handleSaveProject}
              onCancel={() => {
                setShowProjectForm(false);
                setEditingProject(null);
              }}
            />
          ) : (
            <button
              onClick={() => setShowProjectForm(true)}
              className="w-fit rounded-md bg-blue-900 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800"
            >
              + Add Project
            </button>
          )}
          <div className="grid gap-4 sm:grid-cols-2">
            {projects.map((project) => (
              <div
                key={project._id}
                className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm"
              >
                <h3 className="font-semibold text-slate-900">{project.title}</h3>
                <p className="mt-1 text-sm text-slate-500">{project.description}</p>
                <div className="mt-3 flex gap-3 text-sm">
                  <button
                    onClick={() => {
                      setEditingProject(project);
                      setShowProjectForm(true);
                    }}
                    className="text-blue-900 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteProject(project._id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : tab === 'skills' ? (
        <div className="flex flex-col gap-4">
          {showSkillForm ? (
            <SkillForm
              initialSkill={editingSkill}
              onSubmit={handleSaveSkill}
              onCancel={() => {
                setShowSkillForm(false);
                setEditingSkill(null);
              }}
            />
          ) : (
            <button
              onClick={() => setShowSkillForm(true)}
              className="w-fit rounded-md bg-blue-900 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800"
            >
              + Add Skill
            </button>
          )}
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {skills.map((skill) => (
              <div
                key={skill._id}
                className="flex items-center justify-between rounded-lg border border-slate-200 bg-white p-4 shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`h-4 w-4 rounded-full ${getSkillColor(skill.color).swatch}`}
                  />
                  <div>
                    <p className="font-medium text-slate-900">{skill.name}</p>
                    <p className="text-xs text-slate-500">{skill.category}</p>
                  </div>
                </div>
                <div className="flex gap-3 text-sm">
                  <button
                    onClick={() => {
                      setEditingSkill(skill);
                      setShowSkillForm(true);
                    }}
                    className="text-blue-900 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteSkill(skill._id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
          {!skills.length && <p className="text-slate-500">No skills yet.</p>}
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {messages.map((msg) => (
            <div
              key={msg._id}
              className={`rounded-lg border bg-white p-4 shadow-sm ${
                msg.readStatus ? 'border-slate-200' : 'border-blue-900'
              }`}
            >
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-slate-900">
                  {msg.subject} — <span className="text-slate-500">{msg.name}</span>
                </h3>
                <span className="text-xs text-slate-400">
                  {new Date(msg.sentAt).toLocaleString()}
                </span>
              </div>
              <p className="mt-1 text-sm text-slate-500">{msg.email}</p>
              <p className="mt-2 text-slate-700">{msg.message}</p>
              <div className="mt-3 flex gap-3 text-sm">
                {!msg.readStatus && (
                  <button
                    onClick={() => handleMarkRead(msg._id)}
                    className="text-blue-900 hover:underline"
                  >
                    Mark as read
                  </button>
                )}
                <button
                  onClick={() => handleDeleteMessage(msg._id)}
                  className="text-red-600 hover:underline"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
          {!messages.length && <p className="text-slate-500">No messages yet.</p>}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
