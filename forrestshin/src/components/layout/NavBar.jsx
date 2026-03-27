import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion'
import { useMagneticHover } from '../../hooks/usePhysics'
import { springs } from '../../styles/physics'
import styles from './NavBar.module.css'

const NAV_LINKS = [
  { label: 'About',        path: '/' },
  { label: 'Technical',    path: '/technical' },
  { label: 'Creative',     path: '/creative' },
  { label: 'Outside Work', path: '/outside' },
  { label: 'Résumé',       path: '/resume' },
  { label: 'Contact',      path: '/contact' },
]

function NavLink({ label, path, active }) {
  const { ref, springX, springY, handleMouseMove, handleMouseLeave } = useMagneticHover(0.12)

  return (
    <motion.div
      ref={ref}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={styles.linkWrap}
    >
      <Link
        to={path}
        className={`${styles.link} ${active ? styles.active : ''}`}
        data-active={active}
      >
        {label}
      </Link>
    </motion.div>
  )
}

export default function NavBar() {
  const location = useLocation()
  const [menuOpen, setMenuOpen]     = useState(false)
  const [visible, setVisible]       = useState(true)
  const [atTop, setAtTop]           = useState(true)
  const lastScrollY                 = useRef(0)
  const ticking                     = useRef(false)

  /* ── Hide on scroll down, show on scroll up ── */
  useEffect(() => {
    const handleScroll = () => {
      if (!ticking.current) {
        requestAnimationFrame(() => {
          const currentY = window.scrollY
          const diff     = currentY - lastScrollY.current

          setAtTop(currentY < 16)

          if (currentY < 80) {
            setVisible(true)
          } else if (diff > 4) {
            setVisible(false)   // scrolling down
          } else if (diff < -4) {
            setVisible(true)    // scrolling up
          }

          lastScrollY.current = currentY
          ticking.current     = false
        })
        ticking.current = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => { setMenuOpen(false) }, [location.pathname])

  return (
    <motion.header
      className={`${styles.header} ${atTop ? styles.atTop : styles.scrolled}`}
      initial={{ y: -100, opacity: 0 }}
      animate={{
        y:       visible ? 0 : -100,
        opacity: visible ? 1 : 0,
      }}
      transition={springs.snappy}
    >
      <div className={styles.bar}>
        {/* Logo → home */}
        <motion.div whileHover={{ scale: 1.04 }} transition={springs.bouncy}>
          <Link to="/" className={styles.logo}>
            FS <em>—</em>
          </Link>
        </motion.div>

        {/* ── Pill nav ── */}
        <nav className={styles.pill} aria-label="Main navigation">
          {/* Liquid-glass active indicator slides behind active link */}
          <ActiveBlob links={NAV_LINKS} currentPath={location.pathname} />

          {NAV_LINKS.map(link => (
            <NavLink
              key={link.path}
              {...link}
              active={location.pathname === link.path}
            />
          ))}
        </nav>

        {/* Mobile hamburger */}
        <motion.button
          className={styles.hamburger}
          onClick={() => setMenuOpen(o => !o)}
          whileTap={{ scale: 0.92 }}
          transition={springs.snappy}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span className={`${styles.bar2} ${menuOpen ? styles.open1 : ''}`} />
          <span className={`${styles.bar2} ${menuOpen ? styles.open2 : ''}`} />
          <span className={`${styles.bar2} ${menuOpen ? styles.open3 : ''}`} />
        </motion.button>
      </div>

      {/* ── Mobile menu ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            className={styles.mobileMenu}
            initial={{ opacity: 0, height: 0, y: -8 }}
            animate={{ opacity: 1, height: 'auto', y: 0 }}
            exit={{ opacity: 0, height: 0, y: -8 }}
            transition={springs.snappy}
          >
            {NAV_LINKS.map((link, i) => (
              <motion.div
                key={link.path}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ ...springs.snappy, delay: i * 0.04 }}
              >
                <Link
                  to={link.path}
                  className={`${styles.mobileLink} ${location.pathname === link.path ? styles.mobileLinkActive : ''}`}
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

/* ──────────────────────────────────────────────────────────────
   ActiveBlob — the liquid-glass sliding indicator
   Measures real DOM positions of each link so it always
   snaps perfectly under the active item.
   ────────────────────────────────────────────────────────────── */
function ActiveBlob({ links, currentPath }) {
  const [rect, setRect] = useState({ left: 0, width: 0 })
  const pillRef         = useRef(null)

  useEffect(() => {
    const update = () => {
      const pill    = document.querySelector('[data-pill="true"]')
      const activeEl = document.querySelector('[data-active="true"]')
      if (!pill || !activeEl) return

      const pillBox   = pill.getBoundingClientRect()
      const activeBox = activeEl.getBoundingClientRect()

      setRect({
        left:  activeBox.left - pillBox.left,
        width: activeBox.width,
      })
    }

    // Small delay lets DOM paint first
    const timer = setTimeout(update, 30)
    window.addEventListener('resize', update)
    return () => { clearTimeout(timer); window.removeEventListener('resize', update) }
  }, [currentPath])

  const springLeft  = useSpring(rect.left,  { stiffness: 320, damping: 28, mass: 0.9 })
  const springWidth = useSpring(rect.width, { stiffness: 320, damping: 28, mass: 0.9 })

  useEffect(() => {
    springLeft.set(rect.left)
    springWidth.set(rect.width)
  }, [rect.left, rect.width])

  if (!rect.width) return null

  return (
    <motion.div
      className={styles.activeBlob}
      style={{ left: springLeft, width: springWidth }}
      aria-hidden="true"
    />
  )
}
