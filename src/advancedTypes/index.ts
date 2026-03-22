// Union
{
  const arr: (number | string)[] = [1, '2', 3];

  function logId(id: number | string | boolean): void {
    if (typeof id === 'string') {
      console.log(id.toLowerCase());
    } else if (typeof id === 'number') {
      console.log(id.toFixed(2));
    } else {
      console.log(id);
    }
  }

  function logError(err: string | string[]) {
    if (Array.isArray(err)) {
      console.log(err);
    } else {
      console.log(err);
    }
  }

  function logObject(obj: { a: number } | { b: number }) {
    if ('a' in obj) {
      console.log(obj.a);
    } else {
      console.log(obj.b);
    }
  }

  function logMultiplyId(a: string | number, b: number | boolean) {
    if (a === b) {
      console.log(a.toFixed(2), b.toFixed(1));
    }
  }
}

// Literal Types
{
  async function fetchWithAuth(
    url: string,
    method: 'GET' | 'POST' = 'GET',
  ): Promise<1 | -1> {
    await fetch(url, {
      method,
    });

    return 1;
  }

  fetchWithAuth('sssd/sdds/dssd', 'POST');

  // let a: '123' = '123';
  // a = '1234' error

  // let method = 'POST';
  //  fetchWithAuth('sssd/sdds/dssd', method as 'POST'); осторожно let method может поменяться
}

// Type Aliases
{
  type HttpMethod = 'GET' | 'POST';

  async function fetchWithAuth(
    url: string,
    method: HttpMethod = 'GET',
  ): Promise<1 | -1> {
    await fetch(url, {
      method,
    });

    return 1;
  }

  type User = {
    name: string;
    age: number;
    skills: string[];
  };

  type Role = {
    id: number;
  };

  type UserWithRole = User & Role;

  type CompositionUser = {
    user: User;
    role: Role;
  };

  const user: UserWithRole = {
    id: 1,
    name: '',
    age: 0,
    skills: ['1', '2'],
  };
}

// Interface
{
  interface IUser {
    name: string;
    age: number;
    skills: string[];

    log: (id: number) => string;
  }

  type User2 = {
    name: string;
    age: number;
    skills: string[];

    log: (id: number) => string;
  };

  interface IRole {
    roleId: number;
  }

  interface IUserWithRole extends IUser, IRole {
    createdAt: Date;
  }

  const user: IUserWithRole = {
    roleId: 1,
    name: '',
    age: 0,
    skills: ['1', '2'],
    createdAt: new Date(),
    log(id: number): string {
      return `${id}`;
    },
  };

  interface IUserDictionary {
    [id: number]: IUser;
  }

  type UserDictionary2 = {
    [id: string]: IUser;
  };

  const userDict: IUserDictionary = {
    1: user,
    2: user,
  };
}

// Types vs Interfaces
{
  interface IUser {
    name: string;
  }
  interface IUser {
    age: number;
  }
  // Доопределение
  const user: IUser = {
    name: '',
    age: 0,
  };

  // union и intersection только у type
  type ID = string | number;
}

// Optional
{
  interface IUser {
    login: string;
    password?: string;
  }

  const user: IUser = {
    login: '',
  };

  // в параметах функции эквивалентно:  ... | undefined
  function multiply(first: number, second?: number): number {
    if (!second) {
      return first * first;
    }

    return first * second;
  }

  interface IUserPro {
    login: string;
    password?: {
      type: 'primary' | 'secondary';
    };
  }

  function testPass(user: IUserPro) {
    const t = user.password?.type;
  }

  function test(param?: string) {
    const t = param ?? multiply(5);
  }
}

// typing server response
{
  interface IPayment {
    sum: number;
    from: number;
    to: number;
  }

  enum PaymentStatus {
    Success = 'success',
    Failed = 'failed',
  }

  interface IPaymentResponseData extends IPayment {
    databaseId: number;
  }

  interface IPaymentResponseSuccess {
    status: PaymentStatus.Success;
    data: IPaymentResponseData;
  }

  interface IPaymentResponseFailed {
    status: PaymentStatus.Failed;
    data: {
      errorMessage: string;
      errorCode: string;
    };
  }
}

