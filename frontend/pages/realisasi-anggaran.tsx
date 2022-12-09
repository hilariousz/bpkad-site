import { GetStaticProps } from 'next'
import { NextSeo } from 'next-seo'
import Heading from '@/components/Heading'
import Container from '@/components/Container'
import BarChart from '@/components/BarChart'

import { fetchAPI } from '@/lib/api'

export default function RealisasiAnggaran({ lradGraph }: any) {
  const SEO = {
    title: 'Realisasi Anggaran',
  }

  const chartDataPD = {
    labels: lradGraph.attributes.pendapatan.map((item: any) => item.label),
    datasets: [
      {
        label: 'Anggaran',
        data: lradGraph.attributes.pendapatan.map((item: any) => item.anggaran),
        backgroundColor: 'rgba(47, 151, 255, 1)',
        borderRadius: 2,
      },
      {
        label: 'Realisasi',
        data: lradGraph.attributes.pendapatan.map(
          (item: any) => item.realisasi
        ),
        backgroundColor: 'rgba(255, 191, 0, 1)',
        borderRadius: 2,
      },
    ],
  }

  const chartDataBD = {
    labels: lradGraph.attributes.belanja.map((item: any) => item.label),
    datasets: [
      {
        label: 'Anggaran',
        data: lradGraph.attributes.belanja.map((item: any) => item.anggaran),
        backgroundColor: 'rgba(47, 151, 255, 1)',
        borderRadius: 2,
      },
      {
        label: 'Realisasi',
        data: lradGraph.attributes.belanja.map((item: any) => item.realisasi),
        backgroundColor: 'rgba(255, 191, 0, 1)',
        borderRadius: 2,
      },
    ],
  }

  return (
    <>
      <NextSeo {...SEO} />
      <Heading>Realisasi Anggaran TA. 2022</Heading>
      <Container>
        <div className=" mx-auto mb-10 max-w-5xl rounded-lg border border-gray-100 py-6 px-4 shadow-md dark:border-gray-700 dark:bg-gray-800">
          <h2 className="text-center font-bold sm:text-xl">
            Realisasi Anggaran Pendapatan Daerah
          </h2>
          <BarChart data={chartDataPD} />
        </div>
        <div className="mx-auto mb-10 max-w-5xl rounded-lg border border-gray-100 py-6 px-4 shadow-md dark:border-gray-700 dark:bg-gray-800">
          <h2 className="text-center font-bold sm:text-xl">
            Realisasi Anggaran Belanja Daerah
          </h2>
          <BarChart data={chartDataBD} />
        </div>
      </Container>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const lradGraphsRes = await fetchAPI('/lrad-graphs', {
    filters: {
      labelYear: {
        $eq: 2022,
      },
    },
    populate: '*',
  })

  return {
    props: {
      lradGraph: lradGraphsRes.data[0],
    },
    revalidate: 1,
  }
}
