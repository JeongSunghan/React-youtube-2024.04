import { createContext, useContext, useEffect, useState } from "react";
import { logout, onUserStateChanged } from '../api/firebase';

// createContext를 사용하여 AuthContext를 생성
const AuthContext = createContext();

// AuthContext의 제공자 역할을 하며, user 상태와 logout 함수를 value로 제공
export function AuthContextProvider({ children }) {

  // 이 상태는 현재 로그인한 사용자의 정보를 저장
  const [user, setUser] = useState();

  useEffect(() => {
    // 유저 상태가 변경되면 user 상태를 업데이트
    onUserStateChanged(user => {setUser(user)});
  }, []);

  // children은 AuthContextProvider 컴포넌트에 포함된 자식 컴포넌트들을 의미
  //자식 컴포넌트들은 AuthContext의 데이터에 접근가능
  return (
    // 이 컨텍스트를 사용하는 모든 하위 컴포넌트에 user 객체와 logout 함수를 제공
    <AuthContext.Provider value={{user, logout}}>
      { children }
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  // 이 훅을 사용하는 컴포넌트는 user 객체와 logout 함수를 쉽게 얻어와서 사용
  const auth = useContext(AuthContext);
  return auth;
}