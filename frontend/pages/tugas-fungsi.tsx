import { GetStaticProps } from 'next'
import { NextSeo } from 'next-seo'
import ReactMarkdown from 'react-markdown'
import Heading from '@/components/Heading'

import { fetchAPI } from '@/lib/api'

import Container from '@/components/Container'

export default function TugasFungsi({ taskFunction }: any) {
  const SEO = {
    title: 'Tugas Pokok dan Fungsi',
  }

  return (
    <>
      <NextSeo {...SEO} />
      <Heading>{taskFunction.attributes.title}</Heading>
      <Container>
        <div className="prose mx-auto max-w-none dark:prose-invert">
          <ReactMarkdown>{taskFunction.attributes.content}</ReactMarkdown>
        </div>
      </Container>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const pageRes = await fetchAPI('/main-task-function', {
    populate: '*',
  })

  return {
    props: {
      taskFunction: pageRes.data,
    },
    revalidate: 1,
  }
}
