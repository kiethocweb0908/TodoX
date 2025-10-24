import { FilterType } from '@/lib/data'
import { Badge, Filter } from 'lucide-react'
import React from 'react'
import { Button } from './ui/button'

const StartAndFilters = ({
    activeTasksCount = 0, 
    completeTaskCount = 0,
    filter = "all",
    setFilter
  }) => {
    console.log(activeTasksCount, completeTaskCount)
    console.log(FilterType.active, FilterType.completed)
    
    return (
    <div id='start-filters' className='flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center'>
      {/* phần thống kê */}
      <div className='flex gap-3'>
        {/* <Badge
          variant="secondary"
          className="bg-white/50 text-accent-foreground border-info/20"
        >
          {activeTasksCount ?? 0} {FilterType.active}
        </Badge>
        <Badge
          variant="secondary"
          className="bg-white/50 text-success border-success/20"
        >
          {completedTasksCount ?? 0} {FilterType.completed}
        </Badge> */}
        <div className='inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-white/50 text-accent-foreground border-info/20'>
          {activeTasksCount ?? 0} {FilterType.active}
        </div>
        <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-white/50 text-success border border-success/20 min-w-[90px]">
          {completeTaskCount ?? 0} {FilterType.completed}
        </div>
      </div>

      {/* phần filter */}
      <div className='flex flex-col gap-2 sm:flex-row'>
        {
          Object.keys(FilterType).map((type) => (
            <Button
              key={type}
              variant={filter === type ? 'gradient' : 'ghost'}
              siaze='sm'
              className='capitalize'
              onClick={() => {setFilter(type)}}
            >
              <Filter className='size-4' />
              {FilterType[type]}
            </Button>
          ))
        }
      </div>

    </div>
  )
}

export default StartAndFilters
