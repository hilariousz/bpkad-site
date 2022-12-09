import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ThemeProvider } from 'next-themes'
import SEO from '@/next-seo.config'
import { DefaultSeo } from 'next-seo'
import NextProgress from 'nextjs-progressbar'
import BasicLayout from '@/components/BasicLayout'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <DefaultSeo {...SEO} />
      <ThemeProvider attribute="class">
        <NextProgress options={{ showSpinner: false }} color={'#16a34a'} />
        <BasicLayout>
          <Component {...pageProps} />
        </BasicLayout>
      </ThemeProvider>
    </>
  )
}
