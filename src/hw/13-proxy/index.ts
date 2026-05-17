import { RequestGenerator } from '../12-builder/index.js';

interface IDummyProductApi {
  getProductById(id: number): Promise<any>;
}

class DummyApi implements IDummyProductApi {
  private requestGenerator: RequestGenerator = new RequestGenerator();

  async getProductById(id: number): Promise<any> {
    const result = await this.requestGenerator
      .setUrl(`https://dummyjson.com/products/${id}/`)
      .exec();

    return result.json();
  }
}

class DummyApiProxy implements IDummyProductApi {
  constructor(private api: IDummyProductApi) {}

  getProductById(id: number): Promise<any> {
    if (id >= 10) {
      throw new Error(
        'It is impossible to obtain product data with id equal to 10 or more',
      );
    }

    return this.api.getProductById(id);
  }
}

const dummyApiProxy = new DummyApiProxy(new DummyApi());
const product8 = await dummyApiProxy.getProductById(8);
console.log(product8);

const product11 = await dummyApiProxy.getProductById(11); // Error
console.log(product11);
