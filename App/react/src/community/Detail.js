import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

const DetailWrap = styled.div`
  width: 100%;
  padding: 40px;
  background: #fff;
  box-shadow: 10px 10px 20px rgba(0,0,0,0.2);
`;

const BtnSet = styled.div`
  margin-top: 20px;

  button{
    margin-right: 20px;
  }
`

function Detail() {
  const params = useParams();
  const navigate = useNavigate();
  const [ Detail, setDetail ] = useState(null);
  const [ Loaded, setLoaded ] = useState(false);
  const User = useSelector(store=>store.user);
  
  const item = {
    num: params.num
  }

  const handleDelete = ()=>{
    if (!window.confirm('정말 삭제하시겠습니까?')) return;

    axios.delete('/api/community/delete/'+item.num)
      .then(res=>{
        if (res.data.success) {
          alert('게시글이 삭제되었습니다.');
          navigate('/list');
        } else {
          alert('게시글 삭제에 실패했습니다.');
        }
      })
      .catch(error=>{
        console.error(error);
      })
  }

  useEffect(()=>{
    axios.get('/api/community/detail/'+item.num)
      .then(res=>{
        if (res.data.success) {
          setDetail(res.data.detail);
        }
      })
      .catch(error=>{
        console.log(error);
      })
      .finally(()=>{
        setLoaded(true);
      })
  }, []);

  return (
    <>
      {Loaded ? Detail &&
        <>
          <DetailWrap>
            <h2>{Detail.title}</h2>
            <p>{Detail.writer.displayName}</p>
            <p>
              {Detail.createdAt.split('T')[0]}
            </p>
            <p>{Detail.content}</p>
          </DetailWrap>

          {User.uid === Detail.writer.uid &&
            <BtnSet>
              <button><Link to={`/edit/${Detail.communityNum}`}>EDIT</Link></button>
              <button onClick={handleDelete}>DELETE</button>
            </BtnSet>
          }
        </>
      : <p>Loading...</p>
      }
    </>
  )
}

export default Detail