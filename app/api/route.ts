import { NextResponse } from "next/server";

export default async function GET() {
    console.log("Hello");
    return NextResponse.json({
        hello: "World",
    });
}
