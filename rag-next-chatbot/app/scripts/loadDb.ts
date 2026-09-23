// ===== Imports (dotenv FIRST to load env vars) =====
import "dotenv/config";

import { DataAPIClient } from "@datastax/astra-db-ts";
import { PuppeteerWebBaseLoader } from "@langchain/community/document_loaders/web/puppeteer";
// rreplcement in local for openai
import { OllamaEmbeddings } from "@langchain/ollama";
// FIX: correct import for RecursiveCharacterTextSplitter
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters"
// Alternatively: import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";

// ===== Environment Variables =====
const {
    ASTRA_DB_NAMESPACE,
    ASTRA_DB_COLLECTION,
    ASTRA_DB_API_ENDPOINT,
    ASTRA_DB_APPLICATION_TOKEN,
    // OPENAI_API_KEY  // no longer needed with Ollama
} = process.env;

// ===== Ollama Embeddings (local, free) =====
// rreplcement in local for openai
const embeddings = new OllamaEmbeddings({
  model: "nomic-embed-text", // or "mxbai-embed-large"
  baseUrl: "http://localhost:11434", // default Ollama URL
});

// ===== AstraDB Client =====
const client = new DataAPIClient(ASTRA_DB_APPLICATION_TOKEN);
const db = client.db(ASTRA_DB_API_ENDPOINT, { keyspace: ASTRA_DB_NAMESPACE });

// splitter responsible to complete sentence if something is missing
const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 512,
    chunkOverlap: 100
});

// used for comparing embeddings
type SimilarityMetric = "dot_product" | "cosine" | "euclidean";

const createCollection = async (similarityMetric: SimilarityMetric = "dot_product") => {
    const res = await db.createCollection(ASTRA_DB_COLLECTION, {
        vector: {
            dimension: 768, // ✅ FIXED: nomic-embed-text uses 768, not 1536
            metric: similarityMetric
        }
    });
};

// ===== Websites from which updated data will be fetched =====
const d_Data = [
    'https://en.wikipedia.org/wiki/Formula_One',
    // 'https://www.skysports.com/f1/news/12433/13117256/lewis-hamilton-says-move-to-ferr',
    // 'https://www.formula1.com/en/latest/all',
    // 'https://www.forbes.com/sites/brettknight/2023/11/29/formula-1s-highest-paid-drive',
    // 'https://www.autosport.com/f1/news/history-of-female-f1-drivers-including-grand-pa',
    // 'https://en.wikipedia.org/wiki/2023_Formula_One_World_Championship',
    // 'https://en.wikipedia.org/wiki/2022_Formula_One_World_Championship',
    // 'https://en.wikipedia.org/wiki/List_of_Formula_One_World_Drivers%27_Champions',
    // 'https://en.wikipedia.org/wiki/2024_Formula_One_World_Championship',
    // 'https://www.formula1.com/en/results.html/2024/races.html',
    'https://www.formula1.com/en/racing/2024.html',
];

// ===== Scrape a single page and return clean text =====
const scrapePage = async (url: string) => {
    // puppeteer headless browser used here
    const loader = new PuppeteerWebBaseLoader(url, {
        launchOptions: {
            headless: true,
        },
        gotoOptions: {
            waitUntil: "domcontentloaded", // ✅ fixed: was "documentLoaded"
        },
        evaluate: async (page, browser) => {
            const result = await page.evaluate(() => document.body.innerHTML);
            await browser.close();
            return result;
        },
    });

    // FIX: return the scraped content with HTML tags removed
    return (await loader.scrape())?.replace(/<[^>]*>/gm, '');
};

// ===== Load and embed data into AstraDB =====
const loadSampleData = async () => {
    const collection = await db.collection(ASTRA_DB_COLLECTION);

    for await (const url of d_Data) {
        console.log(`🕷️ Scraping: ${url}`);
        const content = await scrapePage(url);
        console.log(`   ✅ Got ${content.length} characters`);
        
        const chunks = await splitter.splitText(content);
        console.log(`   📄 Split into ${chunks.length} chunks`);

        let counter = 0;
        for await (const chunk of chunks) {
            counter++;
            if (counter % 10 === 0) {
                console.log(`      ⏳ Embedding chunk ${counter}/${chunks.length}...`);
            }
            const vector = await embeddings.embedQuery(chunk);
            await collection.insertOne({
                $vector: vector,
                text: chunk
            });
        }
        console.log(`   ✅ Finished processing ${url}`);
    }
    console.log("✅ All data loaded into AstraDB!");
};

// ===== Run =====
createCollection().then(() => loadSampleData());