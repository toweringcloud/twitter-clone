// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyDq3IozZH2o-8gy42OQ3ANlpNOE63aDcM8",
	authDomain: "nwitter-reloaded-6f54d.firebaseapp.com",
	projectId: "nwitter-reloaded-6f54d",
	storageBucket: "nwitter-reloaded-6f54d.appspot.com",
	messagingSenderId: "503758695436",
	appId: "1:503758695436:web:4730d658fa003f7fda5229",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
