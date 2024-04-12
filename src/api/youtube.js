import { useQuery } from "@tanstack/react-query"
import axios from "axios"

export const useVideo = keyword => {
  // 비동기 데이터를 가져오고 캐싱하는데 사용(?), 로딩 상태, 에러, 데이터를 관리
  const { isLoading, error, data: videos } = useQuery({
    queryKey: ['videos', keyword],
    // 함수 내에서 검색키워드가 있으면 => keywordUri를 사용, 없으면 popularUri를 사용하고 요청
    queryFn: async () => {
      // const uri = keyword ? keywordUri + keyword : popularUri;
      //  HTTP GET 요청을 보내고, 응답에서 비디오 목록(res.data.items)을 가져옴
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


export const useChangeInfo = id => {
  const uri = `https://youtube.googleapis.com/youtube/v3/channels?${id}&key=${process.env.REACT_APP_YOUTUBE_API_KEY}&maxResults=25&part=snippet&q=`;
  const { data: url } = useQuery({
    // 채널의 id를 포함하여 쿼리구별
    queryKey: ['channel', id],
    // 채널 데이터를 실제로 가져오는 함수
    queryFn: async () => {
      // axios를 사용하여 channels.json의 데이터를 가져옴
      return axios
        .get(uri)
        .then(res => res.data.items[0].snippet.thumbnails.default.url)
    },

    // 5min
    staleTime: 1000 * 60 * 5,
  });
  return { url };
}

export const useRelatedVideo = channelId => {
  const uri = `https://youtube.googleapis.com/youtube/v3/search?key=${process.env.REACT_APP_YOUTUBE_API_KEY}&maxResults=25&part=snippet&channelId=${channelId}`;
  const { isLoading, error, data: videos } = useQuery({
    queryKey: ['relatedVideos', channelId],
    queryFn: async () => {
      return axios
              // .get('/data/searchChannel.json')
              .get(uri)
              .then(res => res.data.items);
    },
    staleTime: 1000 * 60 * 1,       // 1분
  });
  return { isLoading, error, videos };
}