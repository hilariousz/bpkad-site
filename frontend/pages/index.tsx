import { GetStaticProps } from 'next'
import { NextSeo } from 'next-seo'
import Hero from '@/components/Hero'
import Greeting from '@/components/Greeting'
import LatestArticle from '@/components/LatestArticle'
import ImageShowcase from '@/components/ImageShowcase'
import RelatedLink from '@/components/RelatedLink'
import Infographic from '@/components/Infographic'

import { fetchAPI } from '@/lib/api'

export default function Home({
  home,
  images,
  articles,
  articlesCount,
  reportsCount,
}: any) {
  const SEO = {
    title: 'Beranda',
  }

  return (
    <>
      <NextSeo {...SEO} />
      <Hero hero={home.attributes.hero} />
      <Greeting greeting={home.attributes.greeting} />
      <LatestArticle articles={articles} />
      <ImageShowcase images={images} />
      <RelatedLink relatedLinks={home.attributes.relatedLinks} />
      <Infographic articlesCount={articlesCount} reportsCount={reportsCount} />
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const homeRes = fetchAPI('/home', {
    populate: {
      hero: {
        populate: '*',
      },
      greeting: {
        populate: '*',
      },
      relatedLinks: {
        populate: '*',
      },
    },
  })

  const articleRes = fetchAPI('/articles', {
    populate: '*',
    pagination: {
      limit: 3,
    },
  })

  const photoRes = fetchAPI('/photos', {
    populate: '*',
  })

  const reportRes = fetchAPI('/reports', {
    populate: '*',
  })

  const [home, articles, images, reports] = await Promise.all([
    homeRes,
    articleRes,
    photoRes,
    reportRes,
  ])

  return {
    props: {
      home: home.data,
      images: images.data,
      articles: articles.data,
      reportsCount: reports.meta.pagination,
      articlesCount: articles.meta.pagination,
    },
    revalidate: 1,
  }
}
