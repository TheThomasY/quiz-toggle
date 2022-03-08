// * React
import React, { useState, useEffect, useRef } from 'react';

// * Styles
import './AnswerOptions.scss';
import colors from '../styles/_colors.module.scss';

type Props = {
  answerOptions: string[]
  correct: number
}

type SelectedStyles = {
    borderRadius: string;
    color: string;
}

export default function AnswerOptions({answerOptions, correct} : Props) {
  const [selected, setSelected] = useState<number>(correct);

  const selectOnClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const target = event.target as Element;
    setSelected(parseInt(target.id[0]));
  }

  // TODO Make state
  let selectedBubble: SelectedStyles = {
    borderRadius: '5rem',
    color: colors['orangeSelectedText']
  };

  const [bubbleClass, setBubbleClass] = useState<string>('')
  


// * Get widths of list items to determine if they have wrapped
  const [listWidth, setListWidth] = useState<number>(0);
  const [answerWidth, setAnswerWidth] = useState<number>(0);

  const refUL = useRef<any>([]);
  const refAnswers = useRef<any>([]);

  
  useEffect(() => {  
    function handleResize() {
      // * Get the width of the list container, minus 4 for 2px border
      setListWidth(refUL.current.offsetWidth - 4);
      // * Get the width of the first answer
      setAnswerWidth(refAnswers.current[0].offsetWidth);
      // ! Reconsider for >2 answers
    }
    // * Add event listener
    window.addEventListener("resize", handleResize);
    
    // * Call handler right away so state gets updated with initial values
    handleResize();
    
    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []);


  useEffect(() => {
    if (listWidth === answerWidth) {
      setBubbleClass('selection-bubble-ud ' + (selected === 0 ? 'slide-up' : 'slide-down'))
    } else {
      setBubbleClass('selection-bubble-lr ' + (selected === 0 ? 'slide-left' : 'slide-right'))
    }
  }, [listWidth, answerWidth, selected])

  return (
    <li ref={refUL} className='answer-options'>
      <div className={bubbleClass}></div>
      {answerOptions.map((option, index) => (
        <div
        ref={ref => {
          refAnswers.current[index] = ref;
        }}
        id={index + option} 
        onClick={selectOnClick}
        className={'single-option'} style={(index === selected) ? selectedBubble : undefined} 
        key={index + option}>{option}
        </div>
      ))}
    </li>
  )
}


