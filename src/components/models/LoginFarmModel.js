/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
author: EdwinRC (https://sketchfab.com/Edwin3D)
license: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
source: https://sketchfab.com/3d-models/low-poly-farm-879d61d8dfc048548ee380cace6f79d3
title: Low Poly Farm
*/

import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export default function Model({ ...props }) {
  const group = useRef()
  const { nodes, materials } = useGLTF('/models/farm-model.glb')
  return (
    <group ref={group} {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <mesh geometry={nodes.mesh_0.geometry} material={materials.Clouds} />
        <mesh geometry={nodes.mesh_1.geometry} material={materials.Corn1} />
        <mesh geometry={nodes.mesh_2.geometry} material={materials.Corn2} />
        <mesh geometry={nodes.mesh_3.geometry} material={materials.Tractor} />
        <mesh geometry={nodes.mesh_4.geometry} material={materials.Windmill2} />
        <mesh geometry={nodes.mesh_5.geometry} material={materials.LightB} />
        <mesh geometry={nodes.mesh_6.geometry} material={materials.Corn3} />
        <mesh geometry={nodes.mesh_7.geometry} material={materials.Black} />
        <mesh geometry={nodes.mesh_8.geometry} material={materials.Silo3} />
        <mesh geometry={nodes.mesh_9.geometry} material={materials.Brown} />
        <mesh geometry={nodes.mesh_10.geometry} material={materials.Tractor3} />
        <mesh geometry={nodes.mesh_11.geometry} material={materials.Fences} />
        <mesh geometry={nodes.mesh_12.geometry} material={materials.Barn3} />
        <mesh geometry={nodes.mesh_13.geometry} material={materials.Tractor4} />
        <mesh geometry={nodes.mesh_14.geometry} material={materials.Scarecrow2} />
        <mesh geometry={nodes.mesh_15.geometry} material={materials.Ground2} />
        <mesh geometry={nodes.mesh_16.geometry} material={materials.Windmill} />
        <mesh geometry={nodes.mesh_17.geometry} material={materials.Scarec3} />
        <mesh geometry={nodes.mesh_18.geometry} material={materials.Ground} />
        <mesh geometry={nodes.mesh_19.geometry} material={materials.Dirt} />
        <mesh geometry={nodes.mesh_20.geometry} material={materials.HayBale2} />
        <mesh geometry={nodes.mesh_21.geometry} material={materials.Silo5} />
        <mesh geometry={nodes.mesh_22.geometry} material={materials.Tractor2} />
        <mesh geometry={nodes.mesh_23.geometry} material={materials.HayBale} />
        <mesh geometry={nodes.mesh_24.geometry} material={materials.Metal} />
        <mesh geometry={nodes.mesh_25.geometry} material={materials.material} />
        <mesh geometry={nodes.mesh_26.geometry} material={materials.Barn2} />
        <mesh geometry={nodes.mesh_27.geometry} material={materials.Hen4} />
        <mesh geometry={nodes.mesh_28.geometry} material={materials['Cow1.001']} />
        <mesh geometry={nodes.mesh_29.geometry} material={materials.Barn} />
        <mesh geometry={nodes.mesh_30.geometry} material={materials.Pine} />
        <mesh geometry={nodes.mesh_31.geometry} material={materials.Hen3} />
        <mesh geometry={nodes.mesh_32.geometry} material={nodes.mesh_32.material} />
        <mesh geometry={nodes.mesh_33.geometry} material={nodes.mesh_33.material} />
        <mesh geometry={nodes.mesh_34.geometry} material={materials.Trunk} />
        <mesh geometry={nodes.mesh_35.geometry} material={materials.Green} />
        <mesh geometry={nodes.mesh_36.geometry} material={materials.Hen2} />
        <mesh geometry={nodes.mesh_37.geometry} material={materials.Gray} />
        <mesh geometry={nodes.mesh_38.geometry} material={materials.Hen_2} />
        <mesh geometry={nodes.mesh_39.geometry} material={materials.Cow1} />
        <mesh geometry={nodes.mesh_40.geometry} material={materials.Cow2} />
      </group>
    </group>
  )
}

useGLTF.preload('/models/farm-model.glb')