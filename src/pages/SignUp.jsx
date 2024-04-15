import React, { useState } from "react";
import { register, loginWithGithub, logout, login } from '../api/firebase';
import { uploadImage } from "../api/cloudinary";
import { useNavigate, Link } from "react-router-dom";

export default function SignUp() {

  //사용자를 저장하는 상태
  const [userInfo, setUserInfo] = useState({ email: '', password: '', name: '', photo: '' });
  // 업로드할 이미지 및 파일
  const [file, setFile] = useState();
  const navigate = useNavigate();

  //입력 필드 변경사항을 useInfo에 상태반영
  const handleChange = e => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  }

  //폼 제출 시 register 함수를 호출하여 사용자 정보를 등록하고, signIn 페이지로 이동
  const handleSubmit = e => {
    e.preventDefault();
    register(userInfo);
    navigate('/signIn');
  }

  //github로그인을 실행 후 이전 페이지로 돌아감
  const handleGithub = e => {
    loginWithGithub();
    navigate(-1);
  }

  //로그아웃
  const handleLogout = () => {
    logout();
  }

  //업로드
  const handleUpload = e => {
    //선택된 파일을 file 상태에 저장
    setFile(e.target.files && e.target.files[0]);
    // 이미지를 클라우드다이너리에 업로드 후 반한된 url을 userInfo의 사진url로 설정
    uploadImage(e.target.files[0])
      .then(url => setUserInfo({ ...userInfo, ['photo']: url }));
  }

  //로그인
  const handleLogin = () => {
    login(userInfo);
    navigate(-1);
  }

  //ui구성
  return (
    <div style={{ margin: '20px' }}>
      <form onSubmit={handleSubmit}>
        <input type="email" name='email' value={userInfo.email} placeholder="이메일"
          onChange={handleChange} /><br />

        <input type="password" name='password' value={userInfo.password} placeholder="패스워드"
          onChange={handleChange} /><br />

        <input type="text" name='name' value={userInfo.name} placeholder="이름" required
          onChange={handleChange} /><br />

        <input type="file" accept="image/*" name='file' onChange={handleUpload} /><br />
        <button onClick={handleSubmit}>사용자 등록</button>
        <button onClick={handleLogin}>로그인</button>
        <button onClick={handleLogout}>로그아웃</button>
      </form><br />
      <span>계정이 있으신가요?</span>
      <Link to='/signIn'>로그인</Link><br /><br />
      <button onClick={handleGithub}>깃허브 로그인</button>
      <br /><br />
      {file && (<img src={URL.createObjectURL(file)} alt="photo" />)}

    </div>
  )
}