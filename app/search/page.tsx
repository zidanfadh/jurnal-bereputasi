'use client';

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import NavbarDemo from "@/components/home/navbar2";
import { FooterSection } from "@/components/home/footer2";
import AdvancedFilters from "@/components/search/AdvancedFilters";
import JournalPreview from "@/components/search/JournalPreview";

interface LocalJournal {
    id: number;
    title: string;
    journal: string;
    issn: string;
    eissn: string;
    pissn: string;
}

interface Article {
    title: string;
    author: string;
    journal: string;
    doi: string;
    url: string;
}

interface FilterState {
    keywords: string;
    yearRange: [number, number];
    quartiles: string[];
    hIndexRange: [number, number];
    openAccess: boolean;
    retractions: string;
}

function SearchContent() {
    const searchParams = useSearchParams();
    const query = searchParams.get('q') || '';
    const [searchTerm, setSearchTerm] = useState(query);
    const [localResults, setLocalResults] = useState<LocalJournal[]>([]);
    const [externalResults, setExternalResults] = useState<Article[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [filtersOpen, setFiltersOpen] = useState(false);
    const [selectedJournal, setSelectedJournal] = useState<LocalJournal | Article | null>(null);
    const [previewType, setPreviewType] = useState<'local' | 'external'>('local');
    const [filters, setFilters] = useState<FilterState>({
        keywords: '',
        yearRange: [1950, 2025],
        quartiles: [],
        hIndexRange: [0, 1500],
        openAccess: false,
        retractions: 'Tidak diatur'
    });

    useEffect(() => {
        if (query) {
            handleSearch(query);
        }
    }, [query]);

    const handleSearch = async (term: string) => {
        setIsLoading(true);
        try {
            const res = await fetch(`/api/search?q=${encodeURIComponent(term)}`);
            const data = await res.json();
            setLocalResults(data.localResults || []);
            setExternalResults(data.externalResults || []);
        } catch (error) {
            console.error('Error fetching search results:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSearchWithFilters = async () => {
        setIsLoading(true);
        try {
            const params = new URLSearchParams({
                q: searchTerm,
                keywords: filters.keywords,
                yearFrom: filters.yearRange[0].toString(),
                yearTo: filters.yearRange[1].toString(),
                quartiles: filters.quartiles.join(','),
                hIndexFrom: filters.hIndexRange[0].toString(),
                hIndexTo: filters.hIndexRange[1].toString(),
                openAccess: filters.openAccess.toString(),
                retractions: filters.retractions
            });
            
            const res = await fetch(`/api/search?${params}`);
            const data = await res.json();
            setLocalResults(data.localResults || []);
            setExternalResults(data.externalResults || []);
        } catch (error) {
            console.error('Error fetching search results:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            handleSearch(searchTerm);
        }
    };

    const handleJournalClick = (journal: LocalJournal | Article, type: 'local' | 'external') => {
        setSelectedJournal(journal);
        setPreviewType(type);
    };

    return (
        <div className="min-h-screen flex flex-col bg-white dark:bg-gray-950">
            <NavbarDemo />

            <main className="flex-1 w-full">
                <div className="mx-auto w-full max-w-[1920px] px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
                    {/* Header Section */}
                    <div className="mb-10 text-center">
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-black dark:text-white tracking-tight mb-4">
                            Search Results
                        </h1>
                        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                            Find reputable journals from the SINTA database and Elsevier API
                        </p>
                    </div>

                    {/* Search Bar */}
                    <div className="mb-10 max-w-3xl mx-auto">
                        <form onSubmit={handleSubmit} className="relative">
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Cari jurnal bereputasi..."
                                className="w-full h-14 px-6 pr-32 text-base bg-white dark:bg-gray-900 border-2 border-gray-300 dark:border-gray-700 rounded-full focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent outline-none text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-500 shadow-lg transition-all"
                            />
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="absolute right-2 top-1/2 -translate-y-1/2 h-10 px-6 bg-black dark:bg-white text-white dark:text-black rounded-full hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed font-semibold shadow-md"
                            >
                                {isLoading ? 'Mencari...' : 'Search'}
                            </button>
                        </form>
                    </div>

                    {/* Main Layout: Results Grid + Sidebar */}
                    <div className="flex gap-6 items-start">
                        {/* Results Section - Split Layout */}
                        <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {isLoading ? (
                                <div className="col-span-full text-center py-20">
                                    <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-200 border-t-black dark:border-gray-800 dark:border-t-white mx-auto"></div>
                                    <p className="mt-6 text-lg text-gray-600 dark:text-gray-400 font-medium">Mencari jurnal...</p>
                                </div>
                            ) : (
                                <>
                                    {/* Hasil dari Database SINTA */}
                                    <div className="bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-2xl shadow-xl overflow-hidden">
                                        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900 px-6 py-5 border-b-2 border-gray-200 dark:border-gray-800">
                                            <h2 className="text-xl font-bold flex items-center gap-3 text-black dark:text-white">
                                                <span className="text-2xl">📚</span>
                                                <span>Database SINTA</span>
                                            </h2>
                                        </div>
                                        <div className="p-6 max-h-[800px] overflow-y-auto space-y-4">
                                            {localResults.length === 0 ? (
                                                <div className="text-center py-12">
                                                    <p className="text-gray-500 dark:text-gray-400">Tidak ada hasil ditemukan.</p>
                                                </div>
                                            ) : (
                                                localResults.map((item) => (
                                                    <div
                                                        key={item.id}
                                                        onClick={() => handleJournalClick(item, 'local')}
                                                        className={`group p-5 rounded-xl border-2 transition-all cursor-pointer ${
                                                            selectedJournal === item
                                                                ? 'border-black dark:border-white bg-gray-50 dark:bg-gray-800 shadow-lg'
                                                                : 'border-gray-200 dark:border-gray-800 hover:border-gray-400 dark:hover:border-gray-600 hover:shadow-md'
                                                        }`}
                                                    >
                                                        <h3 className="font-bold text-lg text-black dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                                            {item.title}
                                                        </h3>
                                                        <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                                                            <span className="font-semibold">Subjek:</span> {item.journal}
                                                        </p>
                                                        <div className="flex flex-wrap gap-2">
                                                            {item.issn && (
                                                                <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-xs font-medium">
                                                                    ISSN: {item.issn}
                                                                </span>
                                                            )}
                                                            {item.eissn && (
                                                                <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-xs font-medium">
                                                                    eISSN: {item.eissn}
                                                                </span>
                                                            )}
                                                            {item.pissn && (
                                                                <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-xs font-medium">
                                                                    PISSN: {item.pissn}
                                                                </span>
                                                            )}
                                                        </div>
                                                    </div>
                                                ))
                                            )}
                                        </div>
                                    </div>

                                    {/* Hasil dari API Elsevier */}
                                    <div className="bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-2xl shadow-xl overflow-hidden">
                                        <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-gray-800 dark:to-gray-900 px-6 py-5 border-b-2 border-gray-200 dark:border-gray-800">
                                            <h2 className="text-xl font-bold flex items-center gap-3 text-black dark:text-white">
                                                <span className="text-2xl">🌐</span>
                                                <span>API Elsevier</span>
                                            </h2>
                                        </div>
                                        <div className="p-6 max-h-[800px] overflow-y-auto space-y-4">
                                            {externalResults.length === 0 ? (
                                                <div className="text-center py-12">
                                                    <p className="text-gray-500 dark:text-gray-400">Tidak ada hasil ditemukan.</p>
                                                </div>
                                            ) : (
                                                externalResults.map((article, index) => (
                                                    <div
                                                        key={index}
                                                        onClick={() => handleJournalClick(article, 'external')}
                                                        className={`group p-5 rounded-xl border-2 transition-all cursor-pointer ${
                                                            selectedJournal === article
                                                                ? 'border-black dark:border-white bg-gray-50 dark:bg-gray-800 shadow-lg'
                                                                : 'border-gray-200 dark:border-gray-800 hover:border-gray-400 dark:hover:border-gray-600 hover:shadow-md'
                                                        }`}
                                                    >
                                                        <h3 className="font-bold text-lg text-black dark:text-white mb-2 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                                                            {article.title}
                                                        </h3>
                                                        <p className="text-gray-600 dark:text-gray-400 text-sm mb-1">
                                                            <span className="font-semibold">Penulis:</span> {article.author}
                                                        </p>
                                                        <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                                                            <span className="font-semibold">Jurnal:</span> {article.journal}
                                                        </p>
                                                        <a
                                                            href={article.url}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="inline-flex items-center gap-1.5 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm font-semibold"
                                                            onClick={(e) => e.stopPropagation()}
                                                        >
                                                            DOI: {article.doi}
                                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                                            </svg>
                                                        </a>
                                                    </div>
                                                ))
                                            )}
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>

                        {/* Sidebar - Advanced Filters & Preview */}
                        <aside className="w-full lg:w-96 flex-shrink-0">
                            <div className="sticky top-8 space-y-6">
                                {/* Advanced Filters */}
                                <AdvancedFilters
                                    isOpen={filtersOpen}
                                    onToggle={() => setFiltersOpen(!filtersOpen)}
                                    filters={filters}
                                    onFiltersChange={setFilters}
                                    onSearch={handleSearchWithFilters}
                                />

                                {/* Journal Preview */}
                                {selectedJournal && !filtersOpen && (
                                    <JournalPreview
                                        journal={selectedJournal}
                                        type={previewType}
                                        onClose={() => setSelectedJournal(null)}
                                    />
                                )}
                            </div>
                        </aside>
                    </div>
                </div>
            </main>

            <footer className="w-full border-t-2 border-gray-200 dark:border-gray-800 mt-20">
                <div className="mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
                    <FooterSection />
                </div>
            </footer>
        </div>
    );
}

export default function SearchPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-950">
                <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-200 border-t-black dark:border-gray-800 dark:border-t-white"></div>
            </div>
        }>
            <SearchContent />
        </Suspense>
    );
}