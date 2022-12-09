import dynamic from 'next/dynamic'
import { GetStaticProps } from 'next'
import { NextSeo } from 'next-seo'
import Heading from '@/components/Heading'
import Container from '@/components/Container'

import { fetchAPI } from '@/lib/api'

const ReactPlayer = dynamic(() => import('react-player/lazy'), { ssr: false })

export default function Video({ videos }: any) {
  const SEO = {
    title: 'Galeri Video',
  }

  return (
    <>
      <NextSeo {...SEO} />
      <Heading>
        <h1 className="text-3xl font-bold">Galeri Video</h1>
      </Heading>
      <Container>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {videos.map((video: any) => (
            <div key={video.id} className="aspect-video">
              <ReactPlayer
                className="overflow-hidden rounded-lg"
                url={video.attributes.url}
                width="100%"
                height="100%"
                light={true}
                playing={true}
                controls={true}
              />
            </div>
          ))}
        </div>
      </Container>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const videos = await fetchAPI('/videos', {
    populate: '*',
  })

  return {
    props: {
      videos: videos.data,
    },
    revalidate: 1,
  }
}
