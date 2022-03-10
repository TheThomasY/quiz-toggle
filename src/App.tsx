// * React
import { useEffect, useState } from 'react';

// * Components
import AnswerOptions from './components/AnswerOptions';

// * Styles
import './App.scss';
import colors from './styles/_variables.module.scss';

// * Question Data
import untypedQuestions from './Data.json';

type QuestionAndAnswers = Readonly<
  {
    question: string;
    answerOptions: string[][];
    correct: number[];
  }[]
>;

const Questions: QuestionAndAnswers = untypedQuestions;

const themeColors: string[] = [
  'darkOrange',
  'orange',
  'yellow',
  'blue',
  'green',
];

function App() {
  // * STATE:
  const [totalCorrect, setTotalCorrect] = useState<number>(0);
  // * Count number of correct answers, from 0 to answersNo
  const totalCorrectUpdater = (correct: boolean) => {
    if (correct) {
      setTotalCorrect((prevTotalCorrect) => {
        return prevTotalCorrect + 1;
      });
    } else {
      setTotalCorrect((prevTotalCorrect) => {
        return prevTotalCorrect - 1;
      });
    }
  };

  // * STATE:
  const [colorTheme, setColorTheme] = useState<string>(themeColors[0]);

  // * -------------------------------------------------------------------------------------
  // * Current Question
  // * -------------------------------------------------------------------------------------

  // * STATE:
  const [questionNo, setQuestionNo] = useState(0);

  // * Move to next question, only possible when answered correctly
  const nextQuestion = () => {
    // * Set total to zero. New question will load and then children will re-update if they are now correct
    setTotalCorrect(0);
    setQuestionNo((prevQuestionNo) => {
      return prevQuestionNo < Questions.length - 1 ? prevQuestionNo + 1 : 0;
    });
  };

  // * -------------------------------------------------------------------------------------
  // * Correct Answers and initial random selections
  // * -------------------------------------------------------------------------------------

  // * Correct answer locations - passed to answer children
  let correctArr = Questions[questionNo]['correct'];

  // * Number of answers (rows)
  let answersNo: number = correctArr.length;

  // ! This only works when the page first loads - need new approach for every time
  // * Randomly pick starting selections. 50/50 chance to be correct
  let initialSelected = correctArr.map((answer) =>
    Math.random() < 0.5 ? 1 - answer : answer
  );

  // * One random answer is ALWAYS in wrong position
  let randomAnswer = Math.floor(Math.random() * (answersNo + 1));
  initialSelected[randomAnswer] = 1 - correctArr[randomAnswer];

  // * -------------------------------------------------------------------------------------
  // * Variables colours controlled by number of correct guesses
  // * -------------------------------------------------------------------------------------

  // * Splitting the answers among the number of colours available
  const colorRange: number = themeColors.length - 1;
  let colorStart: number = 0;
  let split: number = Math.floor(answersNo / colorRange);

  useEffect(() => {
    if (split === 0) split = 1;
    if (answersNo < colorRange) {
      // * If less answers than colours - start further in colour array
      colorStart = colorRange - answersNo;
    } else if (answersNo % colorRange !== 0) {
      //  * If answers not a multiple of No. colours - delay index until it's a multiple
      colorStart = -answersNo % colorRange;
    }
    if (totalCorrect === 0 || colorStart + totalCorrect < 0) {
      // * If all guesses wrong or index has been delayed - set to first colour
      setColorTheme(themeColors[0]);
    } else {
      setColorTheme(
        // * Guaranteed to split evenly from this point
        themeColors[Math.ceil((colorStart + totalCorrect) / split)]
      );
    }
    // * Safety net - all correct will always be last colour
    if (totalCorrect === answersNo) {
      setColorTheme(themeColors[themeColors.length - 1]);
    }
  }, [totalCorrect, questionNo]);

  // * If colour theme changes, apply correct colour to body
  useEffect(() => {
    let bgColorLight: string = colors[colorTheme + 'BgLight'];
    let bgColorDark: string = colors[colorTheme + 'BgDark'];
    let style = `linear-gradient(${bgColorLight}, ${bgColorDark})`;
    document.body.style.backgroundImage = style;
  }, [colorTheme, questionNo]);

  return (
    <div className='App'>
      <h1 className='question'>{Questions[questionNo]['question']}</h1>
      <ul className='answers-list'>
        {Questions[questionNo]['answerOptions'].map((option, index) => (
          <AnswerOptions
            answerOptions={option}
            initialSelected={initialSelected[index]}
            correct={correctArr[index]}
            allCorrect={totalCorrect === answersNo}
            totalCorrectUpdater={totalCorrectUpdater}
            colorTheme={colorTheme}
            key={index}
          />
        ))}
      </ul>
      {totalCorrect !== answersNo ? (
        <h2 className='answers-status'>The answer is incorrect</h2>
      ) : (
        <h2 className='answers-status'>The answer is correct!</h2>
      )}
      {totalCorrect === answersNo && (
        <button className='question-btn' onClick={nextQuestion}>
          Next Question
        </button>
      )}
    </div>
  );
}

export default App;
