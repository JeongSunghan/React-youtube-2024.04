import React from "react";
import { useLocation } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import ChannelInfo from "../components/ChannelInfo";
import RelatedVideos from "../components/RelatedVideos";

export default function VideoDetail() {
  
  //현재 비디오 객체 가져오기
  const { state: {video} } = useLocation();

  //snippet에서의 비디오 정보 가져오기
  const { title, channelId, channelTitle, description } = video.snippet;

  return (
    // 영역 나누기
    <Grid container spacing={2}>

      <Grid item xs={9} md={9}>
        {/* YouTube 비디오 플레이어를 삽입 및 비디오 크기 설정 */}      
        <iframe id='player' type='text/html' width='100%' height='600' 
        // 비디오의 id를 사용하여 올바른 YouTube 비디오 URL을 생성
          src={`https://www.youtube.com/embed/${video.id}`} title={title} />

        <div>
          {/* 비디오 제목, 채널 정보(ChannelInfo 컴포넌트 불러옴), 비디오 설며 아래에 표시 */}
          <h3>{title}</h3>
          <ChannelInfo id={channelId} name={channelTitle}/>
          <pre>{description}</pre>
        </div>

      </Grid>
      <Grid item xs={9} md={3}>
        {/* RelatedVideos 컴포넌트 사용, 현재 관련된 비디오 목록 표시 */}
        <RelatedVideos id={channelId} name={channelTitle}/>
      </Grid>

    </Grid>
  )
}