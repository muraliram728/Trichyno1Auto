import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useState } from "react";
import { auth, db } from "../../firebase/config";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

export const useSignup = () => {
  const [error, setError] = useState(null);

  const signup = async ({
    firstName,
    lastName,
    email,
    password,
    displayName,
    isAdmin = false,
    members = "no",
    code,
    mobileNo = "",
    altMobileNo = "",
    aadhaarCardNo = "",
    address = "",
    license,
  }) => {
    setError(null);

    try {
      // Create user in Firebase Auth
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = response.user;

      // Update display name in Firebase Auth
      await updateProfile(user, { displayName: `${firstName} ${lastName}` });

      // Save user details in Firestore
      const docRef = doc(db, "users", user.uid);
      await setDoc(docRef, {
        firstName,
        lastName,
        license,
        email,
        isAdmin: false, // Admin flag
        displayName: displayName,
        members,
        code,
        mobileNo,
        altMobileNo,
        aadhaarCardNo,
        address,
        createdAt: serverTimestamp(), // Server-generated timestamp
      });
      console.log("User successfully signed up and signed in:", user.uid);
    } catch (err) {
      console.error("Signup error:", err.message);
      setError(err.message);
    }
  };

  return { signup, error };
};
