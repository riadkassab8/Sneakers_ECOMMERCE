'use client'

import { useRef, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, Html, useGLTF } from '@react-three/drei'
import * as THREE from 'three'

function LoadingFallback() {
  return (
    <Html center>
      <div className="flex flex-col items-center gap-4">
        <div className="w-16 h-16 border-4 border-accent border-t-transparent rounded-full animate-spin" />
        <span className="text-foreground text-sm tracking-widest">LOADING</span>
      </div>
    </Html>
  )
}

export function HeroScene() {
  return (
    <div className="h-screen relative">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={<LoadingFallback />}>
          <RealSneakerModel />
          <Environment preset="city" />
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.3} penumbra={1} intensity={2} color="#f5e642" />
          <spotLight position={[-10, 5, -10]} angle={0.3} penumbra={1} intensity={1.5} />
          <pointLight position={[0, -3, 0]} intensity={0.8} color="#f5e642" />
        </Suspense>
      </Canvas>
    </div>
  )
}

// Load real sneaker GLB model
function RealSneakerModel() {
  const { scene } = useGLTF('https://market.pmnd.rs/model/sneaker')
  const meshRef = useRef<THREE.Group>(null)
  
  useFrame((state) => {
    if (!meshRef.current) return
    const time = state.clock.elapsedTime
    
    // Smooth rotation
    meshRef.current.rotation.y = time * 0.3
    
    // Gentle float
    meshRef.current.position.y = Math.sin(time * 0.8) * 0.2
    
    // Slight tilt
    meshRef.current.rotation.x = Math.sin(time * 0.5) * 0.05
  })
  
  return (
    <group ref={meshRef}>
      <primitive object={scene} scale={3} rotation={[0, 0, 0]} />
    </group>
  )
}

// Preload the model
useGLTF.preload('https://market.pmnd.rs/model/sneaker')

// Product viewer for product detail page (kept for compatibility)
export function ProductViewer({ autoRotate = false }: { autoRotate?: boolean }) {
  return (
    <Canvas 
      camera={{ position: [4, 2, 4], fov: 50 }}
      shadows
      gl={{ antialias: true, alpha: true }}
    >
      <Suspense fallback={<LoadingFallback />}>
        <RealSneakerModel />
        <Environment preset="studio" />
        <ambientLight intensity={0.5} />
        <directionalLight
          position={[5, 10, 7]}
          intensity={1.5}
          castShadow
        />
        <directionalLight
          position={[-5, 5, -3]}
          intensity={0.5}
          color="#ffd4a3"
        />
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]} receiveShadow>
          <planeGeometry args={[20, 20]} />
          <shadowMaterial opacity={0.4} />
        </mesh>
      </Suspense>
    </Canvas>
  )
}

// Sketchfab Embed Viewer (kept for compatibility)
export function SketchfabViewer({ modelId }: { modelId: string }) {
  return (
    <div className="w-full h-full">
      <iframe
        src={`https://sketchfab.com/models/${modelId}/embed?autostart=1&ui_theme=dark&ui_hint=0&ui_controls=1&ui_infos=0&ui_stop=0`}
        className="w-full h-full border-0"
        allow="autoplay; fullscreen; xr-spatial-tracking"
        allowFullScreen
      />
    </div>
  )
}
