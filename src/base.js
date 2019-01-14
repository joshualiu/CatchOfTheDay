import Rebase from "re-base";
import firebase from "firebase";
require('dotenv').config();
// import config from "./secret";

const firebaseApp = firebase.initializeApp({
  apiKey: process.env.REACT_APP_APIKEY,
  authDomain: process.env.REACT_APP_AUTHDOMAIN,
  databaseURL: process.env.REACT_APP_DATABASEURL
});

const base = Rebase.createClass(firebaseApp.database());

export { firebaseApp };

export default base;


