import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBg-DL0zcMMB_GwMDewcLS3p7eaNMuONDA",
  authDomain: "proyectotew-d69b0.firebaseapp.com",
  projectId: "proyectotew-d69b0",
  storageBucket: "proyectotew-d69b0.appspot.com",
  messagingSenderId: "819175465498",
  appId: "1:819175465498:web:53fa8fc03639616e1e67a3"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);