import styles from './SectionWrapper.module.css'

const variants = {
  default:    styles.varDefault,
  light:      styles.varLight,
  dark:       styles.varDark,
  creative:   styles.varCreative,
  azure:      styles.varAzure,
  transition: styles.varTransition,
}

export default function SectionWrapper({
  children,
  variant = 'default',
  id,
  className = '',
  noPadding = false,
}) {
  return (
    <section
      id={id}
      className={[
        styles.section,
        variants[variant] || variants.default,
        noPadding ? styles.noPad : '',
        className,
      ].join(' ')}
    >
      {/* Left edge accent — matches Figma perimeter-only style */}
      <div className={styles.leftEdge} aria-hidden="true" />
      <div className={styles.rightEdge} aria-hidden="true" />

      <div className={styles.inner}>
        {children}
      </div>
    </section>
  )
}
