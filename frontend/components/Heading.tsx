import * as React from 'react'
import { HomeIcon } from '@heroicons/react/20/solid'
import { useRouter } from 'next/router'
import Breadcrumb from '@/components//Breadcrumb/Breadcrumb'
import Item from '@/components/Breadcrumb/Item'

export default function Heading({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [breadcrumbs, setBreadcrumbs] = React.useState<any[]>()

  React.useEffect(() => {
    const pathWithoutQuery = router.asPath.split('?')[0]

    let pathArray = pathWithoutQuery.split('/')

    pathArray.shift()

    pathArray = pathArray.filter((path) => path !== '')

    const breadcrumbPath = pathArray.map((path, index) => {
      const href = `/${pathArray.slice(0, index + 1).join('/')}`

      return {
        href,
        label: path.replace(/-/g, ' '),
        isCurrent: index === pathArray.length - 1,
      }
    })
    setBreadcrumbs(breadcrumbPath)
  }, [router.asPath])

  return (
    <div className="flex h-48 w-screen items-center justify-start bg-heading bg-center bg-no-repeat md:mb-8">
      <div className="mx-auto flex max-w-7xl flex-1 flex-col space-y-2">
        <div className="px-2">
          <Breadcrumb>
            <Item isCurrent={router.pathname === '/'} href="/">
              <HomeIcon className="h-4 w-4 text-gray-900" />
            </Item>
            {breadcrumbs &&
              breadcrumbs.map((breadcrumb: any) => (
                <Item
                  key={breadcrumb.href}
                  href={breadcrumb.href}
                  isCurrent={breadcrumb.isCurrent}
                >
                  {breadcrumb.label}
                </Item>
              ))}
          </Breadcrumb>
          <h1 className="text-3xl font-bold text-gray-900">{children}</h1>
        </div>
      </div>
    </div>
  )
}
