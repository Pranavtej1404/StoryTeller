import Database from "better-sqlite3";
import fs from "fs";
import path from "path";

const DB_PATH = path.join(process.cwd(), "db", "story.db");

// Initialize DB file if not exists
if (!fs.existsSync(DB_PATH)) {
  fs.writeFileSync(DB_PATH, "");
}

const db = Database(DB_PATH);

// Run schema
const schema = fs.readFileSync(path.join(process.cwd(), "db", "schema.sql"), "utf-8");
db.exec(schema);

export default db;
