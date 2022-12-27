import * as React from 'react'
import Link from 'next/link'
import { clsx } from '@/utils/clsx'

export default function BreadcrumbItem({
  children,
  href,
  isCurrent,
  ...props
}: {
  children: React.ReactNode
  href: string
  isCurrent: boolean
}) {
  return (
    <li className="capitalize" {...props}>
      <Link
        href={href}
        className={clsx(isCurrent && 'text-green-600')}
        aria-label="breadcrumb link"
        aria-current={isCurrent ? 'page' : 'false'}
      >
        {children}
      </Link>
    </li>
  )
}
