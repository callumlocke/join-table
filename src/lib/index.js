/* @flow */

export default class PairTable {
  _size: number;
  _lefts: Array<any>;
  _rights: Array<any>;

  constructor() {
    this._size = 0;
    this._lefts = [];
    this._rights = [];
  }

  /**
   * How many pairings are in the table.
   */
  /* $FlowIssue */
  get size() {
    return this._size;
  }

  /**
   * Disallow overwriting the size property.
   */
  /* $FlowIssue */
  set size(value) { // eslint-disable-line no-unused-vars
    throw new Error('PairTable: size property is not writable');
  }

  /**
   * Removes all pairings from the table.
   */
  clear() {
    this._size = 0;
    this._lefts.length = 0;
    this._rights.length = 0;
  }

  /**
   * Finds out if a given pairing exists.
   */
  has(left:any, right:any) : bool {
    const lefts = this._lefts;
    const rights = this._rights;
    const size = this._size;

    for (let i = 0; i < size; i++) {
      if (lefts[i] === left && rights[i] === right) return true;
    }

    return false;
  }

  /**
   * Adds a new pair. (Has no effect if the pairing already exists.)
   */
  add(left:any, right:any) {
    const lefts = this._lefts;
    const rights = this._rights;
    const size = this._size;

    // if this pairing already exists, do nothing
    for (let i = 0; i < size; i++) {
      if (lefts[i] === left && rights[i] === right) return this;
    }

    // add the new pairing
    const index = this._size;
    lefts[index] = left;
    rights[index] = right;
    this._size++;

    return this;
  }

  /**
   * Remove a pairing from the join table.
   * (Has no effect if the pairing does not exist.)
   */
  remove(left:any, right:any) {
    const lefts = this._lefts;
    const rights = this._rights;
    const size = this._size;

    for (let i = 0; i < size; i++) {
      if (lefts[i] === left && rights[i] === right) {
        // fast method of deleting an item from an array
        const lastIndex = size - 1;
        lefts[i] = lefts[lastIndex];
        rights[i] = rights[lastIndex];
        lefts.length = lastIndex;
        rights.length = lastIndex;
        this._size = lastIndex;
        return this;
      }
    }

    return this;
  }

  /**
   * Gets all 'lefts' associated with the given 'right'.
   */
  getLeftsFor(right:any) {
    const lefts = this._lefts;
    const rights = this._rights;
    const size = this._size;
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
    const lefts = this._lefts;
    const rights = this._rights;
    const size = this._size;
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
    return new Set(this._lefts);
  }

  /**
   * Gets a set of all the rights.
   */
  getAllRights() {
    return new Set(this._rights);
  }

  /**
   * Returns a string (works with console.log() etc.)
   */
  inspect() {
    return `PairTable[${this._size} pairs]`;
  }

  /**
   * Iterating over a PairTable gets you each pair as a two-item array:
   * [left, right]
   */
  /* $FlowIssue */
  [Symbol.iterator]() {
    const lefts = this._lefts;
    const rights = this._rights;
    const lastIndex = this._size - 1;
    let index = 0;

    return {
      next: () => {
        if (index > lastIndex) return { done: true };

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
