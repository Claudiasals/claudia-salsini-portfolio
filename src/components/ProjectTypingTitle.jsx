import { useTypingLabel } from '../hooks/useTypingLabel'

const ProjectTypingTitle = ({ title, enabled, startDelay = 0 }) => {
  const { text, typing } = useTypingLabel(title, enabled, startDelay)

  return (
    <h3 className="project-card-title mt-3 text-2xl font-bold text-white">
      {text}
      {typing && <span className="project-card-title__cursor">|</span>}
    </h3>
  )
}

export default ProjectTypingTitle
