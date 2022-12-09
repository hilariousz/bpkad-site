import * as React from 'react'
import { GetStaticProps } from 'next'
import { NextSeo } from 'next-seo'
import { createColumnHelper } from '@tanstack/react-table'
import Heading from '@/components/Heading'
import Container from '@/components/Container'
import LineChart from '@/components/LineChart'
import DataTable from '@/components/DataTable'

import { getStrapiURL, fetchAPI } from '@/lib/api'

type Report = {
  attributes: any
}

const columnHelper = createColumnHelper<Report>()

const columns = [
  columnHelper.accessor('attributes.year', {
    cell: (info) => info.getValue(),
    header: 'Tahun',
  }),
  columnHelper.accessor('attributes.name', {
    cell: (info) => info.getValue(),
    header: 'Nama',
  }),
  columnHelper.accessor('attributes.description', {
    cell: (info) => info.getValue(),
    header: 'Deskripsi',
  }),
  columnHelper.accessor('attributes.file.data.attributes.url', {
    cell: (info) => (
      <a
        target="_blank"
        href={getStrapiURL(info.getValue())}
        rel="noopener noreferrer"
        className="rounded-lg bg-green-500 px-4 py-2 text-white hover:bg-green-700 hover:no-underline"
      >
        Download
      </a>
    ),
    header: 'File',
    enableSorting: false,
  }),
]

export default function KeuanganDaerah({ reports, apbdGraph }: any) {
  const SEO = {
    title: 'Keuangan Daerah',
  }

  const [items, setItems] = React.useState([])
  const [selectedYear, setSelectedYear] = React.useState()

  const uniqueYearValue = Array.from(
    new Set(reports.map((item: any) => item.attributes.year))
  )

  const fetchData = async () => {
    const reportsRes = await fetchAPI('/reports', {
      populate: '*',
      filters: {
        year: {
          $eq: selectedYear,
        },
      },
      pagination: {
        pageSize: 250,
      },
    })
    setItems(reportsRes.data)
  }

  React.useEffect(() => {
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedYear])

  const chartData = {
    labels: apbdGraph.map((item: any) => item.attributes.labelYear),
    datasets: [
      {
        label: 'APBD',
        data: apbdGraph.map((item: any) => item.attributes.totalAPBD),
        borderColor: 'rgb(47, 151, 255)',
        backgroundColor: 'rgba(47, 151, 255, 1)',
        borderWidth: 2,
      },
      {
        label: 'Pendapatan',
        data: apbdGraph.map((item: any) => item.attributes.totalPendapatan),
        borderColor: 'rgb(255, 191, 0)',
        backgroundColor: 'rgba(255, 191, 0, 1)',
        borderWidth: 2,
      },
      {
        label: 'Belanja',
        data: apbdGraph.map((item: any) => item.attributes.totalBelanja),
        borderColor: 'rgb(0, 255, 0)',
        backgroundColor: 'rgba(0, 255, 0, 1)',
        borderWidth: 2,
      },
    ],
  }

  return (
    <>
      <NextSeo {...SEO} />
      <Heading>Keuangan Daerah</Heading>
      <Container>
        <div>
          <div className="mb-10 h-96 rounded-lg border border-gray-100 py-6 px-4 shadow-md dark:border-gray-700 dark:bg-gray-800">
            <LineChart data={chartData} />
          </div>
          <div>
            <div className="relative my-5 flex max-w-full flex-col gap-2 sm:max-w-xs sm:flex-row">
              <select
                name="Category"
                aria-label="Category"
                className="mt-1 block w-full rounded-lg border-gray-200 text-sm shadow focus:border-green-500 focus:ring-1 focus:ring-green-500 focus:ring-opacity-75 dark:border-gray-800 dark:bg-gray-800"
                onChange={(e: any) => setSelectedYear(e.target.value)}
              >
                <option disabled>Cari Tahun</option>
                {uniqueYearValue.map((option: any) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <DataTable columns={columns} data={items} />
          </div>
        </div>
      </Container>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const reportRes = fetchAPI('/reports', {
    populate: '*',
    sort: ['year:asc'],
  })
  const apbdGraphRes = fetchAPI('/apbd-graphs', {
    populate: '*',
    sort: ['labelYear:asc'],
  })

  const [reports, apbdGraph] = await Promise.all([reportRes, apbdGraphRes])

  return {
    props: {
      reports: reports.data,
      apbdGraph: apbdGraph.data,
    },
    revalidate: 1,
  }
}
