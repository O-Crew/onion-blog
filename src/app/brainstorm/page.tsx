'use client'
import React from 'react'
import { motion } from 'framer-motion'

const words = [
  { text: '创意', size: 'text-4xl' },
  { text: '灵感', size: 'text-3xl' },
  { text: '思考', size: 'text-2xl' },
  { text: '创新', size: 'text-4xl' },
  { text: '想象', size: 'text-3xl' }
]

export default function BrainstormPage() {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      {words.map((word, index) => {
        return (
          <motion.div
            key={index}
            className={`absolute top-1/${index} left-1/${index} text-white ${word.size}`}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            {index + word.text}
          </motion.div>
        )
      })}
    </div>
  )
}
