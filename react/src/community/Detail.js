import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Layout from '../common/Layout';
import Styled from 'styled-components';

const DetailWrap = Styled.div`
  width: 100%;
  padding: 40px;
  background: #fff;
  box-shadow: 10px 10px 20px rgba(0,0,0,0.2);
`;

const BtnSet = Styled.div`
  margin-top: 20px;

  button{
    margin-right: 20px;
  }
`

function Detail() {
  const params = useParams();
  const [ Detail, setDetail ] = useState(null);
  
  const item = {
    num: params.num
  }

  useEffect(()=>{
    axios.post('/api/community/detail', item)
      .then(response=>{
        if (response.data.success) {
          console.log(response.data.detail);
          setDetail(response.data.detail);
        }
      })
      .catch(error=>{
        console.log(error);
      })
  }, []);

  return (
    <Layout name='Detail'>
      {Detail &&
        <>
          <DetailWrap>
            <h2>{Detail.title}</h2>
            <p>{Detail.content}</p>
          </DetailWrap>

          <BtnSet>
            <button><Link to={`/edit/${Detail.communityNum}`}>EDIT</Link></button>
            <button><Link to={`/delete/${Detail.communityNum}`}>DELETE</Link></button>
          </BtnSet>
        </>
      }
    </Layout>
  )
}

export default Detail