import { AnimatePresence, motion } from 'motion/react'
import { TRANSITIONS } from '@/lib/animations'
import type { Event } from '../types'
import { isEventPassed } from '../utils/eventHelpers'
import { EventPoster } from './EventPoster'
import { cn } from '@/lib/utils'
interface EventGridProps {
  events: Event[]
}

export function EventGrid({ events }: EventGridProps) {
  return (
    <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 pb-24">
      {events.map((event, index) => {
        const eventHasPassed = isEventPassed(event.date)
        return (
          <AnimatePresence mode="wait" key={event.id}>
            <motion.div
              
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: eventHasPassed ? 0.6 : 1 }}
              exit={{ y: -20, opacity: 0 }}
              whileHover={{
                opacity: 1,
                transition: { duration: 0.1, ease: TRANSITIONS.easeOutExpo }
              }}
              transition={{
                duration: 0.3,
                delay: index * 0.1
              }} cursor-border
              className={cn(`w-full mx-auto`, {
                'cursor-border': eventHasPassed
                
              })}
            >
              <EventPoster
                event={event}
                size="responsive"
                showCTA={!eventHasPassed}
                tiltProps={{
                  tiltMaxAngleX: 8,
                  tiltMaxAngleY: 8,
                  glareMaxOpacity: !eventHasPassed ? 0.2 : 0.1,
                  transitionSpeed: 800
                }}
              />
            </motion.div>
          </AnimatePresence>
        )
      })}
    </div>
  )
}
