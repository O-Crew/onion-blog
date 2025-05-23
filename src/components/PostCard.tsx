import { CalendarIcon } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Post } from '@/types/pages'
import { useRouter } from 'next/navigation'

interface PostProps {
  post: Post
}
export default function PostCard({ post }: PostProps) {
  const router = useRouter()
  const navigateTo = (path: string) => {
    router.push(`/post/${path.replace('.md', '')}`)
  }
  return (
    <Card 
      onClick={() => navigateTo(post.path)}
      key={post.path} 
      className="bg-transparent px-4 py-2 w-full hover:scale-105 transition-all duration-300"
    >
      <CardHeader className="p-0">
        <CardTitle className="text-base font-normal">
          <div
            className="hover:text-gray-950 cursor-pointer text-gray-800 transition-colors duration-300"
          >
            {post.data.title}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0 mt-1">
        <div className="flex items-center text-xs text-gray-600">
          <CalendarIcon className="h-3 w-3 mr-1" />
          <time dateTime={post.data.date}>
            {new Date(post.data.date!).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </time>
        </div>
      </CardContent>
    </Card>
  )
}
