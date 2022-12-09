import Link from 'next/link'
import {
  ChevronRightIcon,
  ClipboardDocumentListIcon,
  ArrowDownTrayIcon,
  DocumentTextIcon,
} from '@heroicons/react/24/solid'
import Container from './Container'

export default function Infographic({ articlesCount, reportsCount }: any) {
  return (
    <section className="mb-8 py-8">
      <Container>
        <div className="flex flex-col sm:flex-row">
          <div className="flex h-48 flex-1 flex-col  items-center justify-center rounded-t-lg bg-gray-50 p-4 text-center dark:bg-gray-800 sm:rounded-l-lg sm:rounded-tr-none">
            <ArrowDownTrayIcon className="h-12 w-12 text-green-600" />
            <p className="text-3xl font-bold">1</p>
            <p className="text-xl font-bold">File Download</p>
            <Link
              href="/keuangan-daerah"
              className="flex items-center py-2 text-green-600"
            >
              Selengkapnya
              <span>
                <ChevronRightIcon className="ml-2 -mb-1 h-3 w-3" />
              </span>
            </Link>
          </div>
          <div className="flex h-48 flex-1 flex-col items-center justify-center bg-gray-100 p-4 text-center dark:bg-gray-700">
            <DocumentTextIcon className="h-12 w-12 text-green-600" />
            <p className="text-3xl font-bold">{articlesCount.total}</p>
            <p className="text-xl font-bold">Total Berita</p>
            <Link
              href="/berita"
              className="flex items-center py-2 text-green-600"
            >
              Selengkapnya
              <span>
                <ChevronRightIcon className="ml-2 -mb-1 h-3 w-3" />
              </span>
            </Link>
          </div>
          <div className="flex h-48 flex-1 flex-col items-center justify-center rounded-b-lg bg-gray-200 p-4 text-center dark:bg-gray-600 sm:rounded-r-lg sm:rounded-bl-none">
            <ClipboardDocumentListIcon className="h-12 w-12 text-green-600" />
            <p className="text-3xl font-bold">{reportsCount.total}</p>
            <p className="text-xl font-bold">Laporan Keuangan</p>
            <Link
              href="/keuangan-daerah"
              className="flex items-center py-2 text-green-600"
            >
              Selengkapnya
              <span>
                <ChevronRightIcon className="ml-2 -mb-1 h-3 w-3" />
              </span>
            </Link>
          </div>
        </div>
      </Container>
    </section>
  )
}
