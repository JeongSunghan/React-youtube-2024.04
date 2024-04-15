import { initializeApp } from "firebase/app";     //Firebase 애플리케이션을 초기화


import { getAuth, createUserWithEmailAndPassword, GithubAuthProvider,
  signInWithPopup, signOut, updateProfile, signInWithEmailAndPassword,
  onAuthStateChanged } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
};

const app = initializeApp(firebaseConfig);


const auth = getAuth();     //인증 객체를 생성


//사용자 등록 함수
export function register({ email, password, name, photo }) {  
  console.log('firebase:register():', email, password);

  // 이메일, 비밀번호를 사용하여 사용자 계성 생성
  createUserWithEmailAndPassword(auth, email, password)

  // 계정 생성 후 사용자의 프로필을 업데이트(이름, 사진url 추가)
    .then(() => {
      updateProfile(auth.currentUser, {
        displayName: name, photoURL: photo
      })
    })
    // 프로필 업데이트 후 로그아웃
    .then(() => {logout()})
    .catch(console.error);
}


//이메일로 로그인 함수
export function login({ email, password}) {
  // 주어진 이메일과 비밀번호로 사용자를 로그인
  signInWithEmailAndPassword(auth, email, password)
    .catch(console.error);
}


//깃허브로 로그인 함수
export function loginWithGithub() {
  // GitHub 제공자를 사용하여 팝업을 통해 사용자를 로그인
  const provider = new GithubAuthProvider();
  signInWithPopup(auth, provider)
    .catch(console.error);
}

//로그아웃 함수
export function logout() {
  signOut(auth).catch(console.error);
}

//사용자 상태 변경 감지 함수
export function onUserStateChanged(callback) {
  //사용자의 로그인 상태 변화를 감지
  onAuthStateChanged(auth, (user) => {
    // 상태가 변경될 때마다 제공된 콜백 함수를 호출하여 해당 사용자 객체를 전달
    callback(user);
  });
}