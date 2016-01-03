# pair-table

[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][depstat-image]][depstat-url] [![devDependency Status][devdepstat-image]][devdepstat-url] [![peerDependency Status][peerdepstat-image]][peerdepstat-url]

PairTable is a class with an API similar to the ES2015 [Set], except that it deals with **ordered pairs** of values, so you can use it as a join table.

## Usage

```js
import PairTable from 'pair-table';

const table = new PairTable();

table.add('foo', 'bar');
table.add('foo', 'baz');
table.add('123', 456);

table.has('foo', 'no');  // false (doesn't exist)
table.has('baz', 'foo'); // false (wrong order)

table.has('foo', 'bar'); // true
table.has('foo', 'baz'); // true

table.has('123', '456'); // false (strings !== integers)

table.getRightsFor('foo'); // Set {'bar', 'baz'}
table.getLeftsFor('baz'); // Set {'foo'}
```

Notes:

- It's conceptually similar to an ES2015 [Set], but with every item being a pairing of two values – ‘left’ and ‘right’.
  - It might look more like a [Map] at first glance, but it's not – in a Map, the left side in each pairing is a key, and keys must be unique. With a pair table, a single value may appear multiple times in either column.
- The order of a pair matters: `'a', 'b'` is not the same as `'b', 'a'`.

## API

#### add(left, right)

Adds a pair and returns the table. Has no effect if this exact pair already exists.

#### remove(left, right)

Removes a pair and returns the table. Has no effect if this exact pair does not exist.

#### has(left, right)

Checks if a pair exists and returns `true` or `false`.

#### clear()

Empties the table.

#### getRightsFor(left)

Returns the [Set] of ‘right’ values that are paired with the given ‘left’ value.

#### getLeftsFor(right)

Returns the [Set] of ‘left’ values that are paired with the given ‘right’ value.

#### getAllLefts()

Returns a [Set] of all the left values.

#### getAllRights()

Returns a [Set] of all the right values.

#### size

The number of pairs currently in the table.


## Iterating

Every pair table is [iterable]. Each iteration gets a two-item array in the form `left, right`:

```js
const table = new PairTable();

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

Warning: Updating the table while you're iterating over it will probably confuse the iterator. If you really need to do it, spread the table into an array first:

```js
for (const [x, y] of [...table]) {
  // safe to update table here
}
```

---

## License

MIT


[npm-url]: https://npmjs.org/package/pair-table
[npm-image]: https://img.shields.io/npm/v/pair-table.svg?style=flat-square

[travis-url]: http://travis-ci.org/callumlocke/pair-table
[travis-image]: https://img.shields.io/travis/callumlocke/pair-table.svg?style=flat-square

[depstat-url]: https://david-dm.org/callumlocke/pair-table
[depstat-image]: https://img.shields.io/david/callumlocke/pair-table.svg?style=flat-square

[devdepstat-url]: https://david-dm.org/callumlocke/pair-table#info=devDependencies
[devdepstat-image]: https://img.shields.io/david/dev/callumlocke/pair-table.svg?style=flat-square&label=devDeps

[peerdepstat-url]: https://david-dm.org/callumlocke/pair-table#info=peerDependencies
[peerdepstat-image]: https://img.shields.io/david/peer/callumlocke/pair-table.svg?style=flat-square&label=peerDeps

[Set]: https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Set
[Map]: https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Map
[iterable]: https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Iteration_protocols#iterable
