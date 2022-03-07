import React from 'react'

type Props = {
  answerOptions: string[]
  correct: number
}

export default function AnswerOptions({answerOptions, correct} : Props) {

  return (
    <li>
      <div>{answerOptions[0]}</div>
      <div>{answerOptions[1]}</div>
      <div>{correct} is right</div>
    </li>
  )
}
