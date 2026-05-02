// Partial, Readonly, Required
{
  interface IUser {
    name: string;
    age?: number;
    email: string;
  }

  type PartialUser = Partial<IUser>;
  type RequiredUser = Required<IUser>;
  type ReadonlyUser = Readonly<IUser>;
  type RequiredReadonlyUser = Required<Readonly<IUser>>;

  const pUser: PartialUser = {};

  const rqUser: RequiredUser = {
    name: '',
    age: 0,
    email: '',
  };

  const rqRonUser: RequiredReadonlyUser = {
    name: '',
    age: 0,
    email: '',
  };
}

// Pick, Omit, Exclude, Extract
{
  interface PaymentPersistent {
    id: number;
    sum: number;
    from: string;
    to: string;
  }

  type Payment = Omit<PaymentPersistent, 'id'>;
  type PaymentRequisites = Pick<PaymentPersistent, 'from' | 'to'>;

  // взять из union только те которые расширяют string
  type ExtractEx = Extract<'from' | 'to' | Payment, string>;

  // взять из union только те которые НЕ расширяют string
  type ExcludeEx = Exclude<'from' | 'to' | Payment, string>;
}

// ReturnType, Parameters, ConstructorParameters
{
  class User {
    constructor(
      public id: number,
      public name: string,
    ) {}
  }

  function getData(id: number): User {
    return new User(1, 'Вася');
  }

  type RT = ReturnType<typeof getData>;
  type RT2 = ReturnType<() => void>;
  type RT3 = ReturnType<<T>() => T>; // unknown
  type RT4 = ReturnType<<T extends string>() => T>; // string

  type PT = Parameters<typeof getData>;
  type FirstPT = PT[0];

  type CP = ConstructorParameters<typeof User>;
  type IT = InstanceType<typeof User>;
}

// Awaited
{
  type A = Awaited<Promise<string>>;
  type A2 = Awaited<Promise<Promise<string>>>;

  interface IMenu {
    name: string;
    url: string;
  }

  async function getMenu(): Promise<IMenu[]> {
    return [{ name: '123', url: '123/' }];
  }

  type R = Awaited<ReturnType<typeof getMenu>>;

  async function getArray<T>(params: T) {
    // Promise<Awaited<T>[]>
    return [await params];
  }
}
