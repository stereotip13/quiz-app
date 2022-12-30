import React, { Component } from 'react'
import Answer from './answer/Answer'
import Question from './question/Question'
import './QuizMain.css'

export default class Quiz extends Component {
  // initialization local state
  state = {
    questions: {
      1: 'В каком городе родился джаз?',
      2: 'Столица греции?',
      3: 'На какой планете родился Супермэн?',
    },
    answers: {
      1: {
        1: 'Чикаго',
        2: 'Новый Орлеан',
        3: 'Нью-йорк',
      },
      2: {
        1: 'Афины',
        2: 'Парнас',
        3: 'Каламата',
      },
      3: {
        1: 'Krypton',
        2: 'Mars',
        3: 'Saturn',
      },
    },
    correctAnswers: {
      1: '2',
      2: '1',
      3: '1',
    },
    correctAnswer: 0,
    clickedAnswer: 0,
    step: 1,
    score: 0,
  }
  checkAnswer = (answer) => {
    const { correctAnswers, step, score } = this.state
    if (answer === correctAnswers[step]) {
      this.setState({
        score: score + 1,
        correctAnswer: correctAnswers[step],
        clickedAnswer: answer,
      })
    } else {
      this.setState({
        correctAnswer: 0,
        clickedAnswer: answer,
      })
    }
  }
  nextStep = (step) => {
    this.setState({
      step: step + 1,
      correctAnswer: 0,
      clickedAnswer: 0,
    })
  }
  render() {
    let { questions, answers, correctAnswer, clickedAnswer, step, score } =
      this.state
    return (
      <div className="Content">
        {step <= Object.keys(questions).length ? (
          <>
            <Question question={questions[step]} />
            <Answer
              answer={answers[step]}
              step={step}
              checkAnswer={this.checkAnswer}
              correctAnswer={correctAnswer}
              clickedAnswer={clickedAnswer}
            />
            <button
              className="NextStep"
              disabled={
                clickedAnswer && Object.keys(questions).length >= step
                  ? false
                  : true
              }
              onClick={() => this.nextStep(step)}
            >
              Next
            </button>
          </>
        ) : (
          <div>
            <h1>Конец тестирования</h1>
            <p>
              Количество верных ответов: {score} из{' '}
              {Object.keys(questions).length}
            </p>
          </div>
        )}
      </div>
    )
  }
}
