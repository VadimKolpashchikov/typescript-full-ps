// keyof
{
  interface IUser {
    name: string;
    age: number;
  }

  type UserKeys = keyof IUser;

  const userKeys: UserKeys = 'name';

  function getValue<T, K extends keyof T>(obj: T, key: K): T[K] {
    return obj[key];
  }

  const user: IUser = {
    name: 'John',
    age: 30,
  };

  const userName = getValue(user, 'name'); // 'John

  interface IData {
    group: number;
    name: string;
  }

  const testData: IData[] = [
    { group: 1, name: 'a' },
    { group: 1, name: 'b' },
    { group: 2, name: 'c' },
    { group: 1, name: 'd' },
  ];

  type GroupedData<T> = Record<string, T[]>;

  function groupBy<T extends Record<string | number | symbol, any>>(
    data: T[],
    key: keyof T,
  ): GroupedData<T> {
    return data.reduce<GroupedData<T>>((acc, item) => {
      const groupKey = `${item[key]}`;

      if (!Array.isArray(acc[groupKey])) {
        acc[groupKey] = [];
      }

      acc[groupKey].push(item);

      return acc;
    }, {});
  }

  console.log(groupBy<IData>(testData, 'group'));
}

// typeof
{
  let strOrNum: string | number = '123';

  if (Math.random() > 0.5) {
    strOrNum = 123;
  }

  if (typeof strOrNum === 'string') {
    console.log(strOrNum);
  } else {
    console.log(strOrNum);
  }

  let strOrNum2: typeof strOrNum = '123';

  const user = {
    name: 'John',
  };

  type KeyofUser = keyof typeof user;

  enum Direction {
    UP,
    DOWN,
  }

  type d = keyof typeof Direction;
}

//Indexed Access Types
{
  interface IRole {
    name: string;
  }

  interface IPermission {
    dueDate: Date;
  }

  interface IUser {
    name: string;
    roles: IRole[];
    permissions: IPermission;
  }

  const user: IUser = {
    name: 'John',
    roles: [],
    permissions: {
      dueDate: new Date(),
    },
  };

  const nameUser = user['name'];
  const rolesString = 'roles';

  type rolesType = IUser['roles'];
  type rolesType2 = IUser[typeof rolesString];

  type dueDateType = IUser['permissions']['dueDate'];
  type roleType = IUser['roles'][number];

  const roles = ['admin', 'user', 'super-user'] as const;

  type RoleTypes = (typeof roles)[number];
}

// Conditional Types
{
  const a1: number = Math.random() > 0.5 ? 1 : 0;

  interface HTTPResponse<T extends 'success' | 'error'> {
    code: number;
    data: T extends 'success' ? string : Error;
    additionalData?: T extends 'success' ? string : number;
  }

  const err: HTTPResponse<'error'> = {
    code: 0,
    data: new Error('error'),
  };

  const err2: HTTPResponse<'success'> = {
    code: 0,
    data: '',
  };

  class User {
    id: number;
    name: string;
  }

  class UserPersistence extends User {
    dbUuid: string;
  }

  function getUser(id: number): User;
  function getUser(dbUuid: number): UserPersistence;
  function getUser(dbUuidOrId: string | number): User | UserPersistence {
    if (typeof dbUuidOrId === 'number') {
      return new User();
    }

    return new UserPersistence();
  }

  type UserOrUserPersistence<T extends string | number> = T extends number
    ? User
    : UserPersistence;

  function getUser2<T extends string | number>(
    id: T,
  ): UserOrUserPersistence<T> {
    if (typeof id === 'number') {
      return new User() as UserOrUserPersistence<T>;
    }

    return new UserPersistence() as UserOrUserPersistence<T>;
  }

  const res1 = getUser2(1);
  const res2 = getUser2('1');
}

// Infer
{
  function runTransaction(transaction: { fromTo: [string, string] }) {
    console.log(123);
  }

  type GetFirstArg<T> = T extends (arg1: infer First, ...args: any[]) => any
    ? First
    : never;

  const transaction: GetFirstArg<typeof runTransaction> = {
    fromTo: ['1', '2'],
  };

  runTransaction(transaction);
}

// Mapped Types
{
  enum Modifier {
    READ = 'read',
    UPDATE = 'update',
    CREATE = 'create',
  }

  type UserRoles = {
    customers: Modifier;
    projects?: Modifier;
    adminPanel?: Modifier;
  };

  type ModifierToAccess<Type> = {
    +readonly [Property in keyof Type]-?: boolean;
  };

  type ModifierToAccessAndRename<Type> = {
    +readonly [Property in keyof Type as `canAccess${Capitalize<string & Property>}`]+?: boolean;
  };

  type UserAccess2 = ModifierToAccess<UserRoles>;
  type UserAccessRenamed = ModifierToAccessAndRename<UserRoles>;

  type UserAccess1 = {
    customers?: boolean;
    projects?: boolean;
    adminPanel?: boolean;
  };

  interface IForm {
    name: string;
    password: string;
  }

  const form: IForm = {
    name: 'John',
    password: '123',
  };

  type FormValidation<T> = {
    [Key in keyof T]:
      | {
          isValid: true;
        }
      | {
          isValid: false;
          errorMessage: string;
        };
  };

  const formValidation: FormValidation<IForm> = {
    name: { isValid: true },
    password: { isValid: false, errorMessage: 'Password is required' },
  };
}

// Template Literal Types
{
  type ReadOrWrite = 'read' | 'write';
  type Bulk = 'bulk' | '';

  type Access = `can${Capitalize<ReadOrWrite>}${Capitalize<Bulk>}`;

  type ReadOrWriteBulk<T> = T extends `can${infer R}` ? R : never;

  const t: ReadOrWriteBulk<Access> = 'Read';

  type ErrorOrSuccess = 'success' | 'error';

  interface IResponse {
    result: `http-${ErrorOrSuccess}`;
  }

  const res: IResponse = {
    result: 'http-success',
  };
}
