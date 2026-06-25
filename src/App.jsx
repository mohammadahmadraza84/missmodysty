import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Discover from './pages/Discover'
import AIStyler from './pages/AIStyler'
import TryOn from './pages/TryOn'
import About from './pages/About'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/"           element={<Home />} />
            <Route path="/discover"   element={<Discover />} />
            <Route path="/ai-stylist" element={<AIStyler />} />
            <Route path="/try-on"     element={<TryOn />} />
            <Route path="/about"      element={<About />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}
