import { getPostList, getDocByName, postDirectory } from '@/utils/docs'
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import Image from 'next/image'

export async function generateStaticParams() {
  const posts = getPostList()
  return posts.map((post) => ({
    slug: post.path.replace('.md', '')
  }))
}
// TODO replace highlighter with shiki.js
export default function DynamicPage({ params }: { params: { slug: string } }) {
  const slug = params.slug
  const { content } = getDocByName(slug, postDirectory)

  return (
    <div className="flex flex-col justify-center w-full">
      <div className="w-full h-4"></div>
      <ReactMarkdown
        components={{
          img: ({ src, alt }) => {
            const srcPath =
              process.env.NODE_ENV === 'development'
                ? src
                : `/onion-blog/${src}`
            return (
              <Image
                className="mx-auto"
                src={srcPath || ''}
                alt={alt || ''}
                width={600}
                height={400}
              />
            )
          },
          code: ({ className, children }) => {
            if (className?.startsWith('language-')) {
              const language = className?.split('-')[1].toLowerCase()
              return (
                <SyntaxHighlighter language={language} style={vscDarkPlus}>
                  {String(children).replace(/\n$/, '')}
                </SyntaxHighlighter>
              )
            }
            return <code className={className}>{children}</code>
          }
        }}
        className="prose prose-invert max-w-2xl w-full mx-auto"
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}
