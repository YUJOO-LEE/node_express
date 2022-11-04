import axios from 'axios';
import { useEffect, useState } from 'react';
import Layout from '../common/Layout';

function List() {

  const [ List, setList ] = useState([]);

  useEffect(()=>{
    axios.post('/api/read')
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
          <article key={post._id}>
            <h2>{post.title}</h2>
          </article>
        )
      })}
    </Layout>
  )
}

export default List