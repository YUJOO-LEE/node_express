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

function List() {

  const [ List, setList ] = useState([]);

  useEffect(()=>{
    axios.post('/api/community/read')
      .then(response=>{
        if (response.data.success) {
          console.log(response.data.communityList.length);
          setList(response.data.communityList);
        }
      })
      .catch(error=>{
        console.log(error);
      })
  }, []);

  return (
    <Layout name='List'>
      {List.map(post=>{
        return (
          <Item key={post._id}>
            <h2>
              <Link to={`/detail/${post.communityNum}`}>
                {post.title}
              </Link>
            </h2>
          </Item>
        )
      })}
    </Layout>
  )
}

export default List