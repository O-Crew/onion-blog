'use client'

import { filesAtom } from '@/atom/docsAtom'
import PostCard from '@/components/PostCard'
import { Post } from '@/types/pages'
import { useAtom } from 'jotai'
import { useEffect } from 'react'

interface PostListProps {
  initialFiles: Post[]
}
export default function PostList({ initialFiles }: PostListProps) {
  const [files, setFiles] = useAtom(filesAtom)
  useEffect(() => {
    setFiles(initialFiles)
  }, [initialFiles, setFiles])

  return (
    <div className="flex  flex-col">
      {files.map((post) => (
        <PostCard key={post.path} post={post} />
      ))}
    </div>
  )
}
