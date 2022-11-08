import Styled from 'styled-components';
import { useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../redux/userSlice';
import firebase from '../firebase';

const HeaderWrap = Styled.header`
  width: 350px;
  height: 100vh;
  background: #222;
  position: fixed;
  top: 0;
  left: 0;
  padding: 50px;
`;

const Logo = Styled.h1`
  margin-bottom: 40px;
  a{
    font: 50px/1 'arial';
    color: #fff;
  }
`;

const Gnb = Styled.ul`
  a{
    display: block;
    padding: 10px;
    font: bold 16px/1 'arial';
    color: #bbb;

    &:hover{
      color: hotpink;
    }
  }
`;

const Util = Styled.ul`
  position: absolute;
  bottom: 50px;
  left: 50px;
  display: flex;
  gap: 20px;
  li{
    color: #777;

    a{
      font: 14px/1 'arial';
      color: #777;
    }
  }

`;

function Header() {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const activeStyle = { color: 'hotpink'};
  const User = useSelector(store=> store.user);

  const handleLogout = (e)=>{
    e.preventDefault();
    firebase.auth().signOut();
    dispatch(logoutUser());
    alert('로그아웃 되었습니다.');
    navigate('/');
  }
  
  return (
    <HeaderWrap>
      <Logo>
        <NavLink to='/'>
          LOGO
        </NavLink>
      </Logo>

      <Gnb id='gnb'>
        <li>
          <NavLink to='/list'
            style={({isActive})=> isActive ? activeStyle : null}
          >
            Show List
          </NavLink>
        </li>
        {User.accessToken &&
          <li>
            <NavLink to='/create'
              style={({isActive})=> isActive ? activeStyle : null}
            >
              Write Post
            </NavLink>
          </li>
        }
      </Gnb>

      <Util>
        {User.accessToken 
        ? 
          <>
            <li>{User.displayName} 님 환영합니다.</li>
            <li>
              <Link
                onClick={handleLogout}
              >
                Logout
              </Link>
            </li>
          </>
        :
          <>
            <li>
              <NavLink to='/login'
                style={({isActive})=> isActive ? activeStyle : null}
              >
                Login
              </NavLink>
            </li>
            <li>
              <NavLink to='/join'
                style={({isActive})=> isActive ? activeStyle : null}
              >
                Join
              </NavLink>
            </li>
          </>
        }
      </Util>
    </HeaderWrap>
  )
}

export default Header