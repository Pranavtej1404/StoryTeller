import { NextRequest, NextResponse } from "next/server";
import db from "@/db/database";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    const story = db.prepare(
      "SELECT id, title, genre, characters, createdAt FROM stories WHERE id = ?"
    ).get(id);

    if (!story) {
      return NextResponse.json({ error: "Story not found" }, { status: 404 });
    }

    const scenes = db
      .prepare(
        `SELECT id, content, sequence, choices, choice
         FROM scenes
         WHERE storyId = ?
         ORDER BY sequence ASC`
      )
      .all(id)
      .map((s: any) => ({
        ...s,
        choices: s.choices ? JSON.parse(s.choices) : [],
      }));

    return NextResponse.json({ story, scenes });
  } catch (err) {
    console.error("Error loading story:", err);
    return NextResponse.json({ error: "Failed to load story" }, { status: 500 });
  }
}
