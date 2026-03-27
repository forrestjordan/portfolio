import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import ScrollReveal from '../physics/ScrollReveal'
import styles from './Footer.module.css'

const SOCIAL = [
  { label: 'GitHub',    href: 'https://github.com/forrestshin' },
  { label: 'LinkedIn',  href: 'https://linkedin.com/in/forrestshin' },
  { label: 'Instagram', href: 'https://instagram.com/forrestshin' },
]

export default function Footer() {
  return (
    <footer className={styles.footer}>
      {/* Top perimeter edge bleed */}
      <div className={styles.topEdge} />

      <div className={styles.inner}>
        <ScrollReveal variant="reveal">
          <div className={styles.row}>
            {/* Brand */}
            <Link to="/" className={styles.logo}>
              Forrest <em>Shin</em>
            </Link>

            {/* Minimal socials — no nav links (redundant with navbar) */}
            <div className={styles.socials}>
              {SOCIAL.map(s => (
                <motion.a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                  whileHover={{ y: -2 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                  {s.label} ↗
                </motion.a>
              ))}
            </div>
          </div>
        </ScrollReveal>

        <div className={styles.bottom}>
          <span className={styles.copy}>© 2025 Forrest Shin</span>
          <span className={styles.built}>React · Framer Motion · Vite</span>
        </div>
      </div>
    </footer>
  )
}
