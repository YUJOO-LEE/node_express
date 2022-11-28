import { lightTheme, darkTheme } from './theme';
import { createContext, useState, useContext, useCallback } from 'react';
import { ThemeProvider as StyledProvider } from 'styled-components';

const ThemeContext = createContext({});

const ThemeProvider = ({children}) => {
  // 쿠키 내용 불러오기
  let cookieTheme;
  if(document.cookie.indexOf('theme') >= 0) {
    cookieTheme = document.cookie.split(';')[document.cookie.indexOf('theme')].slice(6);
  } else {
    cookieTheme = 'dark';
  }
  const [ThemeMode, setThemeMode] = useState(cookieTheme);
  // 저장된 값에 따라 객체 불러오기
  const themeObject = ThemeMode === 'light' ? lightTheme : darkTheme;

  return(
    <ThemeContext.Provider value={{ ThemeMode, setThemeMode }}>
      <StyledProvider theme={themeObject}>
        { children }
      </StyledProvider>      
    </ThemeContext.Provider>
  )
}

const setCookie = (value)=>{
  const today = new Date(); // 현재 날짜 시간 생성
  const date = today.getDate(); // 생성된 날의 '일' 사용
  today.setDate(date + 7);  // 오늘부터 7일 뒤 만료
  const duedate = today.toGMTString();  // 문자로 변환

  document.cookie = `theme=${value}; path="/"; expires=${duedate}`;
}

const useTheme = () => {
  const context = useContext(ThemeContext);
  const { ThemeMode, setThemeMode } = context;

  const toggleTheme = useCallback((value) => {
    if (value) {
      setThemeMode(value);
      setCookie(value);
      return
    }

    if (ThemeMode === 'light') {
      setThemeMode('dark');
      setCookie('dark');
    }
    else {
      setThemeMode('light');
      setCookie('light');
    };
  }, [ThemeMode, setThemeMode]);
  
  return [ ThemeMode, toggleTheme];
}

export { ThemeProvider, useTheme };