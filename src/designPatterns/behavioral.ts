// Chain of command
{
  interface IMiddleware {
    next(mid: IMiddleware): IMiddleware;
    handle(request: any): any;
  }

  abstract class AbstractMiddleware implements IMiddleware {
    private nextMiddleware: IMiddleware;

    public next(mid: IMiddleware): IMiddleware {
      this.nextMiddleware = mid;
      return mid;
    }

    handle(request: any) {
      if (this.nextMiddleware) {
        return this.nextMiddleware.handle(request);
      }
    }
  }

  class AuthMiddleware extends AbstractMiddleware {
    override handle(request: any) {
      console.log('AuthMiddleware');

      if (request.userId === 1) {
        return super.handle(request);
      }

      return { errorMessage: 'Unauthorized' };
    }
  }

  class ValidationMiddleware extends AbstractMiddleware {
    override handle(request: any) {
      console.log('ValidationMiddleware');

      if (request.body) {
        return super.handle(request);
      }

      return { errorMessage: 'Body not found' };
    }
  }

  class Controller extends AbstractMiddleware {
    override handle(request: any) {
      console.log('Controller');

      return { success: request };
    }
  }

  const controller = new Controller();
  const validate = new ValidationMiddleware();
  const auth = new AuthMiddleware();

  auth.next(validate).next(controller);

  console.log(auth.handle({ userId: 1, body: {} }));
}

// Mediator
{
  interface IMediator {
    notify(senderName: string, event: string): void;
  }

  abstract class Mediated {
    protected mediator: IMediator;
    setMediator(mediator: IMediator) {
      this.mediator = mediator;
    }
  }

  class Notifications {
    send() {
      console.log('Отправляю уведомление');
    }
  }

  class Log {
    log(message: string) {
      console.log(message);
    }
  }

  class EventHandler extends Mediated {
    myEvent() {
      this.mediator.notify('EventHandler', 'myEvent');
    }
  }

  class NotificationsMediator implements IMediator {
    constructor(
      public notifications: Notifications,
      public logger: Log,
      public eventHandler: EventHandler,
    ) {}

    notify(senderName: string, event: string): void {
      switch (event) {
        case 'myEvent':
          this.notifications.send();
          this.logger.log('Sended');
          break;
      }
    }
  }

  const handler = new EventHandler();
  const logger = new Log();
  const notifications = new Notifications();

  const med = new NotificationsMediator(notifications, logger, handler);
  handler.setMediator(med);

  handler.myEvent();
}

// Strategy
{
  class User {
    githubToken: string;
    jwtToken: string;
  }

  interface IAuthStrategy {
    auth(user: User): boolean;
  }

  class AuthUser {
    constructor(private strategy: IAuthStrategy) {}

    setStrategy(strategy: IAuthStrategy) {
      this.strategy = strategy;
    }

    public authUser(user: User): boolean {
      return this.strategy.auth(user);
    }
  }

  class JWTStrategy implements IAuthStrategy {
    auth(user: User): boolean {
      return !!user.jwtToken;
    }
  }

  class GitHubStrategy implements IAuthStrategy {
    auth(user: User): boolean {
      return !!user.githubToken && typeof user.githubToken === 'string';
    }
  }

  const user = new User();
  user.githubToken = '123';
  user.jwtToken = '123';

  const auth = new AuthUser(new JWTStrategy());
  auth.authUser(user);
  auth.setStrategy(new GitHubStrategy());
  auth.authUser(user);
}

// Observer
{
  interface ISubject {
    attach(observer: IObserver): void;
    detach(observer: IObserver): void;
    notify(reason: string): void;
  }
  interface IObserver {
    update(subject: ISubject, reason: string): void;
  }

  class Lead {
    constructor(
      public name: string,
      public phone: string,
    ) {}
  }

  class NewLead implements ISubject {
    private observers: IObserver[] = [];
    public state: Lead;

    attach(observer: IObserver): void {
      if (this.observers.includes(observer)) {
        return;
      }

      this.observers.push(observer);
    }
    detach(observer: IObserver): void {
      this.observers = this.observers.filter((o) => o !== observer);
    }
    notify(reason: string = ''): void {
      for (const observer of this.observers) {
        observer.update(this, reason);
      }
    }
  }

  class NotificationService implements IObserver {
    update(subject: ISubject, reason: string): void {
      console.log(`NotificationService received notice ${reason}`);
      console.log(subject);
    }
  }

  class LeadService implements IObserver {
    update(subject: ISubject, reason: string): void {
      console.log(`LeadService received notice ${reason}`);
      console.log(subject);
    }
  }

  const subject = new NewLead();
  subject.state = new Lead('Vad', '123132321');

  const s1 = new NotificationService();
  const s2 = new LeadService();

  subject.attach(s1);
  subject.attach(s2);
  subject.notify('What?');
}
