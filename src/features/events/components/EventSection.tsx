// features/events/components/EventSection.tsx
import { useState } from 'react'
import type { FilterType } from '../types'
import { useEvents } from '../hooks/useEvents'
import { EventFilters } from './EventFilters'
import { EventGrid } from './EventGrid'

function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="animate-spin rounded-full h-4 w-4 border border-primary border-t-transparent" />
    </div>
  )
}

function ErrorMessage() {
  return (
    <section className="flex flex-col gap-6 relative z-10 pb-24 px-4 xs:px-0 container text-sm text-foreground-muted font-light">
      Failed to load events. Please try again later.
    </section>
  )
}

export function EventSection() {
  const [activeFilter, setActiveFilter] = useState<FilterType>('all')
  const { events, isLoading, error, filterEvents } = useEvents()
  console.log("EventSection - events:", events);
  
  const filteredEvents = filterEvents(activeFilter)

  if (error) {
    return <ErrorMessage />
  }

  return (
    <section className="flex flex-col gap-8 relative z-10 pb-24 px-4 xs:px-0 container mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 w-full justify-between border-b pb-4">
        <h1 className="text-2xl sm:text-4xl font-bold text-foreground">
          Événements
        </h1>
        <EventFilters 
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
        />
      </div>

      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <EventGrid events={filteredEvents} />
      )}
    </section>
  )
}