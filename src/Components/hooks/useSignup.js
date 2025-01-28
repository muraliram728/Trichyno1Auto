import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth, db } from "../../firebase/config";
import { doc, setDoc } from "firebase/firestore";

export const useSignup = () => {
  const [error, setError] = useState(null);

  const signup = ({ fname, lname, email, password, isAdmin = false }) => {
    setError(null);

    createUserWithEmailAndPassword(auth, email, password)
      .then((response) => {
        const user = response.user;
        const docRef = doc(db, "users", user.uid);

        // Save user details in Firestore, including isAdmin flag
        setDoc(docRef, {
          fname,
          lname,
          email,
          isAdmin, // Admin flag
          createdAt: new Date(),
        });

        console.log("User created with UID:", user.uid);
      })
      .catch((error) => {
        console.log(error.message);
        setError(error.message);
      });
  };

  return { signup, error };
};
