import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database'

const firebaseConfig = {
    apiKey: "AIzaSyBMHs4tkIK8joSZBdK1g424OBISlA3GjQM",
    authDomain: "myapp-d86e9.firebaseapp.com",
    databaseURL: "https://myapp-d86e9.firebaseio.com",
    projectId: "myapp-d86e9",
    storageBucket: "myapp-d86e9.appspot.com",
    messagingSenderId: "882368456738",
    appId: "1:882368456738:web:4ad5daa14c0f15d103c27b"
}

const Firebase = firebase.initializeApp(firebaseConfig);
export default Firebase