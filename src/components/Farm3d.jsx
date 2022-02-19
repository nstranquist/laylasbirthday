import { useState, useEffect, Suspense } from 'react'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { OrbitControls, Environment, Html} from '@react-three/drei'
import { nanoid } from '../utils/nanoid'
import { greenColors } from '../style/colors'
import CarrotModel from './models/Carrot'
import PotatoModel from './models/Potato'
import KaleModel from './models/Kale'
import EggModel from './models/Egg'
import CornModel from './models/Corn'
import StrawberryModel from './models/Strawberry'
import BlueberryModel from './models/Blueberry'
import HeckberryModel from './models/Fancy-grass'
import * as THREE from 'three'
import { Loader } from './LoaderUI'

export const GROUND_COLOR = '#3d2814'
export const GROUND_COLOR_2 = '#654321'
// export const GRASS_COLOR = '#034B03'

// TODO: Better Grass Colors (brighter, is better)
export const GRASS_COLOR_SELECTED = greenColors.green6 //#80B145'//'#316033'
export const GRASS_COLOR_HIGHLIGHTED = greenColors.green5 // '#80B145'
export const GRASS_COLOR = greenColors.green3

export const TILE_PADDING = .12

export const tileSchema = {
  id: 'sampleid',
  plotCode: 1,
  plotType: 'carrot', // the id of the plot, maybe a type enum for 'crop', 'building', etc.
  name: 'tile-5',
  y: 2,
  x: 1
}
export const plotTypes = ['empty', 'carrot', 'potato', 'kale', 'egg', 'corn', 'strawberry', 'blueberry', 'heckberry']
export const cropTypes = ['carrot', 'potato', 'kale', 'egg', 'corn', 'strawberry', 'blueberry', 'heckberry']
export const buildingTypes = []
export const cropCodes = [1,2,3,4,5,6,7,8]

export const CARROT_SCALE = 0.05
export const POTATO_SCALE = 0.1
export const KALE_SCALE = 0.14
export const CORN_SCALE = 0.5
export const STRAWBERRY_SCALE = 0.0015
export const BLUEBERRY_SCALE = 0.008

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

export const MAX_TILES = 225
export const MAX_TILES_X = 15
export const MAX_TILES_Y = 15

