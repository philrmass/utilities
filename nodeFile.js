import { promises as fs } from 'fs';

export async function saveJsonFile(filePath, data) {
  try {
    saveTextFile(filePath, JSON.stringify(data));
  } catch (err) {
    console.error(`Error stringifying [${err}]`);
  }
}

export async function loadJsonFile(filePath) {
  try {
    const text = await loadTextFile(filePath);

    if (!text) {
      return text;
    }
    return JSON.parse(text);
  } catch (err) {
    console.error(`Error parsing [${err}]`);
  }
}

export async function saveTextFile(filePath, text) {
  try {
    await fs.writeFile(filePath, text);
  } catch (err) {
    console.error(`Error writing file [${err}]`);
  }
}

export async function loadTextFile(filePath) {
  try {
    return await fs.readFile(filePath);
  } catch (err) {
    console.error(`Error reading file [${err}]`);
  }
}
