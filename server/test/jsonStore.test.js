const path = require('path');
const fs = require('fs').promises;
const { readJson, writeJson } = require('../utils/jsonStore');

test('readJson and writeJson roundtrip', async () => {
  const tmp = path.join(__dirname, 'tmp.json');
  const data = { foo: 'bar' };
  await writeJson(tmp, data);
  const result = await readJson(tmp);
  expect(result).toEqual(data);
  await fs.unlink(tmp);
});
