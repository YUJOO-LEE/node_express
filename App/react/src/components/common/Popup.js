import React, { useState } from 'react';
import styled from 'styled-components';

const PopupWrap = styled.div`
  width: 100%;
  height: 100vh;
  height: 100dvh;
  position: fixed;
  z-index: 100;
  backdrop-filter: blur(10px);
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.5s;
  
  ul{
    width: max(30%, 280px);
    padding: 50px 30px 30px;
    display: flex;
    flex-direction: column;
    background-color: ${props=>props.theme.brightColor};
    color: ${props=>props.theme.normalColor};
    text-align: center;
    box-shadow: 0 10px 20px rgba(0,0,0,0.2);
  }

  &.off{
    backdrop-filter: blur(0);
    opacity: 0;
    ul{
      transform: translateY(100px);
    }
  }
`;

const BtnSet = styled.li`
  text-align: right;
  button{
    padding: 10px 15px;
    margin-top: 20px;
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
`;

const Title = styled.h2`
  margin-bottom: 20px;
  font-size: 18px;
  font-weight: 300;
  color: ${props=>props.theme.pointColor};
`;

const ThemeOption = styled.span`
  width: 40px;
  height: 40px;
  margin: 10px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  font-size: 11px;
  font-weight: 300;
  border-width: 2px;
  border-style: solid;
  box-shadow: 0 5px 10px rgba(0,0,0,0.3);
  cursor: pointer;

  &:nth-of-type(1){
    border-color: #fff;
    background-color: #222;
    color: #fff;
  }
  &:nth-of-type(2){
    border-color: #000;
    background-color: #fff;
    color: #000;
  }
  &.on{
    border-color: ${props=>props.theme.pointColor};
  }
`;

function Popup({ setTheme, Theme, setOnPopup }) {

  const [ Closed, setClosed ] = useState(false);
  const [ Selected, setSelected ] = useState(false);

  return (
    <PopupWrap className={Closed ? 'off' : null}>
      <ul>
        <li>
          <Title>
            테마를 선택 해 주세요.
          </Title>
        </li>
        <li>
          <p>
            <ThemeOption onClick={()=>{
              setTheme('dark');
              setSelected(true);
            }}
              className={Theme === 'dark' ? 'on' : null}
            >
              Dark
            </ThemeOption>
            <ThemeOption onClick={()=>{
              setTheme('light');
              setSelected(true);
            }}
              className={Theme === 'light' ? 'on' : null}
            >
              Light
            </ThemeOption>
          </p>
        </li>
        <BtnSet>
          <button onClick={()=>{
            if (!Selected) setTheme('dark');
            setClosed(true);
            setTimeout(()=>{
              setOnPopup(false);  
            }, 500);
          }}>
            저장
          </button>
        </BtnSet>
      </ul>
    </PopupWrap>
  )
}

export default Popup;