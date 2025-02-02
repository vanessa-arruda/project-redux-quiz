import { useEffect } from 'react';
import { FaRegCheckCircle } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { restart, submitAnswer, goToNextQuestion } from '../reducers/quiz';
import { IconContext } from 'react-icons';


export const CurrentQuestion = () => {
  const question = useSelector(
    (state) => state.quiz.questions[state.quiz.currentQuestionIndex]
  );

  const dispatch = useDispatch();
  
  const quiz = useSelector((state) => state.quiz);

  const quizOver = useSelector((state) => state.quiz.quizOver);

  const answer = useSelector(
    (state) =>
      state.quiz.answers.find((a) => a.questionId === question.id)
  );

  const handleAnswerClick = (answerIndex, questionId) => {
    dispatch(submitAnswer({ answerIndex, questionId }));
  };

  const withImage = 'optionsImages' in question;
  const correctAnswerIndex = question.correctAnswerIndex;
  const incorrectAnswerIndex = answer && !answer.isCorrect ? answer.answerIndex : undefined;

  if (!question) {
    return <h1>Oh no! I could not find the current question!</h1>;
  }

  return (
    <main className="quiz-container">
      <h1 className="quiz-question">Question: {question.questionText}</h1>
      <div>
        {(
          <img className="image" src={question.questionImages} alt={question.options} />
        )}
      </div>
      <div className={`answers-container ${withImage ? 'with-image' : ''}`}>
        {/* answer options*/}
        {question.options.map((option, index) => (
          <button
            className={`answers ${answer && correctAnswerIndex == index ? 'correct' : ''}  ${incorrectAnswerIndex == index ? 'incorrect' : ''}`}
            key={index}
            onClick={() => handleAnswerClick(index, question.id)}
          >
            <IconContext.Provider value={{className:"answer-icon"}}>
              <FaRegCheckCircle />
            </IconContext.Provider>
            {withImage && <img className="fixed-image-size" src={question.optionsImages[index]} alt={option} />}
            {option}
          </button>
        ))}
      </div>
      <div className="flip-card-container">
        {withImage && <img className="img hidden" src={question.optionsImages[0]} alt={question.options[0]} />}
        <p className="explanation hidden">{question.explanation}</p>
      </div>
      {answer && (
        <div className="correct-answer">
          {answer.isCorrect ? 'Correct!' : 'Incorrect'}
        </div>
      )}
      <div className="score-container">
        <p>Score: {quiz.score}</p>
      </div>
    </main>
  );
};
