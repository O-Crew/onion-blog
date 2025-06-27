"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { Suspense, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { ExternalLinkIcon, GithubIcon, ChevronLeftIcon, ChevronRightIcon } from "lucide-react"
import Link from "next/link"
import onionl from "@/assets/image/onionl.png"
import imaglish from "@/assets/image/imaglish.png"
import vue from "@/assets/image/vue.png"
import { Canvas } from "@react-three/fiber"
import { PerspectiveCamera } from "@react-three/drei"
import { Computer } from "./Computer"
// Use Leva to control the computer model
// import { Leva, useControls } from 'leva'


export default function Projects() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })
  const [currentIndex, setCurrentIndex] = useState(0)
  const [screenZoomIn, setScreenZoomIn] = useState(false)

  //   const controls = useControls("Computer",{
  //   positionX:{
  //     value: 0,
  //     min: -10,
  //     max: 10,
  //     step: 0.1,
  //   },
  //   positionY:{
  //     value: 0,
  //     min: -10,
  //     max: 10,
  //     step: 0.1,
  //   },
  //   positionZ:{
  //     value: 0,
  //     min: -10,
  //     max: 10,
  //     step: 0.1,
  //   },
  //   scale:{
  //     value: 1,
  //     min: 0.1,
  //     max: 10,
  //     step: 0.1,
  //   },
  //   rotationX:{
  //     value: 0,
  //     min: -10,
  //     max: 10,
  //     step: 0.1,
  //   } ,
  //   rotationY:{
  //     value: 0,
  //     min: -10,
  //     max: 10,
  //     step: 0.1,
  //   },  
  //   rotationZ:{
  //     value: 0,
  //     min: -10,
  //     max: 10,
  //     step: 0.1,
  //   },
  // })

  const projects = [
    {
      title: "Onionl-UI🧅",
      description: "A modern, lightweight open-source frontend UI component library based on Vue 3 and TypeScript, utilizing an atomic CSS solution (UnoCSS) for flexible styling capabilities.",
      image: onionl,
      tags: ["Vue", "TypeScript", "UnoCSS"],
      liveUrl: "https://onionl-ui.netlify.app/",
      githubUrl: "https://github.com/Onion-L/onionl-ui",
    },
    {
      title: "Imaglish",
      description: "An English vocabulary learning app powered by AI-generated image associations, helping users create more intuitive and lasting memory connections with words.",
      image: imaglish,
      tags: ["React", "Supabase", "shadcn/ui", "DeepSeek"],
      liveUrl: "https://imaglish.com/",
      githubUrl: "#",
    },
    {
      title: "Vue Core",
      description: "Aimed to deeply understand and implement the core parts of Vue 3 source code, including its reactivity system, component system, and virtual DOM.",
      image: vue,
      tags: ["Vue", "TypeScript", "Jest", "Rollup"],
      liveUrl: "#",
      githubUrl: "https://github.com/Onion-L/mini-vue-implement",
    },
  ]

  const handleScreenZoomIn = () => {
    setScreenZoomIn(true)
  }

  const handleScreenZoomOut = () => {
    setScreenZoomIn(false)
  }

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? projects.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === projects.length - 1 ? 0 : prev + 1))
  }

  return (
    <section id="projects" className="w-full bg-background px-4 py-16 md:py-24">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mx-auto mb-12 max-w-2xl text-center"
        >
          <h2 className="text-3xl font-bold font-schoolbell tracking-tight sm:text-4xl">Projects</h2>
          <div className="mx-auto mt-2 h-1 w-20 bg-primary"></div>
          <p className="mt-4 text-muted-foreground">
          以下是我做过的一些个人项目
          </p>
        </motion.div>

        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          className="relative mx-auto max-w-5xl"
        >
          <div className="overflow-hidden rounded-2xl border bg-background shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <motion.div
                key={currentIndex + "-content"}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col justify-between bg-muted/80 p-8"
              >
                <div>
                  <h3 className="mb-4 text-2xl font-bold">{projects[currentIndex].title}</h3>
                  <p className="mb-6 text-base text-muted-foreground">{projects[currentIndex].description}</p>
                  <div className="mb-6 flex flex-wrap gap-2">
                    {projects[currentIndex].tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="rounded-full bg-primary/10 px-3 py-1.5 text-sm font-medium text-primary"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-3">
                    <Button size="sm" variant="outline" asChild>
                      <Link href={projects[currentIndex].liveUrl}>
                        <ExternalLinkIcon className="mr-2 h-4 w-4" />
                        Live Demo
                      </Link>
                    </Button>
                    <Button size="sm" variant="outline" asChild>
                      <Link href={projects[currentIndex].githubUrl}>
                        <GithubIcon className="mr-2 h-4 w-4" />
                        GitHub
                      </Link>
                    </Button>
                  </div>
                </div>
                
                <div className="mt-8 flex items-center gap-3">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={handlePrevious}
                    aria-label="Previous project"
                    className="h-8 w-8 rounded-full"
                  >
                    <ChevronLeftIcon className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={handleNext}
                    aria-label="Next project"
                    className="h-8 w-8 rounded-full"
                  >
                    <ChevronRightIcon className="h-4 w-4" />
                  </Button>
                </div>
              </motion.div>

              <motion.div
                key={currentIndex + "-image"}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="relative aspect-[3/2]"
                onMouseEnter={handleScreenZoomIn}
                onMouseLeave={handleScreenZoomOut}
              >
                <Suspense fallback={null}>
        {/* <Leva /> */}

          <Canvas >
            <PerspectiveCamera position={[0, 0, 5]} />
            <ambientLight intensity={1} />
            <directionalLight position={[5, 5, 5]} intensity={2} />
            <directionalLight position={[-5, -5, -5]} intensity={1} />
            <Computer 
            position={screenZoomIn ? [0, -0.3, 1.2] : [0.4, 0.1, 1.7]} 
            scale={screenZoomIn ? 2 : 1}
            rotation={screenZoomIn ? [0, 0, 0] : [-0.1, -0.4, 0]}
            image={projects[currentIndex].image}
            />
          </Canvas>
        </Suspense>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
