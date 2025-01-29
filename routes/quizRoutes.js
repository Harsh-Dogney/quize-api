const express = require('express');
const {
  getQuizById,
  addQuiz,
  addQuestionToQuiz,
  startQuizAttempt,
  submitQuizResponses,
  getQuizResult,
  getScore,
  getPerformanceSummary
} = require('../controllers/quizController');

const router = express.Router();

// Quiz routes
router.get('/:id', getQuizById);
router.post('/', addQuiz);
router.post('/:id/questions', addQuestionToQuiz);

// User attempt routes
router.post('/:id/start', startQuizAttempt);
router.post('/:id/submit', submitQuizResponses);
router.get('/:id/result/:attemptId', getQuizResult);

//get score
router.get('/:quizId/attempt/:userId/score', getScore); 

router.get('/:quizId/attempt/:userId/summary', getPerformanceSummary);

module.exports = router;
