

import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"


    const firebaseConfig = {
        apiKey: "AIzaSyCfr7up74omfQ0G0kAm7wJE1afkk0kxxis",
        authDomain: "gocoders-auth.firebaseapp.com",
        projectId: "gocoders-auth",
        storageBucket: "gocoders-auth.appspot.com",
        messagingSenderId: "580363060986",
        appId: "1:580363060986:web:4680d22f9485c2d28dab43",
        measurementId: "G-ZMEWM1BV5C"
    };
    
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    
 
export {auth}


