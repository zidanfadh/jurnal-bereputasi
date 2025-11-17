'use client';

import { useState } from 'react';
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
                className="w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 flex items-center justify-between hover:shadow-md transition-shadow"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
            >
                <h4 className="font-semibold text-gray-900 dark:text-white">
                    Pencarian Mendalam
                </h4>
                <motion.svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="none"
                    viewBox="0 0 24 24"
                    className="text-gray-600 dark:text-gray-400"
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
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
                        <div className="bg-white dark:bg-gray-800 border border-t-0 border-gray-200 dark:border-gray-700 rounded-b-lg">
                            <div className="p-4 space-y-4 max-h-[600px] overflow-y-auto">
                                {/* Advanced Settings Header */}
                                <div className="flex items-center justify-between pb-2 border-b border-gray-200 dark:border-gray-700">
                                    <h5 className="font-semibold text-gray-900 dark:text-white">
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
                                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                                    />
                                </FilterItem>

                                {/* Publication Date */}
                                <FilterItem
                                    title="Tanggal Publikasi"
                                    onReset={() => resetFilter('yearRange')}
                                    showReset={filters.yearRange[0] !== 1950 || filters.yearRange[1] !== 2025}
                                >
                                    <div className="space-y-3">
                                        <div className="flex items-center gap-2 text-sm">
                                            <input
                                                type="number"
                                                min={1950}
                                                max={filters.yearRange[1]}
                                                value={filters.yearRange[0]}
                                                onChange={(e) => onFiltersChange({
                                                    ...filters,
                                                    yearRange: [parseInt(e.target.value) || 1950, filters.yearRange[1]]
                                                })}
                                                className="w-20 px-2 py-1 border border-gray-300 dark:border-gray-600 rounded focus:ring-2 focus:ring-blue-500 outline-none bg-white dark:bg-gray-900"
                                            />
                                            <span className="text-gray-500">–</span>
                                            <input
                                                type="number"
                                                min={filters.yearRange[0]}
                                                max={2025}
                                                value={filters.yearRange[1]}
                                                onChange={(e) => onFiltersChange({
                                                    ...filters,
                                                    yearRange: [filters.yearRange[0], parseInt(e.target.value) || 2025]
                                                })}
                                                className="w-20 px-2 py-1 border border-gray-300 dark:border-gray-600 rounded focus:ring-2 focus:ring-blue-500 outline-none bg-white dark:bg-gray-900"
                                            />
                                        </div>
                                        <Slider.Root
                                            className="relative flex items-center select-none touch-none w-full h-5"
                                            value={filters.yearRange}
                                            onValueChange={(value) => onFiltersChange({ ...filters, yearRange: value as [number, number] })}
                                            min={1950}
                                            max={2025}
                                            step={1}
                                        >
                                            <Slider.Track className="bg-gray-200 dark:bg-gray-700 relative grow rounded-full h-1">
                                                <Slider.Range className="absolute bg-blue-500 rounded-full h-full" />
                                            </Slider.Track>
                                            <Slider.Thumb className="block w-4 h-4 bg-white border-2 border-blue-500 rounded-full hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                            <Slider.Thumb className="block w-4 h-4 bg-white border-2 border-blue-500 rounded-full hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                        </Slider.Root>
                                    </div>
                                </FilterItem>

                                {/* SJR Quartiles */}
                                <FilterItem
                                    title="Kuartil SJR"
                                    onReset={() => resetFilter('quartiles')}
                                    showReset={filters.quartiles.length > 0}
                                >
                                    <div className="flex gap-2">
                                        {quartileOptions.map((q) => (
                                            <button
                                                key={q}
                                                onClick={() => handleQuartileToggle(q)}
                                                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                                                    filters.quartiles.includes(q)
                                                        ? 'bg-blue-500 text-white shadow-md'
                                                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
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
                                    <div className="space-y-3">
                                        <div className="flex items-center gap-2 text-sm">
                                            <input
                                                type="number"
                                                min={0}
                                                max={filters.hIndexRange[1]}
                                                value={filters.hIndexRange[0]}
                                                onChange={(e) => onFiltersChange({
                                                    ...filters,
                                                    hIndexRange: [parseInt(e.target.value) || 0, filters.hIndexRange[1]]
                                                })}
                                                className="w-20 px-2 py-1 border border-gray-300 dark:border-gray-600 rounded focus:ring-2 focus:ring-blue-500 outline-none bg-white dark:bg-gray-900"
                                            />
                                            <span className="text-gray-500">–</span>
                                            <input
                                                type="number"
                                                min={filters.hIndexRange[0]}
                                                max={1500}
                                                value={filters.hIndexRange[1]}
                                                onChange={(e) => onFiltersChange({
                                                    ...filters,
                                                    hIndexRange: [filters.hIndexRange[0], parseInt(e.target.value) || 1500]
                                                })}
                                                className="w-20 px-2 py-1 border border-gray-300 dark:border-gray-600 rounded focus:ring-2 focus:ring-blue-500 outline-none bg-white dark:bg-gray-900"
                                            />
                                        </div>
                                        <Slider.Root
                                            className="relative flex items-center select-none touch-none w-full h-5"
                                            value={filters.hIndexRange}
                                            onValueChange={(value) => onFiltersChange({ ...filters, hIndexRange: value as [number, number] })}
                                            min={0}
                                            max={1500}
                                            step={10}
                                        >
                                            <Slider.Track className="bg-gray-200 dark:bg-gray-700 relative grow rounded-full h-1">
                                                <Slider.Range className="absolute bg-blue-500 rounded-full h-full" />
                                            </Slider.Track>
                                            <Slider.Thumb className="block w-4 h-4 bg-white border-2 border-blue-500 rounded-full hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                            <Slider.Thumb className="block w-4 h-4 bg-white border-2 border-blue-500 rounded-full hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500" />
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
                                        className="w-11 h-6 bg-gray-300 dark:bg-gray-700 rounded-full relative data-[state=checked]:bg-blue-500 transition-colors outline-none cursor-pointer"
                                    >
                                        <Switch.Thumb className="block w-5 h-5 bg-white rounded-full transition-transform duration-100 translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[22px]" />
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
                                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
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
                            <div className="sticky bottom-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-4">
                                <motion.button
                                    onClick={onSearch}
                                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors"
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
        <div className="flex gap-2">
            <div className="flex-1 space-y-2">
                <div className="flex items-center justify-between">
                    <h5 className="font-medium text-gray-900 dark:text-white">{title}</h5>
                </div>
                {children}
            </div>
            {showReset && (
                <button
                    onClick={onReset}
                    className="flex-shrink-0 p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        fill="none"
                        viewBox="0 0 24 24"
                        className="text-gray-500"
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