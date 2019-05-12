
import { readFileSync } from 'fs';
import { sanitizeHtml } from './sanitizer';

const regular = readFileSync(`${__dirname}/../.fonts/Inter-Regular.woff2`).toString('base64');
const bold = readFileSync(`${__dirname}/../.fonts/Inter-Bold.woff2`).toString('base64');
const mono = readFileSync(`${__dirname}/../.fonts/Vera-Mono.woff2`).toString('base64');

const globe = readFileSync(`${__dirname}/../public/globe.png`).toString('base64');

function getCss(theme: string, fontSize: string) {
    let background = 'white';
    let foreground = 'black';
    let radial = 'lightgray';

    if (theme === 'dark') {
        background = 'black';
        foreground = 'white';
        radial = 'dimgray';
    }
    return `
    @font-face {
        font-family: 'Inter';
        font-style:  normal;
        font-weight: normal;
        src: url(data:font/woff2;charset=utf-8;base64,${regular}) format('woff2');
    }

    @font-face {
        font-family: 'Inter';
        font-style:  normal;
        font-weight: bold;
        src: url(data:font/woff2;charset=utf-8;base64,${bold}) format('woff2');
    }

    @font-face {
        font-family: 'Vera';
        font-style: normal;
        font-weight: normal;
        src: url(data:font/woff2;charset=utf-8;base64,${mono})  format("woff2");
      }

    body {
        background: ${background};
        background-image: radial-gradient(${radial} 5%, transparent 0);
        background-size: 60px 60px;
        height: 100vh;
        display: flex;
    }

    code {
        color: #D400FF;
        font-family: 'Vera';
        white-space: pre-wrap;
        letter-spacing: -5px;
    }

    code:before, code:after {
        content: '\`';
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

    .plus {
        color: #BBB;
        font-family: Times New Roman, Verdana;
        font-size: 100px;
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
        font-size: ${sanitizeHtml(fontSize)};
        font-style: normal;
        font-weight: bold;
        color: ${foreground};
        line-height: 1.4;
    }`;
}

export function getHtml(parsedReq: ParsedRequest) {
    const { text, theme } = parsedReq;
    return `<!DOCTYPE html>
<html>
    <meta charset="utf-8">
    <title>Generated Image</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>
        ${getCss(theme, '90px')}
    </style>
    <body>
        <div class="container">
            <div class="logo-wrapper">
                <img class="logo" alt="globe" width=174" height=174" src="data:image/png;base64,${globe}" />
            </div>
            <div class="heading">My choices could reduce</div>
            <div class="heading">Wellington's emissions by</div>
            <div class="heading">${sanitizeHtml(text)}.</div>
            <div class="spacer">
            <div class="heading">What would your choices do?</div>
        </div>
    </body>
</html>`;
}
//
// function getImage(src: string, width ='auto', height = '225') {
//     return `<img
//         class="logo"
//         alt="Generated Image"
//         src="${sanitizeHtml(src)}"
//         width="${sanitizeHtml(width)}"
//         height="${sanitizeHtml(height)}"
//     />`
// }
//
// function getPlusSign(i: number) {
//     return i === 0 ? '' : '<div class="plus">+</div>';
// }
