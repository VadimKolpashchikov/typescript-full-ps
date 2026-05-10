class User {
  @allowFunc((a: number) => a > 0)
  age: number = 30;
}

function allowFunc(validatorFn: (...args: any[]) => boolean) {
  return function (target: Object, propertyKey: string) {
    Object.defineProperty(target, propertyKey, {
      set(newValue: any) {
        if (validatorFn(newValue)) {
          this[`_${propertyKey}`] = newValue;
        } else {
          console.log(`Unable to set invalid value: ${newValue}`);
        }
      },
      get() {
        return this[`_${propertyKey}`];
      },
    });
  };
}

const person = new User();
console.log(person.age);

person.age = 0;
console.log(person.age);

person.age = 20;
console.log(person.age);
