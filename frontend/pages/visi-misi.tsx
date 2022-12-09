import { GetStaticProps } from 'next'
import { NextSeo } from 'next-seo'
import Heading from '@/components/Heading'
import Container from '@/components/Container'

import { fetchAPI } from '@/lib/api'

export default function VisiMisi({ statement }: any) {
  const SEO = {
    title: 'Visi dan Misi',
  }

  return (
    <>
      <NextSeo {...SEO} />
      <Heading>{statement.attributes.title}</Heading>
      <Container>
        <div className="mb-8 space-y-4">
          <div className="space-y-4">
            <h3 className="text-3xl font-bold text-green-600">Visi</h3>
            <p className="text-2xl font-bold">
              {statement.attributes.vision.text}
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="text-3xl font-bold text-green-600">Misi</h3>
            {statement.attributes.mission.map((item: any, index: number) => (
              <div key={item.id} className="flex space-x-2 text-2xl">
                <p>{index + 1}.</p>
                <p>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const pageRes = await fetchAPI('/vision-and-mission', {
    populate: '*',
  })

  return {
    props: {
      statement: pageRes.data,
    },
    revalidate: 1,
  }
}
