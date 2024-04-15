import React from "react";
import Stack from '@mui/material/Stack';
import { login } from '../api/firebase';


import { useChannelInfo } from '../api/youtube';

export default function ChannelInfo({ id, name }) {
  const { url } = useChannelInfo(id);

  return (
      // Stack컴포넌트를 사용하여, 채널로고,이름,썸네일을 수평방향으로 배열
    <Stack direction={'row'} sx={{alignItems: 'center'}} spacing={2} >

      {/* 채널 썸네일 url이 존재하면, 채널로고 이미지 표시 */}
      {url && <img src={url} alt={name} height={64} width={64} />}
      <h4>{name}</h4>
    </Stack>
  )
}