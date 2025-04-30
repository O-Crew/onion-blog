'use client'
import { motion } from 'framer-motion'

export default function Blog() {
  return (
    <section id="blog" className="w-full bg-background px-4 py-16 md:py-24">
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
       
      </div>
    </section>
  )
}
