import { gemini } from "./ai";

export async function generateSceneAI({
  title,
  genre,
  characters,
  previousScene,
  choice,
}: {
  title: string;
  genre: string;
  characters: string[];
  previousScene: string | null;
  choice?: string | null;
}) {
  const model = gemini.getGenerativeModel({
    model: "gemini-2.0-flash",
  });

  const prompt = previousScene
    ? `
Continue the interactive story.

TITLE: ${title}
GENRE: ${genre}
CHARACTERS: ${characters.join(", ")}

Previous Scene:
${previousScene}

User Choice: ${choice}

Write the next scene (5–10 sentences).
Provide exactly 3 branching choices.

Return ONLY THIS JSON:
{
  "scene": "string",
  "choices": ["string", "string", "string"]
}
`
    : `
Start a new interactive story.

TITLE: ${title}
GENRE: ${genre}
CHARACTERS: ${characters.join(", ")}

Write the opening scene (5–10 sentences).
Provide exactly 3 branching choices.

Return ONLY THIS JSON:
{
  "scene": "string",
  "choices": ["string", "string", "string"]
}
`;

  const result = await model.generateContent(prompt);

  const fullText = result.response.text();

  // Extract JSON safely
  const jsonText = fullText.substring(
    fullText.indexOf("{"),
    fullText.lastIndexOf("}") + 1
  );

  try {
    return JSON.parse(jsonText);
  } catch (e) {
    console.error("Gemini returned invalid JSON:\n\n", fullText);
    return {
      scene: "Error: AI returned invalid JSON.",
      choices: [],
    };
  }
}
