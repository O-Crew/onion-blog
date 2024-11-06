import { useLocale } from '@/hooks/useLocale'
import { zh } from '@/locale'

export default function ProjectPage() {
  const { t } = useLocale(zh)
  return <div>{t('content.hello')}</div>
}
