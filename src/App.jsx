import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
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
        </Routes>
      </CardModalProvider>
    </BrowserRouter>
  )
}
