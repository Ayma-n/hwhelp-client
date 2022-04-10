export interface PersonQueue {
    firstName: string,
    lastName: string,
    role: string,
    university: string
  }
  
 export interface StudentQueue extends PersonQueue {
    request: string;
  }
  
  export interface TutorQueue extends PersonQueue {
    expertise: string;
  }