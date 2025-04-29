"use client"

import { motion } from "framer-motion"
import { ArrowDownIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
// import dynamic from 'next/dynamic'
import ModelComponent from "./ModelComponent"

// 使用动态导入避免服务器端渲染Three.js组件
// const Model = dynamic(() => import('./ModelComponent'), { 
//   ssr: false,
//   loading: () => <div className="h-full w-full flex items-center justify-center">加载中...</div>
// })

export default function Hero() {
  return (
    <section className="relative min-h-[90%] w-full overflow-hidden px-4 py-12 md:py-24">
      <div className="container mx-auto grid items-center gap-8 md:grid-cols-2 md:gap-12">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col space-y-6"
        >
          <div className="space-y-2">
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-4xl font-bold font-schoolbell tracking-tight sm:text-5xl md:text-6xl"
            >
              Hi, I&apos;m <span className="text-primary">Onion-L</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-xl text-muted-foreground md:text-2xl"
            >
              Web Developer & Student
            </motion.p>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="max-w-md text-muted-foreground"
          >
            I can do Frontend Development.
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="flex flex-wrap gap-4"
          >
            <Button size="lg" asChild>
              <Link href="#contact">Get in Touch</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="#projects">View My Work</Link>
            </Button>
          </motion.div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative mx-auto aspect-square w-full max-w-md"
        >
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/20 to-primary/5"></div>
          <ModelComponent />
        </motion.div>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <Link href="#about" className="flex flex-col items-center text-muted-foreground hover:text-foreground">
          <span className="mb-2 text-sm">Scroll Down</span>
          <ArrowDownIcon className="h-6 w-6 animate-bounce" />
        </Link>
      </motion.div>
    </section>
  )
}