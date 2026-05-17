// Bridge
{
  interface IProvider {
    sendMessage(message: string): void;
    connect(config: unknown): void;
    disconnect(): void;
  }

  class TelegramProvider implements IProvider {
    sendMessage(message: string): void {
      console.log(message);
    }
    connect(config: string): void {
      console.log(config);
    }
    disconnect(): void {
      console.log('Disconnected TG');
    }
  }

  class WhatsUpProvider implements IProvider {
    sendMessage(message: string): void {
      console.log(message);
    }
    connect(config: string): void {
      console.log(config);
    }
    disconnect(): void {
      console.log('Disconnected WU');
    }
  }

  class NotificationSender {
    constructor(private provider: IProvider) {}

    send() {
      this.provider.connect('123');
      this.provider.sendMessage('Hello');
      this.provider.disconnect();
    }
  }

  class DelayNotificationSender extends NotificationSender {
    constructor(provider: IProvider) {
      super(provider);
      this.send = this.send.bind(this);
    }

    sendDelayed() {
      console.log('wait 1s...');
      setTimeout(this.send, 1000);
    }
  }

  // const senderTG = new NotificationSender(new TelegramProvider());
  // senderTG.send();
  // const senderWU = new DelayNotificationSender(new WhatsUpProvider());
  // senderWU.sendDelayed();
}

// Facade
{
  class Notify {
    send(template: string, to: string) {
      console.log(`Send ${template} to ${to}`);
    }
  }

  class Log {
    log(message: string) {
      console.log(message);
    }
  }

  class Template {
    private templates = [{ name: 'other', template: '<h1>Шаблончик!</h1>' }];

    getByName(name: string) {
      return this.templates.find((t) => t.name === name);
    }
  }

  class NotificationFacade {
    private notify: Notify;
    private logger: Log;
    private template: Template;

    constructor() {
      this.notify = new Notify();
      this.logger = new Log();
      this.template = new Template();
    }

    send(to: string, templateName: string) {
      const data = this.template.getByName(templateName);

      if (!data) {
        this.logger.log('Template not found');
        return;
      }

      this.notify.send(data.template, to);
      this.logger.log('Template send success');
    }
  }

  // const notificationFacade = new NotificationFacade();

  // notificationFacade.send('123', 'other');
}

// Adapter
{
  class KVDataBase {
    private db: Map<string, string> = new Map();

    save(key: string, value: string) {
      this.db.set(key, value);
    }
  }

  class PersistentDB {
    savePersistent(data: object) {
      console.log(data);
    }
  }

  class PersistentDBAdapter extends KVDataBase {
    constructor(public database: PersistentDB) {
      super();
    }

    override save(key: string, value: string) {
      this.database.savePersistent({ key, value });
    }
  }

  function run(base: KVDataBase) {
    base.save('key', 'value');
  }

  run(new PersistentDBAdapter(new PersistentDB()));
}

// Proxy
{
  interface IPaymentDetail {
    id: number;
    sum: number;
  }

  interface IPaymentApi {
    getPaymentDetails(id: number): IPaymentDetail | null;
  }

  class PaymentApi implements IPaymentApi {
    private data: IPaymentDetail[] = [{ id: 1, sum: 10000 }];

    getPaymentDetails(id: number): IPaymentDetail | null {
      return this.data.find((d) => d.id === id) || null;
    }
  }

  class PaymentAccessProxy implements IPaymentApi {
    constructor(
      private api: IPaymentApi,
      private userId: number,
    ) {}

    getPaymentDetails(id: number): IPaymentDetail | null {
      if (this.userId === 1) {
        return this.api.getPaymentDetails(id);
      }
      console.error('Попытка получения данных платежа!');
      return null;
    }
  }

  const proxy1 = new PaymentAccessProxy(new PaymentApi(), 1);
  console.log(proxy1.getPaymentDetails(1));

  const proxy2 = new PaymentAccessProxy(new PaymentApi(), 3);
  console.log(proxy2.getPaymentDetails(1));
}

// Composite
{
  abstract class DeliveryItem {
    items: DeliveryItem[] = [];

    addItem(item: DeliveryItem) {
      this.items.push(item);
    }

    protected getItemsPrice(): number {
      return this.items.reduce(
        (acc: number, item: DeliveryItem) => acc + item.getPrice(),
        0,
      );
    }

    abstract getPrice(): number;
  }

  class DeliveryShop extends DeliveryItem {
    constructor(private deliveryFee: number) {
      super();
    }

    getPrice(): number {
      return this.getItemsPrice() + this.deliveryFee;
    }
  }

  class Package extends DeliveryItem {
    getPrice(): number {
      return this.getItemsPrice();
    }
  }

  class Product extends DeliveryItem {
    constructor(private price: number) {
      super();
    }

    getPrice(): number {
      return this.price;
    }
  }

  const shop = new DeliveryShop(100);

  shop.addItem(new Product(1000));
  const pack1 = new Package();
  pack1.addItem(new Product(100));
  pack1.addItem(new Product(300));
  shop.addItem(pack1);

  shop.addItem(new Product(555000));
  const pack2 = new Package();
  pack2.addItem(new Product(5000));
  pack2.addItem(new Product(500));
  shop.addItem(pack2);

  console.log(shop.getPrice());
}