export const Farm3d = ({
  mockTiles,
  setMockTiles,
  selectedTileId,
  selectedTilePlotCode,
  selectTile,
}) => {
  const [helperGridPos, setHelperGridPos] = useState([-0.5, 0, -0.5])
  const [dimensions, setDimensions] = useState({ x: 4.35, y: 4.35 })
  const [hoveredId, setHoveredId] = useState('')
  const [canRotate, setCanRotate] = useState(true)

  useEffect(() => {
    if(selectedTileId && selectedTilePlotCode === 0)
      setCanRotate(false)
    else
      setCanRotate(true)
  }, [selectedTileId, selectedTilePlotCode])

  const handleMeshClick = (tile) => {
    if(selectedTileId === tile.id)
      selectTile(emptyTile)
    else
      selectTile(tile)
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
      <Suspense fallback={<Loader />}>
        {/* <OrthographicCamera makeDefault zoom={50} position={[5, 10, 5, 10]} origin /> */}

        <OrbitControls
          enableZoom
          enableDamping
          enablePan={false}
          enableRotate={canRotate}
          dampingFactor={0.25}
          minPolarAngle={0}
          maxPolarAngle={Math.PI / 2 - 0.2}
          minDistance={2}
          maxDistance={25}
          screenSpacePanning
          // min/max zoom for orthographic camera only
          minZoom={15}
          maxZoom={175}
        />
        {/* <MapControls /> */}

        <ambientLight intensity={0.75} />
        <directionalLight position={[5, 5, 5]} intensity={0.75} />
        <spotLight position={[-15,80,-15]} intensity={0.16} />

        {/* <gridHelper args={[dimensions.x, dimensions.y, `white`, `gray`]} position={helperGridPos} /> */}

        {/* <Sky distance={50} /> */}

          <Environment
            background // Whether to affect scene.background
            // path={'/'}
            // files={'air_museum_playground_4k.hdr'}
            preset={'sunset'}
          />

        {/* Ground */}
        <GroundPlane
          position={[helperGridPos[0],-.05,helperGridPos[2]]}
          args={[dimensions.x + TILE_PADDING,dimensions.y + TILE_PADDING]}
        />

        {/* Expand Farm Plane */}
        {/* <GroundPlane
          position={[helperGridPos[0],-.12,helperGridPos[2]]}
          args={[dimensions.x + 2 + TILE_PADDING,dimensions.y + 2 + TILE_PADDING]}
        /> */}

        <group position={[0,0,0]} castShadow receiveShadow>
        {/* <Select
          box
          multiple
          onChange={handleSelectChange}> */}
          {mockTiles.map(tile => {
            const tileColor = hoveredId === tile.id ? GRASS_COLOR_HIGHLIGHTED : selectedTileId === tile.id ? GRASS_COLOR_SELECTED : GRASS_COLOR
            return (
              <group position={[tile.x,0,tile.y]} key={`${tile.id}`} castShadow receiveShadow>
                {tile.plotCode !== 0 && <CropTile code={tile.plotCode} />}
                <mesh
                  castShadow
                  receiveShadow 
                  rotation={[-Math.PI/2,0,0]}
                  onClick={() => handleMeshClick(tile)}
                  onPointerEnter={() => handleMeshEnter(tile.id)}
                  onPointerLeave={() => handleMeshExit()}
                >
                  <planeGeometry args={[1 - TILE_PADDING, 1 - TILE_PADDING]} />
                  {/* {tile.plotCode === 0 ? ( */}
                    <GrassTile color={tileColor} />
                  {/* )
                  //  : (
                  //   <meshPhongMaterial color={tileColor} />
                  // )} */}
                </mesh>
              </group>
            )
          })}
        {/* </Select> */}
        </group>
      </Suspense>
    </Canvas>
  )
}

export const GrassTile = ({ color=GRASS_COLOR }) => {
  const grassTileMap = useLoader(THREE.TextureLoader, `tiles/grass.png`)

  return (
    <meshPhongMaterial map={grassTileMap} color={color} />
  )
}

export const GroundPlane = ({
  position,
  args,
  textureUrl = `tiles/dirt-2.jpg`
}) => {
  const dirtTileMap = useLoader(THREE.TextureLoader, textureUrl)

  return (
    <mesh rotation={[-Math.PI/2, 0, 0]} position={position} castShadow receiveShadow>
      <planeGeometry args={args} />
      <meshPhongMaterial map={dirtTileMap} color={GROUND_COLOR_2} />
    </mesh>
  )
}

export const CropTile = ({
  code
}) => {

  switch(code) {
    case 1:
      return <CarrotModel scale={[CARROT_SCALE, CARROT_SCALE, CARROT_SCALE]} />
    case 2:
      return <PotatoModel scale={[POTATO_SCALE, POTATO_SCALE, POTATO_SCALE]} />
    case 3:
      return <KaleModel scale={[KALE_SCALE, KALE_SCALE, KALE_SCALE]} />
    case 4:
      return <EggModel scale={[KALE_SCALE, KALE_SCALE, KALE_SCALE]} />
    case 5:
      return <CornModel scale={[CORN_SCALE, CORN_SCALE, CORN_SCALE]} />
    case 6:
      return <StrawberryModel scale={[STRAWBERRY_SCALE, STRAWBERRY_SCALE, STRAWBERRY_SCALE]} />
    case 7:
      return <BlueberryModel scale={[BLUEBERRY_SCALE, BLUEBERRY_SCALE, BLUEBERRY_SCALE]} />
    case 8:
      return <HeckberryModel position={[0, .2, 0]} scale={[KALE_SCALE, KALE_SCALE, KALE_SCALE]} />
    default:
      <></>
  }
}