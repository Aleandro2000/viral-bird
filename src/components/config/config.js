import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/storage";

const config={
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: "",
    measurementId: ""
};

function initFirebase() {
    if(!firebase.apps.length)
        firebase.initializeApp(config);
}

initFirebase();

export default firebase;
