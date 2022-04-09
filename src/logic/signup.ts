import {db} from "../FirebaseInit";
import { useDb } from '../contexts/DatabaseContext';
const { createUser } = useDb();
function signupForm() {
    document.querySelector('#signup-form')?.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = (<HTMLInputElement>document.querySelector('#email')).value;
        const firstName = (<HTMLInputElement>document.querySelector('#firstName')).value;
        const lastName = (<HTMLInputElement>document.querySelector('#lastName')).value;
        const school = (<HTMLInputElement>document.querySelector('#school')).value;
        const role = (<HTMLInputElement>document.querySelector('#role')).value;
        // add data to firestore
        createUser({email: email, firstName: firstName, lastName: lastName, university: school, role: role});
    }
}