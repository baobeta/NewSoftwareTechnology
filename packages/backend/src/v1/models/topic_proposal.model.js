const mongoose = require('mongoose');

const { Schema } = mongoose;

const TopicProposalSchema = new mongoose.Schema({
  title: { type: String },
  description: { type: String },
  lecturerId: {
    type: Schema.Types.ObjectId,
    ref: 'Lecturer',
  },
  major: { type: String },
  deadline: { type: Date, default: Date.now() },
  limit: { type: Number, default: 0 },
  students: { type: Array },
  status: {
    type: String,
    enum: ['LECTURER', 'ADMIN'],
    default: 'LECTURER',
  },
  createdBy: { type: Schema.Types.ObjectId },
});

module.exports = mongoose.model('Topic_Proposal', TopicProposalSchema);
