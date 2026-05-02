interface IA {
  a: number;
  b: string;
  c: number;
}

interface IB {
  a: number;
  c: boolean;
  d: number;
}

interface IDifference {
  b: string;
}

function difference<
  T extends Record<string, any>,
  K extends Record<string, any>,
  R extends Omit<T, Extract<keyof T, keyof K>>,
>(a: T, b: K): R {
  return Object.fromEntries(
    Object.entries(a).filter(([key]) => !(key in b)),
  ) as R;
}

const a: IA = { a: 5, b: '', c: 123 };
const b: IB = { a: 10, c: true, d: 234 };

const v0: IDifference = difference(a, b);
console.log(v0);
