"use client"
import * as THREE from "three"
import { ScreenQuad, useTexture } from "@react-three/drei"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { useMemo } from "react"
import vertex from "@/glsl/vertex.glsl"
import fragment from "@/glsl/fragment.glsl"

const Drip = ({ background }) => {
  return (
    <Canvas
      className="background"
      gl={{
        antialias: true,
        outputColorSpace: THREE.SRGBColorSpace,
        localClippingEnabled: true,
      }}
      dpr={[1, 2]}
      flat={THREE.ACESFilmicToneMapping}
    >
      <BackGround background={background} />
    </Canvas>
  )
}

const BackGround = ({ background }) => {
  const { size } = useThree()
  const texture = useTexture(background)
  const uniforms = useMemo(
    () => ({
      u_time: { value: 0 },
      u_resolution: { value: null },
      u_texture: { value: texture },
    }),
    [],
  )
  useFrame((state, delta) => {
    uniforms.u_time.value = state.clock.elapsedTime
    uniforms.u_resolution.value = new THREE.Vector2(size.width, size.height)
  })
  return (
    <>
      <ScreenQuad>
        {/* <planeGeometry arg={[2, 2, 1, 1]} /> */}
        <shaderMaterial
          vertexShader={vertex}
          fragmentShader={fragment}
          uniforms={uniforms}
        />
      </ScreenQuad>
    </>
  )
}

export default Drip
