import * as React from 'react'
import { clsx } from '@/utils/clsx'

export default function Container({
  children,
  className,
  ...rest
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <>
      <div className={clsx('mx-auto max-w-7xl p-4', className)} {...rest}>
        {children}
      </div>
    </>
  )
}
