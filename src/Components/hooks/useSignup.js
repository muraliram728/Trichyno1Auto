import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useState } from "react";
import { auth, db } from "../../firebase/config";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

export const useSignup = () => {
  const [error, setError] = useState(null);

  const signup = async ({ fname, lname, email, password,displayName, isAdmin = false, members = "no" , code, mobileNo = "", altMobileNo = "", aadhaarCardNo = "", address = ""}) => {
    setError(null);

    try {
      // Create user in Firebase Auth
      const response = await createUserWithEmailAndPassword(auth, email, password);
      const user = response.user;

      // Update display name in Firebase Auth
      await updateProfile(user, { displayName: `${fname} ${lname}` });

      // Save user details in Firestore
      const docRef = doc(db, "users", user.uid);
      await setDoc(docRef, {
        fname,
        lname,
        email,
        isAdmin : false, // Admin flag
        displayName: displayName,
        members,
        code,
        mobileNo, 
        altMobileNo, 
        aadhaarCardNo,
        address, 
        createdAt: serverTimestamp(), // Server-generated timestamp
      });

      console.log("Saving user details:", {
        fname,
        lname,
        email,
        isAdmin,
        displayName,
        members,
        code,
        mobileNo,
        altMobileNo,
        aadhaarCardNo, // Check the value before saving
        address,
      });
      console.log("User successfully signed up and signed in:", user.uid);
    } catch (err) {
      console.error("Signup error:", err.message);
      setError(err.message);
    }
  };

  return { signup, error };
};
