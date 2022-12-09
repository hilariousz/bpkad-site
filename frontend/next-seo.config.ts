import { DefaultSeoProps } from 'next-seo'

const config: DefaultSeoProps = {
  title: 'Beranda',
  titleTemplate: '%s | BPKAD Kab. Mahakam Ulu',
  description: 'Badan Pengelola Keuangan dan Aset Daerah Kabupaten Mahakam Ulu',
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: 'http://localhost:3000',
    siteName: 'BPKAD Kabupaten Mahakam Ulu',
  },
}

export default config
