import Styled from 'styled-components';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../redux/userSlice';
import firebase from '../firebase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faList, faPenNib, faUser, faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons'

const HeaderWrap = Styled.header`
  width: 60px;
  height: 100vh;
  height: 100dvh;
  padding: 30px 0;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  background-color: var(--color-dark-gray);
`;

const Logo = Styled.h1`
  margin-bottom: 10px;
  font-size: 24px;
  text-align: center;
  color: var(--color-white);
  transition: 0.3s;
  &:hover{
    color: var(--color-theme);
  }
`;

const Gnb = Styled.div`
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
            color: var(--color-white);
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
          background-color: var(--color-white);
          .wrap{
            background-color: var(--color-dark-gray);
            .icon{
              background-color: var(--color-white);
              border-radius: 10px 0 0 10px;
              color: var(--color-theme);
            }
          }
          .header{
            height: 10px;
            background-color: var(--color-dark-gray);
            border-radius: 0 0 10px 0;
          }
          .footer{
            height: 10px;
            background-color: var(--color-dark-gray);
            border-radius: 0 10px 0 0;
          }
        }
      }
    }
  }
`;

const Util = Styled.div`
  width: 100%;

  ul{
    li{
      a{
        color: var(--color-white);

        span{
          display: block;
          height: auto;
          max-height: 0;
          font-size: 11px;
          transition: 0.3s;
        }

        &:hover{
          span{
            max-height: 15px;
            font-size: 11px;
          }
        }
      }
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
              <NavLink to='/create'
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
          {User.accessToken &&
            <ul>
              <li>{User.displayName}</li>
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
  )
}

export default Header