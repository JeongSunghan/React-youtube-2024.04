import React, { useState } from "react";
import { loginWithGithub, login } from '../api/firebase';
import { useNavigate, Link } from "react-router-dom";

export default function SignIn() {    
    // 유저 정보를 저장함, 초기값은 빈 문자열
    const [userInfo, setUserInfo] = useState({ email: '', password: '' });     
    const navigate = useNavigate();

    // 입력 필드가 변경 => userInfo 상태를 업데이트
    const handleChange = e => {
        //  입력된 이름(name 속성)에 따라 이메일 또는 비밀번호 값을 설정
        setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
    }

    //폼 이벤트 처리
    const handleSubmit = e => {        
        e.preventDefault();         // 기본 동작을 방지         
        login(userInfo);        // 로그인 함수 호출 후, 사용자 정보로 로그인을 시도        
        navigate(-1);       // 이전 페이지로 돌아옴
    }

    //깃 허브 폼 이벤트 처리
    const handleGithub = e => {
        //깃 허브로그인 함수 호출 후 로그인과 동일
        loginWithGithub();
        navigate(-1);
    }

    //ui 구성
    return (
        <div style={{ margin: '20px' }}>
            <form onSubmit={handleSubmit}>
                <input type="email" name='email' value={userInfo.email} placeholder="이메일"
                    onChange={handleChange} /><br />
                <input type="password" name='password' value={userInfo.password} placeholder="패스워드"
                    onChange={handleChange} /><br />
                <button onClick={handleSubmit}>로그인</button>
            </form><br />
            <span>아직 계정이 없으신가요?</span>
            <Link to='/signUp'>사용자 등록</Link><br /><br />
            <button onClick={handleGithub}>깃허브 로그인</button>

        </div>
    )
}