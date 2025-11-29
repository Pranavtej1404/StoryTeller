-- Stories table
CREATE TABLE IF NOT EXISTS stories (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  genre TEXT,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP
);

-- Characters table
CREATE TABLE IF NOT EXISTS characters (
  id TEXT PRIMARY KEY,
  story_id TEXT NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  FOREIGN KEY(story_id) REFERENCES stories(id)
);

-- Scenes table
CREATE TABLE IF NOT EXISTS scenes (
  id TEXT PRIMARY KEY,
  storyId TEXT,
  content TEXT NOT NULL,
  sequence INTEGER NOT NULL,
  choices TEXT,
  choice TEXT,
  createdAt TEXT DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY(storyId) REFERENCES stories(id)
);
