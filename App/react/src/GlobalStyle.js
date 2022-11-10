import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  :root {
  --font-theme: 'Poiret One', cursive;
  }

  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    transition: 0.3s;
  }

  ul,ol,li{
    list-style: none;
  }

  a{
    text-decoration: none;
    color: inherit;
  }

  body{
    font-family: 'Noto Sans KR', sans-serif;
  }
`;

export default GlobalStyle;