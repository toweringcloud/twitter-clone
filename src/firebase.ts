// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: import.meta.env.VITE_API_KEY,
	projectId: import.meta.env.VITE_PROJECT,
	authDomain: `${import.meta.env.VITE_PROJECT}.firebaseapp.com`,
	storageBucket: `${import.meta.env.VITE_PROJECT}.appspot.com`,
	messagingSenderId: "503758695436",
	appId: "1:503758695436:web:4730d658fa003f7fda5229",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
