// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import {
//   auth,
//   googleProvider,
//   appleProvider,
//   RecaptchaVerifier,
//   signInWithPhoneNumber,
// } from "@/firebase";
// import { signInWithPopup } from "firebase/auth";

// declare global {
//   interface Window {
//     recaptchaVerifier: any;
//   }
// }

// const API_URL = process.env.NEXT_PUBLIC_API_URL;

// export default function LoginPage() {
//   const router = useRouter();
//   const [phone, setPhone] = useState("");
//   const [otp, setOtp] = useState("");
//   const [confirmationResult, setConfirmationResult] = useState<any>(null);

//   // 🔹 Google Login
//   const handleGoogleLogin = async () => {
//     if (!API_URL) {
//       alert("API_URL not set. Please check your .env file.");
//       return;
//     }
//     try {
//       const result = await signInWithPopup(auth, googleProvider);
//       const token = await result.user.getIdToken();

//       const response = await fetch(`${API_URL}/auth/verifyToken`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ token }),
//       });

//       if (!response.ok) {
//         console.error("Backend error:", response.status, response.statusText);
//         alert("Backend returned an error. Check console.");
//         return;
//       }

//       const data = await response.json();
//       console.log("Backend verified:", data);
//       alert(`Welcome ${result.user.displayName || "User"}`);
//       router.push("/User/profile"); // ✅ redirect after login
//     } catch (error) {
//       console.error("Login failed:", error);
//       alert("Google sign-in failed");
//     }
//   };

//   // 🔹 Apple Login
//   const handleAppleLogin = async () => {
//     if (!API_URL) {
//       alert("API_URL not set. Please check your .env file.");
//       return;
//     }
//     try {
//       const result = await signInWithPopup(auth, appleProvider);
//       const token = await result.user.getIdToken();

//       await fetch(`${API_URL}/auth/verifyToken`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ token }),
//       });

//       alert(`Welcome ${result.user.displayName || "User"}`);
//       router.push("/User/profile"); // ✅ redirect
//     } catch (error) {
//       console.error(error);
//       alert("Apple sign-in failed");
//     }
//   };

//   // 🔹 Setup reCAPTCHA
// const setupRecaptcha = () => {
//   // 👇 Typecast window for safety
//   const w = window as unknown as {
//     recaptchaVerifier?: any;
//   };

//   // ✅ If already exists, safely try to clear or reset
//   if (w.recaptchaVerifier) {
//     try {
//       if (typeof w.recaptchaVerifier.clear === "function") {
//         w.recaptchaVerifier.clear();
//       }
//     } catch (err) {
//       console.warn("Could not clear existing reCAPTCHA:", err);
//     }
//   }

//   // ✅ Initialize new reCAPTCHA
//   w.recaptchaVerifier = new RecaptchaVerifier(
//     auth, // Firebase Auth instance (must come first in v9)
//     "recaptcha-container", // container ID
//     {
//       size: "invisible",
//       callback: (response: any) => {
//         console.log("✅ reCAPTCHA solved, continuing sign-in...");
//       },
//       "expired-callback": () => {
//         console.warn("⚠️ reCAPTCHA expired, resetting...");
//       },
//     }
//   );
// };




//   // 🔹 Send OTP
//   const formatPhoneNumber = (num: string) => {
//     num = num.trim().replace(/\s/g, "");
//     if (num.startsWith("+")) return num;
//     if (num.startsWith("0")) num = num.slice(1);
//     if (!num.startsWith("+91")) num = "+91" + num;
//     return num;
// };

//     const handlePhoneLogin = async () => {
//   try {
//     setupRecaptcha();
//     const appVerifier = window.recaptchaVerifier;

//     const formattedPhone = formatPhoneNumber(phone);
//     console.log("Formatted Phone:", formattedPhone);

//     if (typeof window !== "undefined") {
//       console.log("Recaptcha verifier:", appVerifier);
//     }

