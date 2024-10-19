'use client'
import { motion } from 'framer-motion'
import { MotionWordProps } from '@/types/components'

export default function MotionWord({ word }: MotionWordProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      {word.text}
    </motion.div>
  )
}
