import Image from 'next/image'

import { getStrapiURL } from '@/lib/api'

export default function Hero({ hero }: any) {
  return (
    <div className="relative w-screen items-center justify-start">
      {hero && (
        <Image
          className="-z-10 object-cover object-center"
          src={getStrapiURL(hero.heroImage.data.attributes.url)}
          alt="Hero Image"
          fill
          quality={100}
          priority
        />
      )}
      <div className="mx-auto flex max-w-7xl flex-1 flex-col space-y-4 px-8 pb-80 pt-20 md:pb-10">
        <div className="text-3xl font-bold">
          Selamat Datang di Website Resmi
        </div>
        <h1 className="text-4xl font-bold">
          Badan Pengelola Keuangan dan Aset Daerah <br /> Kabupaten Mahakam Ulu
        </h1>
        <div className="flex animate-bounce flex-col space-y-2">
          <div>
            <svg
              className="fill-current"
              width="24"
              height="24"
              viewBox="0 0 22 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M9.85465 3.33333C7.74531 3.33333 6.67198 3.55866 5.68398 4.08666C4.86001 4.5202 4.18685 5.19336 3.75331 6.01733C3.22531 7.004 2.99998 8.07866 2.99998 10.1867V17.8107C2.99998 19.92 3.22531 20.9933 3.75331 21.9813C4.20265 22.8213 4.84398 23.4627 5.68398 23.912C6.67065 24.44 7.74531 24.6653 9.85465 24.6653H12.1453C14.2546 24.6653 15.328 24.44 16.316 23.912C17.1399 23.4785 17.8131 22.8053 18.2466 21.9813C18.7746 20.9947 19 19.92 19 17.8107V10.1867C19 8.07733 18.7746 7.004 18.2466 6.016C17.8131 5.19203 17.1399 4.51886 16.316 4.08533C15.3293 3.55866 14.2546 3.33333 12.1466 3.33333H9.85331H9.85465ZM9.85465 0.666664H12.1453C14.8306 0.666664 16.2706 1.03733 17.5746 1.73466C18.8631 2.41665 19.9167 3.47025 20.5986 4.75866C21.296 6.06266 21.6666 7.50266 21.6666 10.188V17.812C21.6666 20.4973 21.296 21.9373 20.5986 23.2413C19.9167 24.5297 18.8631 25.5833 17.5746 26.2653C16.2706 26.9627 14.8306 27.3333 12.1453 27.3333H9.85331C7.16798 27.3333 5.72798 26.9627 4.42398 26.2653C3.13557 25.5833 2.08197 24.5297 1.39998 23.2413C0.70398 21.9373 0.333313 20.4973 0.333313 17.812V10.1867C0.333313 7.50133 0.70398 6.06133 1.40131 4.75733C2.08387 3.46922 3.13794 2.41608 4.42665 1.73466C5.72931 1.03733 7.16931 0.666664 9.85465 0.666664ZM9.66665 6H12.3333V12.6667H9.66665V6Z" />
            </svg>
          </div>
          <div className="flex items-center space-x-2">
            <svg
              className="fill-current"
              width="22"
              height="20"
              viewBox="0 0 22 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12.3333 16.5627L19.4853 9.41067L21.3707 11.296L11 21.6667L0.629333 11.296L2.51467 9.41067L9.66667 16.5627V0.333336H12.3333V16.5627Z" />
            </svg>
            <span className="font-bold">Scroll</span>
          </div>
        </div>
        <div className="hidden max-w-4xl grid-cols-3 gap-4 py-4 md:grid">
          <div>
            <div className="relative h-64 w-full">
              <Image
                className="-z-10 h-auto w-auto object-contain"
                src="/wakil-bupati.png"
                alt="wakil bupati"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority
              />
            </div>
            <div className="z-10 -mt-1 rounded-md bg-gradient-to-br from-green-700 to-green-500 p-2 text-center text-xs text-white">
              <p>Drs. YOHANES AVUN, M.Si.</p>
              <p>WAKIL BUPATI MAHAKAM ULU</p>
            </div>
          </div>
          <div>
            <div className="relative h-64 w-full">
              <Image
                className="-z-10 h-auto w-auto object-contain"
                src="/bupati.png"
                alt="wakil bupati"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority
              />
            </div>
            <div className="-mt-1 rounded-md bg-gradient-to-br from-green-700 to-green-500 p-2 text-center text-xs text-white">
              <p>BONIFASIUS BELAWAN GEH, S.H., M.E.</p>
              <p>BUPATI MAHAKAM ULU</p>
            </div>
          </div>
          <div>
            <div className="relative h-64 w-full">
              <Image
                className="-z-10 h-auto w-auto object-contain"
                src="/sekda.png"
                alt="wakil bupati"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority
              />
            </div>
            <div className="-mt-1 rounded-md bg-gradient-to-br from-green-700 to-green-500 p-2 text-center text-xs text-white">
              <p>Dr. STEPHANUS MADANG, S.Sos., M.M.</p>
              <p>SEKDA KAB MAHAKAM ULU</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
