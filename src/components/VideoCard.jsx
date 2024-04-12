import React from "react";
import { useNavigate } from "react-router-dom";
import { formatAgo } from "../util/data";

export default function VideoCard({ video }) {
  // video 객체에서 필요한 정보를 구조 분해 할당으로 추출

  const navigate = useNavigate();

  //  video.snippet에 저장된 title, thumbnails, channelTitle, publishedAt을 포함
  const { title, thumbnails, channelTitle, publishedAt } = video.snippet;

  // video.id가 문자열이 아니고, video.id.kind가 'youtube#channel'인 경우, 채널을 나타냄
  // null을 반환하여 아무것도 렌더링하지 않고, 비디오 카드가 비디오만 표시하도록 하는 필터 역할
  if (typeof video.id !== 'string' && video.id.kind === 'youtube#channel') return null;

  //video.id가 문자열이면 ID이고, 그렇지 않다면 video.id.videoId에서 ID를 가져옴
  const videoId = typeof video.id === 'string' ? video.id : video.id.videoId;

  // 각각의 스타일 정의
  const cardStyle = {
    display: 'inline-block',
    width: 'calc(25% - 25px)', 
    margin: '3px',
    verticalAlign: 'top', 
    boxSizing: 'border-box', 
  };

  const imgStyle = {
    width: '100%',
    borderRadius: '2px',
    height: 'auto',
  };

  const divStyle = {
    padding: '1px',    
    borderRadius: '3px',
    overflow: 'hidden',
  };

  return (
    //  카드를 클릭할 때 /videos/watch/${videoId} 경로
    <div style={cardStyle} onClick={() => navigate(`/videos/watch/${videoId}`)}>

      {/* 이미지 태그를 사용해서 비디오 썸네일 표시 */}
      <img src={thumbnails.medium.url} alt={title} style={imgStyle} />

      <div style={divStyle}>
        <p>{title}</p>
        <p>{channelTitle}</p>
        <p>{formatAgo(publishedAt, 'ko')}</p>
      </div>
    </div>
  );
}
