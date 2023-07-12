const auth = firebase.auth();

const whenSignedIn = document.getElementById("whenSignedIn");
const whenSignedOut = document.getElementById("whenSignedOut");

const signInBtn = document.getElementById("signInBtn");
const signOutBtn = document.getElementById("signOutBtn");

const userDetails = document.getElementById("userDetails");

const userDetail = document.getElementById("userDetail");

const provider = new firebase.auth.GoogleAuthProvider();

signInBtn.onclick = () => auth.signInWithPopup(provider);

signOutBtn.onclick = () => auth.signOut();

auth.onAuthStateChanged((user) => {
  if (user) {
    // if user signed in disable the sign in section
    whenSignedIn.hidden = false;
    whenSignedOut.hidden = true;
    userDetails.innerHTML = `<h3> hello ${user.displayName}!</h3>
        <p>user id ${user.uid}</p> 
        <h2>${user.email}</h2>
        <img src = "${user.photoURL}">`;
  } else {
    // if user is signed out enable the sign in section
    whenSignedIn.hidden = true;
    whenSignedOut.hidden = false;
    userDetail.innerHTML = "Please Login";
  }
});

const db = firebase.firestore();

const createThing = document.getElementById("createThing");
const thingsList = document.getElementById("thingsList");

let thingsRef;
let unsubscribe;

auth.onAuthStateChanged((user) => {
  if (user) {
    // Database Reference
    thingsRef = db.collection("things");

    createThing.onclick = () => {
      const { serverTimestamp } = firebase.firestore.FieldValue;

      thingsRef.add({
        uid: user.uid,
        name: faker.commerce.productName(),
        createdAt: serverTimestamp(),
      });
    };

    // Query
    unsubscribe = thingsRef
      .where("uid", "==", user.uid)
      .orderBy("createdAt") // Requires a query
      .onSnapshot((querySnapshot) => {
        // Map results to an array of li elements

        const items = querySnapshot.docs.map((doc) => {
          return `<li>${doc.data().name}</li>`;
        });

        thingsList.innerHTML = items.join("");
      });
  } else {
    // Unsubscribe when the user signs out
    unsubscribe && unsubscribe();
  }
});
