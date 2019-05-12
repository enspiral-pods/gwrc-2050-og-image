
import { readFileSync } from 'fs';
import { sanitizeHtml } from './sanitizer';

const bold = readFileSync(`${__dirname}/../.fonts/Inter-Bold.woff2`).toString('base64');
const globe = readFileSync(`${__dirname}/../public/globe.png`).toString('base64');

function getCss() {
    const background = 'black';
    const foreground = 'white';
    const radial = 'dimgray';

    return `
    @font-face {
        font-family: 'Inter';
        font-style:  normal;
        font-weight: bold;
        src: url(data:font/woff2;charset=utf-8;base64,${bold}) format('woff2');
    }

    body {
        background: ${background};
        background-image: radial-gradient(${radial} 5%, transparent 0);
        background-size: 60px 60px;
        height: 100vh;
        display: flex;
    }

    .logo-wrapper {
        display: flex;
        align-items: center;
        align-content: center;
        justify-content: center;
        justify-items: center;
    }

    .logo {
        margin: 75px 0;
    }

    .spacer {
        margin-top: 100px;
        margin-bottom: 100px;
    }

    .container {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      margin: 100px;
    }

    .heading {
        font-family: 'Inter', sans-serif;
        font-size: 90px;
        font-style: normal;
        font-weight: bold;
        color: ${foreground};
        line-height: 1.4;
    }`;
}

export function getHtml(parsedReq: any) {
    const { text, increase } = parsedReq;
    return `<!DOCTYPE html>
<html>
    <meta charset="utf-8">
    <title>Generated Image</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>
        ${getCss()}
    </style>
    <body>
        <div class="container">
            <div class="logo-wrapper">
                <img class="logo" alt="globe" width=174" height=174" src="data:image/png;base64,${globe}" />
            </div>
            <div class="heading">My choices could ${increase ? 'increase' : 'reduce'}</div>
            <div class="heading">Wellington's emissions by</div>
            <div class="heading">${sanitizeHtml(text)}%.</div>
            <div class="spacer">
            <div class="heading">What would your choices do?</div>
        </div>
    </body>
</html>`;
}
