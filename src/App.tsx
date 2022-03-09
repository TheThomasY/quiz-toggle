// * React
import { useEffect, useState, useRef } from 'react';

// * Components
import AnswerOptions from './components/AnswerOptions';

// * Styles
import './App.scss';
import colors from './styles/_variables.module.scss';

type QuestionAndAnswers = Readonly<
  {
    question: string;
    answerOptions: string[][];
    correct: number[];
  }[]
>;

const questions: QuestionAndAnswers = [
  {
    question: 'An animal cell contains:',
    answerOptions: [
      ['Cell Wall', 'Ribosomes'],
      ['Cytoplasm', 'Chloroplast'],
      ['Partially membrane', 'Impermeable membrane'],
      ['Cellulose', 'Mitochondria'],
    ],
    correct: [1, 1, 0, 0],
  },
];

const themeColors: string[] = [
  'darkOrange',
  'orange',
  'yellow',
  'blue',
  'green',
];

function App() {
  // TODO change this when there is more than one question
  let questionNo: number = 0;
  let answersNo: number = questions[questionNo]['correct'].length;

  const [totalCorrect, setTotalCorrect] = useState<number>(0);
  const [colorTheme, setColorTheme] = useState<string>(themeColors[0]);

  // * Count number of correct answers, from 0 to answersNo ---------------
  const answerIsCorrect = () => {
    setTotalCorrect((prevTotalCorrect) => {
      return prevTotalCorrect + 1;
    });
  };

  // * Splitting the answers among the number of colours available ---------------
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
  }, [totalCorrect]);

  // * If colour theme changes, apply correct colour to body
  useEffect(() => {
    let bgColorLight: string = colors[colorTheme + 'BgLight'];
    let bgColorDark: string = colors[colorTheme + 'BgDark'];
    let style = `linear-gradient(${bgColorLight}, ${bgColorDark})`;
    document.body.style.backgroundImage = style;
  }, [colorTheme]);

  return (
    <div className='background'>
      <div className='App'>
        <h1 className='question'>An animal cell contains:</h1>
        <ul className='answers-list'>
          {questions[questionNo]['answerOptions'].map((option, index) => (
            <AnswerOptions
              answerOptions={option}
              correct={questions[questionNo]['correct'][index]}
              answerIsCorrect={answerIsCorrect}
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
      </div>
    </div>
  );
}

export default App;
