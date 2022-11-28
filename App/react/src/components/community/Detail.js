import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import Layout from '../common/Layout';

const ArticleHeader = styled.div`
  width: 100%;
  margin-bottom: 40px;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  h2,p{
    display: flex;
    flex-direction: column;
    &:last-child{
      text-align: right;
    }
    .title{
      font-size: 36px;
      font-weight: 100;
    }
    .writer{
      font-size: 18px;
      font-weight: 500;
    }
    span{
      font-size: 12px;
      font-weight: 100;
    }
    strong{
      font-weight: 500;
    }
  }
  @media screen and (max-width: ${props=>props.theme.mo}) {
    margin-bottom: 20px;
    flex-direction: column;
    align-items: flex-start;
    p{
      width: 100%;
      align-items: flex-end;
    }
  }
`;

const Content = styled.div`
  width: 100%;
  padding: 40px;
  background-color: ${props=>props.theme.bgColor};
  border-radius: 10px;
  font-weight: 100;
`;

const BtnSet = styled.div`
  margin-top: 40px;

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
  }, [item.num]);

  return (
    <>
      {Loaded ? Detail &&
        <Layout name='Detail'>
          <ArticleHeader>
            <h2>
              <span className='title'>
                {Detail.title}
              </span>
              <span className='writer'>
                {Detail.writer.displayName}
              </span>
            </h2>
            <p>
              <span>
                <strong>posted</strong> {Detail.createdAt.slice(0,19).replace('T', ' ')}
              </span>
              {Detail.createdAt !== Detail.updatedAt &&
                <span>
                  <strong>updated</strong> {Detail.updatedAt.slice(0,19).replace('T', ' ')}
                </span>
              }
            </p>
          </ArticleHeader>
          <Content>
            {Detail.content}
          </Content>

          {User.uid === Detail.writer.uid &&
            <BtnSet>
              <button><Link to={`/edit/${Detail.communityNum}`}>EDIT</Link></button>
              <button onClick={handleDelete}>DELETE</button>
            </BtnSet>
          }
        </Layout>
      : <p>Loading...</p>
      }
    </>
  )
}

export default Detail