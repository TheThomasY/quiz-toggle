// * React
import { useEffect, useState, useRef } from 'react';

// * Components
import AnswerOptions from './components/AnswerOptions';

// * Styles
import './App.scss';

type QuestionAndAnswers = Readonly<{
  question: string
  answerOptions: string[][]
  correct: number[]
}[]>;


function App() {
  const questions: QuestionAndAnswers = [
    {
      question: 'An animal cell contains:',
      answerOptions: [
        ['Cell Wall', 'Ribosomes'],
        ['Cytoplasm', 'Chloroplast'],
        ['Partially membrane', 'Impermeable membrane lorem ipsum lorem ipsum'],
        ['Cellulose', 'Mitochondria']
      ],
      correct: [1,1,0,0]
    }
  ]

  let questionNo: number = 0;



  return (
    <div className="App">
      <h1 className='question'>An animal cell contains:</h1>
      <ul  className="answers-list">
        {questions[questionNo]['answerOptions'].map((option, index) => (
        <AnswerOptions answerOptions={option} correct={questions[questionNo]['correct'][index]} key={index}/>
      ))}
      </ul>
      <h2 className='answers-status'>The answer is incorrect</h2>
    </div>
  );
}

export default App;
