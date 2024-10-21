import { atom } from 'jotai'
import { Post } from '@/types/pages'

export const filesAtom = atom<Post[]>([{ path: '/', data: {}, content: '' }])
