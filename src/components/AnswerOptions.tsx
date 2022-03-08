// * React
import React, { useState } from 'react';

// * Styles
import './AnswerOptions.scss';
import colors from '../styles/_colors.module.scss';

type Props = {
  answerOptions: string[]
  correct: number
}

type SelectedStyles = {
    borderRadius: string;
    backgroundColor: string;
    color: string;
}

export default function AnswerOptions({answerOptions, correct} : Props) {
  const [selected, setSelected] = useState<number>(correct);

  const selectOnClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const target = event.target as Element;
    setSelected(parseInt(target.id[0]));
  }

  let selectedBubble: SelectedStyles = {
    borderRadius: '5rem',
    backgroundColor: colors['orangeBorder'],
    color: colors['orangeSelectedText']
  };

  return (
    <li className='answer-options'>
      {answerOptions.map((option, index) => (
        <div
        id={index + option} 
        onClick={selectOnClick}
        className={'single-option'} style={(index === selected) ? selectedBubble : undefined} 
        key={index + option}>{option}
        </div>
      ))}
    </li>
  )
}
