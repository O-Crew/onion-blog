'use client'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { useState } from 'react'

const navItems = [
  { path: '/', label: 'Home' },
  { path: '/blog', label: 'Blog' },
  { path: '/project', label: 'Projects' },
  { path: '/about', label: 'About' }
]

export function Navigation() {
  const router = useRouter()
  const [active, setActive] = useState('/')

  const navigateTo = (path: string) => () => {
    setActive(path)
    router.push(path)
  }

  const isActive = (path: string) => active === path

  return (
    <nav>
      <ul className="flex space-x-4">
        {navItems.map(({ path, label }) => (
          <li key={path}>
            <Button
              className={`${isActive(path) ? 'underline' : ''}`}
              onClick={navigateTo(path)}
              variant="link"
            >
              &lt;{label} /&gt;
            </Button>
          </li>
        ))}
      </ul>
    </nav>
  )
}
