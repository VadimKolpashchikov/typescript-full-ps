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

// Visibility of properties and methods
{
  class Vehicle {
    public make: string;

    private damages: string[] = [];
    private _model: string;
    #price: number;

    protected run: number;

    set model(value: string) {
      this._model = value;
    }

    get model(): string {
      return this._model;
    }

    get price(): number {
      return this.#price;
    }

    isPriceEqual(v: Vehicle): boolean {
      return this.#price === v.#price;
    }

    addDamage(damage: string): void {
      this.damages.push(damage);
    }
  }

  new Vehicle().make = '213';

  class EroTrack extends Vehicle {
    setRun(km: number): void {
      this.run = km / 0.621371;
    }
  }

  new Vehicle().isPriceEqual(new EroTrack());
}

// Cart Class
{
  class Product {
    constructor(
      public id: number,
      public name: string,
      public price: number,
    ) {}
  }

  class Delivery {
    constructor(public data: Date) {}
  }

  class HomeDelivery extends Delivery {
    constructor(
      data: Date,
      public address: string,
    ) {
      super(data);
    }
  }

  class PointDelivery extends Delivery {
    constructor(public pointId: number) {
      super(new Date());
    }
  }

  type DeliveryOptions = HomeDelivery | PointDelivery;

  type CartStatus = {
    message: string;
    status: boolean;
  };
  class Cart {
    private products: Product[] = [];
    private delivery: DeliveryOptions;

    public addProduct(product: Product): void {
      this.products.push(product);
    }

    public removeProduct({ id }: Product): void {
      this.products = this.products.filter((product) => product.id !== id);
    }

    public getTotalPrice(): number {
      return this.products.reduce((acc, product) => acc + product.price, 0);
    }

    public setDelivery(delivery: DeliveryOptions) {
      this.delivery = delivery;
    }

    public checkout(): CartStatus {
      let message: string = '';

      if (!this.products.length) {
        message = 'Нет товаров в корзине';
      } else if (!this.delivery) {
        message = 'Не указан способ доставки';
      }

      return {
        message,
        status: !message,
      };
    }
  }
}

// Static
{
  class UserService {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private static db: any;

    static async getUser(id: number) {
      return UserService.db.find();
    }

    createUser(): void {
      UserService.getUser(1231);
    }

    static {
      UserService.db =
        'присваиваю сразу при обработке кода, не могу быть асинхронным';
    }
  }

  // UserService.getUser(1);

  // new UserService().createUser();
}

// this
{
  class Payment {
    private date: Date = new Date();

    getDate(this: Payment): Date {
      return this.date;
    }

    getDateArrow = () => {
      return this.date;
    };
  }

  const payment = new Payment();
  console.log(payment.getDate());

  const user = {
    id: 1,
    paymentDate: payment.getDate,
    paymentDateRight: payment.getDate.bind(payment),
    paymentDateArrow: payment.getDateArrow,
  };

  // user.paymentDate(); // undefined
  user.paymentDateRight(); // 2023-01-01T00:00:00.000Z
  user.paymentDateArrow(); // 2023-01-01T00:00:00.000Z

  class Payment2 extends Payment {
    save() {
      return super.getDate();
    }

    saveArrow() {
      // return super.getDateArrow(); не будет в прототипе, только через this доступно
    }
  }

  console.log(new Payment2().save());
  console.log(new Payment2().save());

  class UserBuilder {
    name: string;

    setName(name: string): this {
      this.name = name;
      return this;
    }

    // чтобы классы отличались должно быть хотя бы одно свойство добавлено в наследованный класс
    isAdmin(): this is AdminBuilder {
      return this instanceof AdminBuilder;
    }
  }

  class AdminBuilder extends UserBuilder {
    roles: string[] = [];
  }

  const userBuilder = new UserBuilder().setName('John');
  const adminBuilder = new AdminBuilder().setName('John2');

  const userOrAdmin: UserBuilder | AdminBuilder = new UserBuilder();

  if (userOrAdmin.isAdmin()) {
    console.log(userOrAdmin); // AdminBuilder
  } else {
    console.log(userOrAdmin); // UserBuilder
  }
}

// Abstract class
{
  abstract class Controller {
    abstract handle(req: unknown): void;

    handleWithLogs(req: unknown): void {
      console.log('Start');
      this.handle(req);
      console.log('End');
    }
  }

  class UserController extends Controller {
    handle(req: unknown): void {
      console.log(req);
    }
  }

  // new Controller() // error
  const c = new UserController();
  c.handleWithLogs('Request');
}

// Abstract Logger test
{
  abstract class Logger {
    abstract log(message: string): void;

    printDate(date: Date = new Date()): void {
      this.log(date.toString());
    }
  }

  class ConsoleLogger extends Logger {
    log(message: string): void {
      console.log(message);
    }

    logWithDate(message: string): void {
      this.printDate();
      this.log(message);
    }
  }

  new ConsoleLogger().logWithDate('123');
}
