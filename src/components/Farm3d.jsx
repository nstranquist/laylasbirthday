import { useState, useEffect, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, MapControls, Sky, Environment, OrthographicCamera, Html, Select } from '@react-three/drei'
import { nanoid } from '../utils/nanoid'

export const GROUND_COLOR = '#3d2814'
export const GROUND_COLOR_2 = '#654321'
// export const GRASS_COLOR = '#034B03'
export const GRASS_COLOR = '#316033'
export const GRASS_COLOR_HIGHLIGHTED = '#80B145'
export const GRASS_COLOR_SELECTED = '#59954A'

export const TILE_PADDING = .12

export const tileSchema = {
  id: 'sampleid',
  plotType: 'carrot', // the id of the plot, maybe a type enum for 'crop', 'building', etc.
  name: 'tile-5',
  y: 2,
  x: 1
}
export const plotTypes = ['empty', 'carrot']
export const cropTypes = ['carrot', /* ... */]
export const buildingTypes = [/* ... */]

export const generateMockTiles = (length, dimX, dimY) => {
  let tiles = []
  // const gridArea = dimX * dimY
  const middleRow = Math.floor(dimY / 2)
  const middleCol = Math.floor(dimX / 2)
  for(let i=0; i<length; i++) {
    let row = Math.floor(i / dimX) - middleRow
    let col = i % dimX - middleCol
    tiles.push({
      id: nanoid(),
      plotCode: 0,
      plotType: 'empty',
      name: `tile-${i}`,
      y: row,
      x: col
    })
  }
  return tiles
}

export const emptyTile = {
  id: ''
}

export const Farm3d = ({
  selectedTile,
  setSelectedTile
}) => {
  const [mockTiles, setMockTiles] = useState(generateMockTiles(9, 3, 3))
  const [helperGridPos, setHelperGridPos] = useState([0, 0, 0])
  const [dimensions, setDimensions] = useState({ x: 3, y: 3 })
  const [hoveredId, setHoveredId] = useState('')
  const [canRotate, setCanRotate] = useState(true)

  useEffect(() => {
    console.log('mock tiles:', mockTiles)
  }, [mockTiles])

  useEffect(() => {
    if(selectedTile.id)
      setCanRotate(false)
    else
      setCanRotate(true)
  }, [selectedTile])

  const handleMeshClick = (tile) => {
    if(selectedTile.id === tile.id)
      setSelectedTile(emptyTile)
    else
      setSelectedTile(tile)
  }

  const handleMeshEnter = (id) => {
    setHoveredId(id)
  }

  const handleMeshExit = () => {
    setHoveredId('')
  }

  return (
    <Canvas
      pixelRatio={window.devicePixelRatio}
      camera={{
        position: [5, 10, 5],
      }}
      style={{height:"100%",width:"100%", position: 'absolute'}}
    >
      <Suspense fallback={<Html>loading farm...</Html>}>
      {/* <OrthographicCamera makeDefault zoom={50} position={[5, 10, 5, 10]} origin /> */}

      <OrbitControls
        enableZoom
        enableDamping
        enablePan
        enableRotate={canRotate}
        dampingFactor={0.25}
        // minPolarAngle={-Math.PI}
        // maxPolarAngle={-Math.PI}
        maxZoom={175}
        minZoom={15}
        screenSpacePanning
      />
      {/* <MapControls /> */}

      <ambientLight intensity={0.75} />
      <directionalLight position={[5, 5, 5]} intensity={0.75} />
      <spotLight position={[-15,80,-15]} intensity={0.16} />

      {/* <gridHelper args={[dimensions.x, dimensions.y, `white`, `gray`]} position={helperGridPos} /> */}

      {/* <Sky distance={50} /> */}

        <Environment
          background // Whether to affect scene.background
          path={'/'}
          files={'air_museum_playground_4k.hdr'}
        />

      {/* Ground */}
      <mesh rotation={[-Math.PI/2, 0, 0]} position={[helperGridPos[0],-.1,helperGridPos[2]]}>
        <planeGeometry args={[dimensions.x + TILE_PADDING,dimensions.y + TILE_PADDING]} />
        <meshPhongMaterial color={GROUND_COLOR_2} />
      </mesh>
      
      <mesh position={[0,0,0]}>
        {/* <Select
          box
          multiple
          onChange={handleSelectChange}> */}
          {mockTiles.map(tile => (
            <mesh
              castShadow
              receiveShadow 
              rotation={[-Math.PI/2,0,0]}
              position={[tile.x,0,tile.y]}
              key={`${tile.id}`}
              onClick={() => handleMeshClick(tile)}
              onPointerEnter={() => handleMeshEnter(tile.id)}
              onPointerLeave={() => handleMeshExit()}
            >
              <planeGeometry args={[1 - TILE_PADDING, 1 - TILE_PADDING]} />
              <meshPhongMaterial color={hoveredId === tile.id ? GRASS_COLOR_HIGHLIGHTED : selectedTile.id === tile.id ? GRASS_COLOR_SELECTED : GRASS_COLOR} />
            </mesh>
          ))}
        {/* </Select> */}
      </mesh>
      </Suspense>

    </Canvas>
  )
}