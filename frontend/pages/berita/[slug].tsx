import { GetStaticPaths, GetStaticProps } from 'next'
import { NextSeo } from 'next-seo'

import Link from 'next/link'
import Image from 'next/image'
import { BlurhashCanvas } from 'react-blurhash'
import ReactMarkdown from 'react-markdown'
import { formatDate } from '@/utils/formatDate'
import Container from '@/components/Container'

import { getStrapiURL, fetchAPI } from '@/lib/api'

export default function Article({ article, articles }: any) {
  const SEO = {
    title: article.attributes.title,
    description: article.attributes.description,
  }

  const { url, width, height, alternativeText, placeholder } =
    article.attributes.cover.data.attributes

  return (
    <>
      <NextSeo {...SEO} />
      <Container>
        <div className="mt-8 flex flex-col gap-10 lg:flex-row">
          <article className="space-y-10 lg:w-2/3">
            <h1 className="text-3xl font-bold">{article.attributes.title}</h1>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Dipublikasikan{' '}
              {formatDate(new Date(article.attributes.publishedAt))}
            </span>
            <div className="flex items-center justify-center">
              <Image
                className="max-h-[500px] rounded-sm object-cover"
                src={getStrapiURL(url)}
                alt={alternativeText}
                width={width}
                height={height}
              />
            </div>
            <div className="prose mx-auto max-w-none dark:prose-invert">
              <ReactMarkdown>{article.attributes.content}</ReactMarkdown>
            </div>
          </article>
          <div className="lg:w-1/3">
            <p className="p-2 text-lg font-bold">Berita Terkini</p>
            <div>
              <LatestArticles articles={articles} />
            </div>
          </div>
        </div>
      </Container>
    </>
  )
}

function LatestArticles({ articles }: any) {
  return (
    <ul className="flex flex-col flex-wrap space-y-4">
      {articles.map((item: any) => (
        <li className="rounded-lg drop-shadow-lg" key={item.id}>
          <Link
            className="hover:text-green-600"
            href={`${encodeURIComponent(item.attributes.slug)}`}
          >
            <div className="flex space-x-4 p-2">
              <div className="relative h-20 min-w-[120px]">
                <BlurhashCanvas
                  hash={item.attributes.cover.data.attributes.placeholder}
                  punch={1}
                  className="absolute inset-0 z-[-1] h-full w-full rounded-md"
                />
                <Image
                  className="rounded-md object-cover"
                  src={getStrapiURL(item.attributes.cover.data.attributes.url)}
                  alt={item.attributes.cover.data.attributes.alternativeText}
                  fill
                />
              </div>
              <div>
                <h2 className="text-base font-bold lg:text-sm">
                  {item.attributes.title}
                </h2>
                <p className="text-sm text-gray-500">
                  {formatDate(new Date(item.attributes.publishedAt))}
                </p>
              </div>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const articles = await fetchAPI('/articles', { fields: ['slug'] })

  return {
    paths: articles.data.map((post: any) => ({
      params: {
        slug: post.attributes.slug,
      },
    })),
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps = async ({ params }: any) => {
  const [article, articles] = await Promise.all([
    fetchAPI('/articles', {
      filters: {
        slug: params.slug,
      },
      populate: '*',
    }),
    fetchAPI('/articles', {
      filters: {
        slug: {
          $ne: params.slug,
        },
      },
      populate: '*',
      sort: ['publishedAt:desc'],
    }),
  ])

  if (!article.data[0]) {
    return {
      notFound: true,
    }
  }

  return {
    props: { article: article.data[0], articles: articles.data },
    revalidate: 1,
  }
}
