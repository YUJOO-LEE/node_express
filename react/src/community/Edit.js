import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../common/Layout';
import Styled from 'styled-components';
import axios from 'axios';

const BtnSet = Styled.div`
  margin-top: 20px;

  button{
    margin-right: 20px;
  }
`

function Edit() {

  const params = useParams();
  const navigate = useNavigate();
  const [ Detail, setDetail ] = useState({});
  const [ Title, setTitle ] = useState('');
  const [ Content, setContent ] = useState('');
  const [ Loaded, setLoaded ] = useState(false);

  const handleUpdate = ()=>{
    if (!Title.trim() || !Content.trim()) return alert('제목과 본문을 모두 입력하세요.');
		const item = {
      title: Title,
      content: Content,
      num: params.num
    };

		axios.post('/api/community/edit', item)
		.then(response=>{
      if (response.data.success){
        alert('글 수정이 완료되었습니다.');
        navigate(`/detail/${params.num}`);
      } else {
        alert('글 수정이 실패했습니다.');
      }
		})
		.catch(err=>{
			console.log(err);
		})
  };

  useEffect(()=>{
    const item = {num: params.num};
    axios.post('/api/community/detail', item)
      .then(respons=>{
        if (respons.data.success) {
          console.log(respons.data.detail);
          setDetail(respons.data.detail);
        }
      })
      .catch(error=>{
        console.error(error);
      })
  }, [])

  useEffect(()=>{
    setTitle(Detail.title);
    setContent(Detail.content);
    setLoaded(true);
  }, [Detail])

  return (
    <Layout name='Edit'>
      {Loaded ?
        <>
          <ul>
            <li>
              <label htmlFor='title'>Title</label>
              <input type='text' id='title' 
                defaultValue={Title}
                onChange={(e)=>setTitle(e.target.value)}
              />
            </li>
            <li>
              <label htmlFor='content'>Content</label>
              <textarea type='text' id='content' 
                cols='30' rows='4'
                defaultValue={Content}
                onChange={(e)=>setContent(e.target.value)}
              />
            </li>
          </ul>
          <BtnSet>
            <button onClick={()=>navigate(-1)}>Cancel</button>
            <button onClick={handleUpdate}>Update</button>
          </BtnSet>
        </>
      : <p>Loading...</p>
      }
    </Layout>
  )
}

export default Edit;