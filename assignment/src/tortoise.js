import React, { useState, useEffect } from 'react'
import './Tortoise.css'
const Tortoise = ({
  min,
  sec,
  setSec,
  setCounter,
  counter,
  handleReset,
  handleStop,
}) => {
  const [text, setText] = useState('')
  const [bestTime, setBestTime] = useState({ minute: 0, second: 0 })
  const [showFailure, setShowFailure] = useState(false)
  let alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const generateAlphabetFunction = () => {
    let x = Math.random() * 26
    const generateAlphabet = alphabet.charAt(x)
    setText(generateAlphabet)
  }
  console.log('counter', counter)

  const handleInput = (e) => {
    const inputText = e.target.value.toUpperCase()
    const len = inputText.length

    if (inputText.charAt(len - 1) === text && counter !== 20) {
      console.log('++')
      setCounter(counter + 1)
      generateAlphabetFunction()
    } else if (inputText !== text) {
      setSec(sec + 5)
    }
  }
  useEffect(() => {
    generateAlphabetFunction()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const data = localStorage.getItem('winner')
    console.log('dd', data)
    if (data) {
      setBestTime(JSON.parse(data))
    }
  }, [])
  useEffect(() => {
    let winnerData = JSON.parse(localStorage.getItem('winner'))
    console.log('winnerData', winnerData)
    // logic //FIXME
    let previousWinnerTimeTaken = winnerData.minute * 60 + winnerData.second
    console.log('timeTaken1', previousWinnerTimeTaken)
    let claimWinnerTimeTake = 60 * min + sec
    console.log('claimWinnerTimeTake', claimWinnerTimeTake)
    if (counter === 20) {
      // console.log('timeTaken', previousWinnerTimeTaken)

      claimWinnerTimeTake < previousWinnerTimeTaken
        ? setBestTime({ minute: min, second: sec })
        : setShowFailure(!showFailure)
    }
  }, [counter])

  useEffect(() => {
    let getData = localStorage.getItem('winner')
    console.log('getd', getData)

    localStorage.setItem('winner', JSON.stringify(bestTime))
    localStorage.setItem('counter', JSON.stringify(counter))
  }, [bestTime, counter])

  return (
    <div className="container">
      <p>Type The Alphabet</p>
      <span>
        Typing game to see how fast you type. Timer starts when you do :0
      </span>
      <div className="card">
        {counter === 20 && !showFailure ? (
          <span>SUCCESS!</span>
        ) : counter === 20 && showFailure ? (
          <span>FAIL!</span>
        ) : (
          <span>{text}</span>
        )}
      </div>
      <div className="time">
        <span>
          Time: {min < 10 ? '0' + min : min}:{sec < 10 ? '0' + sec : sec}{' '}
        </span>

        <span>
          my best Time:
          {bestTime.minute < 10 ? '0' + bestTime.minute : bestTime.minute}:
          {bestTime.second < 10 ? '0' + bestTime.second : bestTime.second}
        </span>
      </div>
      <div className="footer">
        <input placeholder="Type..." onChange={handleInput} />
        <button onClick={handleReset}>Reset</button>
      </div>
    </div>
  )
}

export default Tortoise
