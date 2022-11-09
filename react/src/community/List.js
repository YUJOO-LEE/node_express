import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../common/Layout';
import Styled from 'styled-components';

const Item = Styled.article`
  width: 100%;
  padding: 30px 40px;
  background-color: #fff;
  box-shadow: 10px 10px 20px rgba(0,0,0,0.2);
  margin-bottom: 50px;
`;

const BtnSet = Styled.div`
  margin-bottom: 20px;
  display: flex;
  justify-content: flex-end;
`;

function List() {

  const [ List, setList ] = useState([]);
  const [ IsSortLatest, setIsSortLatest ] = useState(false);

  useEffect(()=>{
    const sort = {
      sort: {
        new: IsSortLatest
      }
    }

    axios.post('/api/community/read', sort)
      .then(response=>{
        if (response.data.success) {
          setList(response.data.communityList);
        }
      })
      .catch(error=>{
        console.log(error);
      })
  }, [IsSortLatest]);

  return (
    <Layout name='List'>
      <BtnSet>
        <button onClick={()=>setIsSortLatest(!IsSortLatest)}>
          {IsSortLatest ? 'created ▲' : 'created ▼'}
        </button>
      </BtnSet>
      {List.map(post=>{
        return (
          <Item key={post._id}>
            <h2>
              <Link to={`/detail/${post.communityNum}`}>
                {post.title}
              </Link>
            </h2>
            <span>
              {post.writer.displayName}
            </span>
            <span>
              {post.createdAt.split('T')[0]}
            </span>
          </Item>
        )
      })}
    </Layout>
  )
}

export default List