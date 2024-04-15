export async function uploadImage(file) {    
  const data = new FormData();    //객체를 생성하여 브라우저에서 서버로 파일데이터를 전송

  // 업로드할 파일 과 Cloudinary에서 설정에 필요한 upload_preset 값이 포함
  data.append('file', file);

  // upload_preset은 Cloudinary에서 사전에 설정한 업로드 옵션을 지정하는 데 사용
  //환경 변수 REACT_APP_CLOUDINARY_PRESET에서 값을 가져옴
  data.append('upload_preset', process.env.REACT_APP_CLOUDINARY_PRESET);

  //fetch 함수 사용

  //  HTTP POST 요청을 Cloudinary의 업로드 URL로 보냄
  // URL은 환경 변수 REACT_APP_CLOUDINARY_URL에서 설정
  return fetch(process.env.REACT_APP_CLOUDINARY_URL, {
      method: 'POST',
      // body에는 위에서 준비한 FormData 객체가 포함되어, 파일 데이터와 필요한 설정 정보를 서버로 전송
      body: data,
    })
      // 서버로 부터 JSON 형식으로 변환
      .then(res => res.json())
      //  JSON 데이터에서 업로드된 파일의 URL(data.url)을 추출하여 반환
      .then(data => {
        console.log(data);
        return data.url;
      });
}