import * as React from 'react'
import { clsx } from '@/utils/clsx'

interface IButton {
  children: React.ReactNode
  className?: string
  disabled?: boolean
  onClick?: () => void
}

export function Button({ children, className, ...rest }: IButton) {
  return (
    <button
      type="button"
      className={clsx(
        'relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2  text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 ',
        className
      )}
      {...rest}
    >
      {children}
    </button>
  )
}

export function PageButton({ children, className, ...rest }: IButton) {
  return (
    <button
      type="button"
      className={clsx(
        'relative inline-flex items-center border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      {...rest}
    >
      {children}
    </button>
  )
}
