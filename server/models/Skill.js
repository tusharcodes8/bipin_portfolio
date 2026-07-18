const mongoose = require('mongoose');

const COLORS = ['blue', 'green', 'amber', 'red', 'purple', 'teal', 'pink', 'slate'];

const skillSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  color: { type: String, enum: COLORS, default: 'blue' },
  category: {
    type: String,
    required: true,
    enum: ['Frontend', 'Backend', 'Database', 'Language', 'Mobile', 'Design', 'Tools'],
  },
});

module.exports = mongoose.model('Skill', skillSchema);
