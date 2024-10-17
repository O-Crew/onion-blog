import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'

const docsDirectory = path.join(process.cwd(), 'docs')

export function getDocBySlug(filePath: string) {
  const fullPath = path.join(docsDirectory, `${filePath}.md`)
  console.log(fullPath)

  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)
  return { path: filePath, docs: data, content }
}

export function useDocsLoad(file: string) {
  // const fullPath = path.join(docsDirectory, `${file}.md`)

  // const slugs = fs.readdirSync(docsDirectory)
  const docs = getDocBySlug(file)
  return docs
}
