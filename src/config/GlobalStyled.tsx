import { createGlobalStyle } from "styled-components";

const GlobalStyled = createGlobalStyle`
    *, html, body {
        margin-top: 0;
        margin-bottom: 0;
        padding-top: 0;
        padding-bottom: 0;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
            'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
            sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    };

    body {
        background-color: #DCDCDC;
    }

`;

export default GlobalStyled;
