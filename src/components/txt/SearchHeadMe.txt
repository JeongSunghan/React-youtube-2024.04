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

export default function SearchHeader() {

  const { keyword } = useParams();
  const navigate = useNavigate();
  const [text, setText] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    console.log(text);
    navigate(`/videos/${text}`);
  }

  // 컴포넌트가 마운트될 때(URL에서 keyword 변경 시 포함) text 상태를 현재 URL의 검색 키워드로 설정
  useEffect(() => {
    setText(keyword || '');
  }, [keyword]);

  return (
    // 헤더 부분
    <header> 
      {/* stack : 내부 요소들 수평방향으로 정렬 */}
      <Stack direction={'row'} sx={{alignItems: 'center'}}>
        {/* grid : 로고, 검색창, 추가적인 공간을 3등분 */}
        <Grid container>
          <Grid item xs={3}>
            {/* Link : 클릭시 / 홈페이지로 이동 */}
            <Link to='/' style={{textDecoration: 'none'}}>
              <Stack direction={'row'} spacing={1}>

                {/* 유튜브 로고 아이콘 구성 */}
                <YouTubeIcon color='error' fontSize="large" />
                <Typography variant="h4" color='error' sx={{fontWeight: 'bold', color:'black'}}>YouTube</Typography>

              </Stack>
            </Link>
          </Grid>
          <Grid item xs={6}>

            {/* 검색창에서 Enter를 누르거나 검색 아이콘을 클릭하면 handleSubmit 함수가 호출 */}
            <Paper
              component="form" onSubmit={handleSubmit}
              sx={{ p:'2px 4px', display:'flex', alignItems:'center', width:'100%' }}
            >

              {/* 사용자가 텍스트를 입력할 때마다 setText를 통해 text 상태를 업데이트 */}
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="검색..."
                value={text} 
                onChange={e => setText(e.target.value)}
              />

              <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
              {/* 클릭 시 handleSubmit 함수가 실행, 페이지를 /videos/${text} 경로로 네비게이션 */}
              <IconButton type="button" sx={{ p: 1 }} aria-label="search" onClick={handleSubmit}>
                <SearchIcon />
              </IconButton>
            </Paper>

          </Grid>
          <Grid item xs={3}></Grid>
        </Grid>
      </Stack>
      <Divider sx={{my: 1}} />
    </header>
  )
}