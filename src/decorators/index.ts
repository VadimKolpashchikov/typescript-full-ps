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
    // console.log(`Users: ${obj.usersCount}`);

    return obj;
  }

  // console.log(new UserService().getUsersCount());
  // console.log(nullUser(new UserService()).getUsersCount());
  // console.log(logUsersCount(nullUser(new UserService())).getUsersCount());
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

  // console.log(new UserService().getUsersCount());
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

  // console.log(new UserService().getUsersCount());
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

  // console.log((new UserService() as IUserService & CreatedAt).createdAt);
}

// Method decorators
{
  interface IUserService {
    usersCount: number;
    getUsersCount(): number;
  }

  class UserService implements IUserService {
    usersCount: number = 1000;

    // @Log
    @Catch({ rethrow: false })
    getUsersCount(): number {
      throw new Error('Ошибочка!');
    }
  }

  function Log<This, Args extends any[], Return extends number>(
    target: (this: This, ...args: Args) => Return,
    context: ClassMethodDecoratorContext<
      This,
      (this: This, ...args: Args) => Return
    >,
  ): (this: This, ...args: Args) => number {
    // console.log(context.name);

    return function (this: This, ...args: Args) {
      return 123;
    };
  }

  function Catch(
    { rethrow }: { rethrow: boolean } = { rethrow: false },
  ): Function {
    return function <This, Args extends any[], Return>(
      target: (this: This, ...args: Args) => Return,
      context: ClassMethodDecoratorContext<
        This,
        (this: This, ...args: Args) => Return
      >,
    ): (this: This, ...args: Args) => Return | undefined | void {
      return function (this: This, ...args: Args) {
        try {
          return target.apply(this, args);
        } catch (e) {
          if (e instanceof Error) {
            // console.log('Опа, ошибочка из декоратора: ' + e.message);

            if (rethrow) {
              throw e;
            }
          }
        }
      };
    };
  }

  // console.log(new UserService().getUsersCount());
}

// Property decorators
{
  interface IUserService {
    usersCount: number;
    getUsersCount(): number;
  }

  class UserService implements IUserService {
    @Max(100)
    accessor usersCount: number = 0;

    getUsersCount(): number {
      return this.usersCount;
    }
  }

  function Max(max: number) {
    return function <This, Value extends number>(
      target: ClassAccessorDecoratorTarget<This, Value>,
      context: ClassAccessorDecoratorContext<This, Value>,
    ): ClassAccessorDecoratorResult<This, Value> {
      return {
        get(this: This): Value {
          // console.log(`Чтение свойства ${String(context.name)}`);
          return target.get.call(this);
        },
        set(this: This, value: Value) {
          if (value > max) {
            // console.log(
            //   `Нельзя установить значение больше ${max}. Установлено: ${max}`,
            // );
            target.set.call(this, max as Value);
          } else {
            target.set.call(this, value);
          }
        },
      };
    };
  }
  const service = new UserService();
  service.usersCount = 1000;
  // console.log(service.usersCount);
  service.usersCount = 10;
  // console.log(service.usersCount);
}

// Decorator order
{
  function Uni(name: string): any {
    // console.log(`Initialization ${name}`);
    return function () {
      // console.log(`Call ${name}`);
    };
  }

  @Uni('class')
  class MyClass {
    @Uni('property')
    prop?: any;

    @Uni('static property')
    static prop2?: any;

    @Uni('static method')
    static method(_: any) {}

    @Uni('method')
    method(_: any) {}

    constructor(_: any) {}
  }
}

// Decorators >5.x.x
{
  @ClassDec
  class Demo {
    // @MethodDec
    @Max(10)
    exec(a: number) {
      console.log(a);
    }
  }

  function MethodDec<This, Args extends any[], Return>(
    target: (this: This, ...args: Args) => Return,
    context: ClassMethodDecoratorContext<
      This,
      (this: This, ...args: Args) => Return
    >,
  ) {
    return function (this: This, ...args: Args): Return {
      const res = target.apply(this, args);

      return res;
    };
  }

  function Max(num: number) {
    return function <This, Args extends any[], Return>(
      target: (this: This, ...args: Args) => Return,
      context: ClassMethodDecoratorContext<
        This,
        (this: This, ...args: Args) => Return
      >,
    ) {
      return function (this: This, ...args: Args): Return {
        if (args[0] > num) {
          throw new Error(`Значение не может быть больше ${num}`);
        }
        const res = target.apply(this, args);

        return res;
      };
    };
  }

  function ClassDec<This, Args extends any[]>(
    target: new (...args: Args) => This,
    context: ClassDecoratorContext<new (...args: Args) => This>,
  ) {}

  const demo = new Demo();
  demo.exec(123);
}
