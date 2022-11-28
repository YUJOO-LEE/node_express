import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Layout from '../common/Layout';
import styled from 'styled-components';

const FormWrap = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 20px;
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

function Create() {

  const navigate = useNavigate();
  const User = useSelector(store=> store.user);
  const [ Title, setTitle ] = useState('');
	const [ Content, setContent ] = useState('');

	const handleCreate = ()=>{
    if (!Title.trim() || !Content.trim()) return alert('제목과 본문을 모두 입력하세요.');
		const item = {
      title: Title,
      content: Content,
      uid: User.uid
    };

		axios.post('/api/community/create', item)
		.then(res=>{
      if (res.data.success){
        alert('글 저장이 완료되었습니다.');
        navigate('/list');
      } else {
        alert('글 저장이 실패했습니다.');
      }
		})
		.catch(err=>{
			console.log(err);
		})
	}

  useEffect(()=>{
    if (User && !User.uid) {
      alert('로그인 후 작성이 가능합니다.');
      navigate('/login');
    }
  }, [User, navigate])

  return (
    <Layout name='Create'>
      <PageTitle>
        <h2>
          Write a new Article
        </h2>
      </PageTitle>
      <FormWrap>
        <li>
          <LabelWrap htmlFor='title'>Title</LabelWrap>
          <input type='text'
            name='title' id='title'
            value={Title}
            onChange={e=>setTitle(e.target.value)}
          />
        </li>
        <li>
          <LabelWrap htmlFor='content'>Content</LabelWrap>
          <textarea
            name='content' id='content'
            cols='30' rows='10'
            value={Content}
            onChange={e=>setContent(e.target.value)}
          ></textarea>
        </li>
        <li>
          <button
            onClick={handleCreate}
          >SEND</button>
        </li>
      </FormWrap>
    </Layout>
  )
}

export default Create;