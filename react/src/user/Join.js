import { useState } from 'react';
import styled from 'styled-components';
import Layout from '../common/Layout';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../redux/userSlice';
import firebase from '../firebase';
import axios from 'axios';

const BtnSet = styled.div`
  margin-top: 20px;

  button{
    margin-right: 20px;
  }
`;

function Join() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [ Email, setEmail ] = useState('');
  const [ Pwd1, setPwd1 ] = useState('');
  const [ Pwd2, setPwd2 ] = useState('');
  const [ Name, setName ] = useState('');

  const handleJoin = async ()=>{
    if (!(Name && Email && Pwd1 && Pwd2)) {
      return alert('모든 양식을 입력하세요.');
    }
    if (Pwd1 !== Pwd2) {
      return alert('비밀번호를 동일하게 입력하세요.');
    }
    
    // 입력 조건 통과 후 저장
    // async awiat 로 firebase 와 통신해서 인증처리

    const createdUser = await firebase.auth().createUserWithEmailAndPassword(Email, Pwd1);
    await createdUser.user.updateProfile({
      displayName: Name
    })

    // firebase로 부터 인증 정보값을 받아 객체에 담기
    const item = {
      email: createdUser.user.multiFactor.user.email,
      displayName: createdUser.user.multiFactor.user.displayName,
      uid: createdUser.user.multiFactor.user.uid
    }

    axios.post('/api/user/join', item).then(res=>{
      if (res.data.success) {
        dispatch(logoutUser());
        alert('회원가입에 성공했습니다.');
        navigate('/login');
      } else {
        return alert('회원가입에 실패했습니다.');
      }
    })
  }

  return (
    <Layout name='Join'>
      <form onSubmit={handleJoin}>
        <ul>
          <li>
            <input type='email' value={Email} 
              placeholder='이메일 주소를 입력하세요' 
              onChange={e=> setEmail(e.target.value)}
              autoComplete='email'
            />
          </li>
          <li>
            <input type='password' value={Pwd1} 
              placeholder='비밀번호를 입력하세요' 
              onChange={e=> setPwd1(e.target.value)}
              autoComplete='new-password'
            />
          </li>
          <li>
              <input type='password' value={Pwd2} 
              placeholder='비밀번호를 재입력하세요' 
              onChange={e=> setPwd2(e.target.value)}
              autoComplete='new-password'
            />
          </li>
          <li>
            <input type='text' value={Name} 
              placeholder='이름을 입력하세요' 
              onChange={e=> setName(e.target.value)}
            />
          </li>
        </ul>
      </form>
      <BtnSet>
        <button onClick={()=>navigate(-1)}>Cancel</button>
        <button onClick={handleJoin}>Join</button>
      </BtnSet>
    </Layout>
  )
}

export default Join