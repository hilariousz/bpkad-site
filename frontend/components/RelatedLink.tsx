import Image from 'next/image'
import Container from './Container'

import { getStrapiURL } from '@/lib/api'

export default function RelatedLink({ relatedLinks }: any) {
  return (
    <section className="mb-8 py-8">
      <Container>
        <div>
          <p className="text-3xl font-bold">Instansi Terkait</p>
          <div className="mb-5 w-12 border-t-2 border-green-800 " />
        </div>
        <div className="grid auto-rows-fr grid-cols-2 justify-items-center gap-8 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-6">
          {relatedLinks &&
            relatedLinks.map((link: any) => (
              <a
                key={link.id}
                target="_blank"
                href={link.url}
                rel="noopener noreferrer"
                className="relative flex w-full items-center justify-center rounded-lg bg-gray-50 p-4 dark:bg-gray-800"
              >
                <Image
                  className="h-auto max-h-[60px]  w-auto max-w-[90px]"
                  src={getStrapiURL(link.icon.data.attributes.url)}
                  alt={link.alt}
                  width={link.icon.data.attributes.width}
                  height={link.icon.data.attributes.height}
                />
              </a>
            ))}
        </div>
      </Container>
    </section>
  )
}
