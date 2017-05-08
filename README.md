# ♊ join-table

[![NPM version][npm-image]][npm-url] [![CircleCI][circle-badge]][circle-url] [![Dependency Status][depstat-image]][depstat-url]

Fast, mutable collection of many-to-many pairs of values.

A JoinTable instance is effectively a table of two columns ('left' and 'right'). It's similar to an ES2015 [Set] in that a given left-right combination can only occur once in a table.

## Usage

```js
import JoinTable from 'join-table';

const table = new JoinTable();

table.add('foo', 'bar');
table.add('foo', 'baz');
table.add('123', 456);

table.has('foo', 'bar'); // true
table.has('foo', 'baz'); // true
table.has('123', 456); // true

table.has('xxx', 'yyy'); // false
table.has('baz', 'foo'); // false (wrong order)
table.has('123', '456'); // false (strings !== integers)

table.getRightsFor('foo'); // Set {'bar', 'baz'}
table.getLeftsFor('baz');  // Set {'foo'}
```

## API

#### add(left, right)

Adds a join and returns the table. Has no effect if this exact join already exists.

#### remove(left, right)

Removes a join and returns the table. Has no effect if this exact join does not exist.

#### has(left, right)

Checks if the join exists and returns `true` or `false`.

#### clear()

Empties the table.

#### getRightsFor(left)

Returns the [Set] of ‘right’ values that are joined with the given ‘left’ value.

#### getLeftsFor(right)

Returns the [Set] of ‘left’ values that are joined with the given ‘right’ value.

#### getLefts()

Returns a [Set] of all the ‘left’ values in the table.

#### getRights()

Returns a [Set] of all the ‘right’ values in the table.

#### size

The number of joins currently in the table. Note that joins are unique, so if you call `.add(x, y)` twice in a row, the second call will have no effect on the size.


## Iterating

Join tables are [iterable]. Each iteration receives a two-item array in the form `[left, right]`:

```js
const table = new JoinTable();

table.add('cow', 'grass');
table.add('rabbit', 'carrots');
table.add('rabbit', 'lettuce');

for (const [animal, food] of table) {
  console.log(`${animal} eats ${food}`);
}
// cow eats grass
// rabbit eats carrots
// rabbit eats lettuce
```

Warning: mutating the table while you're iterating over it might have unpredictable results. If you need to update the table during a loop, you might want to spread the table into an array first:

```js
for (const [x, y] of [...table]) {
  // safe to update table here
}
```

---

## License

MIT


[npm-url]: https://npmjs.org/package/join-table
[npm-image]: https://img.shields.io/npm/v/join-table.svg?style=flat-square

[circle-url]: https://circleci.com/gh/callumlocke/join-table
[circle-badge]: https://circleci.com/gh/callumlocke/join-table.svg?style=svg

[depstat-url]: https://david-dm.org/callumlocke/join-table
[depstat-image]: https://img.shields.io/david/callumlocke/join-table.svg?style=flat-square

[devdepstat-url]: https://david-dm.org/callumlocke/join-table#info=devDependencies
[devdepstat-image]: https://img.shields.io/david/dev/callumlocke/join-table.svg?style=flat-square&label=devDeps

[peerdepstat-url]: https://david-dm.org/callumlocke/join-table#info=peerDependencies
[peerdepstat-image]: https://img.shields.io/david/peer/callumlocke/join-table.svg?style=flat-square&label=peerDeps

[Set]: https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Set
[Map]: https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Map
[iterable]: https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Iteration_protocols#iterable
