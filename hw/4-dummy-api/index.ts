enum BloodGroup {
  OP = 'O+',
  AP = 'A+',
  BP = 'B+',
  ABP = 'AB+',
  ON = 'O-',
  AN = 'A-',
  BN = 'B-',
  ABN = 'AB-',
}

enum EyeColors {
  Red = 'Red',
  Green = 'Green',
  Blue = 'Blue',
  Hazel = 'Hazel',
  Brown = 'Brown',
  Violet = 'Violet',
  Amber = 'Amber',
  Gray = 'Gray',
}

enum UserRoles {
  Admin = 'admin',
  User = 'user',
  Moderator = 'moderator',
}

type Address = {
  address: string;
  city: string;
  state: string;
  stateCode: string;
  postalCode: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  country: string;
};

type Bank = {
  cardExpire: string;
  cardNumber: string;
  cardType: string;
  currency: string;
  iban: string;
};

type Company = {
  department: string;
  name: string;
  title: string;
  address: Address;
};

type Crypto = {
  coin: string;
  wallet: string;
  network: string;
};

interface IUser {
  id: number;
  firstName: string;
  lastName: string;
  maidenName: string;
  age: number;
  gender: string;
  email: string;
  phone: string;
  username: string;
  password: string;
  birthDate: string;
  image: string;
  bloodGroup: BloodGroup;
  height: number;
  weight: number;
  eyeColor: EyeColors;
  hair: {
    color: string;
    type: string;
  };
  ip: string;
  address: Address;
  macAddress: string;
  university: string;
  bank: Bank;
  company: Company;
  ein: string;
  ssn: string;
  userAgent: string;
  crypto: Crypto;
  role: UserRoles;
}

interface IUsersData {
  users: IUser[];
  total: number;
}

async function fetchData<T>(url: string): Promise<T> {
  try {
    const response: Response = await fetch(url);

    if (!response.ok) {
      throw new Error('Network error');
    }

    return response.json();
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message, {
        cause: error,
      });
    }

    throw new Error(String(error), { cause: error });
  }
}

const userData = await fetchData<IUsersData>('https://dummyjson.com/users');
console.log(userData.users);
