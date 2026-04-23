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

  function toString<T>(value: T): string | undefined {
    if (Array.isArray(value)) {
      return value.toString();
    }

    switch (typeof value) {
      case 'string':
        return value;
      case 'number':
      case 'bigint':
      case 'boolean':
      case 'symbol':
      case 'function':
        return value.toString();
      case 'object':
        return JSON.stringify(value);
      default:
        return undefined;
    }
  }
}

// Using generics in types
{
  function getSplitedHalf<T>(data: Array<T>): Array<T> {
    const end = data.length / 2;

    return data.slice(0, end);
  }

  const split: <T>(data: Array<T>) => Array<T> = getSplitedHalf;

  interface ILogLine<T> {
    timeStamp: Date;
    data: T;
  }

  type LogLineType<T> = {
    timeStamp: Date;
    data: T;
  };

  const logLine: ILogLine<{ a: number }> = {
    timeStamp: new Date(),
    data: {
      a: 1,
    },
  };
}

// Ограничения
{
  class Vehicle {
    run: number;
  }

  class LCV extends Vehicle {
    capacity: number;
  }

  function kmToMiles<T extends Vehicle>(vehicle: T): T {
    vehicle.run = vehicle.run / 1.60934;
    return vehicle;
  }

  const vehicle = kmToMiles(new Vehicle());
  const lcv = kmToMiles(new LCV());
  const anyVehicle = kmToMiles({ run: 100 });

  function logId<T extends string | number, Y>(
    id: T,
    additional: Y,
  ): { id: T; data: Y } {
    console.log(id);
    return {
      id,
      data: additional,
    };
  }

  interface Iid {
    id: number;
  }

  function sortById<T extends Iid>(
    data: Array<T>,
    direction: 'asc' | 'desc' = 'asc',
  ): Array<T> {
    switch (direction) {
      case 'asc':
        return data.sort((a, b) => a.id - b.id);
      default:
        return data.sort((a, b) => b.id - a.id);
    }
  }
}

// Generics в классах
{
  class Resp<D, E> {
    constructor(
      public data?: D,
      public error?: E,
    ) {}
  }

  const resp = new Resp<string, number>('data', 0);
  resp.error;

  class HttpResp<F> extends Resp<string, number> {
    code: F;

    setCode(code: F) {
      this.code = code;
    }
  }

  const resp2 = new HttpResp<string>('data', 0);
}

// Mixins
{
  type Constructor = new (...args: any[]) => {};

  type GConstructor<T = {}> = new (...args: any[]) => T;

  class List {
    constructor(public items: string[]) {}
  }

  class Accordion {
    isOpen: boolean;
  }

  type ListType = GConstructor<List>;
  type AccordionType = GConstructor<Accordion>;

  class ExtendedListClass extends List {
    first(): string | undefined {
      return this.items[0];
    }
  }

  function ExtendedList<TBase extends ListType & AccordionType>(Base: TBase) {
    return class extends Base {
      first(): string | undefined {
        return this.items[0];
      }
    };
  }

  class AccordionList {
    isOpen: boolean;
    constructor(public items: string[]) {}
  }

  const List1 = ExtendedList(AccordionList);
  const list1Instance = new List1(['1', '2']);
  console.log(list1Instance.first());
}
