'use client'
import { useRouter, usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { useEffect, useState } from 'react'

const navItems = [
  { path: '/', label: 'Home' },
  { path: '/post', label: 'Blog' },
  { path: '/project', label: 'Projects' }
]

export function Navigation() {
  const router = useRouter()
  const pathname = usePathname()
  const [active, setActive] = useState(pathname)

  useEffect(() => {
    setActive(pathname)
  }, [pathname])

  const navigateTo = (path: string) => () => {
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
