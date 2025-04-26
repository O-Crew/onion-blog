"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ExternalLinkIcon, GithubIcon } from "lucide-react"
import Link from "next/link"
import onionl from "@/assets/image/onionl.png"
import imaglish from "@/assets/image/imaglish.png"
import vue from "@/assets/image/vue.png"

export default function Projects() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  const projects = [
    {
      title: "Onionl-UI🧅",
      description: "A modern, lightweight open-source frontend UI component library based on Vue 3 and TypeScript, utilizing an atomic CSS solution (UnoCSS) for flexible styling capabilities.",
      image:onionl,
      tags: ["Vue", "TypeScript", "UnoCSS"],
      liveUrl: "https://onionl-ui.netlify.app/",
      githubUrl: "https://github.com/Onion-L/onionl-ui",
    },
    {
      title: "Imaglish",
      description: "A learning application that uses image association to accelerate English vocabulary memorization. It combines visual learning principles with AI technology to provide users with a more intuitive, efficient, and fun way to memorize words by establishing deeper vocabulary memory through strongly associated images.",
      image: imaglish,
      tags: ["React", "Firebase", "Material UI", "Redux"],
      liveUrl: "https://imaglish.com/",
      githubUrl: "#",
    },
    {
      title: "Vue Core",
      description: "Aimed to deeply understand and implement the core parts of Vue 3 source code, including its reactivity system, component system, and virtual DOM, to gain a better understanding of Vue 3's working principles and implement a minimal version.",
      image: vue,
      tags: ["Vue", "TypeScript", "Jest", "Rollup"],
      liveUrl: "#",
      githubUrl: "https://github.com/Onion-L/mini-vue-implement",
    },
  ]

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
            Here are some of my recent projects. Each one was built to solve a specific problem or explore new
            technologies.
          </p>
        </motion.div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {projects.map((project, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group overflow-hidden rounded-lg bg-background shadow-md transition-all hover:shadow-lg"
            >
              <div className="relative aspect-video overflow-hidden">
                <Image
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  width={600}
                  height={400}
                  className="object-contain transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <h3 className="mb-2 text-xl font-semibold">{project.title}</h3>
                <p className="mb-4 text-muted-foreground line-clamp-3">{project.description}</p>
                <div className="mb-4 flex flex-wrap gap-2">
                  {project.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex gap-3">
                  <Button size="sm" variant="outline" asChild>
                    <Link href={project.liveUrl}>
                      <ExternalLinkIcon className="mr-2 h-4 w-4" />
                      Live Demo
                    </Link>
                  </Button>
                  <Button size="sm" variant="outline" asChild>
                    <Link href={project.githubUrl}>
                      <GithubIcon className="mr-2 h-4 w-4" />
                      GitHub
                    </Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
