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
        <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
            <NavbarDemo />

            <main className="flex-1 w-full">
                <div className="mx-auto w-full max-w-[1920px] px-4 sm:px-6 lg:px-8 py-8">
                    {/* Search Bar */}
                    <div className="mb-8 max-w-4xl">
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                            Hasil Pencarian
                        </h1>
                        <form onSubmit={handleSubmit} className="flex gap-2">
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Cari jurnal bereputasi..."
                                className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                            />
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed font-semibold"
                            >
                                {isLoading ? 'Mencari...' : 'Cari'}
                            </button>
                        </form>
                    </div>

                    {/* Main Layout: Results Grid + Sidebar */}
                    <div className="flex gap-6 items-start">
                        {/* Results Section - Split Layout */}
                        <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {isLoading ? (
                                <div className="col-span-full text-center py-12">
                                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                                    <p className="mt-4 text-gray-600 dark:text-gray-400">Mencari jurnal...</p>
                                </div>
                            ) : (
                                <>
                                    {/* Hasil dari Database Lokal */}
                                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 h-fit">
                                        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-gray-900 dark:text-white">
                                            <span>📚</span> Dari Database SINTA
                                        </h2>
                                        <div className="max-h-[800px] overflow-y-auto pr-2 space-y-4">
                                            {localResults.length === 0 ? (
                                                <p className="text-gray-500 dark:text-gray-400">Tidak ada hasil ditemukan.</p>
                                            ) : (
                                                localResults.map((item) => (
                                                    <div
                                                        key={item.id}
                                                        onClick={() => handleJournalClick(item, 'local')}
                                                        className={`border p-4 rounded-lg hover:shadow-md transition-all cursor-pointer ${
                                                            selectedJournal === item
                                                                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                                                                : 'border-gray-200 dark:border-gray-700'
                                                        }`}
                                                    >
                                                        <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                                                            {item.title}
                                                        </h3>
                                                        <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
                                                            Subjek: {item.journal}
                                                        </p>
                                                        <div className="flex flex-wrap gap-2 text-xs text-gray-500">
                                                            {item.issn && (
                                                                <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded">
                                                                    ISSN: {item.issn}
                                                                </span>
                                                            )}
                                                            {item.eissn && (
                                                                <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded">
                                                                    eISSN: {item.eissn}
                                                                </span>
                                                            )}
                                                            {item.pissn && (
                                                                <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded">
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
                                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 h-fit">
                                        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-gray-900 dark:text-white">
                                            <span>🌐</span> Dari API Elsevier
                                        </h2>
                                        <div className="max-h-[800px] overflow-y-auto pr-2 space-y-4">
                                            {externalResults.length === 0 ? (
                                                <p className="text-gray-500 dark:text-gray-400">Tidak ada hasil ditemukan.</p>
                                            ) : (
                                                externalResults.map((article, index) => (
                                                    <div
                                                        key={index}
                                                        onClick={() => handleJournalClick(article, 'external')}
                                                        className={`border p-4 rounded-lg hover:shadow-md transition-all cursor-pointer ${
                                                            selectedJournal === article
                                                                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                                                                : 'border-gray-200 dark:border-gray-700'
                                                        }`}
                                                    >
                                                        <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                                                            {article.title}
                                                        </h3>
                                                        <p className="text-gray-600 dark:text-gray-400 text-sm mb-1">
                                                            Penulis: {article.author}
                                                        </p>
                                                        <p className="text-gray-500 dark:text-gray-400 text-sm mb-2">
                                                            Jurnal: {article.journal}
                                                        </p>
                                                        <a
                                                            href={article.url}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="text-blue-500 hover:text-blue-700 text-sm font-medium inline-flex items-center gap-1"
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
                        <aside className="w-80 flex-shrink-0 space-y-4">
                            <div className="sticky top-8 space-y-4">
                                {/* Advanced Filters */}
                                <AdvancedFilters
                                    isOpen={filtersOpen}
                                    onToggle={() => setFiltersOpen(!filtersOpen)}
                                    filters={filters}
                                    onFiltersChange={setFilters}
                                    onSearch={handleSearchWithFilters}
                                />

                                {/* Journal Preview - Will be covered by filters when open */}
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

            <footer className="w-full mt-12">
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
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        }>
            <SearchContent />
        </Suspense>
    );
}