import * as React from 'react'
import Link from 'next/link'
import { useTheme } from 'next-themes'
import { Popover, Disclosure, Transition } from '@headlessui/react'
import {
  Bars3Icon,
  XMarkIcon,
  ChevronDownIcon,
  ChevronRightIcon,
} from '@heroicons/react/24/outline'
import { SunIcon, MoonIcon } from '@heroicons/react/24/solid'
import { clsx } from '@/utils/clsx'

interface INavLink {
  label: string
  subLabel?: string
  children?: Array<INavLink>
  href?: string
  icon?: any
}

// eslint-disable-next-line react/display-name
const myLink = React.forwardRef(({ href, children, ...props }: any, ref) => (
  <Link ref={ref} href={href} {...props}>
    {children}
  </Link>
))

const NavLink: Array<INavLink> = [
  {
    label: 'Beranda',
    href: '/',
  },
  {
    label: 'Profil',
    children: [
      {
        label: 'Sejarah Pembentukan',
        href: '/sejarah-pembentukan',
      },
      {
        label: 'Visi Misi',
        href: '/visi-misi',
      },
      {
        label: 'Struktur Organisasi',
        href: '/struktur-organisasi',
      },
      {
        label: 'Tugas Pokok & Fungsi',
        href: '/tugas-fungsi',
      },
    ],
  },
  {
    label: 'Media',
    children: [
      {
        label: 'Berita',
        href: '/berita',
      },
      {
        label: 'Galeri Foto',
        href: '/foto',
      },
      {
        label: 'Galeri Video',
        href: '/video',
      },
    ],
  },
  {
    label: 'Produk Hukum',
    href: '/produk-hukum',
  },
  {
    label: 'Informasi Publik',
    children: [
      {
        label: 'Keuangan Daerah',
        href: '/keuangan-daerah',
      },
      {
        label: 'Realisasi Anggaran',
        href: '/realisasi-anggaran',
      },
    ],
  },
]

export function ThemeToggler() {
  const { theme, setTheme } = useTheme()

  const [mounted, setMounted] = React.useState(false)
  React.useEffect(() => setMounted(true), [])

  if (!mounted) return null

  return (
    <button
      type="button"
      className="rounded-lg px-3 py-3 hover:bg-gray-100 dark:hover:bg-gray-700"
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
    >
      <span className="sr-only">Toggle Theme</span>
      {theme === 'light' ? (
        <MoonIcon className="h-4 w-4 text-gray-500 dark:text-gray-500" />
      ) : (
        <SunIcon className="h-4 w-4 text-gray-500 dark:text-gray-500" />
      )}
    </button>
  )
}

