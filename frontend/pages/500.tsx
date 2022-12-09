import Link from 'next/link'
import { NextSeo } from 'next-seo'

export default function InternalError() {
  const SEO = {
    title: '500',
  }

  return (
    <>
      <NextSeo {...SEO} noindex={true} nofollow={true} />
      <div className="flex h-screen flex-col items-center justify-center space-y-20">
        <div className="flex items-center justify-center">
          <h1 className="border-r border-gray-200 p-8 text-2xl font-bold text-green-600 md:text-6xl">
            500
          </h1>
          <div className="flex flex-col items-start justify-center px-8">
            <p className="text-2xl font-extrabold md:text-6xl">
              Terjadi kesalahan pada server
            </p>
            <p>Internal Server Error</p>
          </div>
        </div>
      </div>
    </>
  )
}
