/* eslint-disable @typescript-eslint/no-unused-vars */

// Использование типов
{
  const revenue: number = 1000;
  const bonus: number = 500;
  const res: number = revenue + bonus;

  console.log(res);

  const s: string = '1000';
  const b: boolean = true;
}

// Типы в функциях
{
  function getFullName(firstName: string, surName: string): string {
    return `${firstName} ${surName}`;
  }

  const getFullNameArrow = (firstName: string, surName: string): string => {
    return `${firstName} ${surName}`;
  };

  // function getFullNameWithoutTS(firstName, surName) {
  //   if (typeof firstName !== 'string' && typeof surName !== 'string') {
  //     return null;
  //   }
  //   return `${firstName} ${surName}`;
  // }
}

// Объекты
{
  function getFullName(user: { firstName: string; surName: string }): string {
    return `${user.firstName} ${user.surName}`;
  }

  const user = {
    firstName: 'John',
    surName: 'Five',
    city: 'Moscow',
    age: 25,
    skills: {
      dev: true,
      devops: true,
    },
  };

  console.log(getFullName(user));

  const info: {
    officeId: number;
    isOpened: boolean;
    contacts: {
      phone: string;
      email: string;
      address: {
        city: string;
      };
    };
  } = {
    officeId: 0,
    isOpened: false,
    contacts: {
      phone: '',
      email: '',
      address: {
        city: '',
      },
    },
  };
}

// Массивы
{
  const skills: string[] = ['html', 'css', 'js'];

  for (const skill of skills) {
    console.log(skill.toUpperCase()); // string
  }

  skills
    .filter((s) => s !== 'css')
    .map((s, i) => i + 1) // number[]
    .reduce((a, b) => a + b);
}

// Tuples
{
  const skill: [string, number] = ['Dev', 1];

  const skillName = skill[0]; // string
  const skillLevel = skill[1]; // number

  // const q = skill[2]; // undefined

  // skill.push('dsgdf'); // ok
  // const q = skill[2]; // undefined

  const [name, level] = skill; // string, number

  const arr: [string, number, ...boolean[]] = ['1', 1, true, false, false];
}

// Readonly
{
  const skill: readonly [string, number] = ['Dev', 1];
  // skill[0] = '123'; // error
  // skill.push('dsgdf'); // error

  const skills: readonly string[] = ['html', 'css', 'js'];
  // skills[0] = '123'; // error
}

// Enums
{
  enum StatusCode {
    SUCCESS = 1,
    IN_PROCESS,
    FAil,
  }

  enum StatusCodeWord {
    SUCCESS = 's',
    IN_PROCESS = 'p',
    FAil = 'f',
  }

  enum StatusCodeHeterogenous {
    SUCCESS = 1,
    IN_PROCESS = 'p',
    FAil = 'f',
  }

  const res = {
    message: 'Успех',
    statusCode: StatusCode.SUCCESS,
  };
  function action(statusCode: StatusCodeHeterogenous) {
    return statusCode;
  }

  action(StatusCodeHeterogenous.FAil);
  action(1);
  // action('p'); // error

  function compute(arg: number): number {
    return arg * 3;
  }

  enum Roles {
    ADMIN = 1,
    USER = compute(ADMIN),
  }
  // function test(x: { USER: number }) {}
  // test(Roles);

  const enum Roles2 {
    // не попадёт в скомпилированный файл
    ADMIN = 1,
    USER = 2,
  }

  const adminCode = Roles2.ADMIN;

  enum ReqStates {
    PUBLISHED = 'published',
    DRAFT = 'draft',
    DELETED = 'deleted',
  }

  type Request = {
    topicId: number;
    status?: ReqStates;
  };

  type Response = {
    question: string;
    answer: string;
    tags: string[];
    likes: number;
    status: ReqStates;
  };

  async function getFaqs(req: Request): Promise<Response[]> {
    const res: globalThis.Response = await fetch('/faqs', {
      method: 'POST',
      body: JSON.stringify(req),
    });
    const data: Response[] = await res.json();
    return data;
  }
}
