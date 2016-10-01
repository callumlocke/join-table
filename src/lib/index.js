// @flow

const privates: WeakMap<JoinTable, PrivateMembers> = new WeakMap(); // eslint-disable-line no-use-before-define, no-undef, max-len

declare type PrivateMembers = { // eslint-disable-line no-undef
  size: number,
  lefts: any[],
  rights: any[],
};

export default class JoinTable {
  constructor() {
    privates.set(this, {
      size: 0,
      lefts: [],
      rights: [],
    });
  }

  /**
   * How many joins are in the table.
   */
  // $FlowFixMe
  get size(): number {
    return privates.get(this).size;
  }

  /**
   * Disallow overwriting the size property.
   */
  // $FlowFixMe
  set size(value): void { // eslint-disable-line no-unused-vars, class-methods-use-this
    throw new Error('JoinTable: size property is not writable');
  }

  /**
   * Empties the table.
   */
  clear(): void {
    const p = privates.get(this);
    p.size = 0;
    p.lefts.length = 0;
    p.rights.length = 0;
  }

  /**
   * Finds out if a given join exists.
   */
  has(left: any, right: any): bool {
    const { lefts, rights, size } = privates.get(this);

    for (let i = 0; i < size; i += 1) {
      if (lefts[i] === left && rights[i] === right) return true;
    }

    return false;
  }

  /**
   * Adds a new join. (Has no effect if the join already exists.)
   */
  add(left: any, right: any): this {
    const p = privates.get(this);

    const { lefts, rights, size } = p;

    // if this join already exists, do nothing
    for (let i = 0; i < size; i += 1) {
      if (lefts[i] === left && rights[i] === right) return this;
    }

    // add the new join
    lefts[size] = left;
    rights[size] = right;
    p.size += 1;

    return this;
  }

  /**
   * Removes a join from the table.
   * (Has no effect if the join does not exist.)
   */
  delete(left: any, right: any): bool {
    const p = privates.get(this);

    const { lefts, rights, size } = p;

    for (let i = 0; i < size; i += 1) {
      if (lefts[i] === left && rights[i] === right) {
        // fast method of deleting an item from an array
        const finalIndex = size - 1;
        lefts[i] = lefts[finalIndex];
        rights[i] = rights[finalIndex];
        lefts.length = finalIndex;
        rights.length = finalIndex;
        p.size = finalIndex;
        return true;
      }
    }

    return false;
  }

  /**
   * Gets all 'lefts' associated with the given 'right'.
   */
  getLeftsFor(right: any): Set<any> {
    const { lefts, rights, size } = privates.get(this);

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
    const { lefts, rights, size } = privates.get(this);

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
    return new Set(privates.get(this).lefts);
  }

  /**
   * Gets a set of all the rights.
   */
  getRights(): Set<any> {
    return new Set(privates.get(this).rights);
  }

  /**
   * Returns a string (works with console.log() etc.)
   */
  inspect(): string {
    return `JoinTable[${privates.get(this).size} joins]`;
  }

  /**
   * An iteration receives each join as a two-item array:
   * [left, right]
   */
  // $FlowFixMe: computed props not supported
  [Symbol.iterator]() {
    const { lefts, rights, size } = privates.get(this);

    const finalIndex = size - 1;
    let index = 0;

    return {
      next: () => {
        if (index > finalIndex) return { done: true };

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
