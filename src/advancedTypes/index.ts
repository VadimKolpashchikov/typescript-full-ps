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