// Void
{
  // Игнорируем возвращаемое значение
  function logId(id: string | number): void {
    console.log(id);
  }

  function multiply(first: number, second?: number): number | undefined {
    if (!second) {
      return first * first;
    }
  }

  type voidFunc = () => void;

  const f1: voidFunc = () => {};

  const skills = ['Dev', 'DevOps'];

  const user = {
    s: ['s'],
  };

  skills.forEach((skill) => user.s.push(skill));
}

// Unknown
{
  let input: unknown;
  input = 1; // unknown
  console.log(input);
  input = 2; // unknown

  // const a: string = input; // error

  function run(i: unknown) {
    if (typeof i === 'number') {
      i += 1;
      console.log(i);
    } else {
      console.log(i); // unknown
    }
  }

  run(input);

  async function getData() {
    try {
      fetch('123/456/');
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  }

  type U1 = unknown | null; // unknown
  type U2 = unknown | string; // unknown

  type I1 = unknown & string; // string
  type I2 = unknown & null; // null
}

// Never
{
  function generateError(message: string): never {
    throw new Error(message);
  }

  function dumpError(): never {
    let a = 1;
    while (true) {
      a = 1;
    }
  }

  function rec(): never {
    return rec();
  }

  // const a: never = undefined // error
  // const b: void = undefined // ok

  type paymentAction = 'refund' | 'pay';

  function proccesAction(action: paymentAction): void {
    switch (action) {
      case 'refund':
        break;
      case 'pay':
        break;
      default:
        // eslint-disable-next-line no-case-declarations
        const _: never = action;
        return _;
    }
  }

  function isString(x: string | number): boolean {
    if (typeof x === 'string') {
      return true;
    } else if (typeof x === 'number') {
      return false;
    }

    generateError('error');
  }
}

// Null
{
  const nn: null = null;
  const nn1: null = null;
  // const nn2: number = null; // error

  interface IUser {
    name: string;
  }

  function getUser(): IUser | null {
    if (Math.random() > 0.5) {
      return null;
    } else {
      return { name: 'John' };
    }
  }

  const user = getUser();
  if (user) {
    console.log(user.name);
  }
}

// Приведение типов
{
  const a = 5;
  const b: string = a.toString();
  // const e: string = new String(a); // error String
  const e: string = new String(a).valueOf();

  const c = '21312';
  const d: number = parseInt(c);

  interface IUser {
    name: string;
    email: string;
    login: string;
  }

  const user: IUser = {
    name: '',
    email: '',
    login: '',
  };

  interface IAdmin {
    name: string;
    role: number;
  }

  // const admin: IAdmin = { ...user, role: 1 }; // Будут поля только от IAdmin  видны ts

  function userToAdmin(user: IUser): IAdmin {
    return {
      name: user.name,
      role: 1,
    };
  }
}

// Type Guards
{
  interface IUser {
    name: string;
    email: string;
    login: string;
  }

  const user: IUser = {
    name: '',
    email: '',
    login: '',
  };

  interface IAdmin {
    name: string;
    role: number;
  }

  function logId(id: string | number) {
    if (isString(id)) {
      console.log(id);
    } else if (typeof id === 'number') {
      console.log(id);
    }
  }

  function isString(x: string | number): x is string {
    return typeof x === 'string';
  }

  function isAdmin(user: IUser | IAdmin): user is IAdmin {
    return 'role' in user;
  }

  function isAdmin2(user: IUser | IAdmin): user is IAdmin {
    return (user as IAdmin).role !== undefined;
  }

  function setRoleZero(user: IUser | IAdmin) {
    if (isAdmin(user)) {
      user.role = 0;
    } else {
      console.log(user);
      throw new Error('Пользователь не админ');
    }
  }
}

// Asserts
{
  interface IUser {
    name: string;
  }

  const a = {};
  assertUser(a);
  a.name = 'newName';

  function assertUser(user: unknown): asserts user is IUser {
    if (typeof user === 'object' && !!user && 'name' in user) {
      return;
    }
    throw new Error('Это не пользователь');
  }
}
