import React from 'react'
import { cn } from '../../utils/cn'
import Button from './Button'

const EmptyState = ({
  icon,
  title,
  description,
  action,
  actionLabel,
  onAction,
  className,
  ...props
}) => {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center py-12 px-6 text-center',
        className
      )}
      {...props}
    >
      {icon && (
        <div className="mb-4 p-3 rounded-full bg-neutral-100">
          <div className="w-8 h-8 text-neutral-400">
            {icon}
          </div>
        </div>
      )}
      
      {title && (
        <h3 className="text-lg font-semibold text-neutral-900 mb-2">
          {title}
        </h3>
      )}
      
      {description && (
        <p className="text-neutral-600 mb-6 max-w-sm">
          {description}
        </p>
      )}
      
      {(action || (actionLabel && onAction)) && (
        <div>
          {action || (
            <Button onClick={onAction}>
              {actionLabel}
            </Button>
          )}
        </div>
      )}
    </div>
  )
}

export default EmptyState

