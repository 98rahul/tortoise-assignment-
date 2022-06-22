import './App.css'
import React, { useState, useEffect } from 'react'
import Tortoise from './tortoise'
function App() {
  const [min, setMin] = useState(0)
  const [sec, setSec] = useState(0)
  const [counter, setCounter] = useState(0)
  var timer
  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    timer = setInterval(() => {
      setSec(sec + 1)
      if (sec === 59 || sec > 59) {
        setMin(min + 1)
        setSec(0)
      }
    }, 1000)
    return () => clearInterval(timer)
  })
  const handleReset = () => {
    setCounter(0)
    setMin(0)
    setSec(0)
  }
  const handleStop = () => {
    clearInterval(timer)
    console.log('stop')
  }
  return (
    <div className="App">
      <Tortoise
        min={min}
        sec={sec}
        setSec={setSec}
        counter={counter}
        setCounter={setCounter}
        handleReset={handleReset}
        handleStop={handleStop}
      />
    </div>
  )
}

export default App
