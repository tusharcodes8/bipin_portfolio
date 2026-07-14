import { useState, useEffect } from 'react';
import { SKILL_COLORS } from '../../constants/skillColors';

const emptySkill = { name: '', color: 'blue', category: 'Frontend' };
const categories = ['Frontend', 'Backend', 'Mobile', 'Design', 'Tools'];

const SkillForm = ({ initialSkill, onSubmit, onCancel }) => {
  const [values, setValues] = useState(emptySkill);

  useEffect(() => {
    setValues(initialSkill ? { ...emptySkill, ...initialSkill } : emptySkill);
  }, [initialSkill]);

  const handleChange = (e) => {
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(values);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-3 rounded-lg border border-slate-200 bg-white p-5 shadow-sm"
    >
      <input
        name="name"
        placeholder="Skill name (e.g. React)"
        value={values.name}
        onChange={handleChange}
        required
        className="rounded-md border border-slate-300 bg-white px-3 py-2 text-slate-900 focus:border-blue-900 focus:outline-none"
      />

      <div>
        <p className="mb-2 text-sm text-slate-600">Chip color</p>
        <div className="flex flex-wrap gap-2">
          {SKILL_COLORS.map((c) => (
            <button
              key={c.key}
              type="button"
              title={c.key}
              onClick={() => setValues((prev) => ({ ...prev, color: c.key }))}
              className={`h-8 w-8 rounded-full ${c.swatch} transition-transform ${
                values.color === c.key
                  ? 'ring-2 ring-blue-900 ring-offset-2 scale-110'
                  : 'hover:scale-105'
              }`}
            />
          ))}
        </div>
      </div>

      <select
        name="category"
        value={values.category}
        onChange={handleChange}
        className="rounded-md border border-slate-300 bg-white px-3 py-2 text-slate-900 focus:border-blue-900 focus:outline-none"
      >
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
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

export default SkillForm;
