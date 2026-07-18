require('dotenv').config();
const mongoose = require('mongoose');
const Project = require('../models/Project');
const Skill = require('../models/Skill');

const projects = [
  {
    title: 'TaskFlow',
    description:
      'A full-stack task management app with real-time updates, drag-and-drop boards, and team collaboration built on the MERN stack.',
    imageUrl: '',
    githubLink: 'https://github.com/bipinpandey/taskflow',
    liveLink: '',
    embedUrl: '',
    techStack: ['React', 'Node.js', 'Express', 'MongoDB'],
  },
  {
    title: 'ShopEase',
    description:
      'An e-commerce platform featuring product search, cart, Stripe checkout, and an admin dashboard for inventory management.',
    imageUrl: '',
    githubLink: 'https://github.com/bipinpandey/shopease',
    liveLink: '',
    embedUrl: '',
    techStack: ['React', 'Redux', 'Node.js', 'MongoDB'],
  },
  {
    title: 'DevConnect',
    description:
      'A social platform for developers with JWT authentication, profiles, posts, and a REST API backed by Express and MongoDB.',
    imageUrl: '',
    githubLink: 'https://github.com/bipinpandey/devconnect',
    liveLink: '',
    embedUrl: '',
    techStack: ['React', 'Express', 'MongoDB', 'JWT'],
  },
];

const skills = [
  { name: 'React', color: 'blue', category: 'Frontend' },
  { name: 'Node.js', color: 'green', category: 'Backend' },
  { name: 'Express', color: 'slate', category: 'Backend' },
  { name: 'MongoDB', color: 'green', category: 'Database' },
  { name: 'JavaScript', color: 'amber', category: 'Language' },
  { name: 'TypeScript', color: 'blue', category: 'Language' },
  { name: 'Tailwind CSS', color: 'teal', category: 'Frontend' },
  { name: 'Git', color: 'slate', category: 'Tools' },
];

const run = async () => {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log('Connected. Seeding...');

  await Project.deleteMany({});
  await Skill.deleteMany({});

  await Project.insertMany(projects);
  await Skill.insertMany(skills);

  console.log('Seed complete.');
  await mongoose.disconnect();
  process.exit(0);
};

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
