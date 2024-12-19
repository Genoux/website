'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { EventPoster } from '@/features/events/components/EventPoster'
import { CalendarButton } from '@/features/registration/components/checkout/CalendarButton'
import confetti from 'canvas-confetti'
import { BadgeCheck, X } from 'lucide-react'
import { motion } from 'motion/react'

import { Database } from '@/types/generated-types'
import { baseVariants, staggerVariants } from '@/lib/animations'
import { Button } from '@/components/ui/button'
import { Footer } from '@/components/Footer'

import { EventSummaryCard } from './shared/EventSummaryCard'

type Event = Database['public']['Tables']['events']['Row']
type Registration = Database['public']['Tables']['event_registrations']['Row']
type RegistrationDetails = {
  event: Event
  registration: Registration
  receipt_url?: string
} | null

type Props = {
  status: 'success' | 'cancelled'
  details: RegistrationDetails
  title: string
  description: string
}

export function PaymentStatusPage({
  status,
  details,
  title,
  description
}: Props) {
  useEffect(() => {
    if (status === 'success') {
      const duration = 100
      const end = Date.now() + duration
      const interval = setInterval(() => {
        confetti({
          particleCount: 50,
          startVelocity: 32,
          spread: 180
        })
        if (Date.now() > end) clearInterval(interval)
      }, 200)
      return () => clearInterval(interval)
    }
  }, [status])

  return (
    <main className="container mx-auto h-screen flex flex-col sm:justify-evenly items-center px-0">
      {status === 'success' && details ? (
        <SuccessSection details={details} title={title} />
      ) : (
        <CancelledSection title={title} description={description} />
      )}
      <Footer />
    </main>
  )
}

function SuccessSection({
  details,
  title
}: {
  details: RegistrationDetails
  title: string
}) {
  if (!details?.event) {
    return null
  }

  return (
    <motion.div
      variants={staggerVariants.list.parent}
      initial="initial"
      animate="animate"
      className="flex flex-col md:flex-row gap-12 justify-center items-center flex-1 px-4 sm:px-0 py-16 sm:py-4"
    >
      <motion.div variants={baseVariants.slideUp}>
        <EventPoster event={details.event} showCTA={false} size="md" />
      </motion.div>

      <div className="flex flex-col items-center md:items-start">
        <motion.div
          variants={staggerVariants.list.child}
          className="flex flex-col gap-4 justify-center items-center md:items-start"
        >

          <motion.div
            variants={staggerVariants.list.child}
            className="flex flex-col gap-2 text-center md:text-left"
          >
            <h1 className="text-2xl font-bold justify-center md:justify-start flex items-center gap-2"><BadgeCheck className='text-green-500' size={28} />{title}</h1>
            {details.registration && (
              <p className="text-muted-foreground text-sm font-normal">
                Un email de confirmation a été envoyé à{' '}
                {details.registration.email}
              </p>
            )}
          </motion.div>
          <motion.div variants={staggerVariants.list.child} className='w-full'>
            <EventSummaryCard event={details.event} />
          </motion.div>
          <motion.div
            variants={staggerVariants.list.child}
            className="flex gap-2"
          >
            <Link href="/">
              <Button>Retour</Button>
            </Link>
            {details.receipt_url && (
              <Link href={details.receipt_url} target="_blank">
                <Button variant="outline">Voir la commande</Button>
              </Link>
            )}
          </motion.div>
        </motion.div>

        <motion.div variants={staggerVariants.list.child} className="mt-6">
          <CalendarButton event={details.event} />
        </motion.div>


      </div>
    </motion.div>
  )
}

function CancelledSection({
  title,
  description
}: {
  title: string
  description: string
}) {
  return (
    <motion.div
      variants={baseVariants.slideUp}
      initial="initial"
      animate="animate"
      className="flex flex-col justify-center items-center flex-1"
    >
      <motion.div
        variants={staggerVariants.list.parent}
        className="flex-1 justify-center items-center flex flex-col gap-4"
      >
        <motion.div variants={staggerVariants.list.child}>
          <X size={50} className="text-red-500" />
        </motion.div>
        <motion.h1
          variants={staggerVariants.list.child}
          className="text-2xl font-bold text-center"
        >
          {title}
        </motion.h1>
        <motion.p
          variants={staggerVariants.list.child}
          className="text-muted-foreground text-sm text-center"
        >
          {description}
        </motion.p>
        <motion.div variants={staggerVariants.list.child}>
          <Button variant="outline">Retour</Button>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
