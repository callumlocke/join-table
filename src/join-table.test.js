/* eslint no-console: 0, import/no-extraneous-dependencies: [2, {}] */

import test from 'ava';
import JoinTable from './join-table';

test('JoinTable', (t) => {
  const table = new JoinTable();

  t.is(table.size, 0, 'has correct starting values');

  t.notThrows(() => {
    table.add('cow', 'grass');
    table.add('sheep', 'grass');
    table.add('sheep', 'grass'); // dupe shouldn't get added
    table.add('rabbit', 'carrots');
    table.add('rabbit', 'lettuce');

    t.is(table.size, 4);
    t.is(table.has('sheep', 'grass'), true);
    t.is(table.has('cow', 'grass'), true);
    t.is(table.has('rabbit', 'carrots'), true);
    t.is(table.has('rabbit', 'lettuce'), true);
    t.is(table.has('carrots', 'rabbit'), false);
    t.is(table.has('grass', 'sheep'), false);
  }, 'basic adding');

  table.add('fox', 'rabbit');
  t.is(table.size, 5, 'size changes after adding');

  t.notThrows(() => {
    t.deepEqual(Array.from(table.getLeftsFor('rabbit')), ['fox']);
    t.deepEqual(Array.from(table.getRightsFor('rabbit')).sort(), ['carrots', 'lettuce']);

    t.deepEqual(Array.from(table.getLefts()).sort(), ['cow', 'fox', 'rabbit', 'sheep']);
    t.deepEqual(
      Array.from(table.getRights()).sort(),
      ['carrots', 'grass', 'lettuce', 'rabbit']
    );
  }, 'correctly retrieves lefts for a given right, and vice versa');

  t.notThrows(() => {
    t.is(table.size, 5);
    table.delete('sheep', 'grass');
    t.is(table.size, 4);
    table.delete('sheep', 'grass');
    t.is(table.size, 4);
    t.is(table.has('sheep', 'grass'), false);

    table.delete('rabbit', 'grass');
    t.is(table.size, 4,
      'expected size to remain the same after removing non-existent join');
  }, 'joins can be removed');

  t.notThrows(() => {
    const results = [];

    for (const [left, right] of table) {
      results.push(`${left} eats ${right}`);
    }

    t.deepEqual(results.sort(), [
      'cow eats grass', 'fox eats rabbit',
      'rabbit eats carrots', 'rabbit eats lettuce',
    ]);
  }, 'can iterate');

  t.notThrows(() => {
    table.clear();
    t.is(table.size, 0);
    t.is(table.has('cow', 'grass'), false);
    table.add('cow', 'grass');
    t.is(table.size, 1);
    table.clear();
    t.is(table.size, 0);

    for (const x of table) {
      console.log(x);
      t.fail('iterating an empty table should have no effect');
    }
  }, 'can clear the table');
});
