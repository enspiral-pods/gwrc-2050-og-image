
import { readFileSync } from 'fs';
import { sanitizeHtml } from './sanitizer';

const regular = readFileSync(`${__dirname}/../.fonts/Inter-Regular.woff2`).toString('base64');
const bold = readFileSync(`${__dirname}/../.fonts/Inter-Bold.woff2`).toString('base64');
const mono = readFileSync(`${__dirname}/../.fonts/Vera-Mono.woff2`).toString('base64');

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
                <img class="logo" alt="globe" width=174" height=174" src="data:image/png;base64,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" />
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
