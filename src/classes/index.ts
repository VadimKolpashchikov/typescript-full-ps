// Classes
{
  class User {
    name: string;

    constructor(name: string) {
      this.name = name;
    }
  }

  const user = new User('John');
  console.log(user);
  user.name = '123';
  console.log(user);

  class Admin {
    role: number;
    // role1!: number;
  }

  const admin = new Admin();
  admin.role = 1;
}

// Constructor
{
  class User {
    name: string;
    age: number;

    constructor();
    constructor(name: string);
    constructor(age: number);
    constructor(name: string, age: number);
    constructor(nameOrAge?: string | number, age?: number) {
      if (typeof nameOrAge === 'string') {
        this.name = nameOrAge;

        if (typeof age === 'number') {
          this.age = age;
        }
      } else if (typeof nameOrAge === 'number') {
        this.age = nameOrAge;
      }
    }
  }

  const user = new User('John');
  const user2 = new User();
  const user3 = new User(29);
  const user4 = new User('John', 29);
}

//Class methods
{
  enum PaymentStatus {
    Holden = 1,
    Processed,
    Reversed,
  }

  class Payment {
    id: number;
    status: PaymentStatus = PaymentStatus.Holden;
    createdAt: Date = new Date();
    updatedAt: Date;

    constructor(id: number) {
      this.id = id;
    }

    getPaymentLifeTime(): number {
      return new Date().getTime() - this.createdAt.getTime();
    }

    onUpdate(): void {
      this.updatedAt = new Date();
    }

    reverse(): void {
      if (this.status === PaymentStatus.Processed) {
        throw new Error('Платёж не может быть возвращён');
      }

      this.status = PaymentStatus.Reversed;
      this.onUpdate();
    }
  }

  const payment = new Payment(1);
  payment.reverse();
  console.log(payment);

  const paymentLifeTime = payment.getPaymentLifeTime();
  console.log(paymentLifeTime);

  class User {
    skills: string[] = [];

    addSkill(skills: string): this;
    addSkill(skills: string[]): this;
    addSkill(skills: string | string[]): this {
      if (Array.isArray(skills)) {
        this.skills = [...this.skills, ...skills];
      } else if (typeof skills === 'string') {
        this.skills.push(skills);
      }

      return this;
    }
  }
}

// Getter/Setter
{
  class User {
    _login: string;
    password: string;

    set login(value: string) {
      this._login = `user-${value}`;
    }

    get login(): string {
      return this._login ?? 'no_login';
    }
  }

  const user = new User();
  user.login = 'John';
  console.log(user);
}

// Implements
{
  interface ILogger {
    log(...args: unknown[]): void;
    error(...args: unknown[]): void;
  }

  class Logger implements ILogger {
    log(...args: unknown[]): void {
      console.log(...args);
    }

    async error(...args: unknown[]): Promise<void> {
      console.log(...args);
      return new Promise(() => {});
    }
  }

  interface IPayable {
    price?: number;
    pay(paymentId: number): void;
  }

  interface IDeletable {
    delete(): void;
  }

  class User implements IPayable, IDeletable {
    delete(): void {
      throw new Error('Method not implemented.');
    }
    pay(paymentId: number | string): void {
      throw new Error('Method not implemented.');
    }
  }
}

// Extends
{
  type PaymentStatus = 'new' | 'paid';
  class Payment {
    id: number;
    status: PaymentStatus = 'new';

    constructor(id: number) {
      this.id = id;
    }

    pay(): boolean {
      if (this.status === 'new') {
        this.status = 'paid';
        return true;
      }

      return false;
    }
  }

  class PersistedPayment extends Payment {
    databaseId: number;
    paidAt: Date;

    constructor() {
      const id = Math.random();
      super(id);
    }

    save(): void {}

    override pay(date?: Date): boolean {
      const payResult = super.pay();

      if (payResult && date) {
        this.paidAt = date;
      }

      return payResult;
    }
  }

  class User {
    name: string = 'user';

    constructor() {
      console.log(this.name);
    }
  }

  class Admin extends User {
    name: string = 'admin';

    constructor() {
      super();
      console.log(this.name);
    }
  }
  const admin = new Admin();

  class HttpError extends Error {
    code: number;

    constructor(message: string, code: number) {
      super(message);
      this.code = code ?? 500;
    }
  }
}

// Extends vs Compositions
{
  class User {
    name: string;

    constructor(name: string) {
      this.name = name;
    }
  }

  // BAD: необходимо переопределять утилитарные методы для работы
  // class Users extends Array<User> {
  //   searchByName(name: string): User[] {
  //     return this.filter((user) => user.name === name);
  //   }

  //   override toString(): string {
  //     return this.map((user) => user.name).join(', ');
  //   }
  // }

  // const users = new Users();
  // users.push(new User('John'));
  // users.push(new User('John2'));
  // console.log(users.toString());

  class UserList {
    users: User[] = [];

    push(user: User): number {
      this.users.push(user);
      return this.users.length;
    }
  }

  class Payment {
    date: Date;
  }
  // // BAD: Нарушение доменной области
  // class UserWithPayments extends Payment {
  //   name: string;
  // }

  class UserWithPayments2 {
    user: User;
    payment: Payment;

    constructor(user: User, payment: Payment) {
      this.user = user;
      this.payment = payment;
    }
  }
}
