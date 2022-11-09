import styled from 'styled-components';

const MainWrap = styled.main`
  width: 100%;
  height: 100vh;
  height: 100dvh;
  padding: 50px 50px 50px 100px;
  overflow: hidden;
  position: relative;
`;

function Layout({children, name}) {
  return (
    <MainWrap className={`content ${name}`}>
      {children}
    </MainWrap>
  )
}

export default Layout