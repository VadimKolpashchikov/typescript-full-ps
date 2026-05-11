// Factory
{
  interface IInsurance {
    id: number;
    status: string;
    setVehicle(vehicle: any): void;
    submit(): Promise<boolean>;
  }

  class TFInsurance implements IInsurance {
    id: number;
    status: string;
    private vehicle: any;

    setVehicle(vehicle: any): void {
      this.vehicle = vehicle;
    }
    async submit(): Promise<boolean> {
      const result = await fetch('', {
        method: 'POST',
        body: JSON.stringify({ vehicle: this.vehicle }),
      });

      const data = await result.json();
      return data.isSuccess;
    }
  }

  class ABInsurance implements IInsurance {
    id: number;
    status: string;
    private vehicle: any;

    setVehicle(vehicle: any): void {
      this.vehicle = vehicle;
    }
    async submit(): Promise<boolean> {
      const result = await fetch('', {
        method: 'POST',
        body: JSON.stringify({ vehicle: this.vehicle }),
      });

      const data = await result.json();
      return data.isYes;
    }
  }

  abstract class InsuranceFactory {
    db: any;

    abstract createInsurance(): IInsurance;

    saveHistory(instance: IInsurance): void {
      this.db?.save(instance.id, instance.status);
    }
  }

  class TFInsuranceFactory extends InsuranceFactory {
    createInsurance(): TFInsurance {
      return new TFInsurance();
    }
  }

  class ABInsuranceFactory extends InsuranceFactory {
    createInsurance(): ABInsurance {
      return new ABInsurance();
    }
  }

  const tfInsuranceFactory = new TFInsuranceFactory();
  const tfInsurance1 = tfInsuranceFactory.createInsurance();
  tfInsuranceFactory.saveHistory(tfInsurance1);

  //////////////////////////////////////
  const INSURANCE_TYPE = {
    TF: TFInsurance,
    AB: ABInsurance,
  };

  type InsuranceType = typeof INSURANCE_TYPE;

  class InsuranceFactoryAlternative {
    db: any;

    createInsurance<T extends keyof InsuranceType>(type: T): InsuranceType[T] {
      return INSURANCE_TYPE[type];
    }

    saveHistory(instance: IInsurance): void {
      this.db.save(instance.id, instance.status);
    }
  }

  // const insuranceFactoryAlternative = new InsuranceFactoryAlternative();
  // const tfInsurance2 = new (insuranceFactoryAlternative.createInsurance(
  //   'TF',
  // ))();
}

// Singleton
{
  class MyMap {
    private static instance: MyMap;

    map: Map<number, string> = new Map();

    private constructor() {}

    clean(): void {
      this.map.clear();
    }

    public static getInstance(): MyMap {
      if (!MyMap.instance) {
        MyMap.instance = new MyMap();
      }

      return MyMap.instance;
    }
  }

  class Service1 {
    addMap(key: number, value: string) {
      MyMap.getInstance().map.set(key, value);
    }
  }

  class Service2 {
    getKeys(key: number) {
      return MyMap.getInstance().map.get(key);
    }
  }
}

// Prototype
{
  interface IPrototype<T> {
    clone(): T;
  }

  class UserHistory implements IPrototype<UserHistory> {
    createdAt: Date;

    constructor(
      public email: string,
      public name: string,
    ) {
      this.createdAt = new Date();
    }

    clone(): UserHistory {
      const target = new UserHistory(this.email, this.name);
      target.createdAt = this.createdAt;
      return target;
    }
  }

  // const user = new UserHistory('email', 'name');
  // const user2 = user.clone();
}

// Builder
{
  enum ImageFormat {
    Png = 'png',
    Jpeg = 'jpeg',
  }

  interface IResolution {
    width: number;
    height: number;
  }

  interface IImageConversion extends IResolution {
    format: ImageFormat;
  }

  class ImageBuilder {
    private formats: ImageFormat[] = [];
    private resolutions: IResolution[] = [];

    addPng() {
      if (!this.formats.includes(ImageFormat.Png)) {
        this.formats.push(ImageFormat.Png);
      }
      return this;
    }

    addJpeg() {
      if (!this.formats.includes(ImageFormat.Jpeg)) {
        this.formats.push(ImageFormat.Jpeg);
      }
      return this;
    }

    addResolution(width: number, height: number) {
      this.resolutions.push({ width, height });
      return this;
    }

    build(): IImageConversion[] {
      const result: IImageConversion[] = [];

      this.resolutions.forEach(({ width, height }) => {
        this.formats.forEach((format) => {
          result.push({
            format,
            width,
            height,
          });
        });
      });

      return result;
    }
  }

  console.log(
    new ImageBuilder()
      .addPng()
      .addJpeg()
      .addResolution(100, 100)
      .addResolution(200, 200)
      .build(),
  );
}
