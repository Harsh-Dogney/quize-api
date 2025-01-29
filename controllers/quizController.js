const Quiz = require('../models/Quiz');

// Fetch quiz by ID
const getQuizById = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }
    res.status(200).json(quiz);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching quiz', error: error.message });
  }
};

// Add a new quiz
const addQuiz = async (req, res) => {
  try {
    const { title, description, questions, timeLimit } = req.body;

    const quiz = new Quiz({
      title,
      description,
      questions,
      timeLimit,
    });

    await quiz.save();
    res.status(201).json({ message: 'Quiz added successfully', quiz });
  } catch (error) {
    res.status(500).json({ message: 'Error adding quiz', error: error.message });
  }
};

// Add a question to a specific quiz
const addQuestionToQuiz = async (req, res) => {
  try {
    const quizId = req.params.id;
    const { question, options, correctAnswer } = req.body;

    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }

    quiz.questions.push({ question, options, correctAnswer });
    await quiz.save();

    res.status(200).json({ message: 'Question added successfully', quiz });
  } catch (error) {
    res.status(500).json({ message: 'Error adding question', error: error.message });
  }
};
//start 
const startQuizAttempt = async (req, res) => {
    try {
      const quizId = req.params.id;
      const { userId } = req.body;
  
      const quiz = await Quiz.findById(quizId);
      if (!quiz) return res.status(404).json({ message: 'Quiz not found' });
  
      const startTime = new Date();
      const endTime = new Date(startTime.getTime() + quiz.timeLimit * 60 * 1000); // Add time limit in milliseconds
  
      const userAttempt = new UserAttempt({
        userId,
        quizId,
        startTime,
        endTime,
      });
  
      await userAttempt.save();
      res.status(201).json({ message: 'Quiz attempt started', attemptId: userAttempt._id });
    } catch (error) {
      res.status(500).json({ message: 'Error starting quiz attempt', error: error.message });
    }
  };
  //submit
  const submitQuizResponses = async (req, res) => {
    try {
      const { attemptId, responses } = req.body;
  
      const userAttempt = await UserAttempt.findById(attemptId).populate('quizId');
      if (!userAttempt) return res.status(404).json({ message: 'Attempt not found' });
  
      if (userAttempt.isCompleted)
        return res.status(400).json({ message: 'Quiz already completed' });
  
      const currentTime = new Date();
      if (currentTime > userAttempt.endTime)
        return res.status(400).json({ message: 'Time limit exceeded' });
  
      const quiz = await Quiz.findById(userAttempt.quizId);
      let score = 0;
  
      responses.forEach((response) => {
        const question = quiz.questions.find(
          (q) => q._id.toString() === response.questionId
        );
        if (question && question.correctAnswer === response.selectedOption) {
          score++;
        }
      });
  
      userAttempt.responses = responses;
      userAttempt.score = score;
      userAttempt.isCompleted = true;
      await userAttempt.save();
  
      res.status(200).json({ message: 'Quiz submitted successfully', score });
    } catch (error) {
      res.status(500).json({ message: 'Error submitting quiz', error: error.message });
    }
  };
  //result
  const getQuizResult = async (req, res) => {
    try {
      const { attemptId } = req.params;
  
      const userAttempt = await UserAttempt.findById(attemptId).populate('quizId');
      if (!userAttempt) return res.status(404).json({ message: 'Attempt not found' });
  
      res.status(200).json({
        quizTitle: userAttempt.quizId.title,
        score: userAttempt.score,
        totalQuestions: userAttempt.quizId.questions.length,
        responses: userAttempt.responses,
      });
    } catch (error) {
      res.status(500).json({ message: 'Error fetching quiz result', error: error.message });
    }
  };
  
  const getScore = async (req, res) => {
    const { quizId, userId } = req.params;
  
    // Retrieve score from the database (you could store it in a UserAttempt collection)
    // For now, let's return a dummy score as an example
    const score = 5;  // Dummy score
  
    res.json({ score });
  };
  

  const getPerformanceSummary = async (req, res) => {
    const { quizId, userId } = req.params;
  
    try {
      // Fetch the quiz details and the user’s attempt
      const quiz = await Quiz.findById(quizId);
      const userAttempt = await UserAttempt.findOne({ quizId, userId });
  
      if (!userAttempt) {
        return res.status(404).json({ message: 'User attempt not found' });
      }
  
      let correctAnswers = [];
      let incorrectAnswers = [];
      let score = 0;
  
      // Compare the answers
      userAttempt.answers.forEach((answer, index) => {
        const question = quiz.questions.find(q => q.id.toString() === answer.questionId.toString());
  
        if (question) {
          const isCorrect = answer.userAnswer === question.correctAnswer;
          if (isCorrect) {
            correctAnswers.push({ question: question.question, userAnswer: answer.userAnswer });
            score += 1;
          } else {
            incorrectAnswers.push({ question: question.question, userAnswer: answer.userAnswer });
          }
        }
      });
  
      // Update the score in the UserAttempt model
      userAttempt.score = score;
      await userAttempt.save();
  
      // Return the summary
      res.json({
        score,
        totalQuestions: quiz.questions.length,
        correctAnswers,
        incorrectAnswers
      });
  
    } catch (err) {
      res.status(500).json({ message: 'Error fetching performance summary', error: err });
    }
  };
  


module.exports = { getQuizById, addQuiz, getPerformanceSummary,getScore,startQuizAttempt,submitQuizResponses,getQuizResult,addQuestionToQuiz };
