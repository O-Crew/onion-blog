"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { MailIcon, GithubIcon, LinkedinIcon, TwitterIcon } from "lucide-react"
import Link from "next/link"

export default function Contact() {
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
    <section id="contact" className="w-full bg-muted/30 px-4 py-16 md:py-24">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mx-auto mb-12 max-w-2xl text-center"
        >
          <h2 className="text-3xl font-bold font-schoolbell tracking-tight sm:text-4xl">Get In Touch</h2>
          <div className="mx-auto mt-2 h-1 w-20 bg-primary"></div>
          <p className="mt-4 text-muted-foreground">
            Want to be friends with me? Feel free to reach out to me using the form below or through
            my contact information.
          </p>
        </motion.div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid gap-8 md:grid-cols-2"
        >
          <motion.div variants={itemVariants} className="space-y-6">
            <h3 className="text-2xl font-semibold">Contact Information</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <MailIcon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium">onionl5236@gmail.com</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-2xl font-semibold">Follow Me</h3>
              <div className="flex gap-4">
                <Link
                  href="https://github.com/Onion-L"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-background shadow-sm transition-colors hover:bg-primary hover:text-primary-foreground"
                >
                  <GithubIcon className="h-5 w-5" />
                </Link>
                <Link
                  href="https://www.linkedin.com/in/xiang-li-22b9a420b/"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-background shadow-sm transition-colors hover:bg-primary hover:text-primary-foreground"
                >
                  <LinkedinIcon className="h-5 w-5" />
                </Link>
                <Link
                  href="https://x.com/broccoli1212312"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-background shadow-sm transition-colors hover:bg-primary hover:text-primary-foreground"
                >
                  <TwitterIcon className="h-5 w-5" />
                </Link>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
