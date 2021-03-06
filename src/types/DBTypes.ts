export interface Person {
  displayName: string | null,
  email: string | null,
  institution: string | null,
  role: string | null,
  expertise: Array<string> | null,
  uid: string | null
}

export const nullPerson: Person = {
  displayName: null,
  email: null,
  institution: null,
  role: null,
  expertise: null,
  uid: null
};

export interface IDBContext {
  createUser: (person: Person) => void,
  getProfileData: (uid: string) => any,
}

export const nullDBContext: IDBContext = {
  createUser: () => null,
  getProfileData: (uid) => null,
};
