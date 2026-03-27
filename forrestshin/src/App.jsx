import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import About     from './pages/About'
import Technical from './pages/Technical'
import Creative  from './pages/Creative'
import Outside   from './pages/Outside'
import Resume    from './pages/Resume'
import Contact   from './pages/Contact'
import './styles/globals.css'

function AnimatedRoutes() {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        {/* "/" is About — logo always navigates here */}
        <Route path="/"          element={<About />} />
        <Route path="/technical" element={<Technical />} />
        <Route path="/creative"  element={<Creative />} />
        <Route path="/outside"   element={<Outside />} />
        <Route path="/resume"    element={<Resume />} />
        <Route path="/contact"   element={<Contact />} />
        {/* Redirect any old /about path just in case */}
        <Route path="/about"     element={<About />} />
      </Routes>
    </AnimatePresence>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AnimatedRoutes />
    </BrowserRouter>
  )
}
