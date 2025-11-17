import { NextResponse } from "next/server";
import Database from "better-sqlite3";
import path from "path";
import fs from "fs";

interface Article {
    title: string;
    author: string;
    journal: string;
    doi: string;
    url: string;
}

export async function GET(req: Request) {
    try {
        const apiKey = process.env.ELSEVIER_API_KEY || "8c5a43f3692a3dcb5072f30f5a231e43";
        const { searchParams } = new URL(req.url);
        const query = searchParams.get("q");

        if (!query) {
            return NextResponse.json({ message: "Query is required" }, { status: 400 });
        }

        let localResults: any[] = [];
        
        // ====== 🔹 1. Ambil data dari DATABASE SQLite ======
        try {
            console.log("🔍 Starting database query for:", query);
            const dbPath = path.join(process.cwd(), "db.sqlite3");
            console.log("📂 Database path:", dbPath);
            console.log("📁 File exists:", fs.existsSync(dbPath));
            
            if (fs.existsSync(dbPath)) {
                const db = new Database(dbPath, { readonly: true, fileMustExist: true });
                
                // Cek jumlah data di tabel
                const countResult = db.prepare("SELECT COUNT(*) as count FROM main_journal").get() as { count: number };
                console.log("📊 Total records in database:", countResult.count);
                
                const stmt = db.prepare(`
                    SELECT id, name AS title, subject AS journal, issn, eissn, pissn 
                    FROM main_journal
                    WHERE name LIKE ? OR subject LIKE ?
                    LIMIT 50
                `);
                
                localResults = stmt.all(`%${query}%`, `%${query}%`);
                
                console.log("✅ Local results found:", localResults.length);
                if (localResults.length > 0) {
                    console.log("📄 First result:", localResults[0]);
                }
                
                db.close();
            }
        } catch (dbError: any) {
            console.error("❌ Database error:", dbError.message);
            console.error("Stack:", dbError.stack);
            // Lanjutkan meskipun database error
        }

        // ====== 🔹 2. Ambil data dari API Elsevier ======
        const url = `https://api.elsevier.com/content/search/scopus?query=${encodeURIComponent(query)}`;

        let externalResults: Article[] = [];

        try {
            const response = await fetch(url, {
                headers: {
                    "X-ELS-APIKey": apiKey,
                    "Accept": "application/json",
                },
            });

            if (!response.ok) {
                console.error(`Elsevier API error! Status: ${response.status}`);
            } else {
                const data = await response.json();
                const articles = data["search-results"]["entry"] || [];

                externalResults = articles.map((article: any) => ({
                    title: article["dc:title"] || "No Title",
                    author: article["dc:creator"] || "Unknown Author",
                    journal: article["prism:publicationName"] || "Unknown Journal",
                    doi: article["prism:doi"] || "No DOI",
                    url: article["prism:url"] || "#",
                }));
                
                console.log("✅ External results found:", externalResults.length);
            }
        } catch (apiError: any) {
            console.error("Elsevier API fetch error:", apiError.message);
            // Lanjutkan meskipun API error
        }

        // ====== 🔹 3. Return hasil pencarian dari kedua sumber ======
        console.log("📤 Returning - Local:", localResults.length, "External:", externalResults.length);
        
        return NextResponse.json({ 
            localResults, 
            externalResults,
            success: true 
        });

    } catch (error: any) {
        console.error("Route error:", error);
        return NextResponse.json({ 
            error: error.message,
            localResults: [],
            externalResults: [],
            success: false
        }, { status: 500 });
    }
}
