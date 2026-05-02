// Decorator pattern
{
  interface IUserService {
    usersCount: number;
    getUsersCount(): number;
  }

  class UserService implements IUserService {
    usersCount: number = 1000;

    getUsersCount(): number {
      return this.usersCount;
    }
  }

  function nullUser(obj: IUserService) {
    obj.usersCount = 0;

    return obj;
  }

  function logUsersCount(obj: IUserService) {
    console.log(`Users: ${obj.usersCount}`);

    return obj;
  }

  console.log(new UserService().getUsersCount());
  console.log(nullUser(new UserService()).getUsersCount());
  console.log(logUsersCount(nullUser(new UserService())).getUsersCount());
}

// Class decorators
{
  interface IUserService {
    usersCount: number;
    getUsersCount(): number;
  }

  @nullUser
  @fiveUserAdvanced
  class UserService implements IUserService {
    usersCount: number = 1000;

    getUsersCount(): number {
      return this.usersCount;
    }
  }

  function nullUser(target: Function) {
    target.prototype.usersCount = 0;
  }

  function fiveUserAdvanced<T extends { new (...args: any[]): {} }>(
    constructor: T,
  ) {
    return class extends constructor {
      usersCount: number = 5;
    };
  }

  console.log(new UserService().getUsersCount());
}

// Decorator factory
{
  interface IUserService {
    usersCount: number;
    getUsersCount(): number;
  }

  @setUser(23)
  @setUserAdvanced(555)
  class UserService implements IUserService {
    usersCount: number;

    getUsersCount(): number {
      return this.usersCount;
    }
  }

  function setUser(count: number) {
    return (target: Function) => {
      target.prototype.usersCount = count;
    };
  }

  function setUserAdvanced(count: number) {
    return <T extends { new (...args: any[]): {} }>(constructor: T) => {
      return class extends constructor {
        usersCount = count;
      };
    };
  }

  console.log(new UserService().getUsersCount());
}

// Class decorators TEST
{
  interface IUserService {
    usersCount: number;
    getUsersCount(): number;
  }

  @CreatedAt
  class UserService implements IUserService {
    usersCount: number = 1000;

    getUsersCount(): number {
      return this.usersCount;
    }
  }

  type CreatedAt = {
    createdAt: Date;
  };

  function CreatedAt<T extends { new (...args: any[]): {} }>(constructor: T) {
    return class extends constructor {
      createdAt: Date = new Date();
    };
  }

  console.log((new UserService() as IUserService & CreatedAt).createdAt);
}

// Method decorators
{
}
