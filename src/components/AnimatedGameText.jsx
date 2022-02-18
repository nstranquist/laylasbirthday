import { useSpring, animated } from '@react-spring/web'

const GOLD_COLOR = '#F9A602'

export const AnimatedGameText = ({
  text=[],
  DURATION,
}) => {
  const styles = useSpring({
    to: [
      { opacity: 0, color: GOLD_COLOR, top: '38%' },
      { opacity: 0.7, color: GOLD_COLOR, top: '44%' },
    ],
    from: {
      opacity: 1, color: GOLD_COLOR, top: '48%'
    },
    config: { duration: DURATION }
  })

  return (
    <animated.div style={styles} className="animated-game-text noselect">
      {text.map((item, index) => (
        <animated.p key={`text-p-${index}`} className="game-text-item">{item}</animated.p>
      ))}
    </animated.div>
  )
}