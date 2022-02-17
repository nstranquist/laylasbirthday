/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
author: joe_carrot (https://sketchfab.com/joe_carrot)
license: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
source: https://sketchfab.com/models/c46d64155bae47d4a0888cdfcf8c27dc
title: Egg
*/

import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export default function Model({ ...props }) {
  const group = useRef()
  const { nodes, materials } = useGLTF('/models/egg.glb')
  return (
    <group ref={group} {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <group rotation={[Math.PI / 2, 0, 0]}>
          <mesh geometry={nodes.defaultMaterial.geometry} material={materials.DefaultMaterial} />
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/models/egg.glb')