import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  :root {
    --font-system: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Liberation Sans', Arial, sans-serif;
    --font-size-base: 14px;
    --font-size-sm: 12px;
    --font-size-lg: 16px;
    --font-size-xl: 20px;
    --font-size-xxl: 24px;
    --line-height-base: 1.5;
    --font-weight-normal: 400;
    --font-weight-medium: 500;
    --font-weight-bold: 600;
  }

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  html, body {
    height: 100%;
    width: 100%;
    overflow: hidden;
    font-family: var(--font-system);
    font-size: var(--font-size-base);
    line-height: var(--line-height-base);
    color: #000000;
  }

  h1 {
    font-size: var(--font-size-xxl);
    font-weight: var(--font-weight-bold);
    line-height: 1.2;
  }

  h2 {
    font-size: var(--font-size-xl);
    font-weight: var(--font-weight-bold);
    line-height: 1.3;
  }

  h3 {
    font-size: var(--font-size-lg);
    font-weight: var(--font-weight-medium);
    line-height: 1.4;
  }

  p {
    font-size: var(--font-size-base);
    line-height: var(--line-height-base);
  }

  button, input, select, textarea {
    font-family: var(--font-system);
    font-size: var(--font-size-base);
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