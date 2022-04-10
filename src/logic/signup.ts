import { db } from "../FirebaseInit";
import { useAuth } from "../contexts/AuthContext";
import { useDb } from "../contexts/DatabaseContext";

export function signupForm() {
  const { createUser } = useDb();
  const { userInfo } = useAuth();
  const currentUser = userInfo?.currentUser;
  const firstName = currentUser.displayName.split(" ")[0];
  const lastName = currentUser.displayName.split(" ")[1];
  const email = currentUser.email;

  document.querySelector("#signup-form")?.addEventListener("submit", (e) => {
    e.preventDefault();

    const school = (<HTMLInputElement>document.querySelector("#school-form")).value;
    const role = (<HTMLInputElement>document.querySelector("#radio-form")).value;

    // add data to firestore
    createUser({
      email: email,
      firstName: firstName,
      lastName: lastName,
      university: school,
      role: role,
    });
  });
}
