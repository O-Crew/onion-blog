'use client'
import { PerspectiveCamera } from '@react-three/drei'
import { ComputerModel } from './ComputerModel'
import { Canvas } from '@react-three/fiber'
import { motion } from 'framer-motion'

export default function Blog() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4, duration: 1, ease: 'easeOut' }}
        className="relative mt-12 aspect-square w-full max-w-2xl mx-auto"
      >
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-primary/5 to-transparent rounded-[40px]" />
        <Canvas>
          <PerspectiveCamera position={[0, 0, 5]} />
          <ambientLight intensity={1} />
          <directionalLight position={[5, 5, 5]} intensity={2} />
          <directionalLight position={[-5, -5, -5]} intensity={1} />
          <ComputerModel />
        </Canvas>
      </motion.div>
    </section>
  )
}
