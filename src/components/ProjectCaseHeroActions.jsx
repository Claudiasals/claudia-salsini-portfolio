/**
 * Contenitore flex per i CTA nella hero delle pagine progetto (demo, link esterno, ecc.).
 */
export function ProjectCaseHeroActions({ children, className = '' }) {
  const rootClass = ['project-case-hero-actions', className].filter(Boolean).join(' ')

  return <div className={rootClass}>{children}</div>
}
