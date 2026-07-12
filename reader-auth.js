import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import {
  getAuth,
  setPersistence,
  browserLocalPersistence,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";

import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  serverTimestamp,
  collection,
  addDoc,
  getDocs,
  query,
  where,
  orderBy,
  limit
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAhb2Dfsyp4eCQ59-bSB3Xx1rzvVm9lHMs",
  authDomain: "the-phoenix-whispers.firebaseapp.com",
  projectId: "the-phoenix-whispers",
  storageBucket: "the-phoenix-whispers.firebasestorage.app",
  messagingSenderId: "60939247464",
  appId: "1:60939247464:web:a6b49dc2cf938a939480dd",
  measurementId: "G-JRTWDK1XVF"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

await setPersistence(auth, browserLocalPersistence);

export { auth, db, onAuthStateChanged, serverTimestamp };

export function escapeHTML(value){
  return String(value || "")
    .replaceAll("&","&amp;")
    .replaceAll("<","&lt;")
    .replaceAll(">","&gt;");
}

export async function ensureUserProfile(user, extra = {}){
  if(!user) return;

  const ref = doc(db, "users", user.uid);
  const snap = await getDoc(ref);

  const baseData = {
    uid:user.uid,
    email:user.email || "",
    displayName:user.displayName || extra.displayName || "",
    photoURL:user.photoURL || extra.photoURL || "",
    updatedAt:serverTimestamp()
  };

  if(!snap.exists()){
    await setDoc(ref, {
      ...baseData,
      bio:extra.bio || "",
      createdAt:serverTimestamp()
    });
  }else{
    await setDoc(ref, baseData, {merge:true});
  }
}

export async function saveBookmark(userId, story){
  if(!userId || !story?.id) return;

  await setDoc(
    doc(db, "users", userId, "bookmarks", story.id),
    {
      storyId:story.id,
      title:story.title || "Untitled Story",
      category:story.category || "Story",
      savedAt:serverTimestamp()
    },
    {merge:true}
  );
}

export async function saveWishlist(userId, book){
  if(!userId || !book?.id) return;

  await setDoc(
    doc(db, "users", userId, "wishlist", book.id),
    {
      bookId:book.id,
      title:book.title || "Untitled Book",
      author:book.author || "Vineet",
      savedAt:serverTimestamp()
    },
    {merge:true}
  );
}

export async function saveReadingHistory(userId, story){
  if(!userId || !story?.id) return;

  await setDoc(
    doc(db, "users", userId, "history", story.id),
    {
      storyId:story.id,
      title:story.title || "Untitled Story",
      category:story.category || "Story",
      lastReadAt:serverTimestamp()
    },
    {merge:true}
  );
}

export async function getUserLibrary(userId, section){
  const snap = await getDocs(collection(db, "users", userId, section));
  const items = [];
  snap.forEach(d => items.push({id:d.id, ...d.data()}));
  return items;
}
