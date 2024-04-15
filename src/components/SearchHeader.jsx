import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import Paper from '@mui/material/Paper';
import SearchIcon from '@mui/icons-material/Search';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { useAuthContext } from "../context/AuthContext";

export default function SearchHeader() {  
  const { keyword } = useParams();    // 사용자가 입력한 텍스트틀 받기 
  const navigate = useNavigate();  //검색 결과 페이지로 이동
    
  const [text, setText] = useState('');   // useState로 검색어를 관리

  // handleSubmit 함수에서는 페이지 navigate를 통해 해당 검색어에 맞는 결과 페이지로 리다이렉트
  const handleSubmit = e => {
    e.preventDefault();
    console.log(text);
    navigate(`/videos/${text}`);
  }

  //URL 동기화 
  useEffect(() => {
    //useParams와 useEffect를 사용하여 url의 파라미터(keyword)를
    //검색 입력 필드와 동기화, url변경시 검색어가 자동으로 입력 필드에 설정
    setText(keyword || '');
  }, [keyword]);
  const { user, logout } = useAuthContext();

  return (
    <header>

      {/* 유튜브 로그 및 타이틀 */}
      <Stack direction={'row'} sx={{alignItems: 'center'}}>
        <Grid container>
          <Grid item xs={3}>
            {/* 링크 클릭 => ('/') 홈페이지로 이동 */}
            <Link to='/' style={{textDecoration: 'none'}}>
              <Stack direction={'row'} spacing={1}>
                <YouTubeIcon color='error' fontSize="large" />
                <Typography variant="h4" sx={{fontWeight: 'bold'}}>Youtube</Typography>
              </Stack>
            </Link>
          </Grid>

          {/* 검색라인 */}
          <Grid item xs={5}>
            <Paper
              component="form" onSubmit={handleSubmit}
              sx={{ p:'2px 4px', display:'flex', alignItems:'center', width:'100%' }}
            >
              {/*  InputBase를 사용하여 텍스트를 입력받음 */}
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="검색..."
                value={text} 
                onChange={e => setText(e.target.value)}
              />              
              <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />

              {/* IconButton으로 검색 아이콘을 클릭하면 검색이 실행 */}
              <IconButton type="button" sx={{ p: 1 }} aria-label="search" onClick={handleSubmit}>
                <SearchIcon />
              </IconButton>
            </Paper>
          </Grid>

          <Grid item xs={4}>
            {/* useAuthContext 훅을 통해 현재 로그인한 사용자의 정보(user)와 (logout) 함수를 가져옴 */}
            <Stack direction='row' spacing={1} justifyContent='right' alignItems='center'>
              {user && <Link to='/videos/record'>시청기록</Link>}
              {user && user.photoURL && (
                <img src={user.photoURL} alt={user.displayName} height='32' style={{borderRadius:100}} />
              )}
              {user && <p>{user.displayName}</p>}
              {user && <button onClick={logout}>로그아웃</button>}
              {!user && <Link to='/signUp'>로그인</Link>}
            </Stack>
          </Grid>

        </Grid>
      </Stack>
      <Divider sx={{my: 1}} />
    </header>
  )
}