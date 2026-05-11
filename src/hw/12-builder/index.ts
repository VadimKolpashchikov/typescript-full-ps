class RequestGenerator {
  private method: string = 'GET';
  private url: string = '';
  private body: Record<string, any> = {};
  private headers: Record<string, string> = {};

  public setMethod(method: string): this {
    this.method = method;
    return this;
  }

  public setUrl(url: string): this {
    this.url = url;
    return this;
  }

  public setBody(body: Record<string, any>): this {
    this.body = body;
    return this;
  }

  public setHeaders(headers: typeof this.headers): this {
    this.headers = headers;
    return this;
  }

  public addHeader(key: string, value: string): this {
    this.headers[key] = value;
    return this;
  }

  public exec(): Promise<Response> {
    return fetch(this.url, {
      method: this.method,
      body: JSON.stringify(this.body),
      headers: this.headers,
    });
  }
}
