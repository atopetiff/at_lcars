export function scrollbar(color1,color2,color3,color4){

    //I HATE SCROLLBARS
    let element = document.getElementsByTagName('html');  // Element auswählen
    element[0].style.scrollbarColor = 'auto'; 
    return `
    body, html, * {
        scrollbar-color: auto !important !important;
    }
    ::-webkit-scrollbar {
        width: 2px;
        height: 2px;
        background: transparent;
    }

    /* Track */
    ::-webkit-scrollbar-track {
        background: transparent;
    }

    /* Handle */
    ::-webkit-scrollbar-thumb {
        background: ${color1};
        border-radius:2px;
    }

    /* Handle on hover */
    ::-webkit-scrollbar-thumb:hover {
        background: ${color2};
        border-radius:2px;
    }
    ::-webkit-scrollbar-corner{
    background-color: transparent;
    }
    `;
}

export function font(){
    return `
    @font-face {
  font-family: "Antonio";
  src: url("/Antonio.woff2");
}
    `;
}