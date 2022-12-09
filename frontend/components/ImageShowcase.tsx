import Link from 'next/link'
import Image from 'next/image'
import { BlurhashCanvas } from 'react-blurhash'
import { ChevronRightIcon } from '@heroicons/react/24/solid'
import Container from './Container'

import { getStrapiURL } from '@/lib/api'

export default function ImageShowcase({ images }: any) {
  const urls = images.map((data: any) =>
    data.attributes.images.data.map((data: any) => {
      return data.attributes
    })
  )

  const flatUrls = urls.flatMap((data: any) => data)

  return (
    <>
      <section className="mb-8 py-8">
        <Container>
          <p className="text-3xl font-bold">Galeri Foto</p>
          <div className="mb-5 w-12 border-t-2 border-green-800 " />
          <div className="grid grid-cols-2 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {flatUrls.slice(0, 6).map((item: any) => (
              <div
                key={item.url}
                className="relative h-56 w-full transition ease-in hover:-translate-y-1 hover:cursor-pointer"
              >
                <BlurhashCanvas
                  hash={item.placeholder}
                  punch={1}
                  className="absolute inset-0 z-[-1] h-full w-full rounded-lg"
                />
                <Image
                  className="rounded-lg object-cover object-center"
                  src={getStrapiURL(item.url)}
                  alt=""
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
            ))}
          </div>
          <div className="flex items-center justify-center p-4">
            <Link
              className="flex items-center rounded-lg px-4 py-2 text-green-600 ring-1 ring-green-600 hover:bg-green-100"
              href="/foto"
            >
              Lihat Selengkapnya <ChevronRightIcon className="ml-2 h-3 w-3" />
            </Link>
          </div>
        </Container>
      </section>
    </>
  )
}
