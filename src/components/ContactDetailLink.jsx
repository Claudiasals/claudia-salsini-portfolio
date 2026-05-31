import { useTypingLabel } from '../hooks/useTypingLabel'

const ContactDetailLink = ({
  href,
  label,
  ariaLabel,
  icon,
  children,
  runKey,
  startDelay = 0,
  external = false,
}) => {
  const { text, typing } = useTypingLabel(label, runKey, startDelay)

  return (
    <a
      href={href}
      aria-label={ariaLabel}
      className="contact-detail-link"
      {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
    >
      <span className="contact-detail-icon" aria-hidden="true">
        <span className="contact-detail-icon-inner">{icon}</span>
      </span>

      <span className="contact-detail-content">
        <span
          className={`contact-terminal-label${text || typing ? ' contact-terminal-label--active' : ''}`}
          aria-hidden={!text && !typing}
        >
          <span className="contact-terminal-label__text">
            {text}
            {typing && <span className="contact-terminal-label__cursor">|</span>}
          </span>
        </span>
        <span className="contact-detail-value">{children}</span>
      </span>
    </a>
  )
}

export default ContactDetailLink
