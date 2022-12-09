import * as React from 'react'
import { GetStaticProps } from 'next'
import { NextSeo } from 'next-seo'
import { BlurhashCanvas } from 'react-blurhash'
import Link from 'next/link'
import Image from 'next/image'
import Heading from '@/components/Heading'
import Container from '@/components/Container'

import { fetchAPI, getStrapiURL } from '@/lib/api'

export default function Foto({ photos }: any) {
  const SEO = {
    title: 'Galeri Foto',
  }

  return (
    <>
      <NextSeo {...SEO} />
      <Heading>Galeri Foto</Heading>
      <Container>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {photos.map((photo: any) => (
            <Link
              key={photo.attributes.slug}
              href={`foto/${encodeURIComponent(photo.attributes.slug)}`}
            >
              <div className="relative h-60 w-full transition ease-in hover:-translate-y-1">
                <BlurhashCanvas
                  hash={photo.attributes.images.data[0].attributes.placeholder}
                  punch={1}
                  className="absolute inset-0 z-[-1] h-full w-full rounded-lg"
                />
                <Image
                  className="rounded-lg object-cover object-center"
                  src={getStrapiURL(
                    photo.attributes.images.data[0].attributes.url
                  )}
                  alt={
                    photo.attributes.images.data[0].attributes.alternativeText
                  }
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <div className="mt-2">
                <p className="font-bold">{photo.attributes.title}</p>
                <p>{photo.attributes.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </>
  )
}

export const getStaticProps: GetStaticProps<{ photos: any }> = async (ctx) => {
  const photos = await fetchAPI('/photos', {
    populate: '*',
  })

  return {
    props: {
      photos: photos.data,
    },
    revalidate: 1,
  }
}
