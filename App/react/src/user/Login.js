import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import firebase from '../firebase';
import styled from 'styled-components';
import Layout from '../common/Layout';

const Inner = styled.form`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const FormWrap = styled.ul`
  width: 30%;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const BtnSet = styled.li`
  display: flex;
  justify-content: space-between;
`;

const PageTitle = styled.div`
  padding-left: 10px;
  margin-bottom: 20px;
  h2{
    font-weight: 100;
    font-size: 50px;
  }
`;

function Login() {

  const navigate = useNavigate();
  const [ Email, setEmail ] = useState('');
  const [ Pwd, setPwd ] = useState('');
  const [ Err, setErr ] = useState('');

  const handleLogin = async (e)=>{
    e.preventDefault();
    if (!(Email && Pwd)) {
      setErr('이메일과 비밀번호를 입력하세요.');
      return;
    }

    try{
      await firebase.auth().signInWithEmailAndPassword(Email, Pwd);
      navigate('/');
    } catch (err) {
      console.log(err.code);
      if (err.code === 'auth/invalid-email') {
        setErr('이메일을 형식에 맞게 입력하세요.')
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
      <Inner onSubmit={handleLogin} action='#'>
        <PageTitle>
          <h2>
            Login
          </h2>
        </PageTitle>
        <FormWrap>
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
          <BtnSet>
            <button type='button' className='grayBtn' onClick={()=>navigate('/join')}>Join</button>
            <button type='submit'>Login</button>
          </BtnSet>
        </FormWrap>
      </Inner>
    </Layout>
  )
}

export default Login