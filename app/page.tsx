'use client';

import { useState } from "react";
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";

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

export default function Home() {
    const [searchTerm, setSearchTerm] = useState('');
    const [localResults, setLocalResults] = useState<LocalJournal[]>([]);
    const [externalResults, setExternalResults] = useState<Article[]>([]);

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        const res = await fetch(`/api/search?q=${encodeURIComponent(searchTerm)}`);
        const data = await res.json();
        setLocalResults(data.localResults || []);
        setExternalResults(data.externalResults || []);
    };

    const placeholders = [
      "What's the first rule of Fight Club?",
      "Who is Tyler Durden?",
      "Where is Andrew Laeddis Hiding?",
      "Write a Javascript method to reverse a string",
      "How to assemble your own PC?",
    ];
   
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      console.log(e.target.value);
    };
    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      console.log("submitted");
    };


    return (
        <div className="p-6">
              <div className="h-[40rem] flex flex-col justify-center  items-center px-4">
      <h2 className="mb-10 sm:mb-20 text-xl text-center sm:text-5xl dark:text-white text-black">
        Cari Jurnal Bereputasi
      </h2>
      <PlaceholdersAndVanishInput
        placeholders={placeholders}
        onChange={(e) => setSearchTerm(e.target.value)}
        onSubmit={handleSearch}
      />
    </div>
           

            <div className="grid grid-cols-2 gap-4 mt-6">
                {/* 🔹 Hasil dari Database Lokal */}
                
                <div>
                    <h2 className="text-xl font-semibold mb-2">📚 Dari Database Sinta</h2>
                    {localResults.length === 0 ? (
                        <p className="text-gray-500">Tidak ada hasil ditemukan.</p>
                    ) : (
                      
                        <ul>
                            {localResults.map((item) => (
                                <li key={item.id} className="border p-2 my-2">
                                    <h3 className="font-semibold">{item.title}</h3>
                                    <p className="text-gray-600">Subjek: {item.journal}</p>
                                    <p className="text-gray-500">
                                        ISSN: {item.issn} | eISSN: {item.eissn} | PISSN: {item.pissn}
                                    </p>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {/* 🔹 Hasil dari API Elsevier */}
                <div>
                    <h2 className="text-xl font-semibold mb-2">🌐 Dari API Elsevier</h2>
                    {externalResults.length === 0 ? (
                        <p className="text-gray-500">Tidak ada hasil ditemukan.</p>
                    ) : (
                        <ul>
                            {externalResults.map((article, index) => (
                                <li key={index} className="border p-2 my-2">
                                    <h3 className="font-semibold">{article.title}</h3>
                                    <p className="text-gray-600">Penulis: {article.author}</p>
                                    <p className="text-gray-500">Jurnal: {article.journal}</p>
                                    <p className="text-blue-500">
                                        <a href={article.url} target="_blank" rel="noopener noreferrer">DOI: {article.doi}</a>
                                    </p>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
}