//     // ✅ Validate phone format before calling Firebase
//     if (!/^\+?[1-9]\d{9,14}$/.test(formattedPhone)) {
//       alert("Invalid phone number format.");
//       return;
//     }

//     const confirmation = await signInWithPhoneNumber(auth, formattedPhone, appVerifier);
//     setConfirmationResult(confirmation);
//     alert("OTP sent successfully!");
//   } catch (error) {
//     if (error instanceof Error) {
//       console.error("Failed to send OTP:", error);
//       alert(`Failed to send OTP: ${error.message}`);
//     } else {
//       console.error("Unknown error:", error);
//       alert("An unknown error occurred while sending OTP");
//     }
//   }
// };






//   // 🔹 Verify OTP
//   const verifyOtp = async () => {
//     if (!API_URL) {
//       alert("API_URL not set. Please check your .env file.");
//       return;
//     }
//     try {
//       if (!confirmationResult) return alert("Please request OTP again.");
//       const result = await confirmationResult.confirm(otp);
//       const token = await result.user.getIdToken();

//       await fetch(`${API_URL}/auth/verifyToken`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ token }),
//       });

//       alert(`Welcome ${result.user.phoneNumber}`);
//       router.push("/User/profile"); // ✅ redirect
//     } catch (error) {
//       console.error(error);
//       alert("Invalid OTP");
//     }
//   };

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
//       <h1 className="text-2xl font-bold mb-6">Login / Signup</h1>

//       <button
//         onClick={handleGoogleLogin}
//         className="w-64 mb-3 py-2 bg-red-500 text-white rounded-xl shadow hover:bg-red-600"
//       >
//         Continue with Google
//       </button>

//       <button
//         onClick={handleAppleLogin}
//         className="w-64 mb-3 py-2 bg-black text-white rounded-xl shadow hover:bg-gray-800"
//       >
//         Continue with Apple
//       </button>

//       <div className="my-4 text-gray-500">or</div>

//       <input
//         type="tel"
//         placeholder="+91 9876543210"
//         value={phone}
//         onChange={(e) => setPhone(e.target.value)}
//         className="border w-64 mb-3 p-2 rounded"
//       />

//       <button
//         onClick={handlePhoneLogin}
//         className="w-64 mb-3 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600"
//       >
//         Send OTP
//       </button>

//       {confirmationResult && (
//         <>
//           <input
//             type="text"
//             placeholder="Enter OTP"
//             value={otp}
//             onChange={(e) => setOtp(e.target.value)}
//             className="border w-64 mb-3 p-2 rounded"
//           />
//           <button
//             onClick={verifyOtp}
//             className="w-64 py-2 bg-green-500 text-white rounded-xl hover:bg-green-600"
//           >
//             Verify OTP
//           </button>
//         </>
//       )}

//       <div id="recaptcha-container"></div>
//     </div>
//   );
// }
"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  auth,
  googleProvider,
  appleProvider,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "@/firebase";
import { signInWithPopup } from "firebase/auth";

