import React from "react";
import { useLocation } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import ChannelInfo from "../components/ChannelInfo";
import RelatedVideos from "../components/RelatedVideos";

export default function VideoDetail() {
  const { state: {video} } = useLocation();
  const { title, channelId, channelTitle, description } = video.snippet;
  return (
    <Grid container spacing={2}>
      <Grid item xs={9} md={9}>
        <iframe id='player' type='text/html' width='100%' height='600' 
          src={`https://www.youtube.com/embed/${video.id}`} title={title} />
        <div>
          <h3>{title}</h3>
          <ChannelInfo />
          <pre>{description}</pre>
        </div>
      </Grid>
      <Grid item xs={9} md={3}>
        <RelatedVideos />
      </Grid>
    </Grid>
  )
}