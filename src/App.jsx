import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import ScrollToTop from './components/ScrollToTop'
import { CardModalProvider } from './components/CardModal'
import Home from './pages/Home'
import About from './pages/About'
import Services from './pages/Services'
import Solutions from './pages/Solutions'
import CaseStudies from './pages/CaseStudies'
import Blog from './pages/Blog'
import Careers from './pages/Careers'
import Contact from './pages/Contact'

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <CardModalProvider>
        <div className="bg-orbs"><span></span></div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/solutions" element={<Solutions />} />
          <Route path="/case-studies" element={<CaseStudies />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/contact" element={<Contact />} />
          {/* redirect legacy .html URLs to SPA routes */}
          <Route path="/index.html"       element={<Navigate to="/" replace />} />
          <Route path="/about.html"       element={<Navigate to="/about" replace />} />
          <Route path="/services.html"    element={<Navigate to="/services" replace />} />
          <Route path="/solutions.html"   element={<Navigate to="/solutions" replace />} />
          <Route path="/case-studies.html" element={<Navigate to="/case-studies" replace />} />
          <Route path="/blog.html"        element={<Navigate to="/blog" replace />} />
          <Route path="/careers.html"     element={<Navigate to="/careers" replace />} />
          <Route path="/contact.html"     element={<Navigate to="/contact" replace />} />
          <Route path="*"                 element={<Navigate to="/" replace />} />
        </Routes>
      </CardModalProvider>
    </BrowserRouter>
  )
}
