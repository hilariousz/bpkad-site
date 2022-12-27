import * as React from 'react'
import { GetStaticProps } from 'next'
import { NextSeo } from 'next-seo'
import Heading from '@/components/Heading'
import Container from '@/components/Container'
import Card from '@/components/Card'
import { PageButton } from '@/components/shared/buttons'

import useSWR from 'swr'
import { fetchAPI, fetcher } from '@/lib/api'

export default function Berita({ articles }: any) {
  const SEO = {
    title: 'Berita',
  }

  const [pageIndex, setPageIndex] = React.useState(1)

  const { data } = useSWR(
    `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/articles/?populate=*&sort[0]=publishedAt%3Adesc&pagination[page]=${pageIndex}&pagination[pageSize]=6`,
    fetcher,
    { fallbackData: articles }
  )

  return (
    <>
      <NextSeo {...SEO} />
      <Heading>Berita BPKAD</Heading>
      <Container>
        <div className="flex flex-col space-y-6">
          <div>
            <ul className="flex min-h-[320px] flex-wrap justify-center gap-12">
              {data.data?.map((item: any) => (
                <Card key={item.id} props={item} />
              ))}
            </ul>
          </div>
          <div>
            <PageButton
              className="rounded-l-lg"
              onClick={() => setPageIndex(pageIndex - 1)}
              disabled={pageIndex === 1}
            >
              Prev
            </PageButton>
            <PageButton
              className="rounded-r-lg"
              onClick={() => setPageIndex(pageIndex + 1)}
              disabled={
                pageIndex === (data.meta && data.meta.pagination.pageCount)
              }
            >
              Next
            </PageButton>
          </div>
        </div>
      </Container>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const articles = await fetchAPI('/articles', {
    populate: '*',
    sort: ['publishedAt:desc'],
    pagination: {
      pageSize: 6,
    },
  })

  return {
    props: {
      articles: articles.data,
    },
    revalidate: 1,
  }
}
