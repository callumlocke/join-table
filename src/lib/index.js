// @flow

export default class JoinTable {
  _size: number;
  _lefts: Array<any>;
  _rights: Array<any>;

  constructor() {
    this._size = 0;
    this._lefts = [];
    this._rights = [];
  }

  /**
   * How many joins are in the table.
   */
  // $FlowIssue
  get size(): number {
    return this._size;
  }

  /**
   * Disallow overwriting the size property.
   */
  // $FlowIssue
  set size(value): void { // eslint-disable-line no-unused-vars, class-methods-use-this
    throw new Error('JoinTable: size property is not writable');
  }

  /**
   * Empties the table.
   */
  clear(): void {
    this._size = 0;
    this._lefts.length = 0;
    this._rights.length = 0;
  }

  /**
   * Finds out if a given join exists.
   */
  has(left: any, right: any): bool {
    const lefts = this._lefts;
    const rights = this._rights;
    const size = this._size;

    for (let i = 0; i < size; i += 1) {
      if (lefts[i] === left && rights[i] === right) return true;
    }

    return false;
  }

  /**
   * Adds a new join. (Has no effect if the join already exists.)
   */
  add(left: any, right: any): this {
    const lefts = this._lefts;
    const rights = this._rights;
    const size = this._size;

    // if this join already exists, do nothing
    for (let i = 0; i < size; i += 1) {
      if (lefts[i] === left && rights[i] === right) return this;
    }

    // add the new join
    const index = this._size;
    lefts[index] = left;
    rights[index] = right;
    this._size += 1;

    return this;
  }

  /**
   * Removes a join from the table.
   * (Has no effect if the join does not exist.)
   */
  delete(left: any, right: any): bool {
    const lefts = this._lefts;
    const rights = this._rights;
    const size = this._size;

    for (let i = 0; i < size; i += 1) {
      if (lefts[i] === left && rights[i] === right) {
        // fast method of deleting an item from an array
        const lastIndex = size - 1;
        lefts[i] = lefts[lastIndex];
        rights[i] = rights[lastIndex];
        lefts.length = lastIndex;
        rights.length = lastIndex;
        this._size = lastIndex;
        return true;
      }
    }

    return false;
  }

  /**
   * Gets all 'lefts' associated with the given 'right'.
   */
  getLeftsFor(right: any): Set<any> {
    const lefts = this._lefts;
    const rights = this._rights;
    const size = this._size;
    const results = new Set();

    for (let i = 0; i < size; i += 1) {
      if (rights[i] === right) results.add(lefts[i]);
    }

    return results;
  }

  /**
   * Gets all 'rights' associated with the given 'left'.
   */
  getRightsFor(left: any): Set<any> {
    const lefts = this._lefts;
    const rights = this._rights;
    const size = this._size;
    const results = new Set();

    for (let i = 0; i < size; i += 1) {
      if (lefts[i] === left) results.add(rights[i]);
    }

    return results;
  }

  /**
   * Gets a set of all the lefts.
   */
  getLefts(): Set<any> {
    return new Set(this._lefts);
  }

  /**
   * Gets a set of all the rights.
   */
  getRights(): Set<any> {
    return new Set(this._rights);
  }

  /**
   * Returns a string (works with console.log() etc.)
   */
  inspect(): string {
    return `JoinTable[${this._size} joins]`;
  }

  /**
   * Iterating over a JoinTable gets you each join as a two-item array:
   * [left, right]
   */
  // $FlowIssue: computed props not supported
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

        index += 1;

        return result;
      },
    };
  }
}
