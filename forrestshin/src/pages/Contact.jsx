import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import PageLayout from '../components/layout/PageLayout'
import SectionWrapper from '../components/layout/SectionWrapper'
import SectionHeader from '../components/ui/SectionHeader'
import MagneticButton from '../components/physics/MagneticButton'
import ScrollReveal from '../components/physics/ScrollReveal'
import { springs } from '../styles/physics'
import { useRipple } from '../hooks/usePhysics'
import Ripple from '../components/physics/Ripple'
import styles from './Contact.module.css'

const EMAIL = 'hello@forrestshin.com'   // ← update to your real email

/* ── SVG icon components (inline, no external dep) ── */
function IconGitHub() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
    </svg>
  )
}

function IconLinkedIn() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  )
}

function IconInstagram() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
    </svg>
  )
}

function IconEmail() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="4" width="20" height="16" rx="2"/>
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
    </svg>
  )
}

const SOCIAL_ITEMS = [
  {
    key: 'github',
    label: 'GitHub',
    sub: '@forrestshin',
    href: 'https://github.com/forrestshin',
    Icon: IconGitHub,
    action: 'link',
  },
  {
    key: 'linkedin',
    label: 'LinkedIn',
    sub: 'Forrest Shin',
    href: 'https://linkedin.com/in/forrestshin',
    Icon: IconLinkedIn,
    action: 'link',
  },
  {
    key: 'instagram',
    label: 'Instagram',
    sub: '@forrestshin',
    href: 'https://instagram.com/forrestshin',
    Icon: IconInstagram,
    action: 'link',
  },
  {
    key: 'email',
    label: 'Email',
    sub: EMAIL,
    href: null,
    Icon: IconEmail,
    action: 'copy',
  },
]

function SocialCard({ item }) {
  const [copied, setCopied] = useState(false)
  const { ripples, triggerRipple } = useRipple()

  const handleClick = (e) => {
    triggerRipple(e)
    if (item.action === 'copy') {
      navigator.clipboard.writeText(EMAIL).then(() => {
        setCopied(true)
        setTimeout(() => setCopied(false), 2200)
      })
    } else {
      window.open(item.href, '_blank', 'noopener,noreferrer')
    }
  }

  return (
    <motion.button
      className={styles.socialCard}
      onClick={handleClick}
      whileHover={{ y: -3, scale: 1.01 }}
      whileTap={{ scale: 0.97 }}
      transition={springs.bouncy}
      aria-label={item.action === 'copy' ? `Copy email address` : `Open ${item.label}`}
    >
      <div className={styles.socialIcon}>
        <item.Icon />
      </div>
      <div className={styles.socialText}>
        <span className={styles.socialLabel}>{item.label}</span>
        <span className={styles.socialSub}>
          <AnimatePresence mode="wait">
            {copied && item.action === 'copy' ? (
              <motion.span
                key="copied"
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={springs.snappy}
                className={styles.copiedTag}
              >
                Copied ✓
              </motion.span>
            ) : (
              <motion.span
                key="sub"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {item.sub}
              </motion.span>
            )}
          </AnimatePresence>
        </span>
      </div>
      <span className={styles.socialCaret}>
        {item.action === 'copy' ? '⌘C' : '↗'}
      </span>
      <Ripple ripples={ripples} />
    </motion.button>
  )
}

/* ── Form field ── */
function FormField({ label, type = 'text', name, value, onChange, placeholder, multiline = false }) {
  const [focused, setFocused] = useState(false)
  const filled = value.length > 0

  const inputProps = {
    name, value, onChange, placeholder,
    onFocus: () => setFocused(true),
    onBlur:  () => setFocused(false),
    className: [styles.input, focused ? styles.inputFocused : '', filled ? styles.inputFilled : ''].join(' '),
  }

  return (
    <div className={styles.fieldWrap}>
      <motion.label
        className={styles.fieldLabel}
        animate={
          focused || filled
            ? { fontSize: '9px', color: 'var(--accent-blue)' }
            : { fontSize: '10px', color: 'var(--text-muted)' }
        }
        transition={springs.snappy}
      >
        {label}
      </motion.label>

      {multiline
        ? <textarea rows={5} {...inputProps} className={`${inputProps.className} ${styles.textarea}`} />
        : <input type={type} {...inputProps} />
      }

      <motion.div
        className={styles.focusLine}
        animate={{ scaleX: focused ? 1 : 0 }}
        style={{ originX: 0 }}
        transition={springs.snappy}
      />
    </div>
  )
}

