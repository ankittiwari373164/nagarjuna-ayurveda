import { motion } from 'framer-motion'

// Animates in on mount (rather than relying on whileInView, which can fail
// to fire in some preview/embedded environments and leave content stuck at
// opacity:0). Still gives the same soft entrance feel, just not scroll-gated.
export default function Reveal({ children, delay = 0, y = 24, className = '' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}