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
  const homeFile = useDocsLoad('home')

  return (
    <div className="flex justify-center items-center min-h-full">
      <div className="container mx-auto max-w-5xl flex flex-col md:flex-row">
        <div className="w-full md:w-1/3 pr-0 md:pr-8 flex flex-col items-center md:items-start mb-8 md:mb-0">
          <div className="relative w-48 h-48 md:w-56 md:h-56 mb-4">
            <Image
              src={avatarImage}
              alt="头像"
              fill
              className="rounded-full mb-4"
            />
          </div>
          <h2 className="text-2xl font-bold mb-2 text-center md:text-left">
            Onion-L
          </h2>
          <p className="mb-2 text-center md:text-left">前端开发者 | 学生</p>
          <div className="mb-4 w-full">
            <div className="flex flex-col space-y-2">
              <div className="flex items-center justify-center md:justify-start">
                <MdEmail className="mr-2" />
                <span className="text-sm md:text-base">
                  Email: lixiang020317@gmail.com
                </span>
              </div>
              <div className="flex items-center justify-center md:justify-start">
                <FaGithub className="mr-2" />
                GitHub:
                <Button variant="link" asChild>
                  <Link href="https://github.com/Onion-L">@Onion-L</Link>
                </Button>
              </div>
              <div className="flex items-center justify-center md:justify-start">
                <FaXTwitter className="mr-2" />
                <span>: @Onion_L</span>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full md:w-2/3 px-4 md:px-0">
          <ReactMarkdown className="prose prose-invert max-w-none">
            {homeFile.content}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  )
}
