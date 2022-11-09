import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

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
  }, [])

  return (
    <>
      <ul>
        <li>
          <label htmlFor='title'>Title</label>
          <input type='text'
            name='title' id='title'
            value={Title}
            onChange={e=>setTitle(e.target.value)}
          />
        </li>
        <li>
          <label htmlFor='content'>Content</label>
          <textarea
            name='content' id='content'
            cols='30' rows='3'
            value={Content}
            onChange={e=>setContent(e.target.value)}
          ></textarea>
        </li>
        <li>
          <button
            onClick={handleCreate}
          >SEND</button>
        </li>
      </ul>
    </>
  )
}

export default Create;