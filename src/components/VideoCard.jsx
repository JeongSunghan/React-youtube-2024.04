import React from "react";
import { useNavigate } from "react-router-dom";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

import { formatAgo } from "../util/data";

export default function VideoCard({ video }) {
  const navigate = useNavigate();

  // video.snippet에서 const값을 추출
  const {title, thumbnails, channelTitle, publishedAt} = video.snippet;  

  // video.id가 문자열이면 직저바용, 그렇지 않으면 video.id.videoId사용
  const videoId = typeof(video.id) === 'string' ? video.id : video.id.videoId;
  return (
    <Card 
      //  navigate 함수를 호출하여, /videos/watch/${videoId} 경로로 라우팅
      onClick={() => { navigate(`/videos/watch/${videoId}`, {state: {video} }) }}
    >
      <CardContent>
        {/*  비디오의 썸네일 이미지(img 태그), 비디오 제목, 채널 제목, 게시된 시간을 렌더링 */}
        
        <img src={thumbnails.medium.url} alt={title} />
        <div>
          <Typography sx={{fontSize: 16, fontWeight: 'bold'}}>{title}</Typography>
          <Typography>{channelTitle}</Typography>

          {/* 비디오가 게시된 시간을 "얼마나 전" 형식으로 변환 */}
          <Typography>{formatAgo(publishedAt, 'ko')}</Typography>
        </div>
      </CardContent>
    </Card>
  )
}