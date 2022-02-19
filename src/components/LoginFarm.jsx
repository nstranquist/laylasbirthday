import { Suspense } from "react"
import { OrbitControls, Sky } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"
import LoginFarmModel from './models/LoginFarmModel'
import { Loader } from "./LoaderUI"

const DISTANCE = 100
const PADDING = 100

const getMaxDistance = (a, padding=PADDING) => {
  const distanceSq = Math.pow(a + padding, 2)
  return Math.sqrt((distanceSq + distanceSq), 2)
}
const maxDistance= getMaxDistance(DISTANCE)

const LoginFarm = () => {

  return (
    <Canvas
      pixelRatio={window.devicePixelRatio}
      camera={{ position: [DISTANCE,DISTANCE,DISTANCE]}}
      style={{height: '100%', width: '100%'}} // position: 'absolute'
    >
      <Suspense fallback={<Loader />}>
        <ambientLight intensity={0.6} />

        <Sky />

        <OrbitControls
          autoRotate
          enablePan={false}
          rotateSpeed={0.75}
          enableRotate={false}
          enableZoom
          minDistance={9}
          maxDistance={maxDistance}
        />

          {/* Model stuff */}
          <LoginFarmModel />
      </Suspense>
    </Canvas>
  )
}

export default LoginFarm
