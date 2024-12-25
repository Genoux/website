// app/page.tsx
'use client'

import { AnimatePresence, motion } from 'motion/react'
import { useState } from 'react'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/header/Header'
import { EventSection } from '@/features/events/components/EventSection'
import { useScrollLock } from '@/hooks/useScrollLock'
import { introVariants } from '@/lib/animations'

function IntroOverlay({ onComplete }: { onComplete: () => void }) {
  return (
    <motion.div
      className="fixed inset-0 z-30"
      style={{ backgroundColor: '#BFF603' }}
      variants={introVariants.overlay}
      initial="initial"
      animate="animate"
      exit="exit"
      onAnimationComplete={onComplete}
    />
  )
}

export default function Page() {
  const [isLocked, setIsLocked] = useState(true)
  useScrollLock(isLocked)

  return (
    <>
      <AnimatePresence mode="wait">
        <IntroOverlay key="overlay" onComplete={() => setIsLocked(false)} />
      </AnimatePresence>
      <main>
        <div className="relative z-30">
          <Header />
          <section className="container">
            <motion.div
              variants={introVariants.events}
              initial="initial"
              animate="animate"
              className="overflow-hidden"
            >
              <EventSection />
            </motion.div>
            <motion.div
              initial="initial"
              animate="animate"
              variants={introVariants.footer}
            >
              <Footer />
            </motion.div>
          </section>
        </div>
      </main>
    </>
  )
}
