import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const useVideo = keyword => {
  // keyword로 인자를 받아, youtube 비디오를 검색 혹은 인기비디오 목록을 가져옴
  const keywordUri = `https://youtube.googleapis.com/youtube/v3/search?key=${process.env.REACT_APP_YOUTUBE_API_KEY}&maxResults=25&part=snippet&q=`;
  const popularUri = `https://youtube.googleapis.com/youtube/v3/videos?chart=mostPopular&key=${process.env.REACT_APP_YOUTUBE_API_KEY}&maxResults=25&part=snippet`;

  // 로딩, 에러, 비디오 데이터를 컴포너늩에 사용할 수 있게 함
  const { isLoading, error, data: videos } = useQuery({
    queryKey: ['videos', keyword],
    queryFn: async () => {
      const uri = keyword ? keywordUri + keyword : popularUri;
      return axios
              .get(`/data/${keyword ? 'search' : 'popular'}.json`)
              // .get(uri)
              .then(res => res.data.items);
              // .then(res => keyword ? res.data.items.shift() : res.data.items);
    },
    staleTime: 1000 * 60 * 1,       // 1분, ms 단위로 지정할 수 있음
  });
  return { isLoading, error, videos };
}

export const useChannelInfo = id => {
  // 채널 id를 받아, youtube채널기본 썸네일 이미지 url을 검색
  const uri = `https://youtube.googleapis.com/youtube/v3/channels?id=${id}&key=${process.env.REACT_APP_YOUTUBE_API_KEY}&part=snippet`;

  // api요청을 보내고 응답해서 채널정보를 파싱 후 썸네일 url을 가져옴
  const { data: url } = useQuery({
    queryKey: ['channel', id],
    queryFn: async () => {
      return axios
              // .get('/data/channels.json')
              .get(uri)
              .then(res => res.data.items[0].snippet.thumbnails.default.url)
    },
    staleTime: 1000 * 60 * 5,     // 5분
  });
  //url을 반환하여 컴포넌트에서 채널 썸네일 표시
  return { url };
}

export const useRelatedVideo = channelId => {
  // 채널 ID를 기반으로 해당 채널과 관련된 비디오를 검색
  const uri = `https://youtube.googleapis.com/youtube/v3/search?key=${process.env.REACT_APP_YOUTUBE_API_KEY}&maxResults=25&part=snippet&channelId=${channelId}`;
  const { isLoading, error, data: videos } = useQuery({
    queryKey: ['relatedVideos', channelId],
    queryFn: async () => {
      // Axios를 사용하여 YouTube API에 요청을 보내고, 관련 비디오 데이터를 받아옴
      return axios
              // .get('/data/searchChannel.json')
              .get(uri)
              .then(res => res.data.items);
    },
    staleTime: 1000 * 60 * 1,       // 1분
  });
  // isLoading, error, videos를 반환하여 컴포넌트에서 관련 비디오의 로딩 상태와 데이터를 관리
  return { isLoading, error, videos };
}