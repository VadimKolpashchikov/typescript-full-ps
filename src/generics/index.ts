// Internal generics
{
  const a: Array<number> = [1, 2, 3];

  async function test() {
    return new Promise<number>((resolve, reject) => {
      resolve(1);
    });
  }

  const check: Record<string, boolean> = {
    drive: true,
    kpp: false,
  };
}

// Generics and function
{
  function logMiddleware<T extends string | number>(data: T): T {
    console.log(data);
    return data;
  }

  const res = logMiddleware<number>(10);

  function getSplitedHalf<T>(data: Array<T>): Array<T> {
    const end = data.length / 2;

    return data.slice(0, end);
  }

  getSplitedHalf<number>([1, 2, 3]);
}
