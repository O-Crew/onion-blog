import { getPostList, getDocByName, postDirectory } from '@/utils/docs'
import ReactMarkdown from 'react-markdown'
import Image from 'next/image'

export async function generateStaticParams() {
  const posts = getPostList()
  return posts.map((post) => ({
    slug: post.path
  }))
}

export default function DynamicPage({ params }: { params: { slug: string } }) {
  const slug = params.slug

  const { content } = getDocByName(slug, postDirectory)

  return (
    <div>
      <h1>动态页面</h1>
      <p>当前路径: {Array.isArray(slug) ? slug.join('/') : slug}</p>
      <ReactMarkdown
        components={{
          img: ({ src, alt }) => (
            <Image
              src={src || ''}
              alt={alt || ''}
              width={500}
              height={300}
              layout="responsive"
            />
          )
        }}
        className="prose prose-invert"
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}
