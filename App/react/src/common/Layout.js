import styled from 'styled-components';

const MainWrap = styled.main`
  width: 100%;
  height: 100vh;
  height: 100dvh;
  padding: 50px 50px 50px 100px;
  overflow: hidden;
  position: relative;

  button{
    padding: 10px 15px;
    background-color: var(--color-theme);
    border: 0;
    outline: 0;
    border-radius: 10px;
    font-family: inherit;
    font-weight: 300;
    color: var(--color-black);
    cursor: pointer;
    transition: 0.3s;
    &:hover{
      box-shadow: 0 5px 10px rgba(0,0,0,0.1);
    }
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