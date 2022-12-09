import * as React from 'react'
import { GetStaticProps } from 'next'
import { NextSeo } from 'next-seo'
import { createColumnHelper } from '@tanstack/react-table'
import Heading from '@/components/Heading'
import Container from '@/components/Container'
import DataTable from '@/components/DataTable'

import { getStrapiURL, fetchAPI } from '@/lib/api'

type Product = {
  attributes: any
}

const columnHelper = createColumnHelper<Product>()

const columns = [
  columnHelper.accessor('attributes.category.data.attributes.name', {
    cell: (info) => info.getValue(),
    header: 'Kategori',
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

export default function ProdukHukum({ products, category }: any) {
  const SEO = {
    title: 'Produk Hukum',
  }
  const [items, setItems] = React.useState([])
  const [selectedCategory, setSelectedCategory] = React.useState()

  const fetchData = async () => {
    const products = await fetchAPI('/products', {
      populate: '*',
      filters: {
        category: {
          slug: {
            $eq: selectedCategory,
          },
        },
      },
      pagination: {
        pageSize: 250,
      },
    })
    setItems(products.data)
  }

  React.useEffect(() => {
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategory])

  return (
    <>
      <NextSeo {...SEO} />
      <Heading>Produk Hukum</Heading>
      <Container>
        <div>
          <div className="relative my-5 flex max-w-full flex-col gap-2 sm:max-w-xs sm:flex-row">
            <select
              name="Category"
              aria-label="Category"
              className="mt-1 block w-full rounded-lg border-gray-200 text-sm shadow focus:border-green-500 focus:ring-1 focus:ring-green-500 focus:ring-opacity-75 dark:border-gray-800 dark:bg-gray-800"
              onChange={(e: any) => setSelectedCategory(e.target.value)}
            >
              <option disabled>Cari Kategori</option>
              {category.map((option: any) => (
                <option key={option.id} value={option.attributes.slug}>
                  {option.attributes.name}
                </option>
              ))}
            </select>
          </div>
          <DataTable columns={columns} data={items} />
        </div>
      </Container>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const productRes = fetchAPI('/products', {
    populate: '*',
  })

  const categoryRes = fetchAPI('/product-categories', {
    populate: '*',
  })

  const [product, category] = await Promise.all([productRes, categoryRes])

  return {
    props: {
      products: product.data,
      category: category.data,
    },
    revalidate: 1,
  }
}
