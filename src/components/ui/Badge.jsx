import React from 'react'
import { cn } from '../../utils/cn'

const Badge = React.forwardRef(({
  className,
  variant = 'primary',
  children,
  ...props
}, ref) => {
  const baseClasses = 'badge'
  
  const variants = {
    primary: 'badge-primary',
    secondary: 'badge-secondary',
    success: 'badge-success',
    warning: 'badge-warning',
    danger: 'badge-danger'
  }
  
  return (
    <span
      ref={ref}
      className={cn(
        baseClasses,
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  )
})

Badge.displayName = 'Badge'

export default Badge

