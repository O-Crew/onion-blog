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

// {
//   className: 'language-TypeScript',
//   node: {
//     type: 'element',
//     tagName: 'code',
//     properties: { className: [Array] },
//     children: [ [Object] ],
//     position: { start: [Object], end: [Object] }
//   },
//   children: '    const cleanup = () => {\r\n' +
//     '    cleanups.forEach(fn => fn())\r\n' +
//     '    cleanups.length = 0\r\n' +
//     '  }\r\n' +
//     ' \r\n' +
//     '  const register =\r\n' +
//     '  (el: any, event: string, listener: any, options: any) => {\r\n' +
//     '    el.addEventListener(event, listener, options)\r\n' +
//     '    return () => el.removeEventListener(event, listener, options)\r\n' +
//     '  }\r\n' +
//     '\r\n' +
//     '  const stopWatch = watch(\r\n' +
//     '    () => [unrefElement(target as unknown as MaybeElementRef),toValue(options)],\r\n' +
//     '    ([el, options]) => {\r\n' +
//     '      cleanup()\r\n' +
//     '      if (!el)\r\n' +
//     '        return\r\n' +
//     '      const optionsClone = isObject(options) ? { ...options } : options\r\n' +
//     '      cleanups.push(\r\n' +
//     '        ...(events as string[]).flatMap((event) => {\r\n' +
//     '    return (listeners as Function[])\r\n' +
//     '        .map(listener => register(el, event, listener, optionsClone))\r\n' +
//     '        }),\r\n' +
//     '      )\r\n' +
//     '    },\r\n' +
//     "    { immediate: true, flush: 'post' },\r\n" +
//     '  )\r\n' +
//     ' \r\n' +
//     '  const stop = () => {\r\n' +
//     '    stopWatch()\r\n' +
//     '    cleanup()\r\n' +
//     '  }\r\n' +
//     '  tryOnScopeDispose(stop)\n'
// }
