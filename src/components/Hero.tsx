"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Canvas } from "@react-three/fiber"
import RotatingCube from "./RotatingCube"

export default function Hero() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden">
      <div className="container mx-auto flex min-h-screen flex-col items-center justify-center px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-center justify-center space-y-8 pt-20 text-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="relative"
          >
            <div className="absolute h-48 w-48 md:-left-32 md:-top-32 left-1/2 -translate-x-1/2 md:translate-x-0 top-1/2 -translate-y-56 md:translate-y-0 rounded-xl bg-transparent">
              <Canvas>
                <ambientLight intensity={1} />
                <directionalLight position={[5, 5, 5]} intensity={2} />
                <RotatingCube />
              </Canvas>
            </div>
            <h1 className="text-4xl font-bold font-schoolbell tracking-tight sm:text-6xl md:text-7xl">
              Hi, I&apos;m <span className="text-primary">Onion-L<span className="waving-hand">🖐️</span></span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-xl text-muted-foreground md:text-3xl"
          >
            Web Developer & Student
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="max-w-xl text-sm text-muted-foreground"
          >
            I can do Frontend Development.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <Button size="lg" className="min-w-[160px]" asChild>
              <Link href="#contact">Get in Touch</Link>
            </Button>
            <Button size="lg" variant="outline" className="min-w-[160px]" asChild>
              <Link href="#projects">View My Work</Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}