import { useTypingLabel } from '../hooks/useTypingLabel'

const TypingTerminalLabel = ({
  label,
  trigger,
  startDelay = 0,
  variant = 'gradient',
  wrapperClassName = '',
  as: Wrapper = 'span',
}) => {
  const { text, typing } = useTypingLabel(label, trigger, startDelay)
  const variantClass =
    variant === 'sky' ? 'typing-terminal-label--sky' : 'typing-terminal-label--gradient'

  return (
    <Wrapper className={wrapperClassName} aria-label={label}>
      <span
        className={`typing-terminal-label ${variantClass}${
          text || typing ? ' typing-terminal-label--active' : ''
        }`}
        aria-hidden="true"
      >
        <span className="typing-terminal-label__text">
          {text}
          {typing && <span className="typing-terminal-label__cursor">|</span>}
        </span>
      </span>
    </Wrapper>
  )
}

export default TypingTerminalLabel
