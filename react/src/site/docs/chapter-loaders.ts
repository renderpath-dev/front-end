import { lazy } from 'react'
import type { ComponentType, LazyExoticComponent } from 'react'

export const chapterSlugs = [
  'chapter-01-react-introduction',
  'chapter-02-jsx-and-components',
  'chapter-03-props-basics',
  'chapter-04-state-and-events',
  'chapter-05-rendering-data',
  'chapter-06-forms',
  'chapter-07-effects-and-refs',
  'chapter-08-state-architecture',
  'chapter-09-async-data',
  'chapter-10-routing-url-state',
  'chapter-11-performance-memoization',
  'chapter-12-testing-quality',
  'chapter-13-nextjs-ssr-rsc',
  'chapter-14-react-19-actions-compiler',
  'chapter-15-production-frontend-architecture',
  'chapter-16-sellerhub-capstone',
] as const

export type ChapterSlug = (typeof chapterSlugs)[number]

type ChapterContentComponent = LazyExoticComponent<ComponentType>

export const chapterContentBySlug: Record<ChapterSlug, ChapterContentComponent> = {
  'chapter-01-react-introduction': lazy(() => import('./chapters/Chapter01Content')),
  'chapter-02-jsx-and-components': lazy(() => import('./chapters/Chapter02Content')),
  'chapter-03-props-basics': lazy(() => import('./chapters/Chapter03Content')),
  'chapter-04-state-and-events': lazy(() => import('./chapters/Chapter04Content')),
  'chapter-05-rendering-data': lazy(() => import('./chapters/Chapter05Content')),
  'chapter-06-forms': lazy(() => import('./chapters/Chapter06Content')),
  'chapter-07-effects-and-refs': lazy(() => import('./chapters/Chapter07Content')),
  'chapter-08-state-architecture': lazy(() => import('./chapters/Chapter08Content')),
  'chapter-09-async-data': lazy(() => import('./chapters/Chapter09Content')),
  'chapter-10-routing-url-state': lazy(() => import('./chapters/Chapter10Content')),
  'chapter-11-performance-memoization': lazy(() => import('./chapters/Chapter11Content')),
  'chapter-12-testing-quality': lazy(() => import('./chapters/Chapter12Content')),
  'chapter-13-nextjs-ssr-rsc': lazy(() => import('./chapters/Chapter13Content')),
  'chapter-14-react-19-actions-compiler': lazy(() => import('./chapters/Chapter14Content')),
  'chapter-15-production-frontend-architecture': lazy(
    () => import('./chapters/Chapter15Content'),
  ),
  'chapter-16-sellerhub-capstone': lazy(() => import('./chapters/Chapter16Content')),
}

const chapterSlugSet = new Set<string>(chapterSlugs)

export function isChapterSlug(value: string): value is ChapterSlug {
  return chapterSlugSet.has(value)
}
