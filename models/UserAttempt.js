const mongoose = require('mongoose');

const userAttemptSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  quizId: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz', required: true },
  responses: [
    {
      questionId: mongoose.Schema.Types.ObjectId,
      selectedOption: String,
    }
  ],
  score: { type: Number, default: 0 },
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  isCompleted: { type: Boolean, default: false },
});

module.exports = mongoose.model('UserAttempt', userAttemptSchema);
