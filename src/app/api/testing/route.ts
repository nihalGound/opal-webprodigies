import { NextResponse } from "next/server";

export async function GET() {
    try {
        return NextResponse.json({
            status: 200,
            message: "Server contacting to nextjs app"
        })
    } catch (error) {
        return NextResponse.json({
            status: 500,
            error
        })
    }
}