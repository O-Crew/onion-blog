'use client'
import { useDocsLoad } from '@/utils/docs'
import { useEffect } from 'react'

export default function MdContent() {
  const docs = useDocsLoad('home')
  useEffect(() => {
    console.log(docs)
  }, [])
  return <div>hello</div>
}
