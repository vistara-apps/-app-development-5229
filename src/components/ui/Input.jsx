import React from 'react'
import { cn } from '../../utils/cn'

const Input = React.forwardRef(({
  className,
  type = 'text',
  error,
  success,
  leftIcon,
  rightIcon,
  label,
  required,
  helperText,
  ...props
}, ref) => {
  const inputClasses = cn(
    'input',
    error && 'input-error',
    success && 'input-success',
    leftIcon && 'pl-10',
    rightIcon && 'pr-10',
    className
  )
  
  return (
    <div className="w-full">
      {label && (
        <label className={cn('label', required && 'label-required')}>
          {label}
        </label>
      )}
      <div className="relative">
        {leftIcon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-neutral-400">{leftIcon}</span>
          </div>
        )}
        <input
          ref={ref}
          type={type}
          className={inputClasses}
          {...props}
        />
        {rightIcon && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <span className="text-neutral-400">{rightIcon}</span>
          </div>
        )}
      </div>
      {(helperText || error) && (
        <p className={cn(
          'mt-2 text-sm',
          error ? 'text-danger-600' : 'text-neutral-600'
        )}>
          {error || helperText}
        </p>
      )}
    </div>
  )
})

Input.displayName = 'Input'

const Textarea = React.forwardRef(({
  className,
  error,
  success,
  label,
  required,
  helperText,
  rows = 4,
  ...props
}, ref) => {
  const textareaClasses = cn(
    'textarea',
    error && 'input-error',
    success && 'input-success',
    className
  )
  
  return (
    <div className="w-full">
      {label && (
        <label className={cn('label', required && 'label-required')}>
          {label}
        </label>
      )}
      <textarea
        ref={ref}
        rows={rows}
        className={textareaClasses}
        {...props}
      />
      {(helperText || error) && (
        <p className={cn(
          'mt-2 text-sm',
          error ? 'text-danger-600' : 'text-neutral-600'
        )}>
          {error || helperText}
        </p>
      )}
    </div>
  )
})

Textarea.displayName = 'Textarea'

const Select = React.forwardRef(({
  className,
  error,
  success,
  label,
  required,
  helperText,
  children,
  placeholder,
  ...props
}, ref) => {
  const selectClasses = cn(
    'select',
    error && 'input-error',
    success && 'input-success',
    className
  )
  
  return (
    <div className="w-full">
      {label && (
        <label className={cn('label', required && 'label-required')}>
          {label}
        </label>
      )}
      <select
        ref={ref}
        className={selectClasses}
        {...props}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {children}
      </select>
      {(helperText || error) && (
        <p className={cn(
          'mt-2 text-sm',
          error ? 'text-danger-600' : 'text-neutral-600'
        )}>
          {error || helperText}
        </p>
      )}
    </div>
  )
})

Select.displayName = 'Select'

export { Input, Textarea, Select }

