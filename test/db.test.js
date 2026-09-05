const test = require('node:test');
const assert = require('node:assert/strict');
const db = require('../db');

test('db module interface', (t) => {
  assert.equal(typeof db.connectToDb, 'function');
  assert.equal(typeof db.getDb, 'function');
  assert.equal(db.getDb(), undefined);
});
