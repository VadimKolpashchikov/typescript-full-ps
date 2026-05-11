import sortBy from 'sort-by';

const users = [
  {
    id: 7,
    name: 'Foo',
    age: '34',
    email: { primary: 'foo@email.com' },
  },
  {
    id: 3,
    name: 'Baz',
    age: '67',
    email: { primary: 'baz@email.com' },
  },
  {
    id: 4,
    name: 'Bar',
    age: '69',
    email: { primary: 'bar@email.com' },
  },
];

const result = [...users].sort(sortBy('name', 'age'));
console.log(result);
