import * as React from 'react'
import { ChevronRightIcon } from '@heroicons/react/20/solid'

export default function Breadcrumb({
  children,
}: {
  children: React.ReactNode
}) {
  const childrenArray = React.Children.toArray(children)

  const childrenWithSeparator = childrenArray.map((child, index: number) => {
    if (index !== childrenArray.length - 1) {
      return (
        <React.Fragment key={index}>
          {child}
          <span>
            <ChevronRightIcon className="h-4 w-4 text-gray-900 dark:text-white" />
          </span>
        </React.Fragment>
      )
    }
    return child
  })

  return (
    <nav aria-label="breadcrumb">
      <ol className="flex items-center space-x-2">{childrenWithSeparator}</ol>
    </nav>
  )
}
