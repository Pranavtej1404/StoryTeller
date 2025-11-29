import { NextResponse } from "next/server";
import db from "@/db/database";
import { v4 as uuid } from "uuid";

export async function POST(req: Request) {
  try {
    const { title, genre, characters } = await req.json();

    if (!title) return NextResponse.json({ error: "Title required" }, { status: 400 });

    const storyId = uuid();

    // Insert story
    const insertStory = db.prepare(
      "INSERT INTO stories (id, title, genre) VALUES (?, ?, ?)"
    );
    insertStory.run(storyId, title, genre || "");

    // Insert characters
    const insertChar = db.prepare(
      "INSERT INTO characters (id, story_id, name) VALUES (?, ?, ?)"
    );

    characters.forEach((name: string) => {
      insertChar.run(uuid(), storyId, name);
    });

    return NextResponse.json({ storyId, title, genre, characters });
  } catch (err) {
    return NextResponse.json({ error: "Failed to create story" }, { status: 500 });
  }
}
