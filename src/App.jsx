import { BrowserRouter, Route, Routes } from 'react-router-dom'
import SiteLayout from './components/SiteLayout'
import ScrollToHash from './components/ScrollToHash'
import ScrollToTop from './components/ScrollToTop'
import CookiePolicy from './pages/CookiePolicy'
import Home from './pages/Home'
import PrivacyPolicy from './pages/PrivacyPolicy'
import FrancescaGandelliProject from './pages/projects/FrancescaGandelliProject'
import InklySignProject from './pages/projects/InklySignProject'
import WorkHubProject from './pages/projects/WorkHubProject'
import TermsPage from './pages/TermsPage'

const App = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <ScrollToHash />
      <Routes>
        <Route element={<SiteLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/cookie" element={<CookiePolicy />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/termini" element={<TermsPage />} />
          <Route path="/progetti/inklysign" element={<InklySignProject />} />
          <Route path="/progetti/workhub" element={<WorkHubProject />} />
          <Route
            path="/progetti/francesca-gandelli"
            element={<FrancescaGandelliProject />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
