import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowsRotate } from '@fortawesome/free-solid-svg-icons';

const ToggleWrapper = styled.div`
  width: 30px;
  height: 30px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  font-size: 14px;
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
      <FontAwesomeIcon icon={faArrowsRotate} />
    </ToggleWrapper>
  );
}

export default ThemeToggle;