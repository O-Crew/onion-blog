export interface Post {
  path: string
  data: {
    title?: string
    description?: string
    date?: string
    tags?: string[]
  }
  content: string
}
