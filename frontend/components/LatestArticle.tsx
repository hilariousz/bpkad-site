import Link from 'next/link'
import { ChevronRightIcon } from '@heroicons/react/24/solid'
import Card from './Card'
import Container from './Container'

export default function LatestArticle({ articles }: any) {
  return (
    <section className="mb-8 bg-gray-50 py-8 dark:bg-gray-800">
      <Container>
        <p className="text-3xl font-bold">Berita Terkini</p>
        <div className="mb-5 w-12 border-t-2 border-green-800 " />
        <div>
          <ul className="flex flex-wrap justify-center gap-10">
            {articles.map((item: any) => (
              <Card key={item.id} props={item} />
            ))}
          </ul>
        </div>
        <div className="flex items-center justify-center p-4">
          <Link
            className="flex items-center rounded-lg px-4 py-2 text-green-600  ring-1 ring-green-600 hover:bg-green-100"
            href="/berita"
          >
            Lihat Selengkapnya <ChevronRightIcon className="ml-2 h-3 w-3" />
          </Link>
        </div>
      </Container>
    </section>
  )
}
