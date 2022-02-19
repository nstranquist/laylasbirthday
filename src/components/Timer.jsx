import { useState, useEffect } from 'react'
import { getSeconds } from './FarmTown'

export const Timer = ({
  timer,
  removeTimer,
  iconSize = 24,
  fontStyles = {},
  containerStyles = {},
  showDebug = false
}) => {
  const [timeLeft, setTimeLeft] = useState(timer.timeLeft || timer.duration)
  const [timerInterval, setTimerInterval] = useState(null)

  useEffect(() => {
    const endTime = timer.duration + timer.startTime
    setTimeLeft(Math.ceil(endTime - getSeconds()))

    const interval = setInterval(() => {
      setTimeLeft(Math.ceil(endTime - getSeconds()))
    }, [1000])

    setTimerInterval(interval)

    return () => stopTimer()
  }, [])

  useEffect(() => {
    if(timeLeft <= 0) {
      stopTimer()
      removeTimer(timer.id)
    }

    return () => stopTimer()
  }, [timeLeft])

  const stopTimer = () => timerInterval && clearInterval(timerInterval)

  if(showDebug) {
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

  return (
    <div className="timer-container" style={{...containerStyles}}>
      <img
        src={'/ui-icons/clock.svg'}
        height={iconSize}
        width={iconSize}
        alt="time"
        className="timer-icon"
      />
      <p className="timer-text" style={{...fontStyles}}>{timeLeft}s</p>
    </div>
  )
}