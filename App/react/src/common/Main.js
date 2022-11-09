import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import axios from 'axios';
import Layout from './Layout';

const Inner = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  right: 0;
  background-color: var(--color-dark-gray);
`;

const WelcomeMsg = styled.h2`
  width: 100%;
  height: 60%;
  text-align: center;
  position: relative;

  .userName{
    font-family: 'Montserrat', sans-serif;
    font-size: 4vw;
    font-weight: 800;
    color: #181818;
    position: absolute;
    top: 30%;
    left: 50%;
    z-index: 0;
    transform: translateX(-50%);
  }
  .back{
    font-family: 'Montserrat', sans-serif;
    font-size: 20vw;
    font-weight: 800;
    color: #181818;
    position: absolute;
    top: 70%;
    left: 50%;
    z-index: 0;
    transform: translate(-50%, -50%);
  }
  .front{
    font-family: 'WindSong', cursive;
    font-size: 5vw;
    font-weight: 100;
    color: var(--color-white);
    position: absolute;
    top: 70%;
    left: 50%;
    z-index: 1;
    transform: translate(-50%, -50%);
  }
`;

const MainList = styled.section`
  width: 70%;
  margin: 30px auto 0;
  display: flex;
  justify-content: space-between;
  align-content: flex-start;
  flex-wrap: wrap;

  article{
    width: 31%;
    height: 150px;
    background: rgba(255,255,255,0.2);
    padding: 20px;
    display: flex;
    align-content: space-between;
    flex-wrap: wrap;

    h2{
      font-weight: 100;
      font-size: 18px;
      color: var(--color-white);
      width: 100%;
    }
    p{
      font-size: 11px;
      font-weight: 100;
      color: var(--color-white);
    }
  }
`;

function Main() {
  const [ List, setList ] = useState([]);
  const User = useSelector(store=>store.user);

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
    <Inner>
      <WelcomeMsg>
        {User.displayName && 
          <span className='userName'>{User.displayName}</span>
        }
        <span className='back'>HELLO</span>
        <span className='front'>Yujoo's world</span>
      </WelcomeMsg>
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
    </Inner>
  )
}

export default Main