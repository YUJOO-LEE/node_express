import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Layout from '../common/Layout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons'

const Item = styled.article`
  width: 100%;
  padding: 20px 30px;
  margin-bottom: 20px;
  background-color: var(--color-white);
  border-radius: 10px;
  transition: 0.5s;
  &:hover{
    box-shadow: 0 5px 15px rgba(0,0,0,0.1);
  }
  a{
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    gap: 20px;
    h3{
      flex: 1;
      font-size: 16px;
      font-weight: 300;
    }
    span{
      font-size: 14px;
      font-weight: 100;
    }
  }
`;

const BtnSet = styled.div`
  padding-left: 10px;
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  h2{
    //font-family: 'WindSong', cursive;
    font-weight: 100;
    font-size: 50px;
  }
`;

function List() {

  const [ List, setList ] = useState([]);
  const [ IsSortLatest, setIsSortLatest ] = useState(true);

  useEffect(()=>{
    const sort = IsSortLatest ? 'latest' : 'old';

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
        <h2>
          Article List
        </h2>
        <button onClick={()=>setIsSortLatest(!IsSortLatest)}>
          {IsSortLatest ? 
            <>작성일 <FontAwesomeIcon icon={faCaretDown}></FontAwesomeIcon></>
          : <>작성일 <FontAwesomeIcon icon={faCaretUp}></FontAwesomeIcon></>
          }
        </button>
      </BtnSet>
      {List.map(post=>{
        return (
          <Item key={post._id}>
            <Link to={`/detail/${post.communityNum}`}>
              <span>
                {post.communityNum}
              </span>
              <h3>
                  {post.title}
              </h3>
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