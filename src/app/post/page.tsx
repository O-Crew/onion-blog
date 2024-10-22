import { getPostList } from '@/utils/docs'
import PostList from '@/components/PostList'

export default function BlogPage() {
  const files = getPostList()
  return <PostList initialFiles={files} />
}
