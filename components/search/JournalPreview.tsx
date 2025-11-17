'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

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

interface JournalPreviewProps {
    journal: LocalJournal | Article | null;
    type: 'local' | 'external';
    onClose: () => void;
}

export default function JournalPreview({ journal, type, onClose }: JournalPreviewProps) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [note, setNote] = useState('');

    if (!journal) return null;

    const isLocal = type === 'local';
    const localJournal = journal as LocalJournal;
    const externalJournal = journal as Article;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3 }}
                className="relative bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-2xl shadow-xl overflow-hidden"
            >
                {/* Header */}
                <div className="flex items-center justify-between p-5 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-gray-800 dark:to-gray-900 border-b-2 border-gray-200 dark:border-gray-800">
                    <span className="text-sm font-bold text-black dark:text-white flex items-center gap-2">
                        <span className="text-xl">{isLocal ? '📚' : '🌐'}</span>
                        {isLocal ? 'SINTA Database' : 'Elsevier API'}
                    </span>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-white/50 dark:hover:bg-gray-800/50 rounded-lg transition-colors"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            fill="none"
                            viewBox="0 0 24 24"
                            className="text-black dark:text-white"
                        >
                            <path
                                fill="currentColor"
                                fillRule="evenodd"
                                d="m6 16.72 1.1 1.1L11.9 13l4.82 4.81 1.1-1.1-4.82-4.8 4.81-4.82L16.71 6l-4.8 4.81L7.09 6 6 7.1l4.81 4.8z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </button>
                </div>

                {/* Body */}
                <div className="p-6 max-h-[600px] overflow-y-auto">
                    <div className="space-y-5">
                        {/* Title & Actions */}
                        <div className="flex items-start justify-between gap-4">
                            <h3 className="flex-1 text-xl font-bold text-black dark:text-white leading-tight">
                                {isLocal ? localJournal.title : externalJournal.title}
                            </h3>
                            <div className="flex items-center gap-2">
                                <button className="px-4 py-2 bg-black dark:bg-white text-white dark:text-black text-sm font-bold rounded-lg transition-colors hover:bg-gray-800 dark:hover:bg-gray-100 flex items-center gap-2 shadow-md">
                                    <span>Save</span>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="14"
                                        height="14"
                                        fill="none"
                                        viewBox="0 0 24 25"
                                    >
                                        <path
                                            fill="currentColor"
                                            d="m15.06 13.02 3.1-3.1-.8-.8-5.4 5.42-5.32-5.35-.8.8 6.13 6.13z"
                                        />
                                    </svg>
                                </button>
                                <button className="p-2.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="18"
                                        height="18"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        className="text-black dark:text-white"
                                    >
                                        <path
                                            fill="currentColor"
                                            d="M12 6.19a1.88 1.88 0 1 0 0-3.75 1.88 1.88 0 0 0 0 3.75M12 13.88a1.88 1.88 0 1 0 0-3.76 1.88 1.88 0 0 0 0 3.76M12 21.56a1.88 1.88 0 1 0 0-3.75 1.88 1.88 0 0 0 0 3.75"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        {/* Journal Info */}
                        <div className="space-y-2">
                            <p className="text-black dark:text-white font-bold text-lg">
                                {isLocal ? localJournal.journal : externalJournal.journal}
                            </p>
                            {!isLocal && externalJournal.author && (
                                <p className="text-gray-600 dark:text-gray-400 text-sm">
                                    <span className="font-semibold">Author:</span> {externalJournal.author}
                                </p>
                            )}
                        </div>

                        {/* Metadata */}
                        <div className="flex flex-wrap gap-2">
                            {isLocal ? (
                                <>
                                    {localJournal.issn && (
                                        <span className="px-3 py-1.5 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm font-semibold">
                                            ISSN: {localJournal.issn}
                                        </span>
                                    )}
                                    {localJournal.eissn && (
                                        <span className="px-3 py-1.5 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm font-semibold">
                                            eISSN: {localJournal.eissn}
                                        </span>
                                    )}
                                    {localJournal.pissn && (
                                        <span className="px-3 py-1.5 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm font-semibold">
                                            PISSN: {localJournal.pissn}
                                        </span>
                                    )}
                                </>
                            ) : (
                                <>
                                    {externalJournal.doi && (
                                        <a
                                            href={externalJournal.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="px-3 py-1.5 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-full text-sm font-bold hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
                                        >
                                            DOI: {externalJournal.doi}
                                        </a>
                                    )}
                                </>
                            )}
                        </div>

                        {/* Notes Section */}
                        <div className="relative border-2 border-gray-200 dark:border-gray-700 rounded-xl p-4 bg-gray-50 dark:bg-gray-950">
                            <textarea
                                value={note}
                                onChange={(e) => setNote(e.target.value)}
                                placeholder="Tambahkan catatan..."
                                className="w-full min-h-[80px] bg-transparent text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-500 outline-none resize-none font-medium"
                            />
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                fill="none"
                                viewBox="0 0 24 24"
                                className="absolute top-4 left-4 text-gray-300 dark:text-gray-600"
                            >
                                <g fill="currentColor">
                                    <path d="M16.64 12.92a.81.81 0 1 0 0-1.62H7.36a.81.81 0 1 0 0 1.62zM7.36 8.06h9.3a.81.81 0 1 0 0-1.63h-9.3a.81.81 0 1 0 0 1.63" />
                                    <path d="M19.37 1.55H4.63a3 3 0 0 0-3.01 3v14.89a3 3 0 0 0 2.99 3.01l11.83-.02c.8 0 1.57-.31 2.12-.88l2.9-2.9c.57-.58.88-1.33.88-2.12V4.54c.04-1.65-1.32-2.99-2.97-2.99M4.63 20.82q-.56 0-.97-.4t-.4-.96V4.54c0-.75.62-1.36 1.37-1.36h14.74c.75 0 1.36.61 1.36 1.36v11.64h-3.52c-.61 0-1.1.5-1.1 1.1v3.52z" />
                                </g>
                            </svg>
                        </div>

                        {/* Abstract */}
                        {!isLocal && (
                            <p className="text-gray-500 dark:text-gray-400 text-sm italic">
                                No abstract available
                            </p>
                        )}
                    </div>
                </div>

                {/* Dive Deeper Section */}
                <div className="border-t-2 border-gray-200 dark:border-gray-800">
                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="w-full p-5 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                    >
                        <h4 className="font-bold text-black dark:text-white">
                            Dive Deeper
                        </h4>
                        <motion.svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            fill="none"
                            viewBox="0 0 24 25"
                            className="text-black dark:text-white"
                            animate={{ rotate: isExpanded ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <path
                                fill="currentColor"
                                d="m15.06 13.02 3.1-3.1-.8-.8-5.4 5.42-5.32-5.35-.8.8 6.13 6.13z"
                            />
                        </motion.svg>
                    </button>

                    <AnimatePresence>
                        {isExpanded && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="overflow-hidden"
                            >
                                <div className="px-5 pb-5 flex items-center gap-3">
                                    <button className="flex-1 px-4 py-3 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-xl transition-all font-bold">
                                        <div className="flex items-center justify-between">
                                            <span className="text-black dark:text-white">Similar</span>
                                            <span className="text-gray-500 dark:text-gray-400">1.4k</span>
                                        </div>
                                    </button>
                                    <button className="px-4 py-3 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-xl transition-all font-bold">
                                        <div className="flex items-center justify-between gap-3">
                                            <span className="text-black dark:text-white">Refs</span>
                                            <span className="text-gray-500 dark:text-gray-400">0</span>
                                        </div>
                                    </button>
                                    <button className="px-4 py-3 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-xl transition-all font-bold">
                                        <div className="flex items-center justify-between gap-3">
                                            <span className="text-black dark:text-white">Cited</span>
                                            <span className="text-gray-500 dark:text-gray-400">37</span>
                                        </div>
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </motion.div>
        </AnimatePresence>
    );
}