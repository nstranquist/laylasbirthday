import { Suspense } from "react"
import { OrbitControls, Sky } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"
import LoginFarmModel from './models/LoginFarmModel'
import { Loader } from "./LoaderUI"

const getMaxDistance = (a) => {
  const distanceSq = Math.pow(a, 2)
  return Math.sqrt((distanceSq + distanceSq), 2)
}
const maxDistance= getMaxDistance(100)

const LoginFarm = () => {

  return (
    <Canvas
      pixelRatio={window.devicePixelRatio}
      camera={{ position: [100,100,100]}}
      style={{height: '100%', width: '100%'}} // position: 'absolute'
    >
      <Suspense fallback={<Loader />}>
        <ambientLight intensity={0.6} />

        <Sky />

        <OrbitControls
          autoRotate
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
