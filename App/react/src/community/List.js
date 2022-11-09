import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Layout from '../common/Layout';

const Item = styled.article`
  width: 100%;
  padding: 30px 40px;
  margin-bottom: 20px;
  background-color: var(--color-white);
  border-radius: 10px;
  transition: 0.5s;
  &:hover{
    box-shadow: 0 5px 15px rgba(0,0,0,0.1);
  }
`;

const BtnSet = styled.div`
  margin-bottom: 20px;
  display: flex;
  justify-content: flex-end;
`;

function List() {

  const [ List, setList ] = useState([]);
  const [ IsSortLatest, setIsSortLatest ] = useState(false);

  useEffect(()=>{
    const sort = IsSortLatest ? 'old' : 'latest';

    axios.get('/api/community/read?sort='+sort)
      .then(res=>{
        if (res.data.success) {
          setList(res.data.communityList);
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
            <Link to={`/detail/${post.communityNum}`}>
              <h2>
                  {post.title}
              </h2>
              <span>
                {post.writer.displayName}
              </span>
              <span>
                {post.createdAt.split('T')[0]}
              </span>
            </Link>
          </Item>
        )
      })}
    </Layout>
  )
}

export default List