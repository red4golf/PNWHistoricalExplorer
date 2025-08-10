const fs = require('fs').promises;
const path = require('path');

// Simple helpers to read and write JSON files with a basic
// concurrency safeguard: data is written to a temporary file in the
// same directory and then atomically renamed over the target file.

/**
 * Read and parse a JSON file.
 * @param {string} filePath - Absolute path to the JSON file.
 * @returns {Promise<any>} Parsed JSON content.
 */
async function readJson(filePath) {
  const data = await fs.readFile(filePath, 'utf-8');
  return JSON.parse(data);
}

/**
 * Write data to a JSON file atomically. The write is first directed to a
 * temporary file which is then renamed over the destination to minimize
 * race conditions between readers and writers.
 *
 * @param {string} filePath - Absolute path to the JSON file.
 * @param {any} data - Data to serialize as JSON.
 */
async function writeJson(filePath, data) {
  const dir = path.dirname(filePath);
  const tempPath = path.join(
    dir,
    `${path.basename(filePath)}.${Date.now()}-${process.pid}.tmp`
  );

  await fs.writeFile(tempPath, JSON.stringify(data, null, 2));
  await fs.rename(tempPath, filePath);
}

module.exports = { readJson, writeJson };

