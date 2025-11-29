import { NextResponse } from "next/server";
import db from "@/db/database";

export async function GET() {
  try {
    const stories = db.prepare("SELECT id, title, genre FROM stories ORDER BY id DESC").all();
    return NextResponse.json({ stories });
  } catch (e) {
    return NextResponse.json({ error: "Failed to load stories" }, { status: 500 });
  }
}
