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
