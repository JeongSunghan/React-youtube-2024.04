import React from "react";
import Stack from '@mui/material/Stack';
import { useChangeInfo } from "../api/youtube";

// 채널 고유식별자, 이름
export default function ChannelInfo({ id, name }) {  
  const {url} = useChangeInfo(id);

  return (
    // Stack컴포넌트를 사용하여, 채널로고,이름,썸네일을 수평방향으로 배열
    <Stack direction={'row'} sx={{ alignItems: 'center' }} spacing={2}
      style={{color:'black',}}
    >
      {/* 채널 썸네일 url이 존재하면, 채널로고 이미지 표시 */}
      {url && <img src={url} alt={name} height={50} width={50} style={{borderRadius:'60px'}}/>}
      <h5>{name}</h5>
      <p style={{fontSize:'11px'}}>{url}</p>
    </Stack>
  )
}