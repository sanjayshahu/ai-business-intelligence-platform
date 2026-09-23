import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";
import { DataAPIClient } from "@datastax/astra-db-ts";
import { NextResponse } from "next/server";

const {
  ASTRA_DB_COLLECTION,
  ASTRA_DB_API_ENDPOINT,
  ASTRA_DB_APPLICATION_TOKEN,
} = process.env;

const OLLAMA_OPENAI_URL =
  process.env.OLLAMA_OPENAI_URL || "http://localhost:11434/v1";

const OLLAMA_API_URL =
  process.env.OLLAMA_API_URL || "http://localhost:11434";

const CHAT_MODEL = process.env.OLLAMA_MODEL || "llama2";
const EMBEDDING_MODEL = "nomic-embed-text";

const openai = new OpenAI({
  baseURL: OLLAMA_OPENAI_URL,
  apiKey: "ollama",
});

export async function POST(req: Request) {
  console.log("======================================");
  console.log("OLLAMA_OPENAI_URL:", OLLAMA_OPENAI_URL);
  console.log("OLLAMA_API_URL:", OLLAMA_API_URL);
  console.log("CHAT_MODEL:", CHAT_MODEL);
  console.log("======================================");

  try {
    const { messages } = await req.json();
    const latestMessage = messages[messages.length - 1].content;

    console.log("📨 Received message:", latestMessage);

    // -------------------------
    // Step 1: Generate embedding
    // -------------------------
    let queryEmbedding = null;

    try {
      const embeddingResponse = await fetch(
        `${OLLAMA_API_URL}/api/embeddings`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: EMBEDDING_MODEL,
            prompt: latestMessage,
          }),
        }
      );

      if (!embeddingResponse.ok) {
        console.error(
          "Embedding HTTP Error:",
          embeddingResponse.status,
          await embeddingResponse.text()
        );
      } else {
        const embeddingData = await embeddingResponse.json();
        queryEmbedding = embeddingData.embedding;
        console.log("✅ Embedding generated");
      }
    } catch (err) {
      console.error("❌ Embedding failed:", err);
    }

    // -------------------------
    // Step 2: Astra Search
    // -------------------------
    let docContext = "";

    if (queryEmbedding) {
      try {
        const client = new DataAPIClient(ASTRA_DB_APPLICATION_TOKEN);
        const db = client.db(ASTRA_DB_API_ENDPOINT!);
        const collection = db.collection(ASTRA_DB_COLLECTION!);

        const cursor = await collection.find(
          {},
          {
            sort: {
              $vector: queryEmbedding,
            },
            limit: 5,
          }
        );

        const docs = await cursor.toArray();

        console.log(`✅ Found ${docs.length} documents`);

        docContext = docs
          .map((doc: any) => doc.text)
          .join("\n\n");
      } catch (err) {
        console.error("❌ Astra error:", err);
      }
    }

    // -------------------------
    // Step 3: Prompt
    // -------------------------
    const systemPrompt = `You are an AI assistant who knows everything about Formula One.

Use the context below to answer the user's question.

START CONTEXT
${docContext || "No additional context available."}
END CONTEXT`;

    // -------------------------
    // Step 4: Chat
    // -------------------------
    console.log("📝 Sending request to Ollama...");
    console.log("Chat URL:", `${OLLAMA_OPENAI_URL}/chat/completions`);
    console.log("Model:", CHAT_MODEL);

    const response = await openai.chat.completions.create({
      model: CHAT_MODEL,
      messages: [
        {
          role: "system",
          content: systemPrompt,
        },
        ...messages,
      ],
      temperature: 0.7,
      stream: true,
    });

    console.log("✅ Streaming started");

    return new StreamingTextResponse(OpenAIStream(response));
  } catch (error: any) {
    console.error("======================================");
    console.error("❌ CHAT ERROR");
    console.error("Status:", error?.status);
    console.error("Message:", error?.message);
    console.dir(error, { depth: null });
    console.error("======================================");

    return NextResponse.json(
      {
        error: "Internal server error",
        details: error?.message ?? "Unknown error",
      },
      {
        status: 500,
      }
    );
  }
}