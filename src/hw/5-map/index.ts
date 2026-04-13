/* eslint-disable @typescript-eslint/no-explicit-any */
class MyHashMap<K, V> {
  private buckets: Array<Array<[K, V]>>;
  private readonly capacity: number = 64;
  private _size: number = 0;

  constructor(entries?: Iterable<[K, V]>) {
    this.buckets = Array.from({ length: this.capacity }, () => []);

    if (entries) {
      for (const [key, value] of entries) {
        this.set(key, value);
      }
    }
  }

  private hash(key: K): number {
    const strKey = String(key);
    let hash = 0;
    for (let i = 0; i < strKey.length; i++) {
      hash = (hash << 5) - hash + strKey.charCodeAt(i);
      hash |= 0;
    }
    return Math.abs(hash) % this.capacity;
  }

  private getBucket(key: K): Array<[K, V]> {
    const index = this.hash(key);
    const bucket = this.buckets[index];

    return bucket as Array<[K, V]>;
  }

  set(key: K, value: V): this {
    const bucket = this.getBucket(key);
    const existingPair = bucket.find(([k]) => k === key);

    if (existingPair) {
      existingPair[1] = value;
    } else {
      bucket.push([key, value]);
      this._size += 1;
    }

    return this;
  }

  get(key: K): V | undefined {
    const bucket = this.getBucket(key);
    const pair = bucket.find(([k]) => k === key);
    return pair ? pair[1] : undefined;
  }

  delete(key: K): boolean {
    const index = this.hash(key);
    const bucket = this.getBucket(key);

    this.buckets[index] = bucket.filter(([k]) => k !== key);

    if (bucket.length > this.buckets[index].length) {
      this._size -= 1;
      return true;
    }

    return false;
  }

  clear() {
    this.buckets = Array.from({ length: this.capacity }, () => []);
    this._size = 0;
  }

  get size(): number {
    return this._size;
  }
}

const testData: Array<[any, any]> = [
  ['key1', 'value1'],
  [123, 123],
  ['key1', 'value1'],
  ['123', 123],
  [5, 'value 5'],
];

const hashMap1 = new MyHashMap(testData);
hashMap1.set(123, 55555);

console.log(hashMap1.get('key1')); // 'value1'
console.log(hashMap1.size); // 4
console.log(hashMap1.get(123)); // 55555