export default function Navigation() {
  return (
    <Popover
      as="header"
      className="relative z-10 bg-white shadow-md dark:bg-gray-900"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex items-center justify-between border-gray-100 py-4 md:justify-start md:space-x-10">
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <Link href="/">
              <span className="sr-only">BPKAD</span>
              <img
                src="/logo.png"
                alt="BPKAD Mahakam Ulu"
                className="h-10 w-36"
              />
            </Link>
          </div>
          {/* LOGO */}
          <div className="-my-2 -mr-2 md:hidden">
            <Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-inset focus:ring-indigo-500 dark:bg-gray-900 dark:hover:bg-gray-800">
              <span className="sr-only">Open Menu</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </Popover.Button>
          </div>
          {/* NAV ITEMS */}
          <Popover.Group
            as="nav"
            className="hidden items-center justify-center space-x-6 text-center md:flex"
          >
            {NavLink.map((navLink) =>
              navLink.children ? (
                <Popover key={navLink.label} className="relative">
                  {({ open }) => (
                    <>
                      <Popover.Button
                        className={clsx(
                          open
                            ? 'text-green-600 dark:text-green-600'
                            : 'text-gray-500 dark:text-gray-200',
                          'group inline-flex items-center rounded-md text-sm font-medium hover:text-green-600 focus:outline-none dark:bg-gray-900 dark:hover:text-green-600'
                        )}
                      >
                        <span>{navLink.label}</span>
                        <ChevronDownIcon
                          className={clsx(
                            open
                              ? 'rotate-180 text-green-600 duration-150 dark:text-green-600'
                              : 'rotate-0 text-gray-500 duration-150 dark:text-gray-200',
                            'ml-2 h-4 w-4 group-hover:text-green-600 dark:group-hover:text-green-600'
                          )}
                          aria-hidden="true"
                        />
                      </Popover.Button>
                      {/* NAV SUBITEMS */}
                      <Transition
                        as={React.Fragment}
                        enter="transition ease-out duration-200"
                        enterFrom="opacity-0 translate-y-1"
                        enterTo="opacity-100 translate-y-0"
                        leave="transition ease-in duration-150"
                        leaveFrom="opacity-100 translate-y-0"
                        leaveTo="opacity-0 translate-y-1"
                      >
                        <Popover.Panel className="absolute z-10 -ml-4 mt-3 w-screen max-w-[240px] transform px-2 sm:px-0 lg:left-1/2 lg:ml-0 lg:-translate-x-1/2">
                          <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black/5">
                            <div className="relative grid gap-6 bg-white py-6 dark:bg-gray-800 ">
                              {navLink.children?.map((children) => (
                                <Popover.Button
                                  as={myLink}
                                  key={children.label}
                                  href={children.href ?? '#'}
                                  className="-m-3 items-start rounded-lg p-3 text-left text-gray-900 hover:bg-gray-50 hover:text-green-600 dark:hover:bg-gray-700"
                                >
                                  <div className="px-8">
                                    <p className="text-sm font-medium dark:text-gray-200">
                                      {children.label}
                                    </p>
                                  </div>
                                </Popover.Button>
                              ))}
                            </div>
                          </div>
                        </Popover.Panel>
                      </Transition>
                    </>
                  )}
                </Popover>
              ) : (
                <Link
                  key={navLink.label}
                  href={navLink.href ?? '#'}
                  className="text-sm font-medium text-gray-500 hover:text-green-600 dark:text-gray-200 dark:hover:text-green-600"
                >
                  {navLink.label}
                </Link>
              )
            )}
          </Popover.Group>
          <div className="hidden items-center justify-end md:flex md:flex-1 lg:w-0">
            <ThemeToggler />
          </div>
        </div>
      </div>
      {/* MOBILE NAV ITEMS */}
      <Transition
        as={React.Fragment}
        enter="duration-200 ease-out"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="duration-100 ease-in"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <Popover.Panel
          focus
          className="absolute inset-x-0 top-0 origin-top-right transform transition md:hidden"
        >
          <div className="divide-y-2 divide-gray-500 bg-white shadow-lg ring-1 ring-black ring-opacity-5 dark:bg-gray-800">
            <div className="px-5 pt-5 pb-6">
              <div className="flex items-center justify-between">
                <img
                  src="/logo.png"
                  alt="BPKAD Mahakam Ulu"
                  className="h-10 w-36"
                />
                <div className="-mr-3 flex items-center space-x-2 sm:-mr-1">
                  <ThemeToggler />
                  <Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-600 dark:bg-gray-800 dark:hover:bg-gray-700">
                    <span className="sr-only">Close Menu</span>
                    <XMarkIcon className="w6 h-6" aria-hidden="true" />
                  </Popover.Button>
                </div>
              </div>
              {/* MOBILE NAV SUBITEMS */}
              <div className="mt-6">
                <nav className="grid gap-y-4">
                  {NavLink.map((navLink) =>
                    navLink.children ? (
                      <Disclosure key={navLink.label}>
                        {({ open }) => (
                          <>
                            <Disclosure.Button
                              className={clsx(
                                open
                                  ? 'text-green-600'
                                  : 'text-gray-500 dark:text-gray-200',
                                'group inline-flex items-center justify-between rounded-lg p-2 hover:bg-gray-100 hover:text-green-600 dark:hover:bg-gray-700 dark:hover:text-green-600'
                              )}
                            >
                              {navLink.label}
                              <ChevronRightIcon
                                className={clsx(
                                  open
                                    ? 'rotate-90 text-green-600 duration-150'
                                    : 'rotate-0 text-gray-500 duration-150  dark:text-gray-200',
                                  'h-4 w-4 group-hover:text-green-600'
                                )}
                                aria-hidden="true"
                              />
                            </Disclosure.Button>
                            <Transition
                              enter="transition duration-100 ease-out"
                              enterFrom="transform scale-95 opacity-0"
                              enterTo="transform scale-100 opacity-100"
                              leave="transition duration-75 ease-out"
                              leaveFrom="transform scale-100 opacity-100"
                              leaveTo="transform scale-95 opacity-0"
                            >
                              <Disclosure.Panel className="space-x-10 border-l">
                                <div className="flex flex-col space-y-2">
                                  {navLink.children?.map((children) => (
                                    <Popover.Button
                                      as={myLink}
                                      key={children.label}
                                      href={children.href}
                                      className="ml-2 rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-200 dark:hover:bg-gray-700 dark:hover:text-green-600"
                                    >
                                      {children.label}
                                    </Popover.Button>
                                  ))}
                                </div>
                              </Disclosure.Panel>
                            </Transition>
                          </>
                        )}
                      </Disclosure>
                    ) : (
                      <Popover.Button
                        as={myLink}
                        key={navLink.label}
                        href={navLink.href}
                        className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-green-600 dark:text-gray-200 dark:hover:bg-gray-700 dark:hover:text-green-600"
                      >
                        {navLink.label}
                      </Popover.Button>
                    )
                  )}
                </nav>
              </div>
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  )
}
