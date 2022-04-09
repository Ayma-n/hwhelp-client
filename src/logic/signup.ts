import {db} from "../FirebaseInit";
import { collection } from 

document.querySelector('#signup-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const email = (<HTMLInputElement>document.querySelector('#email')).value;
    const firstName = (<HTMLInputElement>document.querySelector('#firstName')).value;
    const lastName = (<HTMLInputElement>document.querySelector('#lastName')).value;
    const school = (<HTMLInputElement>document.querySelector('#school')).value;
    const role = (<HTMLInputElement>document.querySelector('#role')).value;
    // add data to firestore
    const collectionName = role === 'student' ? '/students' : '/tutors';
    addDoc(collection(db, collectionName), {
        email,
        firstName,
        lastName,
        school,
    }
}