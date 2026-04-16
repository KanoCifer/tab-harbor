'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');

const {
  reorderSubsetByIds,
} = require('./list-order.js');

test('reorderSubsetByIds reorders only the included active subset', () => {
  const items = [
    { id: 'saved-1', completed: false, dismissed: false },
    { id: 'saved-2', completed: true, dismissed: false },
    { id: 'saved-3', completed: false, dismissed: false },
  ];

  const reordered = reorderSubsetByIds(
    items,
    ['saved-3', 'saved-1'],
    item => !item.completed && !item.dismissed
  );

  assert.deepEqual(reordered.map(item => item.id), ['saved-3', 'saved-2', 'saved-1']);
});

test('reorderSubsetByIds leaves the list unchanged when ids are incomplete', () => {
  const items = [
    { id: 'todo-1', completed: false, dismissed: false },
    { id: 'todo-2', completed: false, dismissed: false },
  ];

  const reordered = reorderSubsetByIds(
    items,
    ['todo-2'],
    item => !item.completed && !item.dismissed
  );

  assert.deepEqual(reordered, items);
});
