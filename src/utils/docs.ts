import fs from 'fs'
import path from 'node:path'
import matter from 'gray-matter'

const docsDirectory = path.join(process.cwd(), 'pages')
export const postDirectory = path.join(docsDirectory, 'post')

export function getDocByName(
  filePath: string,
  dirPath: string = docsDirectory
) {
  const fullPath = path.join(
    dirPath,
    filePath.endsWith('.md') ? filePath : `${filePath}.md`
  )

  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)
  return { path: filePath, data, content }
}

export function useDocsLoad(file: string) {
  const doc = getDocByName(file)
  return doc
}

export function getPostList() {
  const postList = fs.readdirSync(postDirectory)
  const postData = postList.map((post) => {
    const data = getDocByName(post, postDirectory)
    return data
  })
  return postData.sort((a, b) => {
    const dateA = new Date(a.data.date)
    const dateB = new Date(b.data.date)

    if (isNaN(dateA.getTime())) return 1
    if (isNaN(dateB.getTime())) return -1

    return dateB.getTime() - dateA.getTime()
  })
}
