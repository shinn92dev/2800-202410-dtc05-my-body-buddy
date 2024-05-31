import { NextRequest, NextResponse } from "next/server";
import { generateAlternativeWorkout } from "@/lib/openai";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { prompt } = body;

        if (!prompt) {
            return NextResponse.json(
                { error: "Prompt is required" },
                { status: 400 }
            );
        }

        console.log("IN SIDE OF API TO GENERATE AI ANSWER FOR WORKOUT");

        const result = await generateAlternativeWorkout(prompt);
        return NextResponse.json({ result }, { status: 200 });
    } catch (error) {
        console.error("Error generating workout alternative:", error);
        return NextResponse.json(
            { error: "Failed to generate workout alternative" },
            { status: 500 }
        );
    }
}

export async function OPTIONS() {
    return NextResponse.json({}, { status: 204 });
}
