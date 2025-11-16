import Link from 'next/link';

export function FooterSection() {
  return (
    <footer className="bg-white dark:bg-gray-950">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 py-12">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-xl font-bold text-black dark:text-white mb-4">
              Jurnal Bereputasi
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 leading-relaxed">
              Platform pencarian jurnal bereputasi dari database SINTA dan API Elsevier. 
              Temukan jurnal ilmiah berkualitas untuk kebutuhan penelitian Anda.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-bold text-black dark:text-white mb-4">
              Tautan Cepat
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white text-sm transition-colors">
                  Beranda
                </Link>
              </li>
              <li>
                <Link href="/search" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white text-sm transition-colors">
                  Pencarian
                </Link>
              </li>
              <li>
                <a href="#about" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white text-sm transition-colors">
                  Tentang
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-sm font-bold text-black dark:text-white mb-4">
              Sumber Daya
            </h4>
            <ul className="space-y-2">
              <li>
                <a 
                  href="https://sinta.kemdikbud.go.id/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white text-sm transition-colors"
                >
                  SINTA
                </a>
              </li>
              <li>
                <a 
                  href="https://www.elsevier.com/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white text-sm transition-colors"
                >
                  Elsevier
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 dark:border-gray-800 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              © {new Date().getFullYear()} Jurnal Bereputasi. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white text-sm transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white text-sm transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
