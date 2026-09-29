import { readFile, writeFile } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DB_PATH = path.join(__dirname, 'data', 'db.json');

// The shape of our "database" — just an object with three arrays.
const DEFAULT_DATA = {
  applications: [],
  reservations: [],
  contactMessages: [],
};

async function readDB() {
  try {
    const raw = await readFile(DB_PATH, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    // File doesn't exist yet (first run) — start with empty data.
    if (err.code === 'ENOENT') {
      await writeDB(DEFAULT_DATA);
      return DEFAULT_DATA;
    }
    throw err;
  }
}

async function writeDB(data) {
  await writeFile(DB_PATH, JSON.stringify(data, null, 2), 'utf-8');
}

export { readDB, writeDB };
