import React from 'react'
import { cn } from '../../utils/cn'

const LoadingSpinner = ({
  size = 'default',
  className,
  ...props
}) => {
  const sizes = {
    sm: 'w-4 h-4',
    default: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-12 h-12'
  }
  
  return (
    <div
      className={cn(
        'loading-spinner',
        sizes[size],
        className
      )}
      {...props}
    />
  )
}

const LoadingCard = ({ className, ...props }) => (
  <div className={cn('card p-6 animate-pulse', className)} {...props}>
    <div className="space-y-4">
      <div className="skeleton h-4 w-3/4"></div>
      <div className="skeleton h-4 w-1/2"></div>
      <div className="skeleton h-20 w-full"></div>
    </div>
  </div>
)

const LoadingTable = ({ rows = 5, columns = 4, className, ...props }) => (
  <div className={cn('card overflow-hidden', className)} {...props}>
    <div className="animate-pulse">
      {/* Header */}
      <div className="px-6 py-4 border-b border-neutral-200">
        <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
          {Array.from({ length: columns }).map((_, i) => (
            <div key={i} className="skeleton h-4"></div>
          ))}
        </div>
      </div>
      
      {/* Rows */}
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div key={rowIndex} className="px-6 py-4 border-b border-neutral-200 last:border-b-0">
          <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
            {Array.from({ length: columns }).map((_, colIndex) => (
              <div key={colIndex} className="skeleton h-4"></div>
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
)

export { LoadingSpinner, LoadingCard, LoadingTable }

