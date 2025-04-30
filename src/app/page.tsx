import Hero from '@/components/Hero'
import { AnimateSign } from '@/components/AnimateSign'
import About from '@/components/About'
import Projects from '@/components/Project'
import Contact from '@/components/contact'
import Blog from '@/components/Blog'
import { getPostList } from '@/utils/docs'
export default function HomePage() {
  const posts = getPostList()
  return (
    <main className="min-h-screen bg-transparent">
      <header className="py-4 bg-opacity-20 backdrop-filter backdrop-blur-sm z-50 absolute left-1/2 -translate-x-1/2 md:left-0 md:translate-x-0">
        <AnimateSign />
      </header>
      <Hero />
      <Blog posts={posts} />
      <About />
      <Projects/>
      <Contact/>
    </main>
  )
}
