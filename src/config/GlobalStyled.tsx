import { createGlobalStyle } from "styled-components";

const GlobalStyled = createGlobalStyle`
    *, html, body {
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
