/* eslint-disable @typescript-eslint/no-explicit-any */
import { Languages } from '@/locale'
import { get } from 'lodash'

const buildTranslation = (locale: any) => {
  return (path: string) => get(locale, path, path)
}

// TODO i18n
export const useLocale = (localeConfig?: Languages) => {
  const locale = localeConfig
  return { lang: locale?.name, t: buildTranslation(locale) }
}
