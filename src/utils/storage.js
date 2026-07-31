import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_FILE = path.resolve(__dirname, '../../expenses.json');

// Helper to read expenses from JSON file
export async function readExpenses() {
  try {
    const data = await fs.readFile(DATA_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    if (error.code === 'ENOENT') {
      // Initialize with an empty array if file does not exist
      await writeExpenses([]);
      return [];
    }
    throw error;
  }
}

// Helper to write expenses to JSON file
export async function writeExpenses(expenses) {
  await fs.writeFile(DATA_FILE, JSON.stringify(expenses, null, 2), 'utf8');
}
