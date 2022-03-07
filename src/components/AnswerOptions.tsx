// * Styles
import './AnswerOptions.scss';

type Props = {
  answerOptions: string[]
  correct: number
}

export default function AnswerOptions({answerOptions, correct} : Props) {

  return (
    <li className='answer-options'>
      {answerOptions.map((option, index) => (
        <div key={index + option}>{option}</div>
      ))}
    </li>
  )
}
