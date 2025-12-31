export function scrollbar(color1,color2,color3,color4){
    return `
    ::-webkit-scrollbar {
        width: 2px;
        height: 2px;
        background: black;
    }

    /* Track */
    ::-webkit-scrollbar-track {
        background: black;
    }

    /* Handle */
    ::-webkit-scrollbar-thumb {
        background: ${color1};
    }

    /* Handle on hover */
    ::-webkit-scrollbar-thumb:hover {
        background: ${color2};
        border-radius:2px;
    }
    ::-webkit-scrollbar-corner{
    background-color: black;
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