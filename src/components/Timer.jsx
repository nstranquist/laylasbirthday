import { useState, useEffect } from 'react'
import { getSeconds } from './FarmTown'

export const Timer = ({
  timer,
  removeTimer
}) => {
  const [timeLeft, setTimeLeft] = useState(timer.timeLeft || timer.duration)
  const [timerInterval, setTimerInterval] = useState(null)

  useEffect(() => {
    const endTime = timer.duration + timer.startTime
    // begin the interval
    const interval = setInterval(() => {
      // decrememnt seconds
      setTimeLeft(Math.ceil(endTime - getSeconds()))
    }, [1000])

    setTimerInterval(interval)

    return () => stopTimer()
  }, [])

  useEffect(() => {
    if(timeLeft <= 0) {
      console.log('time to stop the timer')
      removeTimer(timer.id)
    }
  }, [timeLeft])

  const stopTimer = () => timerInterval && clearInterval(timerInterval)

  return (
    <div className="temp-timer-item">
      <h4>Timer: {timeLeft}s left</h4>
      <p>id: {timer.id}</p>
      <p>tileId: {timer.tileId}</p>
      <p>duration: {timer.duration}</p>
      <p>start: {timer.startTime}</p>
    </div>
  )
}