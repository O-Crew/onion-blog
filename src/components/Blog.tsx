'use client'

import { motion } from 'framer-motion'
import PostList from '@/components/PostList'
import { Post } from '@/types/pages'
import { Canvas } from '@react-three/fiber'
import { PerspectiveCamera } from '@react-three/drei'
import Cube from './Cube'
import { useEffect, useState } from 'react'

interface BlogProps {
  posts: Post[]
}

export default function Blog({ posts }: BlogProps) {
  const [isMobile, setIsMobile] = useState(false)

  const handleResize = () => {
    setIsMobile(window.innerWidth < 768)
  }
  
  useEffect(() => {
    handleResize()
    window.addEventListener('resize', handleResize)
    
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <section id="blog" className="w-full min-h-screen bg-background px-4 py-16 md:py-24">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mx-auto mb-12 max-w-2xl text-center"
        >
          <h2 className="text-3xl font-bold font-schoolbell tracking-tight sm:text-4xl">Blog</h2>
          <div className="mx-auto mt-2 h-1 w-20 bg-primary"></div>
          <p className="mt-4 text-muted-foreground">
            Here are some blog posts I&apos;ve written. I hope you like them.
          </p>
        </motion.div>
        
        <div className="flex flex-col md:flex-row md:justify-around h-full gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="w-full md:max-w-2xl"
          >
            <PostList initialFiles={posts} />
          </motion.div>
          
          <div className="w-full h-64 md:w-1/2 md:h-[500px] mt-8 md:mt-0">
            <Canvas>
              <PerspectiveCamera position={[0, 0, 5]} />
              <ambientLight intensity={1.5} />
              <directionalLight position={[5, 5, 5]} intensity={2.5} />
              <directionalLight position={[-5, -5, -5]} intensity={1.5} />
              <pointLight position={[0, 2, 4]} intensity={0.5} />
              <Cube 
                scale={isMobile ? 0.008 : 0.01}
                position={isMobile ? [0, 0, 0] : [0, 0.4, 1.2]}
                rotation={[0.75, 0.8, 0]}
              />
            </Canvas>
          </div>
        </div>
      </div>
    </section>
  )
}
