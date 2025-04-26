"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import Image from "next/image"
import avatarImage from '@/assets/image/avatar.png'


export default function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  return (
    <section id="about" className="w-full bg-background px-4 py-16 md:py-24">
      <div className="container mx-auto">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid gap-8 md:grid-cols-2 md:gap-12"
        >
          <motion.div variants={itemVariants} className="relative aspect-square w-full max-w-md mx-auto md:mx-0">
            <Image
              src={avatarImage}
              alt="头像"
              fill
              className="rounded-full mb-4"
            />
            <div className="absolute -bottom-4 -right-4 h-24 w-24 rounded-full bg-primary"></div>
            <div className="absolute -top-4 -left-4 h-16 w-16 rounded-full bg-primary/20"></div>
          </motion.div>
          <div className="flex flex-col justify-center space-y-6">
            <motion.div variants={itemVariants} className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">About Me</h2>
              <div className="h-1 w-20 bg-primary"></div>
            </motion.div>
            <motion.p variants={itemVariants} className="text-muted-foreground">
            你好！我是 Onion-L，一名热爱技术和创新的前端开发者。在这个博客中，我将分享我的编程经验、技术见解以及个人项目。
            我相信通过持续学习和分享，我们可以共同进步。无论你是初学者还是经验丰富的开发者，我希望你能在这里找到有价值的内容。
            欢迎探索我的文章和项目，也欢迎通过网站上的联系方式与我交流。希望你在这里玩得开心！
            </motion.p>
            <motion.p variants={itemVariants} className="text-muted-foreground">
            Hey there! I&apos;m Onion-L, a front-end developer passionate about technology and innovation. On this blog, I&apos;ll be sharing my programming experiences, technical insights, and personal projects.
            I believe that through continuous learning and sharing, we can all grow together. Whether you&apos;re a beginner or an experienced developer, I hope you can find valuable content here.
            Feel free to explore my articles and projects, and you&apos;re also welcome to connect with me through the contact information on the website. I hope you have fun here!
            </motion.p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
