const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
  title:
   { type: String,
   required: true },

  description: String,

  questions: [
    {
      question: String,
      options: [String],
      correctAnswer: String,
    },
  ],
  timeLimit: Number, // in minutes
});

module.exports = mongoose.model('Quiz', quizSchema);
