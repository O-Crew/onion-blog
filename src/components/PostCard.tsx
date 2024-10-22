import { CalendarIcon } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Post } from '@/types/pages'

interface PostProps {
  post: Post
}
export default function PostCard({ post }: PostProps) {
  return (
    <Card key={post.path} className="bg-transparent border-none shadow-none">
      <CardHeader className="p-0">
        <CardTitle className="text-base font-normal">
          <a
            href={`/post/${post.path.replace('.md', '')}`}
            className="hover:text-white text-gray-400 transition-colors duration-300"
          >
            {post.data.title}
          </a>
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
