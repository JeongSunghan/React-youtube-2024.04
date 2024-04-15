import React from "react";
import Stack from '@mui/material/Stack';
import HourglassTopIcon from '@mui/icons-material/HourglassTop';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import SmallVideoCard from "./SmallVideoCard";

//  훅을 통해 관련 비디오를 불러올 때 사용
import { useRelatedVideo } from "../api/youtube";


// ID와 NAME 프로퍼티를 받음
export default function RelatedVideos({ id, name }) {
  const {isLoading, error, videos} = useRelatedVideo(id);


  return (
    <>
      {/* 로딩 상태가 참이면, 로딩아이콘 및 메시지 표시 */}
      {isLoading && <p><HourglassTopIcon /> Loading...</p>}

      {/* error도 로딩과 동일 */}
      {error && <p><WarningAmberIcon /> Something is wrong!!!</p>}

      {/* 비디오 배열이 존재 => 해당 배열 순회 후 각 비디옹에 대해 SmallVideoCard 컴포넌트 사용하여
          비디오 정보 렌더링, 각 비디오 카드는 고유한 videoID를 키로 사용        
       */}
      {videos && (
        <>
          <Stack>
            <h4>이 채널의 다른 영상들</h4>
            {videos.map(video => (<SmallVideoCard key={video.id.videoId} video={video} />))}
          </Stack>
        </>
      )}
    </>
  )
}