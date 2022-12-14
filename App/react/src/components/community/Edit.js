import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import axios from 'axios';
import Layout from '../common/Layout';

const FormWrap = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 20px;
  button{
    margin-right: 10px;
  }
`;

const LabelWrap = styled.label`
  padding-left: 10px;
  margin-bottom: 10px;
  display: block;
  font-size: 24px;
  font-weight: 300;
`;

const PageTitle = styled.div`
  padding-left: 10px;
  margin-bottom: 20px;
  h2{
    font-weight: 100;
    font-size: 50px;
  }
  @media screen and (max-width: ${props=>props.theme.mo}) {
    h2{
      font-size: 30px;
    }
  }
`;

function Edit() {

  const params = useParams();
  const navigate = useNavigate();
  const [ Detail, setDetail ] = useState({});
  const [ Title, setTitle ] = useState('');
  const [ Content, setContent ] = useState('');
  const [ Loaded, setLoaded ] = useState(false);
  const User = useSelector(store=>store.user);

  const handleUpdate = ()=>{
    if (!Title.trim() || !Content.trim()) return alert('제목과 본문을 모두 입력하세요.');
		const item = {
      title: Title,
      content: Content,
      num: params.num
    };

		axios.put('/api/community/edit', item)
      .then(res=>{
        if (res.data.success){
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
    setTitle(Detail.title);
    setContent(Detail.content);
    Detail.title && setLoaded(true);
  }, [Detail])

  useEffect(()=>{
    const item = {num: params.num};
    axios.get('/api/community/detail/'+item.num)
      .then(res=>{
        if (res.data.success) {
          //console.log(res.data.detail);
          setDetail(res.data.detail);
        }
      })
      .catch(error=>{
        console.error(error);
      })
  }, [])
  
  useEffect(()=>{
    if (!Detail.writer) return;
    
    if (User.uid !== Detail.writer.uid) {
      alert('본인만 수정이 가능합니다.');
      navigate(-1);
    }
  }, [Detail])

  return (
    <>
      {Loaded ?
        <Layout name='Edit'>
          <PageTitle>
            <h2>
              Edit an Article
            </h2>
          </PageTitle>
          <FormWrap>
            <li>
              <LabelWrap htmlFor='title'>Title</LabelWrap>
              <input type='text' id='title' 
                defaultValue={Title}
                onChange={(e)=>setTitle(e.target.value)}
              />
            </li>
            <li>
              <LabelWrap htmlFor='content'>Content</LabelWrap>
              <textarea type='text' id='content' 
                cols='30' rows='4'
                defaultValue={Content}
                onChange={(e)=>setContent(e.target.value)}
              />
            </li>
            <li>
              <button className='grayBtn' onClick={()=>navigate(-1)}>Cancel</button>
              <button onClick={handleUpdate}>Update</button>
            </li>
          </FormWrap>
        </Layout>
      : <p>Loading...</p>
      }
    </>
  )
}

export default Edit;