import { getPostList } from '@/utils/docs'
import PostList from '@/components/PostList'

export default function BlogPage() {
  const files = getPostList()
  console.log(files)

  return <PostList initialFiles={files} />
}
