import { useState, useEffect } from 'react'
import { getSeconds } from './FarmTown'

export const Timer = ({
  timerDuration,
  timerStartTime,
  removeTimer,
  iconSize = 24,
  fontStyles = {},
  containerStyles = {}
}) => {
  const [timeLeft, setTimeLeft] = useState(timerDuration)

  useEffect(() => {
    const endTime = timerDuration + timerStartTime
    setTimeLeft(Math.ceil(endTime - getSeconds()))

    const interval = setInterval(() => {
      setTimeLeft(prev => {
        const newTime = Math.ceil(prev - 1)
        if(timeLeft <= 0) {
          // stopTimer()
        }
        return newTime;
      })
      if(timeLeft <= 0) {
        removeTimer()
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [])

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