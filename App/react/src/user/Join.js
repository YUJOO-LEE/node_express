import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../redux/userSlice';
import firebase from '../firebase';
import axios from 'axios';
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
    text-align: left;
  }
`;

function Join() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [ Email, setEmail ] = useState('');
  const [ Pwd1, setPwd1 ] = useState('');
  const [ Pwd2, setPwd2 ] = useState('');
  const [ Name, setName ] = useState('');
  const [ Err, setErr ] = useState('');

  const handleJoin = async (e)=>{
    e.preventDefault();
    if (!(Name && Email && Pwd1 && Pwd2)) {
      setErr('모든 양식을 입력하세요.');
      return;
    }
    if (Pwd1 !== Pwd2) {
      setErr('비밀번호를 동일하게 입력하세요.');
      return;
    }
    
    // 입력 조건 통과 후 저장
    try{
      // async awiat 로 firebase 와 통신해서 인증처리
      const createdUser = await firebase.auth().createUserWithEmailAndPassword(Email, Pwd1);
      await createdUser.user.updateProfile({
        displayName: Name
      })

      // firebase로 부터 인증 정보값을 받아 객체에 담기
      const item = {
        email: createdUser.user.multiFactor.user.email,
        displayName: createdUser.user.multiFactor.user.displayName,
        uid: createdUser.user.multiFactor.user.uid,
      }
  
      firebase.auth().signOut();
      dispatch(logoutUser());
  
      axios.post('/api/user/join', item).then(res=>{
        if (res.data.success) {
          alert('회원가입에 성공했습니다.');
          navigate('/login');
        } else {
          return alert('회원가입에 실패했습니다.');
        }
      })
    } catch (err) {
      console.log(err.code);
      if (err.code === 'auth/invalid-email') {
        setErr('이메일을 형식에 맞게 입력하세요.');
      } else if (err.code === 'auth/weak-password') {
        setErr('비밀번호를 6자 이상 입력하세요.');
      } else if (err.code === 'auth/email-already-in-use') {
        setErr('이미 가입된 이메일입니다.');
      } else {
        setErr('가입에 실패했습니다.');
      }
    }
  }

  return (
    <Layout name='Join'>
      <Inner onSubmit={handleJoin} action='#'>
        <PageTitle>
          <h2>
            Join
          </h2>
        </PageTitle>
        <FormWrap>
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
          {Err && 
            <li className='errMsg'>
              {Err}
            </li>
          }
          <BtnSet>
            <button type='button' className='grayBtn' onClick={()=>navigate(-1)}>Cancel</button>
            <button type='submit'>Join</button>
          </BtnSet>
        </FormWrap>
      </Inner>
    </Layout>
  )
}

export default Join