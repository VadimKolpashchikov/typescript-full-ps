declare module 'sort-by' {
  type KeyType<T> = keyof T | `-${keyof T}`;

  export default function <T>(...keys: KeyType<T>[]): (a: T, b: T) => number;
  export default function <T>(
    ...keys: (KeyType<T> | ((key: string, value: any) => any))[]
  ): (a: T, b: T) => number;
}
