require('dotenv').config();
const mongoose = require('mongoose');
const Project = require('../models/Project');
const Skill = require('../models/Skill');

const projects = [
  {
    title: 'Mero Paisa',
    description:
      'A secure and intuitive money wallet app for managing your finances on the go.',
    imageUrl: '/images/meropaisa.png',
    githubLink: 'https://github.com/Subaskathayat/meropaisa-wallet-app',
    liveLink: '',
    embedUrl: 'https://www.youtube.com/embed/qrHjkvmBSYs',
    techStack: ['Flutter', 'Firebase', 'Bloc'],
  },
  {
    title: 'Fresh',
    description:
      'A meditation and sleep app designed to help you relax and improve your mental well-being.',
    imageUrl: '/images/freshapp.png',
    githubLink: '',
    liveLink: 'https://www.figma.com/proto/CJyDbNYraxboBHmibcr8YC/Fresh-App',
    embedUrl: '',
    techStack: ['Figma'],
  },
  {
    title: 'Prompthancer',
    description:
      'Prompthancer turns your simple texts into enhanced AI prompts under 10 seconds.',
    imageUrl: '/images/prompthancer.png',
    githubLink: 'https://github.com/Subaskathayat/prompthancer',
    liveLink: 'https://www.prompthance.me',
    embedUrl: '',
    techStack: ['HTML', 'CSS', 'JavaScript'],
  },
];

const skills = [
  { name: 'React', color: 'blue', category: 'Frontend' },
  { name: 'Flutter', color: 'teal', category: 'Mobile' },
  { name: 'Python', color: 'amber', category: 'Backend' },
  { name: 'Firebase', color: 'red', category: 'Backend' },
  { name: 'Figma', color: 'purple', category: 'Design' },
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
