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
       {/* 로딩, 에러 상태에 따른 표시 아이콘 및 메세지  */}
      {isLoading && <p><HourglassTopIcon /> Loading...</p>}
      {error && <p><WarningAmberIcon /> Something is wrong!!!</p>}
      {videos && (
        // videos 배열이 존재하고 내용이 있따면 괄호 안에 코드를 실행
        <Stack direction={'column'} spacing={1} sx={{textAlign: 'center'}}>
          <h4>이 채널의 다른 영상들</h4>
          {/* videos의 배열의 각 비디오를 순회 그 후 
          각 비디오 데이터를 SmallVideoCard 컴포넌트에 video라는 이름의 속성을 전달 */}
          {videos.map(video => (<SmallVideoCard video={video} />))}
        </Stack>
      )}
    </>
  )
}