import { useEffect, useState } from 'react';
import { getSkills } from '../../services/skillService';
import { getSkillColor } from '../../constants/skillColors';
import Spinner from '../common/Spinner';

const SkillsList = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getSkills()
      .then(setSkills)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Spinner />;
  if (!skills.length) return null;

  const grouped = skills.reduce((acc, skill) => {
    (acc[skill.category] ||= []).push(skill);
    return acc;
  }, {});

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {Object.entries(grouped).map(([category, items]) => (
        <div
          key={category}
          className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
        >
          <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-[#1F1F1F]">
            <span className="h-1.5 w-6 rounded-full bg-[#0078D4]" />
            {category}
          </h3>
          <div className="flex flex-wrap gap-2">
            {items.map((skill) => (
              <span
                key={skill._id}
                className={`rounded-md border px-3 py-1.5 text-sm font-medium ${getSkillColor(skill.color).chip}`}
              >
                {skill.name}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SkillsList;
