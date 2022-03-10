// * React
import React, { useState, useEffect, useRef } from 'react';

// * Styles
import './AnswerOptions.scss';
import colors from '../styles/_variables.module.scss';

type Props = {
  answerOptions: string[];
  initialSelected: number;
  correct: number;
  allCorrect: boolean;
  totalCorrectUpdater: (correct: boolean) => void;
  colorTheme: string;
};

type InlineStyles = {
  [index: string]: string;
};

const useIsMount = () => {
  const isMountRef = useRef(true);
  useEffect(() => {
    isMountRef.current = false;
  }, []);
  return isMountRef.current;
};

export default function AnswerOptions({
  answerOptions,
  initialSelected,
  correct,
  allCorrect,
  totalCorrectUpdater,
  colorTheme,
}: Props) {
  // * -------------------------------------------------------------------------------------
  // * Selections and clicks
  // * -------------------------------------------------------------------------------------
  // * STATE:
  // * Keep track of which answer is selected, index like array
  const [selected, setSelected] = useState<number>(initialSelected);

  // * If answer is correct, tell App to +1 to total
  useEffect(() => {
    if (selected === correct) {
      totalCorrectUpdater(selected === correct);
    }
  }, [selected]);

  // * After the questions change (but not on mount), tell App about correct guesses
  const isMount = useIsMount();
  useEffect(() => {
    if (!isMount) {
      if (selected === correct) {
        totalCorrectUpdater(selected === correct);
      }
    }
  }, [answerOptions]);

  // * Handle click, only works if not fully correct
  const selectOnClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const target = event.target as Element;
    if (!allCorrect) {
      setSelected(parseInt(target.id[0]));
      if (parseInt(target.id[0]) !== correct) {
        // * If the selection is wrong tell App to -1 to total. We only want to do this in the case that the guess was correct but the user clicked off it
        totalCorrectUpdater(false);
      }
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
