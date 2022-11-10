import styled from 'styled-components';

const ToggleWrapper = styled.div`
  width: 35px;
  height: 35px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  font-size: 11px;
  font-weight: 300;
  border-width: 2px;
  border-style: solid;
  box-shadow: 0 5px 10px rgba(0,0,0,0.3);
  cursor: pointer;

  &.dark{
    border-color: #000;
    background-color: #fff;
    color: #000;
  }
  &.light{
    border-color: #fff;
    background-color: #222;
    color: #fff;
  }
`;
function ThemeToggle({ setTheme, Theme }) {
  return (
    <ToggleWrapper onClick={()=>setTheme()} Theme={Theme} className={Theme}>
      {Theme === 'dark' ? 'light' : 'dark'}
    </ToggleWrapper>
  );
}

export default ThemeToggle;