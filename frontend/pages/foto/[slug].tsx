import * as React from 'react'
import { GetStaticPaths, GetStaticProps } from 'next'
import { NextSeo } from 'next-seo'
import { BlurhashCanvas } from 'react-blurhash'
import Image from 'next/image'
import Heading from '@/components/Heading'
import Container from '@/components/Container'

import { getStrapiURL, fetchAPI } from '@/lib/api'

export default function FotoDetail({ photos }: any) {
  const SEO = {
    title: photos[0].attributes.title,
    description: photos[0].attributes.description,
  }
  return (
    <>
      <NextSeo {...SEO} noindex={true} />
      <Heading>{photos[0].attributes.title}</Heading>
      <Container>
        <div>
          <div className="flex flex-col items-center justify-center text-center">
            <h2 className="mb-4 text-center text-lg font-bold">
              {photos[0].attributes.description}
            </h2>
            <div className="mb-5 w-12 border-t-2 border-green-800 " />
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {photos[0].attributes.images.data.map((photo: any) => (
              <div
                key={photo.src}
                className="relative h-56 w-full transition ease-in hover:-translate-y-1 hover:cursor-pointer"
              >
                <BlurhashCanvas
                  hash={photo.attributes.placeholder}
                  punch={1}
                  className="absolute inset-0 z-[-1] h-full w-full rounded-lg"
                />
                <Image
                  className="rounded-lg object-cover object-center"
                  src={getStrapiURL(photo.attributes.url)}
                  alt={photo.attributes.alternativeText}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
            ))}
          </div>
        </div>
      </Container>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const photos = await fetchAPI('/photos', { fields: ['slug'] })

  return {
    paths: photos.data.map((photo: any) => ({
      params: {
        slug: photo.attributes.slug,
      },
    })),
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps<{ photos: any }> = async ({
  params,
}: any) => {
  const photos = await fetchAPI('/photos', {
    filters: {
      slug: params.slug,
    },
    populate: '*',
  })

  return {
    props: {
      photos: photos.data,
    },
    revalidate: 1,
  }
}
