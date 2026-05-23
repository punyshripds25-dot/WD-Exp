// SAVE USER
window.register = function () {
  const email = document.getElementById("regEmail").value;
  const pass = document.getElementById("regPass").value;
  const confirm = document.getElementById("regConfirm").value;

  if (!email || !pass || !confirm) {
    alert("All fields required");
    return;
  }

  if (pass !== confirm) {
    alert("Passwords do not match");
    return;
  }

  localStorage.setItem("email", email);
  localStorage.setItem("password", pass);

  window.location.href = "login.html";
}

// LOGIN
window.login = function () {
  const email = document.getElementById("logEmail").value;
  const pass = document.getElementById("logPass").value;

  if (email !== localStorage.getItem("email") ||
      pass !== localStorage.getItem("password")) {
    alert("Invalid credentials");
    return;
  }

  window.location.href = "dashboard.html";
}

// TABS (FIXED PROPERLY)
window.openTab = function (tabId, btn) {
  document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
  document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));

  document.getElementById(tabId).classList.add("active");
  btn.classList.add("active");
}

// DARK MODE
window.toggleMode = function () {
  document.body.classList.toggle("light");
}

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

console.log("JS LOADED ✅");

// 🔴 YOUR FIREBASE CONFIG (keep yours)
const firebaseConfig = {
  apiKey: "AIzaSyAfpiDeDu6DzEr5b08e4QFSKCEFf7IPV_k",
  authDomain: "wd-exp-d0434.firebaseapp.com",
  projectId: "wd-exp-d0434",
  storageBucket: "wd-exp-d0434.firebasestorage.app",
  messagingSenderId: "416395108106",
  appId: "1:416395108106:web:66bfdf1e515c9710b524f3",
  measurementId: "G-0LJZ45WF7Z"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

let confirmationResult;

window.saveProfile = function () {
  localStorage.setItem("username", document.getElementById("username").value);
  localStorage.setItem("phone", document.getElementById("phone").value);
  localStorage.setItem("email", document.getElementById("email").value);
  localStorage.setItem("password", document.getElementById("password").value);

  alert("Profile Saved ✅");
};

// ✅ Wait for page load
window.openOTP = function () {
  window.location.href = "otp.html";
};
window.onload = () => {

  console.log("PAGE LOADED ✅");

  const sendBtn = document.getElementById("sendBtn");
  const verifyBtn = document.getElementById("verifyBtn");

  // ✅ Setup reCAPTCHA ONCE
  window.recaptchaVerifier = new RecaptchaVerifier(
    auth,
    "recaptcha",
    { size: "normal" }
  );

  // 🔥 SEND OTP
  sendBtn.onclick = () => {
    const phone = document.getElementById("phone").value;

    console.log("Sending OTP to:", phone);

    signInWithPhoneNumber(auth, phone, window.recaptchaVerifier)
      .then((result) => {
        confirmationResult = result;
        alert("OTP Sent ✅");
      })
      .catch((error) => {
        console.error(error);
        alert("Error: " + error.message);
      });
  };

  // 🔥 VERIFY OTP
  verifyBtn.onclick = () => {
    const otp = document.getElementById("otp").value;

    if (!confirmationResult) {
      alert("Send OTP first!");
      return;
    }

    confirmationResult.confirm(otp)
      .then(() => {
        alert("Login Successful 🎉");
        setTimeout(() => {
  window.location.href = "profile.html";
}, 1000);
      })
      .catch(() => {
        alert("Wrong OTP ❌");
      });
  };
};
