import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/storage";

const config={
    apiKey: "AIzaSyBuvJclGWjXcp3Ho6CQW6bwXg-PYlYYykg",
    authDomain: "softbinator-social-media-bf28f.firebaseapp.com",
    databaseURL: "https://softbinator-social-media-bf28f-default-rtdb.europe-west1.firebasedatabase.app/",
    projectId: "softbinator-social-media-bf28f",
    storageBucket: "softbinator-social-media-bf28f.appspot.com",
    messagingSenderId: "954112786631",
    appId: "1:954112786631:web:4f1610933f3c91ad5c7ee2",
    measurementId: "G-KVYM1ZHBV6"
};

function initFirebase() {
    if(!firebase.apps.length)
        firebase.initializeApp(config);
}

initFirebase();

export default firebase;