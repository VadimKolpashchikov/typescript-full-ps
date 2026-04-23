type RecordKeysType = string | number | symbol;

function swapKeysAndValues<A extends RecordKeysType, B extends RecordKeysType>(
  obj: Record<A, B>,
): Record<B, A> {
  return Object.fromEntries(
    Object.entries(obj).map(([key, value]) => [value, key]),
  );
}

const testObj = { a: 'b', c: 'd' };

console.log(swapKeysAndValues(testObj));
