'use client';

import { motion, AnimatePresence } from 'framer-motion';
import * as Slider from '@radix-ui/react-slider';
import * as Switch from '@radix-ui/react-switch';

interface FilterState {
    keywords: string;
    yearRange: [number, number];
    quartiles: string[];
    hIndexRange: [number, number];
    openAccess: boolean;
    retractions: string;
}

interface AdvancedFiltersProps {
    isOpen: boolean;
    onToggle: () => void;
    filters: FilterState;
    onFiltersChange: (filters: FilterState) => void;
    onSearch: () => void;
}

export default function AdvancedFilters({
    isOpen,
    onToggle,
    filters,
    onFiltersChange,
    onSearch
}: AdvancedFiltersProps) {
    const quartileOptions = ['Q1', 'Q2', 'Q3', 'Q4'];
    const retractionOptions = ['Tidak diatur', 'Hanya yang ditarik', 'Kecuali yang ditarik'];

    const handleQuartileToggle = (quartile: string) => {
        const newQuartiles = filters.quartiles.includes(quartile)
            ? filters.quartiles.filter(q => q !== quartile)
            : [...filters.quartiles, quartile];
        onFiltersChange({ ...filters, quartiles: newQuartiles });
    };

    const resetFilter = (filterKey: keyof FilterState) => {
        const defaults: FilterState = {
            keywords: '',
            yearRange: [1950, 2025],
            quartiles: [],
            hIndexRange: [0, 1500],
            openAccess: false,
            retractions: 'Tidak diatur'
        };
        onFiltersChange({ ...filters, [filterKey]: defaults[filterKey] });
    };

    return (
        <div className="relative">
            {/* Toggle Button */}
            <motion.button
                onClick={onToggle}
                className="w-full bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-2xl p-5 flex items-center justify-between hover:border-black dark:hover:border-white transition-all shadow-lg hover:shadow-xl"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
            >
                <h4 className="text-lg font-bold text-black dark:text-white">
                    Advanced Search
                </h4>
                <motion.svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                    className="text-black dark:text-white"
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <path
                        fill="currentColor"
                        d="m15.06 13.02 3.1-3.1-.8-.8-5.4 5.42-5.32-5.35-.8.8 6.13 6.13z"
                    />
                </motion.svg>
            </motion.button>

            {/* Expandable Content */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                    >
                        <div className="bg-white dark:bg-gray-900 border-2 border-t-0 border-gray-200 dark:border-gray-800 rounded-b-2xl shadow-xl">
                            <div className="p-6 space-y-6 max-h-[600px] overflow-y-auto">
                                {/* Advanced Settings Header */}
                                <div className="pb-4 border-b-2 border-gray-200 dark:border-gray-800">
                                    <h5 className="text-base font-bold text-black dark:text-white">
                                        Pengaturan Lanjutan
                                    </h5>
                                </div>

                                {/* Keywords */}
                                <FilterItem
                                    title="Kata Kunci"
                                    onReset={() => resetFilter('keywords')}
                                    showReset={filters.keywords !== ''}
                                >
                                    <input
                                        type="text"
                                        value={filters.keywords}
                                        onChange={(e) => onFiltersChange({ ...filters, keywords: e.target.value })}
                                        placeholder="Ketik kata kunci khusus..."
                                        className="w-full px-4 py-2.5 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent outline-none bg-white dark:bg-gray-950 text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-500 transition-all"
                                    />
                                </FilterItem>

                                {/* Publication Date */}
                                <FilterItem
                                    title="Tanggal Publikasi"
                                    onReset={() => resetFilter('yearRange')}
                                    showReset={filters.yearRange[0] !== 1950 || filters.yearRange[1] !== 2025}
                                >
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-3 text-sm font-medium">
                                            <input
                                                type="number"
                                                min={1950}
                                                max={filters.yearRange[1]}
                                                value={filters.yearRange[0]}
                                                onChange={(e) => onFiltersChange({
                                                    ...filters,
                                                    yearRange: [parseInt(e.target.value) || 1950, filters.yearRange[1]]
                                                })}
                                                className="w-24 px-3 py-2 border-2 border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-black dark:focus:ring-white outline-none bg-white dark:bg-gray-950 text-black dark:text-white"
                                            />
                                            <span className="text-gray-400">–</span>
                                            <input
                                                type="number"
                                                min={filters.yearRange[0]}
                                                max={2025}
                                                value={filters.yearRange[1]}
                                                onChange={(e) => onFiltersChange({
                                                    ...filters,
                                                    yearRange: [filters.yearRange[0], parseInt(e.target.value) || 2025]
                                                })}
                                                className="w-24 px-3 py-2 border-2 border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-black dark:focus:ring-white outline-none bg-white dark:bg-gray-950 text-black dark:text-white"
                                            />
                                        </div>
                                        <Slider.Root
                                            className="relative flex items-center select-none touch-none w-full h-6"
                                            value={filters.yearRange}
                                            onValueChange={(value) => onFiltersChange({ ...filters, yearRange: value as [number, number] })}
                                            min={1950}
                                            max={2025}
                                            step={1}
                                        >
                                            <Slider.Track className="bg-gray-200 dark:bg-gray-800 relative grow rounded-full h-2">
                                                <Slider.Range className="absolute bg-black dark:bg-white rounded-full h-full" />
                                            </Slider.Track>
                                            <Slider.Thumb className="block w-5 h-5 bg-white dark:bg-gray-950 border-2 border-black dark:border-white rounded-full hover:scale-110 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-transform shadow-md" />
                                            <Slider.Thumb className="block w-5 h-5 bg-white dark:bg-gray-950 border-2 border-black dark:border-white rounded-full hover:scale-110 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-transform shadow-md" />
                                        </Slider.Root>
                                    </div>
                                </FilterItem>

                                {/* SJR Quartiles */}
                                <FilterItem
                                    title="Kuartil SJR"
                                    onReset={() => resetFilter('quartiles')}
                                    showReset={filters.quartiles.length > 0}
                                >
                                    <div className="flex gap-2.5">
                                        {quartileOptions.map((q) => (
                                            <button
                                                key={q}
                                                onClick={() => handleQuartileToggle(q)}
                                                className={`flex-1 px-4 py-2.5 rounded-xl font-bold transition-all ${
                                                    filters.quartiles.includes(q)
                                                        ? 'bg-black dark:bg-white text-white dark:text-black shadow-lg scale-105'
                                                        : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                                                }`}
                                            >
                                                {q}
                                            </button>
                                        ))}
                                    </div>
                                </FilterItem>

                                {/* Journal H-Index */}
                                <FilterItem
                                    title="H-Index Jurnal"
                                    onReset={() => resetFilter('hIndexRange')}
                                    showReset={filters.hIndexRange[0] !== 0 || filters.hIndexRange[1] !== 1500}
                                >
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-3 text-sm font-medium">
                                            <input
                                                type="number"
                                                min={0}
                                                max={filters.hIndexRange[1]}
                                                value={filters.hIndexRange[0]}
                                                onChange={(e) => onFiltersChange({
                                                    ...filters,
                                                    hIndexRange: [parseInt(e.target.value) || 0, filters.hIndexRange[1]]
                                                })}
                                                className="w-24 px-3 py-2 border-2 border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-black dark:focus:ring-white outline-none bg-white dark:bg-gray-950 text-black dark:text-white"
                                            />
                                            <span className="text-gray-400">–</span>
                                            <input
                                                type="number"
                                                min={filters.hIndexRange[0]}
                                                max={1500}
                                                value={filters.hIndexRange[1]}
                                                onChange={(e) => onFiltersChange({
                                                    ...filters,
                                                    hIndexRange: [filters.hIndexRange[0], parseInt(e.target.value) || 1500]
                                                })}
                                                className="w-24 px-3 py-2 border-2 border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-black dark:focus:ring-white outline-none bg-white dark:bg-gray-950 text-black dark:text-white"
                                            />
                                        </div>
                                        <Slider.Root
                                            className="relative flex items-center select-none touch-none w-full h-6"
                                            value={filters.hIndexRange}
                                            onValueChange={(value) => onFiltersChange({ ...filters, hIndexRange: value as [number, number] })}
                                            min={0}
                                            max={1500}
                                            step={10}
                                        >
                                            <Slider.Track className="bg-gray-200 dark:bg-gray-800 relative grow rounded-full h-2">
                                                <Slider.Range className="absolute bg-black dark:bg-white rounded-full h-full" />
                                            </Slider.Track>
                                            <Slider.Thumb className="block w-5 h-5 bg-white dark:bg-gray-950 border-2 border-black dark:border-white rounded-full hover:scale-110 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-transform shadow-md" />
                                            <Slider.Thumb className="block w-5 h-5 bg-white dark:bg-gray-950 border-2 border-black dark:border-white rounded-full hover:scale-110 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-transform shadow-md" />
                                        </Slider.Root>
                                    </div>
                                </FilterItem>

                                {/* Open Access */}
                                <FilterItem
                                    title="Open Access"
                                    onReset={() => resetFilter('openAccess')}
                                    showReset={filters.openAccess}
                                >
                                    <Switch.Root
                                        checked={filters.openAccess}
                                        onCheckedChange={(checked) => onFiltersChange({ ...filters, openAccess: checked })}
                                        className="w-14 h-7 bg-gray-200 dark:bg-gray-800 rounded-full relative data-[state=checked]:bg-black dark:data-[state=checked]:bg-white transition-colors outline-none cursor-pointer shadow-inner"
                                    >
                                        <Switch.Thumb className="block w-6 h-6 bg-white dark:bg-gray-950 rounded-full transition-transform duration-200 translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[30px] shadow-md border-2 border-gray-300 dark:border-gray-700 data-[state=checked]:border-black dark:data-[state=checked]:border-white" />
                                    </Switch.Root>
                                </FilterItem>

                                {/* Retractions */}
                                <FilterItem
                                    title="Retraksi"
                                    onReset={() => resetFilter('retractions')}
                                    showReset={filters.retractions !== 'Tidak diatur'}
                                >
                                    <select
                                        value={filters.retractions}
                                        onChange={(e) => onFiltersChange({ ...filters, retractions: e.target.value })}
                                        className="w-full px-4 py-2.5 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent outline-none bg-white dark:bg-gray-950 text-black dark:text-white font-medium transition-all"
                                    >
                                        {retractionOptions.map((option) => (
                                            <option key={option} value={option}>
                                                {option}
                                            </option>
                                        ))}
                                    </select>
                                </FilterItem>
                            </div>

                            {/* Sticky Search Button */}
                            <div className="sticky bottom-0 bg-white dark:bg-gray-900 border-t-2 border-gray-200 dark:border-gray-800 p-6">
                                <motion.button
                                    onClick={onSearch}
                                    className="w-full bg-black dark:bg-white text-white dark:text-black font-bold py-3.5 rounded-xl transition-colors hover:bg-gray-800 dark:hover:bg-gray-100 shadow-lg"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    Terapkan Filter
                                </motion.button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

interface FilterItemProps {
    title: string;
    children: React.ReactNode;
    onReset: () => void;
    showReset: boolean;
}

function FilterItem({ title, children, onReset, showReset }: FilterItemProps) {
    return (
        <div className="flex gap-3">
            <div className="flex-1 space-y-3">
                <div className="flex items-center justify-between">
                    <h5 className="font-bold text-black dark:text-white">{title}</h5>
                </div>
                {children}
            </div>
            {showReset && (
                <button
                    onClick={onReset}
                    className="flex-shrink-0 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        fill="none"
                        viewBox="0 0 24 24"
                        className="text-gray-500 dark:text-gray-400"
                    >
                        <path
                            fill="currentColor"
                            fillRule="evenodd"
                            d="m5.63 6.96 1.33-1.33 5.1 5.11 5.12-5.11 1.32 1.33-5.1 5.1 5.1 5.12-1.32 1.32-5.11-5.1-5.11 5.1-1.33-1.32 5.11-5.11z"
                            clipRule="evenodd"
                        />
                    </svg>
                </button>
            )}
        </div>
    );
}