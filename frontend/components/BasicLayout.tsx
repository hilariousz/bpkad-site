import * as React from 'react'
import localFont from '@next/font/local'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

const inter = localFont({
  src: [
    {
      path: '../fonts/Inter-Thin.ttf',
      weight: '100',
    },
    {
      path: '../fonts/Inter-ExtraLight.ttf',
      weight: '200',
    },
    {
      path: '../fonts/Inter-Light.ttf',
      weight: '300',
    },
    {
      path: '../fonts/Inter-Regular.ttf',
      weight: '400',
    },
    {
      path: '../fonts/Inter-Medium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../fonts/Inter-SemiBold.ttf',
      weight: '600',
    },
    {
      path: '../fonts/Inter-Bold.ttf',
      weight: '700',
    },
    {
      path: '../fonts/Inter-ExtraBold.ttf',
      weight: '800',
    },
    {
      path: '../fonts/Inter-Black.ttf',
      weight: '900',
    },
  ],
  variable: '--font-inter',
  display: 'swap',
})

export default function BasicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <style jsx global>{`
        html {
          font-family: ${inter.style.fontFamily};
        }
      `}</style>
      <Navigation />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </>
  )
}
