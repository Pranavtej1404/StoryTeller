import { NextResponse } from "next/server";
import db from "@/db/database";
import { generateSceneAI } from "@/lib/generateScene";
import { v4 as uuid } from "uuid";

export async function POST(req: Request) {
  try {
    const {
      storyId,
      title,
      genre,
      characters,
      previousScene,
      choice,
    } = await req.json();

    if (!title || !genre || !characters) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Generate the scene
    const { scene, choices } = await generateSceneAI({
      title,
      genre,
      characters,
      previousScene,
      choice,
    });

    // If storyId exists → store next scene
    if (storyId) {
      const id = uuid();
      const seq =
        db.prepare("SELECT COUNT(*) AS count FROM scenes WHERE storyId = ?")
          .get(storyId).count + 1;

      db.prepare(`
        INSERT INTO scenes (id, storyId, content, sequence, choice, choices)
        VALUES (?, ?, ?, ?, ?, ?)
      `).run(
        id,
        storyId,
        scene,
        seq,
        choice || null,
        JSON.stringify(choices)
      );
    }

    return NextResponse.json({ scene, choices });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to generate scene" },
      { status: 500 }
    );
  }
}
