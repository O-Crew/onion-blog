'use client'
import { filesAtom } from '@/atom/docsAtom'
import { useAtomValue } from 'jotai'
import { useParams } from 'next/navigation'
import ReactMarkdown from 'react-markdown'

export default function DynamicPage() {
  const params = useParams()
  const slug = params.slug
  const files = useAtomValue(filesAtom)
  const post = files.find((file) => file.path === slug) || {
    path: '',
    data: {},
    content: ''
  }

  return (
    <div>
      <h1>动态页面</h1>
      <p>当前路径: {Array.isArray(slug) ? slug.join('/') : slug}</p>
      <ReactMarkdown className="prose prose-invert">
        {post.content}
      </ReactMarkdown>
    </div>
  )
}
