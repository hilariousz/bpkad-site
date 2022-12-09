import { getStrapiURL } from '@/lib/api'
import Image from 'next/image'
import Container from './Container'
import Hero from './Hero'

export default function Greeting({ greeting }: any) {
  return (
    <section className="mb-24 mt-12">
      <Container className="flex flex-col items-center justify-between space-y-10 space-x-10 py-8 sm:flex-row sm:space-y-0">
        <div>
          <p className="text-3xl font-bold">{greeting.intro}</p>
          <div className="mb-5 w-12 border-t-2 border-green-800 " />
          <p className="text-justify">{greeting.greeting}</p>
        </div>
        <div>
          <div className="relative h-72 w-60 rounded-lg bg-gray-300">
            <div className="z-1 absolute top-2 -left-2 h-72 w-60 rounded-lg bg-gray-200"></div>
            <div className="z-2 absolute -top-10">
              <div className="relative -left-2">
                <Image
                  className="h-auto w-auto object-contain"
                  src={getStrapiURL(greeting.image.data.attributes.url)}
                  alt="Kepala BPKAD Kab. Mahakam Ulu"
                  height={greeting.image.data.attributes.height}
                  width={greeting.image.data.attributes.width}
                />
              </div>
              <div className="z-4 absolute -left-1 -mt-1 w-full rounded-md bg-gradient-to-br from-green-700 to-green-500 py-2 px-4 text-center text-xs text-white">
                <p>{greeting.name}</p>
                <p>KEPALA BPKAD KAB MAHAKAM ULU</p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
