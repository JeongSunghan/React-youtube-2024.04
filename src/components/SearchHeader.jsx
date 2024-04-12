import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import Paper from '@mui/material/Paper';
import SearchIcon from '@mui/icons-material/Search';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import YouTubeIcon from '@mui/icons-material/YouTube';

export default function SearchHeader() {
  // URL 파라미터를 읽고, 프로그래밍 방식으로 네비게이션을 수행하는 데 사용
  const { keyword } = useParams();
  const navigate = useNavigate();

  // 사용자가 입력한 검색 키워드를 저장
  const [text, setText] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    navigate(`/videos/${text}`);
  }

  useEffect(() => {
    setText(keyword || '');
  }, [keyword]);

  return (
    // Stack : 가로 또는 세로로 정렬하기 위해 사용,  로우(row) 방향으로 요소들을 정렬
    <Stack direction={'row'} sx={{ alignItems: 'center' }}>

      {/* Link 컴포넌트는 홈(/) 페이지로의 링크 */}
      <Link style={{ textDecoration: "none" }} to='/'>
        <Stack direction={'row'} spacing={1}>

          <YouTubeIcon color='error' fontSize="large" />

          <Typography variant="h5" color='error' sx={{ fontWeight: 'bold', color: 'black' }}>YouTube</Typography>

        </Stack>
      </Link>

        {/* Paper 컴포넌트는 검색 필드를 감싸며, onSubmit 이벤트에 handleSubmit 함수를 연결 */}
      <Paper
        component="form" onSubmit={handleSubmit} onClick={handleSubmit}
        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400, marginLeft: 15 }}
      >

        {/* 사용자가 검색어를 입력할 수 있는 필드입니다. 이 필드의 값은 text 상태와 동기화 */}
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="검색..."
          value={text}
          onChange={e => setText(e.target.value)}
        />

        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />

        <IconButton type="button" sx={{ p: 1 }} aria-label="search">

          <SearchIcon />
        </IconButton>
      </Paper>

    </Stack>
  )
}