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

  return (
    <div className="flex flex-wrap justify-center gap-3">
      {skills.map((skill) => (
        <span
          key={skill._id}
          className={`rounded-full border px-4 py-2 text-sm font-medium ${getSkillColor(skill.color).chip}`}
        >
          {skill.name}
        </span>
      ))}
    </div>
  );
};

export default SkillsList;
