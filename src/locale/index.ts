export { default as zh } from './lang/zh'
export { default as en } from './lang/en'


export type LanguageContent = {
  [key: string]: string | LanguageContent
}

export type Languages = {
  name: string
  content: LanguageContent
}
