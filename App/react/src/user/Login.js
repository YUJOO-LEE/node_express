import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import firebase from '../firebase';
import styled from 'styled-components';
import Layout from '../common/Layout';

const BtnSet = styled.div`
  margin-top: 20px;

  button{
    margin-right: 20px;
  }
`;

function Login() {

  const navigate = useNavigate();
  const [ Email, setEmail ] = useState('');
  const [ Pwd, setPwd ] = useState('');
  const [ Err, setErr ] = useState('');

  const handleLogin = async ()=>{
    if (!(Email && Pwd)) {
      return alert('이메일과 비밀번호를 입력하세요.');
    }

    try{
      await firebase.auth().signInWithEmailAndPassword(Email, Pwd);
      navigate('/');
    } catch (err) {
      console.log(err.code);
      if (err.code === 'auth/invalid-email') {
        setErr('이메일 형식을 확인하세요.')
      } else if (err.code === 'auth/user-not-found') {
        setErr('존재하지 않는 이메일 입니다.')
      } else if (err.code === 'auth/wrong-password') {
        setErr('비밀번호 정보가 일치하지 않습니다.')
      } else {
        setErr('로그인에 실패했습니다.')
      }
    }

  }

  return (
    <Layout name='Login'>
      <form onSubmit={handleLogin}>
        <ul>
          <li>
            <input type='email' value={Email} 
              placeholder='이메일 주소를 입력하세요.' 
              onChange={e=>setEmail(e.target.value)}
              autoComplete='email'
            />
          </li>
          <li>
            <input type='password' value={Pwd} 
              placeholder='비밀번호를 입력하세요.' 
              onChange={e=>setPwd(e.target.value)}
              autoComplete='current-password'
            />
          </li>
          {Err && 
            <li className='errMsg'>
              {Err}
            </li>
          }
        </ul>
      </form>
      <BtnSet>
        <button onClick={handleLogin}>Login</button>
        <button onClick={()=>navigate('/join')}>Join</button>
      </BtnSet>
    </Layout>
  )
}

export default Login