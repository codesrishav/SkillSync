const mongoose = require('mongoose');

const analysisHistorySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  jobRole: { type: String, required: true },
  extractedSkills: { type: [String], required: true },
  missingSkills: { type: [String], required: true },
  gapPercentage: { type: Number, required: true },
  roadmap: { type: [String], required: true },
  projects: { type: [String], required: true },
}, { timestamps: true });

module.exports = mongoose.model('AnalysisHistory', analysisHistorySchema);
