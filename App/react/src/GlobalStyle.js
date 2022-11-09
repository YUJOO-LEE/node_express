import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  :root {
  --color-black: #000;
  --color-white: #fff;
  --color-theme: hotpink;
  --color-dark-gray: #222;
  --color-white-gray: #efefef;
  --font-theme: 'Poiret One', cursive;
  }

  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  ul,ol,li{
    list-style: none;
  }

  a{
    text-decoration: none;
    color: inherit;
  }

  body{
    background-color: var(--color-white-gray);
    color: var(--color-black);
    font-family: 'Noto Sans KR', sans-serif;
  }
`;

export default GlobalStyle;