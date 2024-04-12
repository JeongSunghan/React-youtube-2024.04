import React from "react";
import Stack from '@mui/material/Stack';
import HourglassTopIcon from '@mui/icons-material/HourglassTop';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import SmallVideoCard from "./SmallVideoCard";
import { useRelatedVideo } from "../api/youtube";


export default function RelatedVideos({ id, name }) {
  const {isLoading, error, videos} = useRelatedVideo(id);


  return (
    <>
      {isLoading && <p><HourglassTopIcon /> Loading...</p>}
      {error && <p><WarningAmberIcon /> Something is wrong!!!</p>}
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