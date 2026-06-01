import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { initPerfProfile } from './utils/perfProfile'
import { initScrollInteraction } from './utils/scrollInteraction'

initPerfProfile()
initScrollInteraction()

createRoot(document.getElementById('root')).render(

    <App />

)
