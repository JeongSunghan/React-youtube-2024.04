import React from "react";
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Grid from '@mui/material/Grid';
import HourglassTopIcon from '@mui/icons-material/HourglassTop';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import VideoCard from "../components/VideoCard";
import { useVideo} from '../api/youtube';

// 유튜브 API 요청을 보내는 주소
const keywordUri = `https://youtube.googleapis.com/youtube/v3/search?key=${process.env.REACT_APP_YOUTUBE_API_KEY}&maxResults=25&part=snippet&q=`;
const popularUri = `https://youtube.googleapis.com/youtube/v3/videos?chart=mostPopular&key=${process.env.REACT_APP_YOUTUBE_API_KEY}&maxResults=25&part=snippet`;

export default function Videos() {

  // url 검색 키워드 가져오는 함수
  const { keyword } = useParams();
  const {isLoading, error, videos} = useVideo(keyword);

  return (
    <>
      {/* 로딩이 true면 로딩문구 표시, error가 존재하면 error문구 표시 */}
      {isLoading && <p><HourglassTopIcon /> Loading...</p>}

      {/* videos가 있으면 VideoCard 컴포넌트를 사용 => 비디오 목록을 렌더링
          각 비디오 아이템은 video prop으로 VideoCard 컴포넌트에 전달 */}
      {error && <p><WarningAmberIcon /> Something is wrong!!!</p>}

      {videos && (
        <Grid container spacing={1}>
          {videos.map(video => (
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <VideoCard video={video} />
            </Grid>
          ))}
        </Grid>
      )}
    </>
  )
}