import { initializeApp, getApps, getApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCNegVVe9YszcdacjkjHz72pP-2enP-MeY",
  authDomain: "suiproject-ab361.firebaseapp.com",
  projectId: "suiproject-ab361",
  storageBucket: "suiproject-ab361.firebasestorage.app",
  messagingSenderId: "597736890423",
  appId: "1:597736890423:web:297c52dcf17be87e159fb2"
}

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
const auth = getAuth(app)
const db = getFirestore(app)

export { app, auth, db }
