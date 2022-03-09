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
  'darkorange',
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

  const answerIsCorrect = () => {
    setTotalCorrect((prevTotalCorrect) => {
      return prevTotalCorrect + 1;
    });
  };

  useEffect(() => {
    setColorTheme(themeColors[totalCorrect]);
  }, [totalCorrect]);

  useEffect(() => {
    let bgColorLight = colors[colorTheme + 'BgLight'];
    let bgColorDark = colors[colorTheme + 'BgDark'];
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
