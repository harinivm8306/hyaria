import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { messages } = await req.json();

        // Pass to local Ollama Llama3 model
        const ollamaRes = await fetch("http://127.0.0.1:11434/api/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                model: "llama3",
                messages: [
                    {
                        role: "system",
                        content: "You are the HY-ARIA Assistant, an AI farming expert specifically for the HY-ARIA smart aeroponics system. Keep your answers concise, helpful and focused on agriculture, aeroponics, crop conditions, and system data. Please answer in 2-3 sentences max."
                    },
                    ...messages
                ],
                stream: false
            })
        });

        if (!ollamaRes.ok) {
            throw new Error(`Ollama Error: ${ollamaRes.status} ${ollamaRes.statusText}`);
        }

        const data = await ollamaRes.json();
        return NextResponse.json({ reply: data.message.content });
    } catch (error: any) {
        console.error("Chatbot LLM Error:", error);
        return NextResponse.json(
            { error: "Failed to connect to the local Llama3 instance." },
            { status: 500 }
        );
    }
}
