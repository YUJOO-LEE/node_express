import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../redux/userSlice';
import firebase from '../firebase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faList, faPenNib, faUser, faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import styled from 'styled-components';
import { useTheme } from '../theme/themeProvider';
import ThemeToggle from './ThemeToggle';
import Popup from './Popup';
import { useState } from 'react';

const HeaderWrap = styled.header`
  width: 60px;
  height: 100vh;
  height: 100dvh;
  padding: 30px 0;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  background-color: ${props=>props.theme.bgColor};
`;

const Logo = styled.h1`
  margin-bottom: 10px;
  font-size: 24px;
  text-align: center;
  color: ${props=>props.theme.normalColor};
  transition: 0.3s;
  &:hover{
    color: ${props=>props.theme.pointColor};
  }
`;

const Gnb = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  ul{
    width: 100%;
    li{
      padding: 5px 0;
      >a{
        display: block;
        .wrap{
          display: block;
          .icon{
            width: 100%;
            padding: 15px 10px;
            font-size: 18px;
            color: ${props=>props.theme.normalColor};
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;

            .txt{
              height: auto;
              max-height: 0;
              overflow: hidden;
              font-size: 11px;
              transition: 0.3s;
            }
          }
        }
        .header,.footer{
          display: block;
          width: 100%;
          height: 0;
        }
        &:hover{
          .wrap{
            .icon{
              .txt{
                padding-top: 10px;
                max-height: 25px;
                font-size: 11px;
              }
            }
          }
        }
        &.active{
          margin-left: 10px;
          background-color: ${props=>props.theme.brightColor};
          .wrap{
            background-color: ${props=>props.theme.bgColor};
            .icon{
              background-color: ${props=>props.theme.brightColor};
              border-radius: 10px 0 0 10px;
              color: ${props=>props.theme.pointColor};
            }
          }
          .header{
            height: 10px;
            background-color: ${props=>props.theme.bgColor};
            border-radius: 0 0 10px 0;
          }
          .footer{
            height: 10px;
            background-color: ${props=>props.theme.bgColor};
            border-radius: 0 10px 0 0;
          }
        }
      }
    }
  }
`;

const Util = styled.div`
  width: 100%;

  ul{
    li{
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top: 15px;

      a{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        color: ${props=>props.theme.normalColor};

        span{
          display: block;
          height: auto;
          max-height: 0;
          overflow: hidden;
          font-size: 11px;
          transition: 0.3s;
        }

        &:hover{
          span{
            max-height: 20px;
            font-size: 11px;
          }
        }
      }
    }
  }
`;

const Circle = styled.div`
  width: 30px;
  height: 30px;
  overflow: hidden;
  border: 1px solid ${props=>props.theme.normalColor};
  border-radius: 50%;
  text-align: center;
  color: ${props=>props.theme.normalColor};
`;

function Header() {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const activeStyle = { color: 'hotpink'};
  const User = useSelector(store=> store.user);
  const [ OnPopup, setOnPopup ] = useState(document.cookie.indexOf('theme') === -1 ? true : false);
  const [ Theme, setTheme ] = useTheme(); 

  const handleLogout = (e)=>{
    e.preventDefault();
    firebase.auth().signOut();
    dispatch(logoutUser());
    alert('로그아웃 되었습니다.');
    navigate('/');
  }
  
  return (
    <>
    {OnPopup &&
      <Popup setTheme={setTheme} Theme={Theme} setOnPopup={setOnPopup}></Popup>
    }
    <HeaderWrap>
      <Gnb id='gnb'>
        <Logo>
          <NavLink to='/'>
            <FontAwesomeIcon icon={faHouse} />
          </NavLink>
        </Logo>
        <ul>
          <li>
            <NavLink to='/list'
              style={({isActive})=> isActive ? activeStyle : null}
            >
              <span className='header'></span>
              <span className='wrap'>
                <span className='icon'>
                  <FontAwesomeIcon icon={faList} />
                  <span className='txt'>List</span>
                </span>
              </span>
              <span className='footer'></span>
            </NavLink>
          </li>
          {User.accessToken ?
            <li>
              <NavLink to='/write'
                style={({isActive})=> isActive ? activeStyle : null}
              >
                <span className='header'></span>
                <span className='wrap'>
                  <span className='icon'>
                    <FontAwesomeIcon icon={faPenNib} />
                    <span className='txt'>Write</span>
                  </span>
                </span>
                <span className='footer'></span>
              </NavLink>
            </li>
          :
            <li>
              <NavLink to='/login'
                style={({isActive})=> isActive ? activeStyle : null}
              >
                <span className='header'></span>
                <span className='wrap'>
                  <span className='icon'>
                    <FontAwesomeIcon icon={faUser} />
                    <span className='txt'>Login</span>
                  </span>
                </span>
                <span className='footer'></span>
              </NavLink>
            </li>
          }
        </ul>
        <Util>
          <ThemeToggle setTheme={setTheme} Theme={Theme}></ThemeToggle>
          {User.accessToken &&
            <ul>
              <li>
                <Circle>
                  {User.displayName}
                </Circle>
              </li>
              <li>
                <Link
                  onClick={handleLogout}
                >
                  <FontAwesomeIcon icon={faArrowRightFromBracket}></FontAwesomeIcon>
                  <span>Logout</span>
                </Link>
              </li>
            </ul>
          }
        </Util>
      </Gnb>
    </HeaderWrap>
  </>
  )
}

export default Header;