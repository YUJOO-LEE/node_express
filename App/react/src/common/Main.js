import React, { useEffect, useState } from 'react';
import Layout from './Layout';
import axios from 'axios';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const MainList = styled.section`
  width: 100%;
  margin-top: 50px;
  display: flex;
  justify-content: space-between;
  align-content: flex-start;
  flex-wrap: wrap;

  article{
    width: 31%;
    height: 200px;
    background-color: #fff;
    padding: 20px;
    display: flex;
    align-content: space-between;
    flex-wrap: wrap;

    h2{
      width: 100%;
    }
  }
`;

function Main() {
  const [ List, setList ] = useState([]);

  useEffect(()=>{
    const item = {count: 3};
    axios.get('/api/community/read?count='+item.count)
      .then(res=>{
        if(res.data.success) {
          setList(res.data.communityList);
        }
      })
      .catch(err=>{
        console.error(err);
      })
  }, []);

  return (
    <Layout name='Main'>
      <MainList>
        {List.map((post)=>{
          return(
            <article key={post._id}>
              <h2>
                <Link to={`/detail/${post.communityNum}`}>
                  {post.title}
                </Link>
              </h2>
              <div className='info'>
                <p>
                  {post.writer.displayName}
                </p>
                <p>
                  {post.createdAt.split('T')[0]}
                </p>
              </div>
            </article>
          );
        })}
      </MainList>
    </Layout>
  )
}

export default Main