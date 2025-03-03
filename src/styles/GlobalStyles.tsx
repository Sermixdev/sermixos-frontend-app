import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  @font-face {
    font-family: 'MS Sans Serif';
    src: url('https://unpkg.com/98.css@0.1.17/dist/ms_sans_serif.woff2') format('woff2');
    font-weight: normal;
    font-style: normal;
  }

  @font-face {
    font-family: 'MS Sans Serif';
    src: url('https://unpkg.com/98.css@0.1.17/dist/ms_sans_serif_bold.woff2') format('woff2');
    font-weight: bold;
    font-style: normal;
  }

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html, body {
    height: 100%;
    width: 100%;
    overflow: hidden;
    font-family: 'MS Sans Serif', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-size: 14px;
    color: #000000;
  }

  #root {
    height: 100%;
    width: 100%;
  }

  /* Scrollbar styling */
  ::-webkit-scrollbar {
    width: 16px;
    height: 16px;
  }

  ::-webkit-scrollbar-track {
    background: #dfdfdf;
    border-left: 1px solid #c0c0c0;
  }

  ::-webkit-scrollbar-thumb {
    background: #c0c0c0;
    border: 1px solid #808080;
    border-right: none;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #a0a0a0;
  }

  ::-webkit-scrollbar-button {
    display: block;
    height: 16px;
    width: 16px;
    background-color: #c0c0c0;
    border: 1px solid #808080;
    box-shadow: inset 1px 1px 0 #ffffff, inset -1px -1px 0 #808080;
  }

  ::-webkit-scrollbar-button:vertical:start:decrement {
    background-position: center 4px;
    background-repeat: no-repeat;
    background-size: 8px 4px;
  }

  ::-webkit-scrollbar-button:vertical:end:increment {
    background-position: center 4px;
    background-repeat: no-repeat;
    background-size: 8px 4px;
  }

  /* Animation classes */
  .animate-spin {
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  /* Mobile responsiveness */
  @media (max-width: 768px) {
    ::-webkit-scrollbar {
      width: 8px;
      height: 8px;
    }

    ::-webkit-scrollbar-button {
      display: none;
    }
  }
`;

export default GlobalStyles;