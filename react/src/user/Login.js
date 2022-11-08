import Layout from '../common/Layout';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import firebase from '../firebase';
import styled from 'styled-components';

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

  const handleLogin = ()=>{

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
        </ul>
      </form>
      <BtnSet>
        <button>Login</button>
      </BtnSet>
    </Layout>
  )
}

export default Login