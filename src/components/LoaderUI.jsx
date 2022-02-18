import { Html, useProgress } from '@react-three/drei'

export const Loader = ({ color = '#fff'}) => {
  const { progress } = useProgress()

  return <Html center style={{color}}>{progress.toFixed(0)} % loaded</Html>
}