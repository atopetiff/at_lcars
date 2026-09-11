
export function lcars_bubble_media_base(entity, config={}, color = "coral", color_active = "red", state = true, height = "55px", fontSize="18px", leftRound=true,rightRound=true,borderRadius="",showIcon=true, iconWidth=40, icon_bg_overwrite=null, show_value=false) {
    let extraModeCss="";
    if(!!config.colorblind){
        let border ="${state == 'off' ? '"+color+"' : '"+color_active+"'}"
    extraModeCss=`
        ${extraModeCss}
        .bubble-background{
            box-shadow: inset 0px 0px 0px 5px ${border} !important;
            opacity: 1 !important;
        }
        .bubble-wrapper{
            background-color: black !important;
        }
        *{
            --primary-text-color: white;
        }
    `;
}
    let icon_bg = icon_bg_overwrite? "${state == 'on' ? '"+color_active+"' : '"+icon_bg_overwrite+"'}":color_active;
    var card = 
     {
        type: "custom:bubble-card",
        card_type: "media-player",
        button_type: "switch",
        hide:{
            power_button: false,
            volume_button: true

        },
        force_icon: false,
        show_name: true,
        icon: "",
        show_attribute: false,
        button_action: {},
        sub_button: {
            main: [
            {
                sub_button_type: "slider",
                show_attribute: true,
                attribute: "volume_level",
                show_icon: false,
                show_background: false,
                always_visible: true
            }
            ]
        },
        use_accent_color: true,
        show_state: show_value,
        show_icon: showIcon,

        styles: `
        :host{
            height: 100%;
        }
        .type-custom-bubble-card, .bubble-container {
    height: 100% !important;
}   .bubble-main-icon {
    color: black !important;
    opacity: 1 !important;
}
    * {
        --bubble-default-color: ${color_active};
        --bubble-icon-color: black;
        font-weight: bold;
        --bubble-button-main-background-color: ${color};
        --bubble-sub-button-background-color: violet;

        --primary-text-color: black;
        --ha-font-family-body: 'Antonio', monospace, Arial, sans-serif;
        --bubble-button-icon-background-color: ${icon_bg};
        
        text-transform: uppercase;
        --row-height: ${height};
        height: 100% !important;
        ${borderRadius==""?"":`--bubble-border-radius: ${borderRadius};`};
        box-sizing: border-box;
        --mdc-icon-size: ${iconWidth-15}px;

    }
    .bubble-icon-container, .large.bubble-icon-container {
        border-right: 4px solid black;
        border-top-right-radius: 0px;
        border-bottom-right-radius: 0px;
        ${leftRound==false?"border-top-left-radius: 0px; border-top-left-radius: 0px; ":""}
        margin: 0 !important;
        position: absolute;
        top: 0;
        height: 100%;
        padding-left: 2px;
        width: ${iconWidth}px;
    min-width: ${iconWidth}px !important;
    min-height: unset !important;
    }
    .bubble-main-icon{
        display: flex;
        align-items: center;
    }
    .bubble-content-container {
        height: 100%;
    }

    .bubble-name-container {
    margin: ${showIcon?"0px 24px 0px 52px":"0 4px 4px 4px"};
    margin: 0px;
    height: 80%;
    align-items: flex-end;
    justify-content: flex-end;
    font-size: 30px;
            max-width: calc(100% - ${showIcon==true?iconWidth+4:0}px);
    white-space: pre-wrap;
    word-wrap: break-word;
    left: ${showIcon==true?iconWidth+4:0}px;
    }
    .bubble-name, .bubble-title, .bubble-artist {
    font-size: ${fontSize};
        font-weight: 600;
    font-family: 'Antonio', monospace, Arial, sans-serif;
    align-items: flex-end;
        
        text-align: right;
        padding-right: ${rightRound==true?20:4}px;
        padding-bottom: 4px;
        order:2;
    }
    .bubble-state {
    font-size: ${fontSize};
        font-weight: 400;
    font-family: 'Antonio', monospace, Arial, sans-serif;
    align-items: flex-end;
        
        text-align: right;
        padding-right: ${rightRound==true?20:4}px;
        order: 1;
    }

.bubble-media-player .bubble-cover-background {
    background-color: ${color} !important;
    opacity: 1;
    filter: none;
}
    .bubble-media-info-container{
        margin: 0 4px 0 ${showIcon==true?iconWidth+4:0}px;
    }



    .bubble-buttons-container{
        margin-right: 0px;
        gap: 0px;
    }

    .bubble-buttons-container>*:not(.bubble-play-pause-button){
        border-radius: 0px;
    }
    .bubble-buttons-container>*{
        border-left: 4px solid black;
        width: 45px !important;
    }
    .bubble-buttons-container .bubble-play-pause-button{
        border-top-left-radius: 0px;
        border-bottom-left-radius: 0px;
    }

    .bubble-media-button-icon {
        --mdc-icon-size: 25px;
        
        display: flex;
        align-items: center;
        justify-content: center;
        }
        .bubble-sub-button-container{
            right: 0px;
        }
        .bubble-sub-button-slider{
            background: transparent !important;
            border-radius: 0px;
            border-left: 4px solid black;
        }
        .bubble-sub-slider-wrapper > .bubble-sub-button-slider{
            border-radius: 0px !important;
        }
        .bubble-range-fill{
        box-shadow: black 2px 0px, black -2px 0px inset;
        }
        ${extraModeCss}
    `
    };

    if(entity){
        card={
            ...card,
            entity: entity,
        }
    }

    return card;
}
export function lcars_bubble_lozenge_media(entity, config={}, color = "coral", color_active = "red", state = true, height = "55px",fontSize="20px",show_value=false) {
    return {
        ...lcars_bubble_media_base(entity,config,color, color_active, state, height, fontSize, true,true, "",true,45,null,show_value),
        
    };
}