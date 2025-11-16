export default function SectionTwo() {
  return (
    <section className="w-full py-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
        {/* Recently Saved */}
        <div className="bg-gray-50 dark:bg-gray-900 p-8 rounded-3xl border-2 border-gray-200 dark:border-gray-800 hover:border-black dark:hover:border-white transition-all duration-300">
          <h2 className="text-2xl font-bold text-black dark:text-white mb-2">
            Recently saved
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Dive deeper on your new finds
          </p>
          <div className="flex flex-col items-center justify-center py-12 space-y-4">
            <svg className="w-16 h-16 text-gray-300 dark:text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 19a2 2 0 01-2-2V7a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1M5 19h14a2 2 0 002-2v-5a2 2 0 00-2-2H9a2 2 0 00-2 2v5a2 2 0 01-2 2z" />
            </svg>
            <p className="text-lg font-semibold text-gray-800 dark:text-gray-200">
              Nothing here... yet
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-500 text-center">
              Start a search to find articles
            </p>
          </div>
        </div>

        {/* Library */}
        <div className="bg-gray-50 dark:bg-gray-900 p-8 rounded-3xl border-2 border-gray-200 dark:border-gray-800 hover:border-black dark:hover:border-white transition-all duration-300">
          <h2 className="text-2xl font-bold text-black dark:text-white mb-2">
            Library
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Find new articles for your favourite topics
          </p>
          <div className="flex flex-col items-center justify-center py-12 space-y-4">
            <svg className="w-16 h-16 text-gray-300 dark:text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            <p className="text-lg font-semibold text-gray-800 dark:text-gray-200">
              You have no collections
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-500 text-center max-w-xs">
              Create collections as you explore to organize your research.
            </p>
          </div>
        </div>

        {/* What's New */}
        <div className="bg-black dark:bg-white p-8 rounded-3xl border-2 border-black dark:border-white transition-all duration-300">
          <h2 className="text-2xl font-bold text-white dark:text-black mb-2">
            What&apos;s New
          </h2>
          <p className="text-gray-300 dark:text-gray-700 mb-6">
            Learn about all things Jurnal Bereputasi.
          </p>
          
          {/* Welcome Card */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 mb-4 border border-gray-200 dark:border-gray-800">
            <div className="flex items-center gap-4 mb-3">
              <div className="text-sm font-semibold text-gray-900 dark:text-white">Jurnal Bereputasi</div>
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              Welcome to Jurnal Bereputasi!
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Temukan jurnal berkualitas untuk penelitian Anda.
            </p>
          </div>

          {/* Browse Guides Card */}
          <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl p-6 border border-gray-300 dark:border-gray-700">
            <div className="flex items-center justify-center mb-4">
              <svg className="w-24 h-24 text-gray-800 dark:text-gray-200" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
              </svg>
            </div>
            <button className="w-full text-center font-semibold text-gray-900 dark:text-white hover:underline">
              Browse the Guides →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
