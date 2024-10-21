'use client'
import { useParams } from 'next/navigation'

export default function DynamicPage() {
  const params = useParams()
  const slug = params.slug

  return (
    <div>
      <h1>动态页面</h1>
      <p>当前路径: {Array.isArray(slug) ? slug.join('/') : slug}</p>
    </div>
  )
}
