// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase, ref as databaseRef, push, get, set } from "firebase/database";
import { getDownloadURL, getStorage, ref as refImg, uploadBytes } from "firebase/storage";
import { v4 as uuid } from "uuid";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  databaseURL: "https://miniblog-9b4d2-default-rtdb.asia-southeast1.firebasedatabase.app/",
  appId: "1:70096492949:web:94cb336e429efcc670be9c",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase(app);
const storage = getStorage();

//이미지를 storage에 업로드하는 api
export async function uploadImages(file) {
  try {
    const id = uuid();
    const imgRef = refImg(storage, `images/${id}`);
    await uploadBytes(imgRef, file);
    const imgUrl = await getDownloadURL(imgRef);
    console.log("imgUrl : ", imgUrl);
    return imgUrl;
  } catch (err) {
    console.error("이미지 스토리지에 업로드 하는 기능 에러 : ", err);
  }
}

//글 업로드 페이지에서 주제, 내용 데이터를 firebase에 업로드하는 api
export async function uploadPostData(post, imgUrl) {
  try {
    const id = uuid();
    const item = await set(databaseRef(database, `posts/${id}`), {
      id,
      ...post,
      image: imgUrl,
    });
  } catch (err) {
    console.log("글 업로드 기능 에러 : ", err);
  }
}

//firebase에 글 업데이트한 data를 호출하는 api
export async function getLoadPostData() {
  try {
    const postRef = databaseRef(database, "posts");
    const snapshot = await get(postRef);
    if (snapshot.exists()) {
      const item = Object.values(snapshot.val());
      console.log("item : ", item);
      return item;
    } else {
      return [];
    }
  } catch (err) {
    console.log("firebase에 글 업로드한 데이터를 가져오는 기능 에러 : ", err);
    return [];
  }
}

//메인페이지에 등록된 post의 id와  선택한 post의 id를 비교해 맞는것만 가져오는 api
export async function getPostId(postId) {
  try {
    const detailRef = databaseRef(database, `posts/${postId}`);
    const snapshot = await get(detailRef);
    if (snapshot.exists()) {
      return snapshot.val();
    }
  } catch (err) {
    console.error("id비교하여 디테일페이지에 정보를 찾는 기능 에러 : ", err);
  }
}
