// app/[event]/register/page.tsx
import { notFound } from 'next/navigation'
import { Database } from '@/types/generated-types'
import { supabase } from '@/lib/supabase'
import { RegisterClient } from '@/app/[event]/register/client'
import { formConfigs } from '@/types/registration'

// Extend the Event type to include type field
type Event = Database['public']['Tables']['events']['Row'] & {
  type: keyof typeof formConfigs
}

type Props = {
  params: Promise<{ event: string }>
}

export default async function RegisterPage({ params }: Props) {
  const e = await params
  if (!e) {
    return notFound()
  }

  const { data: event, error } = await supabase
    .from('events')
    .select('*')
    .eq('id', e.event)
    .single()

  if (error || !event) {
    return notFound()
  }

  // Verify that the event has a valid form type
  if (!event.type || !(event.type in formConfigs)) {
    console.error(`Invalid or missing form type for event: ${event.id}`)
    return notFound()
  }

  return <RegisterClient event={event as Event} />
}

export async function generateStaticParams() {
  const { data: events } = await supabase.from('events').select('id')
  return (
    events?.map((event) => ({
      event: event.id
    })) || []
  )
}