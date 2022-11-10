import styled from 'styled-components';

const MainWrap = styled.main`
  width: 100%;
  height: auto;
  min-height: 100vh;
  min-height: 100dvh;
  padding: 50px 50px 50px 100px;
  overflow: hidden;
  position: relative;
  color: ${props=>props.theme.normalColor};

  button{
    padding: 10px 15px;
    background-color: ${props=>props.theme.pointColor};
    border: 0;
    outline: 0;
    border-radius: 10px;
    font-family: inherit;
    font-weight: 500;
    color: ${props=>props.theme.normalColor};
    cursor: pointer;
    transition: 0.3s;
    &:hover{
      box-shadow: 0 5px 10px rgba(0,0,0,0.1);
    }
    &.grayBtn{
    background-color: ${props=>props.theme.darkColor};
    color: ${props=>props.theme.brightColor};
    font-weight: 300;
    }
  }

  input,textarea{
    width: 100%;
    padding: 10px;
    border: 0;
    outline: 0;
    background-color: ${props=>props.theme.bgColor};
    color: inherit;
    border-radius: 10px;
    font-family: inherit;
    font-size: 18px;
    font-weight: 100;
    resize: none;
  }

  .errMsg{
    font-size: 14px;
    font-weight: 300;
    color: ${props=>props.theme.pointColor};
  }

  @media screen and (max-width: ${props=>props.theme.mo}) {
    padding: 80px 20px 20px;
  }

`;


function Layout({children, name}) {
  return (
    <MainWrap className={`content ${name}`}>
      {children}
    </MainWrap>
  )
}

export default Layout