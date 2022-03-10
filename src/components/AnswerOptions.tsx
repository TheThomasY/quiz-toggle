// * React
import React, { useState, useEffect, useRef } from 'react';

// * Styles
import './AnswerOptions.scss';
import colors from '../styles/_variables.module.scss';

type Props = {
  answerOptions: string[];
  initialSelected: number;
  correct: number;
  answerIsCorrect: () => void;
  colorTheme: string;
};

type InlineStyles = {
  [index: string]: string;
};

export default function AnswerOptions({
  answerOptions,
  initialSelected,
  correct,
  answerIsCorrect,
  colorTheme,
}: Props) {
  // * -------------------------------------------------------------------------------------
  // * Selections and clicks
  // * -------------------------------------------------------------------------------------
  // * STATE:
  // * Keep track of which answer is selected, index like array
  const [selected, setSelected] = useState<number>(initialSelected);

  // * STATE:
  const [answeredCorrectly, setAnsweredCorrectly] = useState<boolean>(false);
  useEffect(() => {
    setAnsweredCorrectly(false);
  }, [answerOptions]);

  // * Handle correct answer, check if selection or question changes
  useEffect(() => {
    if (selected === correct) {
      setAnsweredCorrectly(true);
      answerIsCorrect();
    }
  }, [selected, answerOptions]);

  // * Handle click, only works if current answer is wrong
  const selectOnClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const target = event.target as Element;
    if (!answeredCorrectly) {
      setSelected(parseInt(target.id[0]));
    }
  };

  // * -------------------------------------------------------------------------------------
  // * Bubble Animation and Styles
  // * -------------------------------------------------------------------------------------

  // * State:
  // * Get widths of list and items to determine if they have wrapped
  const [listWidth, setListWidth] = useState<number>(0);
  const [answerWidth, setAnswerWidth] = useState<number>(0);

  const refUL = useRef<any>([]);
  const refAnswers = useRef<any>([]);

  // * At screen resize or question change: calculate widths to apply correct styles
  useEffect(() => {
    // ! Aggressively refreshes, should cap to reduce rerenders
    function handleResize() {
      // * Get the width of the list container, minus 4 for 2px border
      setListWidth(refUL.current.offsetWidth - 4);
      // * Get the width of the first answer
      setAnswerWidth(refAnswers.current[0].offsetWidth);
      // ! Reconsider for >2 answers.
      // TODO: Given how many answer options, generate properties of bubble
    }
    // * Add event listener
    window.addEventListener('resize', handleResize);
    // * Call handler right away so state gets updated with initial values
    handleResize();
    // * Remove event listener on cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, [answerOptions]);

  // * Styling for bubble, needs to be able to travel left/right or up/down
  const [bubbleClass, setBubbleClass] = useState<string>('');

  useEffect(() => {
    if (listWidth <= answerWidth) {
      setBubbleClass(
        'selection-bubble-ud ' + (selected === 0 ? 'slide-up' : 'slide-down')
      );
    } else {
      setBubbleClass(
        'selection-bubble-lr ' + (selected === 0 ? 'slide-left' : 'slide-right')
      );
    }
  }, [listWidth, answerWidth, selected]);

  let answerStyle: InlineStyles = {
    border: '2px solid ' + colors[colorTheme + 'Border'],
  };

  let bubbleStyle: InlineStyles = {
    backgroundColor: colors[colorTheme + 'BubbleBG'],
  };

  let textStyle: InlineStyles = {
    color: colors[colorTheme + 'SelectedText'],
  };

  return (
    <li ref={refUL} className='answer-options' style={answerStyle}>
      <div className={bubbleClass} style={bubbleStyle}></div>
      {answerOptions.map((option, index) => (
        <div
          ref={(ref) => {
            refAnswers.current[index] = ref;
          }}
          id={index + option}
          onClick={selectOnClick}
          className={'single-option'}
          style={index === selected ? textStyle : undefined}
          key={index + option}
        >
          {option}
        </div>
      ))}
    </li>
  );
}
