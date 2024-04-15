import React from "react";
import { useNavigate } from "react-router-dom";
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { formatAgo } from "../util/data";

export default function SmallVideoCard({ video }) {
  // video 객체에서 필요한 데이터를 추출 videoId는 각각 비디오의 제목, 썸네일 이미지 및 게시일을 나타냄
  const navigate = useNavigate();
  const videoId = video.id.videoId;
  const { title, thumbnails, publishedAt } = video.snippet;

  return (
    // Card 컴포넌트 => 비디오 정보를 클릭 가능한 카드 형태로 표시
    // 카드 클릭 => navigate 함수를 실행, `백코트 링크로 이동`, 비디오 객체 전체 페이지를 상태로 전달
    <Card onClick={() => { navigate(`/videos/watch/${videoId}`, {state: {video} }) }} >

      {/* Stack 컴포넌트 => 이미지와 텍스트 가로 배치 */}
      <Stack direction={'row'} spacing={1}>

        {/* 이미지 태그로 썸네일 표시, thumbnails.medium.url 중간크기 이미지 url 불러옴*/}
        <img src={thumbnails.medium.url} alt={title} width={'40%'} />
        <div style={{textAlign: 'left'}}>
          {/* div내부는 비디오 제목 및 게시된 시간을 표시하는 타이포그래피 컴포넌트로 표현 */}
          <Typography sx={{fontSize: 14}}>{title}</Typography>
          {/* formatAgo는 게시 시간을 상대적 시간으로 보임(ex. 3시간 전) */}
          <Typography sx={{fontSize: 12}}>{formatAgo(publishedAt, 'ko')}</Typography>
        </div>
      </Stack>
    </Card>
  );
}