import { Suspense, useEffect, useRef, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router'
import { tutorialEntries } from '../data/learning-manifest'
import {
  chapterContentBySlug,
  isChapterSlug,
} from '../docs/chapter-loaders'
import type { ChapterSlug } from '../docs/chapter-loaders'
import { usePageTitle } from '../hooks/use-page-title'
import '../styles/docs.css'

export function DocsPage() {
  const { chapterSlug } = useParams()

  if (!chapterSlug) {
    return <Navigate replace to={`/docs/${tutorialEntries[0].docsSlug}`} />
  }

  if (!isChapterSlug(chapterSlug)) {
    return <InvalidChapterState slug={chapterSlug} />
  }

  return <DocsChapterPage chapterSlug={chapterSlug} key={chapterSlug} />
}

function DocsChapterPage({ chapterSlug }: { chapterSlug: ChapterSlug }) {
  const [isMobileNavigationOpen, setIsMobileNavigationOpen] = useState(false)
  const mobileNavigationTriggerRef = useRef<HTMLButtonElement>(null)
  const chapterIndex = tutorialEntries.findIndex((entry) => entry.docsSlug === chapterSlug)
  const chapter = tutorialEntries[chapterIndex]
  const ChapterContent = chapterContentBySlug[chapterSlug]
  const previousChapter = chapterIndex > 0 ? tutorialEntries[chapterIndex - 1] : null
  const nextChapter =
    chapterIndex < tutorialEntries.length - 1 ? tutorialEntries[chapterIndex + 1] : null

  usePageTitle(chapter.title)

  useEffect(() => {
    const hash = window.location.hash
    if (hash) {
      document.getElementById(hash.slice(1))?.scrollIntoView({ block: 'start' })
      return
    }

    window.scrollTo({ left: 0, top: 0 })
  }, [chapterSlug])

  useEffect(() => {
    if (!isMobileNavigationOpen) {
      return
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMobileNavigationOpen(false)
        window.requestAnimationFrame(() => mobileNavigationTriggerRef.current?.focus())
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isMobileNavigationOpen])

  const closeMobileNavigation = () => {
    setIsMobileNavigationOpen(false)
    window.requestAnimationFrame(() => mobileNavigationTriggerRef.current?.focus())
  }

  return (
    <div className="docs-page">
      <aside className="docs-sidebar" aria-label="React chapter documentation">
        <ChapterNavigation activeSlug={chapterSlug} />
      </aside>

      <div className="docs-content-column">
        <div className="docs-mobile-navigation-controls">
          <button
            aria-controls="mobile-chapter-navigation"
            aria-expanded={isMobileNavigationOpen}
            className="button button-secondary docs-navigation-trigger"
            onClick={() => setIsMobileNavigationOpen((isOpen) => !isOpen)}
            ref={mobileNavigationTriggerRef}
            type="button"
          >
            {isMobileNavigationOpen ? 'Close chapter navigation' : 'Open chapter navigation'}
          </button>
          {isMobileNavigationOpen ? (
            <div className="docs-mobile-navigation" id="mobile-chapter-navigation">
              <div className="docs-mobile-navigation-heading">
                <strong>Chapter navigation</strong>
                <button onClick={closeMobileNavigation} type="button">
                  Close chapter navigation
                </button>
              </div>
              <ChapterNavigation
                activeSlug={chapterSlug}
                onNavigate={() => setIsMobileNavigationOpen(false)}
              />
            </div>
          ) : null}
        </div>

        <div className="docs-breadcrumbs" aria-label="Breadcrumb">
          <Link to="/docs">Docs</Link>
          <span aria-hidden="true">/</span>
          <span>{chapter.label}</span>
        </div>

        <article className="docs-article">
          <Suspense fallback={<ChapterLoadingState title={chapter.title} />}>
            <ChapterContent />
          </Suspense>
        </article>

        <nav className="docs-chapter-actions" aria-label="Chapter actions">
          <div>
            {previousChapter ? (
              <Link to={`/docs/${previousChapter.docsSlug}`}>
                <span>Previous chapter</span>
                <strong>{previousChapter.title}</strong>
              </Link>
            ) : null}
          </div>
          <a className="docs-practice-link" href={chapter.href}>
            Open this chapter&apos;s practice
          </a>
          <div>
            {nextChapter ? (
              <Link to={`/docs/${nextChapter.docsSlug}`}>
                <span>Next chapter</span>
                <strong>{nextChapter.title}</strong>
              </Link>
            ) : null}
          </div>
        </nav>
      </div>
    </div>
  )
}

function ChapterNavigation({
  activeSlug,
  onNavigate,
}: {
  activeSlug: ChapterSlug
  onNavigate?: () => void
}) {
  return (
    <nav aria-label="Chapters">
      <p className="docs-navigation-title">Chapters</p>
      <ol>
        {tutorialEntries.map((entry) => {
          const isActive = entry.docsSlug === activeSlug
          return (
            <li key={entry.id}>
              <Link
                aria-current={isActive ? 'page' : undefined}
                onClick={onNavigate}
                to={`/docs/${entry.docsSlug}`}
              >
                <span>{entry.label}</span>
                <strong>{entry.title}</strong>
              </Link>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

function ChapterLoadingState({ title }: { title: string }) {
  return (
    <div aria-live="polite" className="chapter-loading-state">
      <span aria-hidden="true" />
      <p>Loading {title}...</p>
    </div>
  )
}

function InvalidChapterState({ slug }: { slug: string }) {
  usePageTitle('Chapter not found')

  return (
    <section className="docs-invalid-state" aria-labelledby="invalid-chapter-title">
      <p className="page-number" aria-hidden="true">Docs</p>
      <h1 id="invalid-chapter-title">That chapter is not in the sixteen-chapter guide.</h1>
      <p>
        No authored documentation module matches <code>{slug}</code>. Open the first chapter
        or return to the Tutorial index.
      </p>
      <div className="landing-actions">
        <Link className="button button-primary" to={`/docs/${tutorialEntries[0].docsSlug}`}>
          Open Chapter 01
        </Link>
        <Link className="button button-secondary" to="/tutorial">
          Return to Tutorial
        </Link>
      </div>
    </section>
  )
}
