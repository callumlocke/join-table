const SIZE = Symbol();
const LEFTS = Symbol();
const RIGHTS = Symbol();

const iteratorDone = Object.defineProperty({}, 'done', {value: true});

export default class PairTable {
  constructor() {
    this[SIZE] = 0;
    this[LEFTS] = [];
    this[RIGHTS] = [];
  }

  /**
   * How many pairings are in the table.
   */
  get size() {
    return this[SIZE];
  }

  /**
   * Removes all pairings from the table.
   */
  clear() {
    this[SIZE] = 0;
    this[LEFTS].length = 0;
    this[RIGHTS].length = 0;
  }

  /**
   * Finds out if a given pairing exists.
   */
  has(left, right) {
    const lefts = this[LEFTS];
    const rights = this[RIGHTS];
    const size = this[SIZE];

    for (let i = 0; i < size; i++) {
      if (lefts[i] === left && rights[i] === right) return true;
    }

    return false;
  }

  /**
   * Adds a new pair. (Has no effect if the pairing already exists.)
   */
  add(left, right) {
    const lefts = this[LEFTS];
    const rights = this[RIGHTS];
    const size = this[SIZE];

    // if this pairing already exists, do nothing
    for (let i = 0; i < size; i++) {
      if (lefts[i] === left && rights[i] === right) return this;
    }

    // add the new pairing
    const index = this[SIZE];
    lefts[index] = left;
    rights[index] = right;
    this[SIZE]++;

    return this;
  }

  /**
   * Remove a pairing from the join table. (Has no effect if the pairing does not exist.)
   */
  remove(left, right) {
    const lefts = this[LEFTS];
    const rights = this[RIGHTS];
    const size = this[SIZE];

    for (let i = 0; i < size; i++) {
      if (lefts[i] === left && rights[i] === right) {
        // take the last item of each array and use it to overwrite the to- be-deleted item to
        // then truncate the last item off the arrays
        const lastIndex = size - 1;
        lefts[i] = lefts[lastIndex];
        rights[i] = rights[lastIndex];
        lefts.length = lastIndex;
        rights.length = lastIndex;
        this[SIZE] = lastIndex;
        return this;
      }
    }

    return this;
  }

  /**
   * Gets all 'lefts' associated with the given 'right'.
   */
  getLeftsFor(right) {
    const lefts = this[LEFTS];
    const rights = this[RIGHTS];
    const size = this[SIZE];
    const results = new Set();

    for (let i = 0; i < size; i++) {
      if (rights[i] === right) results.add(lefts[i]);
    }

    return results;
  }

  /**
   * Gets all 'rights' associated with the given 'left'.
   */
  getRightsFor(left) {
    const lefts = this[LEFTS];
    const rights = this[RIGHTS];
    const size = this[SIZE];
    const results = new Set();

    for (let i = 0; i < size; i++) {
      if (lefts[i] === left) results.add(rights[i]);
    }

    return results;
  }

  /**
   * Gets a set of all the lefts.
   */
  getAllLefts() {
    return new Set(this[LEFTS]);
  }

  /**
   * Gets a set of all the rights.
   */
  getAllRights() {
    return new Set(this[RIGHTS]);
  }

  /**
   * Returns a string (works with console.log() etc.)
   */
  inspect() {
    return `PairTable[${this[SIZE]} pairs]`;
  }

  /**
   * Iterating over a PairTable gets you each pair as a two-item array: [left, right]
   */
  [Symbol.iterator]() {
    const lefts = this[LEFTS];
    const rights = this[RIGHTS];
    const lastIndex = this[SIZE] - 1;
    let index = 0;

    return {
      next: () => {
        if (index > lastIndex) return iteratorDone;

        const result = {
          value: [
            lefts[index],
            rights[index],
          ],
        };

        index++;

        return result;
      },
    };
  }
}
