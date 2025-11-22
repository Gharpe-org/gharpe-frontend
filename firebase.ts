// import { initializeApp } from "firebase/app";
// import {
//   getAuth,
//   GoogleAuthProvider,
//   OAuthProvider,
//   RecaptchaVerifier,
//   signInWithPhoneNumber,
//   signInWithPopup,
//   signInWithRedirect,
//   signOut,
//   onAuthStateChanged
// } from "firebase/auth";


// const firebaseConfig = {
//   apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
//   authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN!,
//   projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
//   storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET!,
//   messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID!,
//   appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID!,
//   measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID!,
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);

// // Initialize Firebase Authentication
// export const auth = getAuth(app);

// // Configure auth settings (optional but recommended)
// auth.useDeviceLanguage(); // Use device language for SMS

// // For development: Connect to emulator if needed
// if (process.env.NODE_ENV === 'development' && process.env.NEXT_PUBLIC_USE_AUTH_EMULATOR === 'true') {
//   // Note: You'll need to import connectAuthEmulator
//   // import { connectAuthEmulator } from "firebase/auth";
//   // connectAuthEmulator(auth, "http://localhost:9099");
// }

// // Configure providers
// export const googleProvider = new GoogleAuthProvider();
// googleProvider.setCustomParameters({
//   prompt: 'select_account', // Always show account selection
// });

// export const appleProvider = new OAuthProvider("apple.com");
// // Configure Apple provider for better UX
// appleProvider.addScope('email');
// appleProvider.addScope('name');
// appleProvider.setCustomParameters({
//   // Apple specific parameters
//   locale: 'en', // or dynamic based on user
// });

// // Export common auth methods for easier imports
// export { 
//   RecaptchaVerifier, 
//   signInWithPhoneNumber,
//   signInWithPopup,
//   signInWithRedirect,
//   signOut,
//   onAuthStateChanged,
//   OAuthProvider // Export for potential future use
// };

// // Optional: Export the app instance if needed elsewhere
// export default app;
// lib/firebase.ts
"use client";

import { initializeApp, getApps, getApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  OAuthProvider,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  signInWithPopup,
  signInWithRedirect,
  signOut,
  onAuthStateChanged
} from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN!,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET!,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID!,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID!,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID!,
};

// ⚠️ Prevent SSR / Duplicate init (Important for Vercel)
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Auth instance (client only)
export const auth = getAuth(app);
auth.useDeviceLanguage();

// Providers
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });

export const appleProvider = new OAuthProvider("apple.com");
appleProvider.addScope("email");
appleProvider.addScope("name");

// EXPORT everything needed for AuthProvider
export {
  RecaptchaVerifier,
  signInWithPhoneNumber,
  signInWithPopup,
  signInWithRedirect,
  signOut,
  onAuthStateChanged,
};

export default app;
