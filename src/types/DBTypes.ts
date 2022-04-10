export interface Person {
  firstName: string | null,
  lastName: string | null,
  email: string | null,
  university: string | null,
  role: string | null,
}

export const nullPerson: Person = {
  firstName: null,
  lastName: null,
  email: null,
  university: null,
  role: null
};

export interface IDBContext {
  createUser: (person: Person) => void,
}

export const nullDBContext: IDBContext = {
  createUser: () => null,
};
