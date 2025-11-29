import { NextResponse } from "next/server";
import db from "@/db/database";
import { v4 as uuid } from "uuid";
import { generateSceneAI } from "@/lib/generateScene";

export async function POST(req: Request) {
  try {
    const { storyId, previousScene, choice } = await req.json();

    if (!storyId) {
      return NextResponse.json({ error: "storyId required" }, { status: 400 });
    }

    const story = db.prepare("SELECT * FROM stories WHERE id = ?").get(storyId);
    const chars = db
      .prepare("SELECT name FROM characters WHERE story_id = ?")
      .all(storyId)
      .map((c: any) => c.name);

    const aiResult = await generateSceneAI({
      title: story.title,
      genre: story.genre,
      characters: chars,
      previousScene,
      choice,
    });

    const sceneId = uuid();

    const sceneCount = db
      .prepare("SELECT COUNT(*) as c FROM scenes WHERE story_id = ?")
      .get(storyId).c;

    db.prepare(
      `INSERT INTO scenes (id, story_id, content, scene_number)
       VALUES (?, ?, ?, ?)`
    ).run(sceneId, storyId, aiResult.scene, sceneCount + 1);

    return NextResponse.json({
      scene: aiResult.scene,
      choices: aiResult.choices,
      sceneId,
    });
  } catch (error) {
    console.error("Scene generation error:", error);
    return NextResponse.json(
      { error: "Scene generation failed" },
      { status: 500 }
    );
  }
}
