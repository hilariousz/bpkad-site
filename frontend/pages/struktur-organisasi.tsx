import { GetStaticProps } from 'next'
import { NextSeo } from 'next-seo'
import Heading from '@/components/Heading'
import Container from '@/components/Container'
import Image from 'next/image'

import { fetchAPI, getStrapiURL } from '@/lib/api'

export default function StrukturOrganisasi({ orgStructure }: any) {
  const SEO = {
    title: 'Struktur Organisasi',
  }

  const { url, width, height, alternativeText } =
    orgStructure.attributes.image.data.attributes

  return (
    <>
      <NextSeo {...SEO} />
      <Heading>{orgStructure.attributes.title}</Heading>
      <Container>
        <div className="flex items-center justify-center">
          {orgStructure.attributes.image.data && (
            <Image
              src={getStrapiURL(url)}
              alt={alternativeText}
              width={width}
              height={height}
            />
          )}
        </div>
      </Container>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const pageRes = await fetchAPI('/org-structure', {
    populate: '*',
  })

  return {
    props: {
      orgStructure: pageRes.data,
    },
    revalidate: 1,
  }
}
