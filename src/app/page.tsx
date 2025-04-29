import Hero from '@/components/Hero'
import { AnimateSign } from '@/components/AnimateSign'
import About from '@/components/About'
import Projects from '@/components/Project'
import Contact from '@/components/contact'
import Blog from '@/components/Blog'

export default function HomePage() {
  return (
    <main className="min-h-screen bg-transparent">
      <header className="py-4 bg-opacity-20 backdrop-filter backdrop-blur-sm z-50 absolute">
        <AnimateSign />
      </header>
      <Hero />
      <Blog/>
      <About />
      <Projects/>
      <Contact/>
    </main>
  )
}
