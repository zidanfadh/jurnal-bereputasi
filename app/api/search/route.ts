import { NextResponse } from "next/server";
import Database from "better-sqlite3";
import path from "path";

interface Article {
    title: string;
    author: string;
    journal: string;
    doi: string;
    url: string;
}

export async function GET(req: Request) {
    const apiKey = process.env.ELSEVIER_API_KEY || "8c5a43f3692a3dcb5072f30f5a231e43";
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("q");

    if (!query) {
        return NextResponse.json({ message: "Query is required" }, { status: 400 });
    }

    // ====== 🔹 1. Ambil data dari DATABASE SQLite ======
    const dbPath = path.join(process.cwd(), "db.sqlite3");
    const db = new Database(dbPath);
    const stmt = db.prepare(`
        SELECT id, name AS title, subject AS journal, issn, eissn, pissn 
        FROM main_journal
        WHERE name LIKE ? OR subject LIKE ?
    `);
    const localResults = stmt.all(`%${query}%`, `%${query}%`);
    db.close();

    // ====== 🔹 2. Ambil data dari API Elsevier ======
    const url = `https://api.elsevier.com/content/search/scopus?query=${encodeURIComponent(query)}`;

    try {
        const response = await fetch(url, {
            headers: {
                "X-ELS-APIKey": apiKey,
                "Accept": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        const articles = data["search-results"]["entry"] || [];

        const externalResults: Article[] = articles.map((article: any) => ({
            title: article["dc:title"] || "No Title",
            author: article["dc:creator"] || "Unknown Author",
            journal: article["prism:publicationName"] || "Unknown Journal",
            doi: article["prism:doi"] || "No DOI",
            url: article["prism:url"] || "#",
        }));

        // ====== 🔹 3. Return hasil pencarian dari kedua sumber ======
        return NextResponse.json({ localResults, externalResults });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
