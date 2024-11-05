/* eslint-disable @typescript-eslint/no-explicit-any */
import { get } from 'lodash'

const buildTranslation = (locale: any) => {
  return (path: string) => get(locale, path)
}

// TODO i18n
export const useLocale = (locale: any) => {
  return { t: buildTranslation(locale) }
}
