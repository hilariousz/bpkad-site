import Link from 'next/link'
import { NextSeo } from 'next-seo'

export default function NotFound() {
  const SEO = {
    title: '404',
  }

  return (
    <>
      <NextSeo {...SEO} noindex={true} nofollow={true} />
      <div className="flex h-screen flex-col items-center justify-center space-y-20">
        <div className="flex items-center justify-center">
          <h1 className="border-r border-gray-200 p-8 text-2xl font-bold text-green-600 md:text-6xl">
            404
          </h1>
          <div className="flex flex-col items-start justify-center px-8">
            <p className="text-2xl font-extrabold md:text-6xl">
              Halaman tidak ditemukan
            </p>
            <p>Mohon mengecek kembali URL anda</p>
          </div>
        </div>
        <Link
          href={'/'}
          className="rounded-lg bg-green-600 px-4 py-2 text-white hover:bg-green-800"
        >
          Kembali ke Beranda
        </Link>
      </div>
    </>
  )
}