declare global {
  interface Window {
    recaptchaVerifier: any;
  }
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function LoginPage() {
  const router = useRouter();
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmationResult, setConfirmationResult] = useState<any>(null);
  const [isRecaptchaReady, setIsRecaptchaReady] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const recaptchaContainerRef = useRef<HTMLDivElement>(null);

  // ✅ Initialize reCAPTCHA
  useEffect(() => {
    const initializeRecaptcha = () => {
      if (typeof window === "undefined" || !recaptchaContainerRef.current) {
        console.warn("reCAPTCHA container not ready");
        return;
      }

      try {
        // Clear existing reCAPTCHA
        if (window.recaptchaVerifier) {
          try {
            window.recaptchaVerifier.clear();
          } catch (e) {
            console.warn("Could not clear existing reCAPTCHA:", e);
          }
        }

        console.log("Initializing reCAPTCHA...");
        
        window.recaptchaVerifier = new RecaptchaVerifier(
          auth,
          recaptchaContainerRef.current,
          {
            size: "invisible",
            callback: () => {
              console.log("reCAPTCHA solved ✅");
            },
            "expired-callback": () => {
              console.warn("reCAPTCHA expired");
              setIsRecaptchaReady(false);
            },
          }
        );

        console.log("reCAPTCHA verifier created:", window.recaptchaVerifier);
        setIsRecaptchaReady(true);
        
      } catch (error) {
        console.error("Failed to initialize reCAPTCHA:", error);
        setIsRecaptchaReady(false);
      }
    };

    initializeRecaptcha();
  }, []);

  // 🔹 Google Login
  const handleGoogleLogin = async () => {
    if (!API_URL) {
      alert("API_URL not set. Please check your .env file.");
      return;
    }
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const token = await result.user.getIdToken();

      const response = await fetch(`${API_URL}/auth/verifyToken`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });

      if (!response.ok) {
        console.error("Backend error:", response.status, response.statusText);
        alert("Backend returned an error. Check console.");
        return;
      }

      const data = await response.json();
      console.log("Backend verified:", data);
      alert(`Welcome ${result.user.displayName || "User"}`);
      router.push("/User/profile");
    } catch (error) {
      console.error("Login failed:", error);
      alert("Google sign-in failed");
    }
  };

  // 🔹 Apple Login
  const handleAppleLogin = async () => {
    if (!API_URL) {
      alert("API_URL not set. Please check your .env file.");
      return;
    }
    try {
      const result = await signInWithPopup(auth, appleProvider);
      const token = await result.user.getIdToken();

      await fetch(`${API_URL}/auth/verifyToken`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });

      alert(`Welcome ${result.user.displayName || "User"}`);
      router.push("/User/profile");
    } catch (error) {
      console.error(error);
      alert("Apple sign-in failed");
    }
  };

  const formatPhoneNumber = (num: string) => {
    num = num.trim().replace(/\s/g, "");
    if (num.startsWith("+")) return num;
    if (num.startsWith("0")) num = num.slice(1);
    if (!num.startsWith("+91")) num = "+91" + num;
    return num;
  };

  const handlePhoneLogin = async () => {
    if (isLoading) return;
    
    setIsLoading(true);
    
    try {
      const formattedPhone = formatPhoneNumber(phone);
      console.log("Attempting to send OTP to:", formattedPhone);

      // Validate phone number
      if (!/^\+91[6-9]\d{9}$/.test(formattedPhone)) {
        alert("Please enter a valid Indian phone number (10 digits starting with 6-9)");
        return;
      }

      // Check reCAPTCHA
      if (!window.recaptchaVerifier) {
        alert("Security verification not ready. Please refresh the page.");
        return;
      }

      console.log("reCAPTCHA verifier state:", window.recaptchaVerifier);
      console.log("Auth configuration:", auth.app.options);

      // Attempt to send OTP
      const confirmation = await signInWithPhoneNumber(
        auth, 
        formattedPhone, 
        window.recaptchaVerifier
      );
      
      setConfirmationResult(confirmation);
      alert("OTP sent successfully!");
      
    } catch (error: any) {
      console.error("Full error details:", error);
      console.error("Error code:", error.code);
      console.error("Error message:", error.message);
      
      // Detailed error handling
      switch (error.code) {
        case 'auth/invalid-app-credential':
          alert(`Firebase Configuration Error:\n\n1. Check if your Firebase project has Phone Auth enabled\n2. Verify your app is properly registered in Firebase Console\n3. Ensure your firebaseConfig matches your project\n4. Check if you need to add SHA certificates (for Android)\n\nGo to: Firebase Console → Project Settings → Your Apps`);
          break;
          
        case 'auth/invalid-phone-number':
          alert("Invalid phone number format. Please use a valid Indian number like +91 9876543210");
          break;
          
        case 'auth/too-many-requests':
          alert("Too many attempts. Please try again later.");
          break;
          
        case 'auth/quota-exceeded':
          alert("SMS quota exceeded. This might be a project configuration issue.");
          break;
          
        case 'auth/captcha-check-failed':
          alert("Security check failed. Please refresh and try again.");
          setIsRecaptchaReady(false);
          break;
          
        case 'auth/app-not-authorized':
          alert("Firebase app not authorized. Check your Firebase configuration.");
          break;
          
        case 'auth/app-not-verified':
          alert("Firebase app not verified. Check your app configuration in Firebase Console.");
          break;
          
        default:
          alert(`Authentication failed: ${error.message || "Unknown error"}\n\nCheck browser console for details.`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const verifyOtp = async () => {
    if (!API_URL) return alert("API_URL not configured");
    
    if (!confirmationResult) {
      alert("Please request OTP first.");
      return;
    }

    if (!otp || otp.length !== 6) {
      alert("Please enter a valid 6-digit OTP.");
      return;
    }

    try {
      const result = await confirmationResult.confirm(otp);
      const token = await result.user.getIdToken();

      const response = await fetch(`${API_URL}/auth/verifyToken`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });

      if (!response.ok) {
        throw new Error(`Backend error: ${response.status}`);
      }

      alert(`Welcome ${result.user.phoneNumber}`);
      router.push("/User/profile");
    } catch (error: any) {
      console.error("OTP verification failed:", error);
      
      if (error.code === 'auth/invalid-verification-code') {
        alert("Invalid OTP. Please check the code and try again.");
      } else if (error.code === 'auth/code-expired') {
        alert("OTP has expired. Please request a new one.");
        setConfirmationResult(null);
      } else {
        alert("OTP verification failed. Please try again.");
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
      <h1 className="text-2xl font-bold mb-6">Login / Signup</h1>

      <button
        onClick={handleGoogleLogin}
        className="w-64 mb-3 py-2 bg-red-500 text-white rounded-xl shadow hover:bg-red-600"
      >
        Continue with Google
      </button>

      <button
        onClick={handleAppleLogin}
        className="w-64 mb-3 py-2 bg-black text-white rounded-xl shadow hover:bg-gray-800"
      >
        Continue with Apple
      </button>

      <div className="my-4 text-gray-500">or</div>

      <div className="w-64 mb-4">
        <input
          type="tel"
          placeholder="+91 9876543210"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="border w-full p-2 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <button
        onClick={handlePhoneLogin}
        disabled={!isRecaptchaReady || !phone || isLoading}
        className={`w-64 mb-3 py-2 text-white rounded-xl transition-colors ${
          isRecaptchaReady && phone && !isLoading
            ? 'bg-blue-500 hover:bg-blue-600' 
            : 'bg-blue-300 cursor-not-allowed'
        }`}
      >
        {isLoading ? 'Sending OTP...' : isRecaptchaReady ? 'Send OTP' : 'Loading Security...'}
      </button>

      {confirmationResult && (
        <>
          <div className="w-64 mb-4">
            <input
              type="text"
              placeholder="Enter 6-digit OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
              className="border w-full p-2 rounded focus:ring-2 focus:ring-green-500 focus:border-transparent"
              maxLength={6}
            />
          </div>
          <button
            onClick={verifyOtp}
            className="w-64 py-2 bg-green-500 text-white rounded-xl hover:bg-green-600"
          >
            Verify OTP
          </button>
        </>
      )}

      {/* Debug info */}
      <div className="mt-4 text-xs text-gray-500">
        reCAPTCHA: {isRecaptchaReady ? '✅ Ready' : '❌ Loading'}
      </div>

      {/* reCAPTCHA container */}
      <div 
        ref={recaptchaContainerRef} 
        id="recaptcha-container"
        className="invisible absolute"
      />
    </div>
  );
}