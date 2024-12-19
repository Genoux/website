// components/events/EventSummaryCard.tsx
import { motion } from 'motion/react'
import { staggerVariants } from '@/lib/animations'
import { Database } from '@/types/generated-types'
import { formatters } from '@/features/events/utils/eventHelpers'
import { GameBadge } from '@/components/GameBadge'


type Props = {
  event: Database['public']['Tables']['events']['Row']
}

export function EventSummaryCard({ 
  event, 
}: Props) {
  return (
    <motion.div variants={staggerVariants.list.child} className="space-y-4">
      <div className="p-4 bg-black/30 border border-white/10 rounded-lg space-y-4">
        <div className="flex flex-col space-y-3">
          <div className="space-y-1 flex flex-col gap-1 lg:flex-row justify-between items-start border-b pb-4 lg:pb-2">
            <div>
              <p className="text-xs font-medium text-muted-foreground">Événement</p>
              <p className="text-sm font-bold text-white">{event.name}</p>
            </div>
            
            <GameBadge game={event.game} />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-1">
              <p className="text-xs font-medium text-muted-foreground">Date</p>
              <p className="text-xs lg:text-sm text-white">{formatters.date(event.date)}</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs font-medium text-muted-foreground">Heure</p>
              <p className="text-xs lg:text-sm text-white">
                {formatters.time(event.time)} EST
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-xs font-medium text-muted-foreground">RSVP</p>
              <p className="text-xs lg:text-sm text-white">
                {formatters.price(event.price)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}