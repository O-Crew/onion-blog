import Image from 'next/image'
import avatarImage from '@/assets/image/avatar.png'
import { FaGithub } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'
import ReactMarkdown from 'react-markdown'
import { MdEmail } from 'react-icons/md'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useDocsLoad } from '@/utils/docs'

export default function HomePage() {
  const docs = useDocsLoad('home')

  return (
    <div className="flex justify-center items-center min-h-full">
      <div className="container mx-auto max-w-5xl flex">
        <div className="w-1/3 pr-8">
          <div className="relative w-56 h-56 mb-4">
            <Image
              src={avatarImage}
              alt="头像"
              fill
              className="rounded-full mb-4"
            />
          </div>
          <h2 className="text-2xl font-bold mb-2">Onion-L</h2>
          <p className="mb-2">前端开发者 | 学生</p>
          <div className="mb-4">
            <div className="flex flex-col space-y-2">
              <div className="flex items-center">
                <MdEmail className="mr-2" />
                <span>Email: lixiang020317@gmail.com</span>
              </div>
              <div className="flex items-center">
                <FaGithub className="mr-2" />
                GitHub:
                <Button variant="link" asChild>
                  <Link href="https://github.com/Onion-L">@Onion-L</Link>
                </Button>
              </div>
              <div className="flex items-center">
                <FaXTwitter className="mr-2" />
                <span>: @Onion_L</span>
              </div>
            </div>
          </div>
        </div>
        <div className="w-2/3">
          <ReactMarkdown className="prose prose-invert">
            {docs.content}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  )
}
