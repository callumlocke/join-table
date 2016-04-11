/* global describe, it */

import JoinTable from '../lib';
import assert from 'assert';

describe('join-table', () => {
  const table = new JoinTable();
  it('has correct starting values', () => {
    assert.strictEqual(table.size, 0);
  });

  it('basic adding', () => {
    table.add('cow', 'grass');
    table.add('sheep', 'grass');
    table.add('sheep', 'grass'); // dupe shouldn't get added
    table.add('rabbit', 'carrots');
    table.add('rabbit', 'lettuce');

    assert.strictEqual(table.size, 4);
    assert.strictEqual(table.has('sheep', 'grass'), true);
    assert.strictEqual(table.has('cow', 'grass'), true);
    assert.strictEqual(table.has('rabbit', 'carrots'), true);
    assert.strictEqual(table.has('rabbit', 'lettuce'), true);
    assert.strictEqual(table.has('carrots', 'rabbit'), false);
    assert.strictEqual(table.has('grass', 'sheep'), false);
  });

  it('size changes after adding', () => {
    table.add('fox', 'rabbit');
    assert.strictEqual(table.size, 5);
  });

  it('correctly retrieves lefts for a given right, and vice versa', () => {
    assert.deepEqual(Array.from(table.getLeftsFor('rabbit')), ['fox']);
    assert.deepEqual(Array.from(table.getRightsFor('rabbit')).sort(), ['carrots', 'lettuce']);

    assert.deepEqual(Array.from(table.getLefts()).sort(), ['cow', 'fox', 'rabbit', 'sheep']);
    assert.deepEqual(
      Array.from(table.getRights()).sort(),
      ['carrots', 'grass', 'lettuce', 'rabbit']
    );
  });

  it('removing a join works as expected', () => {
    assert.strictEqual(table.size, 5);
    table.remove('sheep', 'grass');
    assert.strictEqual(table.size, 4);
    table.remove('sheep', 'grass');
    assert.strictEqual(table.size, 4);
    assert.strictEqual(table.has('sheep', 'grass'), false);

    table.remove('rabbit', 'grass');
    assert.strictEqual(table.size, 4,
      'expected size to remain the same after removing non-existent join');
  });

  it('iteration', () => {
    const results = [];

    for (const [left, right] of table) {
      results.push(`${left} eats ${right}`);
    }

    assert.deepEqual(results.sort(), [
      'cow eats grass', 'fox eats rabbit',
      'rabbit eats carrots', 'rabbit eats lettuce',
    ]);
  });

  it('clearing', () => {
    table.clear();
    assert.strictEqual(table.size, 0);
    assert.strictEqual(table.has('cow', 'grass'), false);
    table.add('cow', 'grass');
    assert.strictEqual(table.size, 1);
    table.clear();
    assert.strictEqual(table.size, 0);

    for (const x of table) {
      console.log(x);
      assert(false, 'empty table should not iterate!');
    }
  });
});
