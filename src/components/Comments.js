import React, { useEffect, useState, useRef } from 'react';

const Comments = () => {
  const [data, setData] = useState([]); // 상태관리-초기는 빈 배열
  const dataId = useRef(1); // 참조관리 - useRef를 사용하여 각 데이터 항목에 고유 ID부여

  const getData = async () => {
    const res = await fetch("https://koreanjson.com/users") //fetch API를 사용하여 데이터를 가져옴
      .then((res) => res.json()); // JSON 형식으로 변환

    const initData = res.slice(0, 20).map((it) => {
      return {
        author: it.email,
        content: it.body,
        emotion: Math.floor(Math.random() * 5) + 1,
        created_date: new Date().getTime(),
        id: dataId.current++,
      };
    }); // 변환된 객체에 작성자 이메일,내용,감정,생성날자,고유ID 포함.

    setData(initData); // setData 사용하여 변환된 데이터를 상태로 설정정
  };

  useEffect(() => {
    getData(); // API를 호출하여 데이터를 가져옴
  }, []);

  return (
    <div>
      {data.map((item) => ( //배열의 각 요소를 item이라는 변수로 받아서 반복 작업
        <div key={item.id}> {/*각 컴포넌트에 고유한 key를 제공해야 성능 최적화나 버그 방지에 유리함.
                              item.id가 각 항목의 고유한 식별자로 사용됨*/}
          <h3>{item.author}</h3> {/*작성자의 이름이나 저자를 표시하는 데 사용될 수 있음*/}
          <p>{item.content}</p>
          <p>Emotion: {item.emotion}</p>
          <p>Date: {new Date(item.created_date).toLocaleString()}</p>
        </div>
      ))}
    </div>
  );
};

export default Comments;
