// import { db } from "../FirebaseInit";
// import { useAuth } from "../contexts/AuthContext";
// import { useDb } from "../contexts/DatabaseContext";

export function signupForm(useDb: Function, useAuth: Function) {
  const { createUser } = useDb();
  const { userInfo } = useAuth();
  const currentUser = userInfo?.currentUser;
  const displayName = currentUser.displayName.split;
  const email = currentUser.email;

  document.querySelector("#signup-form")?.addEventListener("submit", (e) => {
    e.preventDefault();

    const school = (<HTMLInputElement>document.querySelector("#school-form")).value;
    const role = (<HTMLInputElement>document.querySelector("#radio-form")).value;

    // add data to firestore
    createUser({
      email: email,
      firstName: displayName,
      lastName: lastName,
      university: school,
      role: role,
    });
  });
}
