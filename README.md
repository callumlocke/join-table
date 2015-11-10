# pair-table

[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][depstat-image]][depstat-url] [![devDependency Status][devdepstat-image]][devdepstat-url] [![peerDependency Status][peerdepstat-image]][peerdepstat-url]

PairTable is a class with a very similar API to that of [ES2015 Set][Set], except that it deals with pairs of values.

- It behaves like a [Set] in that adding a pair that already exists will have no effect.
- Although it associates pairs of values, it's not the same thing as a Map, because a single value may appear multiple times in either column. In other words, there are no "keys" – instead there are just "lefts" and "rights" (like a join table).
- For determining equivalence, `'a', 'b'` is not considered the same pair as `'b', 'a'`.


## Usage

```js
import PairTable from 'pair-table';

const table = new PairTable();

table.add('foo', 'bar');
table.add('foo', 'baz');
table.add('123', 456);

table.has('foo', 'no'); // false
table.has('baz', 'bar'); // false

table.has('foo', 'bar'); // true
table.has('foo', 'baz'); // true

table.has('123', '456'); // false (strings !== integers)

table.getRightsFor('foo'); // Set {'bar', 'baz'}
table.getLeftsFor('baz'); // Set {'foo'}
```

## API

#### add(left, right)

Adds a pair and returns the table. Has no effect if this exact pair already exists.

#### remove(left, right)

Removes a pair and returns the table. Has no effect if this exact pair does not exist.

#### has(left, right)

Checks if a pair exists and returns `true` or `false`.

#### clear()

Removes all pairs

#### getRightsFor(left)

Returns a [Set] of any 'right' values that are paired with the given 'left' value.

#### getLeftsFor(right)

Returns a [Set] of any 'left' values that are paired with the given 'right' value.

#### getAllLefts()

Returns a [Set] of all the left values.

#### getAllRights()

Returns a [Set] of all the left values.

#### size

The number of pairs currently in the table.


## Iterating

You can iterate over the whole table. Each iteration gets a two-item array in the form `left, right`:

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
