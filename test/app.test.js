const test = require('node:test');
const assert = require('node:assert/strict');

test('app.js syntax and export check', (t) => {
  // Verify app module can be required without throwing top-level syntax errors
  assert.doesNotThrow(() => {
    require('../app.js');
  });
});
