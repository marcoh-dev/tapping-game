import { createGlobalStyle } from "styled-components";
import { Inter } from "@next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default createGlobalStyle`

/** CSS Reset https://piccalil.li/blog/a-more-modern-css-reset/ */
*,::after,::before{box-sizing:border-box}html{-moz-text-size-adjust:none;-webkit-text-size-adjust:none;text-size-adjust:none}blockquote,body,dd,dl,figure,h1,h2,h3,h4,p{margin-block-end:0}ol[role=list],ul[role=list]{list-style:none}body{min-height:100vh;line-height:1.5}button,h1,h2,h3,h4,input,label{line-height:1.1}h1,h2,h3,h4{text-wrap:balance}a:not([class]){text-decoration-skip-ink:auto;color:currentColor}img,picture{max-width:100%;display:block}button,input,select,textarea{font-family:inherit;font-size:inherit}textarea:not([rows]){min-height:10em}:target{scroll-margin-block:5ex}
/** end of CSS Reset */

:root {
	font-size:16px;

    --gray-900: hsl(30, 0%, 14%);
	--gray-800: hsl(30, 0%, 24%);
	--gray-700: hsl(30, 0%, 34%);
	--gray-600: hsl(30, 0%, 44%);
	--gray-500: hsl(30, 0%, 54%);
	--gray-400: hsl(30, 0%, 64%);
	--gray-300: hsl(30, 0%, 74%);
	--gray-200: hsl(30, 0%, 84%);
	--gray-100: hsl(30, 0%, 94%);

	--warning-color:red;

	--text-font-family: ${inter.style.fontFamily};
	--text-font-size-normal:1rem;
	--text-font-size-small:0.75rem;
	--text-line-height:1.5em;


	--headline-font-family: ${inter.style.fontFamily};
	--headline-font-size-1:1.75rem;
	--headline-font-size-2:1.25rem;
	--headline-line-height:1.3em;
	--headline-letter-spacing:0.02em;

	--spacing-small:0.5rem;
	--spacing-normal:1rem;
	--spacing-large:2rem;
	--spacing-xlarge:5rem;
	--spacing-xxlarge:10rem;


	--border-radius-small:5px;
	--border-radius-normal:10px;
	--border-radius-large:20px;
	--border-radius-rounded:9999px;

	--border-width-small:1px;
	--border-width-normal:2px;
	--border-color:var(--gray-900);

	--border-small:var(--border-width-small) solid var(--border-color);
	--border-normal:var(--border-width-normal) solid var(--border-color);


}

body {
	margin: 0;
	width: 100%;
	display:flex;
	flex-direction:column;

	font-family:var(--text-font-family);
	font-size:var(--text-font-size-normal);
	line-height: var(--text-line-height);
	color:var(--gray-900);
	background-color: var(--gray-100);
    min-height: 100vh;

}

#__next {
	display: flex;
	flex-direction: column;
	flex-grow: 1;
}

h1, h2, h3, h4,
button, input, label {
  line-height: inherit;
}

h1, h2 {
	font-family:var(--headline-font-family);
	line-height: var(--headline-line-height);
	letter-spacing: var(--headline-letter-spacing);
	word-break: break-word;
}

h1 {
	font-size:var(--headline-font-size-1);
}

h2 {
	font-size:var(--headline-font-size-2);
}

p {
	max-width:75ch;
}

main {
  display:flex;
  flex-direction:column;
  padding: 0;
  flex-grow: 1;
}

button,
label {
	cursor:pointer;
}

a {
	text-decoration:none;
}

button {
	color:inherit;
	background-color:inherit;

    &:disabled {
        cursor: not-allowed;
    }
}

`;
