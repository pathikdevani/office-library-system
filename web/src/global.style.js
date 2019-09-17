/* cSpell:disable */
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
      "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New",
        monospace;
  }

  #root {
    width: 100%;
    height:100%;
    float: left;
  }

  .logo {
    height: 32px;
    margin: 16px;
  }

  .ant-form {
    > .ant-row {
      margin-bottom: 15px;
      > .ant-form-item-label {
        line-height: normal;
      }
    }
  }

`;

export default GlobalStyle;
