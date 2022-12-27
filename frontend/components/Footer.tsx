import * as React from 'react'
import { EnvelopeIcon, MapPinIcon, PhoneIcon } from '@heroicons/react/24/solid'
import { FaInstagram, FaTwitter, FaFacebook } from 'react-icons/fa'
import Link from 'next/link'

export function ListHeader({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <p className="mb-2 text-base font-medium">{children}</p>
    </div>
  )
}

export default function Footer() {
  return (
    <footer className="mt-8 border-t-4 border-green-600 bg-gray-50 text-gray-700 dark:bg-gray-800 dark:text-gray-200">
      <div className="mx-auto max-w-7xl px-2 lg:px-3">
        <div className="grid gap-8 py-8 px-4 sm:grid-cols-2 md:grid-cols-4">
          <div className="flex flex-col">
            <div className="space-y-8">
              <img
                className="h-10 w-auto lg:block"
                src="/logo.png"
                alt="BPKAD Mahakam Ulu"
              />

              <div className="inline-flex space-x-4">
                <a
                  aria-label="Facebook Link"
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://facebook.com"
                >
                  <FaFacebook className="text-gray-500" size={25} />
                </a>
                <a
                  aria-label="Twitter Link"
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://twitter.com"
                >
                  <FaTwitter className="text-gray-500" size={25} />
                </a>
                <a
                  aria-label="Instagram Link"
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://instagram.com"
                >
                  <FaInstagram className="text-gray-500" size={25} />
                </a>
              </div>
            </div>
          </div>
          <div>
            <div className="flex flex-col items-start space-y-2">
              <ListHeader>UNIT KERJA</ListHeader>
              <Link href="/tugas-fungsi">Sekretariat</Link>
              <Link href="/tugas-fungsi">Bidang Anggaran</Link>
              <Link href="/tugas-fungsi">Bidang Aset</Link>
              <Link href="/tugas-fungsi">Bidang Akuntansi</Link>
              <Link href="/tugas-fungsi">Bidang Perbendaharaan</Link>
            </div>
          </div>
          <div>
            <div className="flex flex-col space-y-2">
              <ListHeader>JAM PELAYANAN</ListHeader>
              <div>
                <p>Senin - Kamis</p>
                <p>08.00 - 17.00</p>
                <p>Jum&lsquo;at</p>
                <p>08.00 - 11.00</p>
                <p>Sabtu & Minggu</p>
                <p>Tutup</p>
              </div>
            </div>
          </div>
          <div>
            <div className="flex flex-col space-y-2">
              <ListHeader>ALAMAT</ListHeader>
              <div className="flex flex-col space-y-8">
                <div className="flex space-x-2 text-sm">
                  <span>
                    <MapPinIcon className="h-5 w-5  text-gray-500" />
                  </span>
                  <p>
                    Jl. Poros Kampung Ujoh Bilang, Kec. Long Bagun, Kab. Mahakam
                    Ulu
                  </p>
                </div>
                <div className="flex space-x-2 text-sm">
                  <span>
                    <PhoneIcon className="h-5 w-5 text-gray-500" />
                  </span>
                  <p>-</p>
                </div>
                <div className="flex space-x-2 text-sm">
                  <span>
                    <EnvelopeIcon className="h-5 w-5  text-gray-500" />
                  </span>
                  <p>bpkad@mahakamulukab.go.id</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center ">
        <p className="py-2 px-4 text-center text-sm">
          © 2022 - {new Date().getFullYear()} Badan Pengelola Keuangan & Aset
          Daerah Kab. Mahakam Ulu. All rights reserved
        </p>
      </div>
    </footer>
  )
}
