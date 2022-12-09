import Link from 'next/link'
import Image from 'next/image'
import { ChevronRightIcon } from '@heroicons/react/24/solid'
import { BlurhashCanvas } from 'react-blurhash'

import { getStrapiURL } from '@/lib/api'

export default function Card({ props }: any) {
  return (
    <li className="flex max-w-sm flex-1 basis-80 flex-col flex-wrap overflow-hidden rounded-lg bg-gray-50 shadow-md hover:opacity-80 dark:bg-gray-800">
      <Link href={`berita/${encodeURIComponent(props.attributes.slug)}`}>
        <div className="relative h-48 w-auto overflow-hidden">
          <BlurhashCanvas
            hash={props.attributes.cover.data.attributes.placeholder}
            punch={1}
            className="absolute inset-0 z-[-1] h-full w-full rounded-lg"
          />
          <Image
            className="h-auto w-auto rounded-t-lg object-cover object-center"
            src={getStrapiURL(props.attributes.cover.data.attributes.url)}
            alt="Image"
            fill
          />
        </div>
        <div className="flex flex-1 flex-col justify-between px-4 py-4">
          <div className="space-y-2">
            <span className="text-sm text-gray-500 dark:text-gray-400"></span>
            <h1 className="text-md font-medium">{props.attributes.title}</h1>
            <p className="text-md line-clamp-3">
              {props.attributes.description}
            </p>
            <p className="flex items-center text-green-600">
              Selengkapnya <ChevronRightIcon className="ml-2 -mb-1 h-3 w-3" />
            </p>
          </div>
        </div>
      </Link>
    </li>
  )
}
