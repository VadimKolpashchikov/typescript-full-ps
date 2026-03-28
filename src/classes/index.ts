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

