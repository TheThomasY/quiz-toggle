// * React
import React, { useState } from 'react';

// * Styles
import './AnswerOptions.scss';
import colors from '../styles/_colors.module.scss';

type Props = {
  answerOptions: string[]
  correct: number
}

export default function AnswerOptions({answerOptions, correct} : Props) {
  const [selected, setSelected] = useState<number>(0);

  let selectedBubble = {
    borderRadius: '5rem',
    backgroundColor: colors['orangeBorder'],
    color: colors['orangeSelectedText']
  };

  return (
    <li className='answer-options'>
      {answerOptions.map((option, index) => (
        <div className={'single-option'} style={(index === selected) ? selectedBubble : undefined} key={index + option}>{option}</div>
      ))}
    </li>
  )
}
