import Rebase from "re-base";
import firebase from "firebase/app";
require("firebase/database");

const firebaseApp = firebase.initializeApp({
  apiKey: "*****",
  authDomain: "*****",
  databaseURL: "*****",
});
const base = Rebase.createClass(firebaseApp.database());

export { firebaseApp };
export default base;
