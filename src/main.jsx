import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { initPerfProfile } from './utils/perfProfile'
import { initScrollInteraction } from './utils/scrollInteraction'
import { initTouchFocus } from './utils/touchFocus'
import { initPointerHover } from './utils/pointerHover'
import { initHeroCircuitTraces } from './utils/heroCircuitTraces'

initPerfProfile()
initHeroCircuitTraces()
initScrollInteraction()
initPointerHover()
initTouchFocus()

createRoot(document.getElementById('root')).render(

    <App />

)
