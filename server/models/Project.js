const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true },
  imageUrl: { type: String, default: '' },
  githubLink: { type: String, default: '' },
  liveLink: { type: String, default: '' },
  embedUrl: { type: String, default: '' },
  techStack: { type: [String], default: [] },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Project', projectSchema);
