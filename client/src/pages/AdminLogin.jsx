import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await login(username, password);
      navigate('/admin');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mx-auto flex max-w-sm flex-col gap-4 px-4 py-24">
      <h1 className="text-center text-2xl font-semibold text-[#1F1F1F]">Admin Login</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className="rounded border border-slate-300 bg-white px-3 py-2 text-slate-900 transition-colors focus:border-[#0078D4] focus:ring-1 focus:ring-[#0078D4] focus:outline-none"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="rounded border border-slate-300 bg-white px-3 py-2 text-slate-900 transition-colors focus:border-[#0078D4] focus:ring-1 focus:ring-[#0078D4] focus:outline-none"
        />
        <button
          type="submit"
          disabled={submitting}
          className="rounded bg-[#0078D4] px-4 py-2 font-medium text-white shadow-sm transition-all hover:bg-[#106EBE] hover:shadow-md disabled:opacity-50"
        >
          {submitting ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
