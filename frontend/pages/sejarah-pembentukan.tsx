import { GetStaticProps } from 'next'
import { NextSeo } from 'next-seo'
import ReactMarkdown from 'react-markdown'
import Heading from '@/components/Heading'
import Container from '@/components/Container'

import { fetchAPI } from '@/lib/api'

export default function SejarahPembentukan({ formationHistory }: any) {
  const SEO = {
    title: 'Sejarah Pembentukan',
  }

  return (
    <>
      <NextSeo {...SEO} />
      <Heading>{formationHistory.attributes.title}</Heading>
      <Container>
        <div className="prose mx-auto max-w-none dark:prose-invert">
          <ReactMarkdown>{formationHistory.attributes.content}</ReactMarkdown>
        </div>
      </Container>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const pageRes = await fetchAPI('/formation-history', {
    populate: '*',
  })

  return {
    props: {
      formationHistory: pageRes.data,
    },
    revalidate: 1,
  }
}
