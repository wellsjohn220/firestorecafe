console.log('hello from index.js')
import { initializeApp } from 'firebase/app'
import { getFirestore, collection, onSnapshot, addDoc, deleteDoc, doc, query, where, orderBy, serverTimestamp, getDocs, updateDoc } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyBHQBE8u2d6qnKDytDbZBXba9FS3mh_si0",
    authDomain: "fir-cafe-35eaa.firebaseapp.com",
    projectId: "fir-cafe-35eaa",
    storageBucket: "fir-cafe-35eaa.appspot.com",
    messagingSenderId: "675345132917",
    appId: "1:675345132917:web:2f93a034a98691992bb73c"
  };

  initializeApp(firebaseConfig)

  const db = getFirestore()
  const colRef = collection(db, 'cafes')

  const cafeList = document.querySelector('#cafe-list');
  const form = document.querySelector('#add-cafe-form');

  // create element & render cafe
function renderCafe(doc){
    let li = document.createElement('li');
    let name = document.createElement('span');
    let city = document.createElement('span');

    li.setAttribute('data-id', doc.id);
    name.textContent = doc.data().name;
    city.textContent = doc.data().city;

    li.appendChild(name);
    li.appendChild(city);

    cafeList.appendChild(li);
}

getDocs(colRef)
     .then((snapshot) => {
    // console.log(snapshot.docs)
    let cafes=[]
    snapshot.docs.forEach((doc) => {
        cafes.push({ ...doc.data(), id: doc.id })
        renderCafe(doc);
    })
    console.log(cafes)
  })
  .catch(err => {
    console.log(err.message)
  })

  // saving data
form.addEventListener('submit', (e) => {
  e.preventDefault();
  db.collection('cafes').add({
      name: form.name.value,
      city: form.city.value
  });
  form.name.value = '';
  form.city.value = '';
});
