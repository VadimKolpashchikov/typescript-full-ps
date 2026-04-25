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