export default function Contact() {
  const [form, setForm]         = useState({ name: '', email: '', subject: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const { ripples, triggerRipple } = useRipple()

  const handleChange  = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }))
  const handleSubmit  = (e) => {
    e.preventDefault?.()
    triggerRipple(e)
    // Replace setTimeout with your actual form handler (Formspree / EmailJS)
    setTimeout(() => setSubmitted(true), 280)
  }

  return (
    <PageLayout>
      {/* Dark page header */}
      <div style={{ background: 'linear-gradient(160deg,#1E2A4A 0%,#2A3A5C 50%,#3D4F6B 100%)', paddingTop: '120px' }}>
        <SectionWrapper variant="dark" noPadding>
          <div style={{ padding: '64px 48px 80px' }}>
            <SectionHeader
              label="06 — Contact"
              title={<>Let's make something <em style={{ fontStyle:'italic', color:'var(--mist)' }}>together.</em></>}
              subtitle="Open to freelance projects, full-time roles, and interesting conversations."
              light
            />
          </div>
        </SectionWrapper>
        <SectionWrapper variant="transition" noPadding />
      </div>

      <SectionWrapper variant="light">
        <div className={styles.layout}>

          {/* ── Left: Form ── */}
          <div className={styles.formCol}>
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  className={styles.successState}
                  initial={{ opacity: 0, scale: 0.95, y: 12 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={springs.bouncy}
                >
                  <motion.div
                    className={styles.successIcon}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ ...springs.elastic, delay: 0.1 }}
                  >
                    ✓
                  </motion.div>
                  <h3 className={styles.successTitle}>Message sent.</h3>
                  <p className={styles.successDesc}>
                    Thanks for reaching out — I'll get back to you within a couple of days.
                  </p>
                  <MagneticButton
                    variant="secondary"
                    onClick={() => { setForm({ name:'', email:'', subject:'', message:'' }); setSubmitted(false) }}
                  >
                    Send another →
                  </MagneticButton>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  className={styles.form}
                  onSubmit={handleSubmit}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  style={{ position: 'relative', overflow: 'hidden' }}
                >
                  <div className={styles.formRow}>
                    <FormField label="Name"    name="name"    value={form.name}    onChange={handleChange} placeholder="Your name" />
                    <FormField label="Email"   type="email" name="email"   value={form.email}   onChange={handleChange} placeholder="your@email.com" />
                  </div>
                  <FormField label="Subject" name="subject" value={form.subject} onChange={handleChange} placeholder="What's this about?" />
                  <FormField label="Message" name="message" value={form.message} onChange={handleChange} placeholder="Tell me about what you're working on…" multiline />

                  <div className={styles.formFooter}>
                    <MagneticButton variant="primary" onClick={handleSubmit}>
                      Send message →
                    </MagneticButton>
                    <span className={styles.formNote}>I typically respond within 48 hours.</span>
                  </div>
                  <Ripple ripples={ripples} color="rgba(30,42,74,0.06)" />
                </motion.form>
              )}
            </AnimatePresence>
          </div>

          {/* ── Right: Social cards ── */}
          <div className={styles.sidebar}>
            <ScrollReveal variant="reveal" index={0}>
              <span className={styles.sideLabel}>Find me elsewhere</span>
              <div className={styles.socialGrid}>
                {SOCIAL_ITEMS.map(item => (
                  <SocialCard key={item.key} item={item} />
                ))}
              </div>
            </ScrollReveal>

            <ScrollReveal variant="reveal" index={1}>
              <div className={styles.availBlock}>
                <div className={styles.availBadge}>
                  <span className={styles.availDot} />
                  Available for projects
                </div>
                <p className={styles.availNote}>
                  Currently open to freelance work and select full-time opportunities.
                  Based in [City] — open to remote.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </SectionWrapper>
    </PageLayout>
  )
}
