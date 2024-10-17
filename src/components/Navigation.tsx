'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'

export function Navigation() {
  const router = useRouter()
  const navigateTo = (path: string) => () => {
    router.push(path)
  }

  return (
    <nav>
      <ul className="flex space-x-4">
        <li>
          <Button onClick={navigateTo('/')} variant="link">
            &lt;Home /&gt;
          </Button>
        </li>
        <li>
          <Button onClick={navigateTo('/blog')} variant="link">
            &lt;Blog /&gt;
          </Button>
        </li>
        <li>
          <Button onClick={navigateTo('/project')} variant="link">
            &lt;Projects /&gt;
          </Button>
        </li>
        <li>
          <Button onClick={navigateTo('/about')} variant="link">
            &lt;About /&gt;
          </Button>
        </li>
      </ul>
    </nav>
  )
}
