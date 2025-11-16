'use client';

import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function HeroLanding() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');

  const placeholders = [
    "Cari jurnal berdasarkan judul...",
    "Masukkan nama jurnal atau subjek...",
    "Temukan jurnal bereputasi...",
    "Cari artikel ilmiah...",
    "Eksplorasi jurnal akademik...",
  ];

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchTerm)}`);
    }
  };

  return (
    <section className="w-full">
      <div className="flex flex-col justify-center items-center text-center space-y-10 py-16 sm:py-24">
        <div className="space-y-6">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-black dark:text-white tracking-tight">
            Cari Jurnal Bereputasi
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Platform pencarian jurnal ilmiah dari database SINTA dan API Elsevier
          </p>
        </div>

        <div className="w-full max-w-5xl px-4">
          <div className="flex flex-col md:flex-row items-start gap-3">
            <div className="flex-1 w-full">
              <PlaceholdersAndVanishInput
                placeholders={placeholders}
                onChange={(e) => setSearchTerm(e.target.value)}
                onSubmit={handleSearch}
              />
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-3 text-center">
                Search for new articles using keywords / titles
              </p>
            </div>
            
            <div className="flex items-start gap-2 w-full md:w-auto md:flex-shrink-0">
              <span className="text-gray-400 dark:text-gray-500 font-medium pt-3">or</span>
              <div className="flex-1 md:flex-initial">
                <button
                  onClick={() => router.push('/library')}
                  className="w-full md:w-auto h-[56px] px-8 bg-black dark:bg-white text-white dark:text-black border-2 border-black dark:border-white rounded-full hover:bg-gray-900 dark:hover:bg-gray-100 transition-all flex items-center justify-center gap-2 font-semibold shadow-lg hover:shadow-xl whitespace-nowrap"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  Browse Library
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-3 text-center">
                  Grow what you&apos;ve found
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-700 dark:text-gray-300">
          <div className="flex items-center gap-2 font-medium">
            <svg className="w-5 h-5 text-black dark:text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>Database SINTA</span>
          </div>
          <div className="flex items-center gap-2 font-medium">
            <svg className="w-5 h-5 text-black dark:text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>API Elsevier</span>
          </div>
          <div className="flex items-center gap-2 font-medium">
            <svg className="w-5 h-5 text-black dark:text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>Pencarian Cepat</span>
          </div>
        </div>
      </div>
    </section>
  );
}
