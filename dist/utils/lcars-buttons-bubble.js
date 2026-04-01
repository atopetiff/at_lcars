
export function lcars_bubble_lozenge_button(entity, color = "coral", color_active = "red", state = true, height = "55px",fontSize="20px",show_value=false) {
    return {
        ...lcars_bubble_base(entity,color, color_active, state, height, fontSize, true,true, "",true,45,null,show_value),
        tap_action:{
            action: "toggle"
        },
        button_action:{
            tap_action:{
                action: "more-info"
            }
        }
    };
}
export function lcars_bubble_lozenge(entity, color = "coral", color_active = "red", state = true, height = "55px",fontSize="18px",) {
    return lcars_bubble_base(entity,color, color_active, state, height, fontSize, "");
}
export function lcars_bubble_cover_open(entity, color = "coral", color_active = "red", state = true, height = "55px",fontSize="18px",) {
    let card = lcars_bubble_base(entity,color_active, color, state, height, fontSize,true,false,"30px 0px 0px 30px",true,40,color_active);
    const action = {
            action: "perform-action",
            perform_action: "cover.close_cover",
            target: {
                entity_id: entity
            }
        };
    return {
        ...card,
        show_state: false,
        show_name: true,
        name: "Zu",
        button_action: {
            ...action,
            tap_action: action
        },

    };
}
export function lcars_bubble_cover_close(entity, color = "coral", color_active = "red", state = true, height = "55px",fontSize="18px",) {
    let card = lcars_bubble_base(entity,color, color_active, state, height, fontSize,false,true,"0px 30px 30px 0px", false);
    const action = {
            action: "perform-action",
            perform_action: "cover.open_cover",
            target: {
                entity_id: entity
            }
        };
    return {
        ...card,
        show_state: false,
        show_name: true,
        name: "Auf",
        button_action: {
            ...action,
            tap_action: action
        },

    };
}
export function lcars_bubble_cover_summer(entity, color = "coral", color_active = "red", state = true, height = "55px",fontSize="18px",) {
    let card = lcars_bubble_base(entity,color, color, state, height, fontSize,false,true,"0px 30px 30px 0px",false);
    const action = {
            action: "perform-action",
            perform_action: "cover.set_cover_position",
            target: {
                entity_id: entity
            },
            data: {
                position: 13
            }
        };
    return {
        ...card,
        show_state: false,
        show_name: true,
        name: "Sommer",
        
        button_action: {
            ...action,
            tap_action: action
        },
        

    };

}
export function lcars_bubble_square(entity, color = "coral", color_active = "red", state = true, height = "55px",fontSize="18px",icon_bg_overwrite=null) {
    return lcars_bubble_base(entity,color, color_active, state, height, fontSize, false,false,"0px",true,35,icon_bg_overwrite);
}
export function lcars_bubble_square_nav(path, name, color = "coral", color_active = "red", state = false, height = "55px",fontSize="18px") {
    return {
        ...lcars_bubble_base(null,color, color_active, state, height, fontSize,false,false,"0px",false),
        button_type: "name",
        name: name,
        show_icon: false,
        button_action:{
            tap_action: {
                action: "navigate",
                navigation_path: path
            }
        }
    };
}
export function lcars_bubble_square_nav_window(window,path, name, color = "coral", color_active = "red", state = false, height = "55px",fontSize="18px",iconWidth=37,icon_bg_overwrite=null, iconOverwrite=null) {
    let card ={
        ...lcars_bubble_base(window,color, color_active, state, height, fontSize,false,false,"0px",true,iconWidth,icon_bg_overwrite),
        button_type: "name",
        name: name,
        show_icon: true,
        scrolling_effect: false,
        button_action:{
            tap_action: {
                action: "navigate",
                navigation_path: path
            }
        }
    };
    if (iconOverwrite) {
        card = {
            ...card,
            icon: iconOverwrite,
            styles: `
                ${card.styles}
                .bubble-name-container {
   
           
    }
    .bubble-name {
    
    align-items: flex-end;
        width: 100%;
        height: auto !important;
        text-align: right;
    }
            `
        }
    }
    
    return card;
}
export function lcars_bubble_base(entity, color = "coral", color_active = "red", state = true, height = "55px", fontSize="18px", leftRound=true,rightRound=true,borderRadius="",showIcon=true, iconWidth=40, icon_bg_overwrite=null, show_value=false) {
let icon_bg = icon_bg_overwrite? "${state == 'on' ? '"+color_active+"' : '"+icon_bg_overwrite+"'}":color_active;
    var card = 
     {
        type: "custom:bubble-card",
        card_type: "button",
        button_type: "switch",
        
        force_icon: false,
        show_name: true,
        icon: "",
        show_attribute: false,
        button_action: {},
        sub_button: [],
        use_accent_color: true,
        show_state: show_value,
        show_icon: showIcon,

        styles: `
        :host{
            height: 100%;
        }
        .type-custom-bubble-card, .bubble-container {
    height: 100% !important;
}
    * {
        --bubble-default-color: ${color_active};
        --bubble-icon-color: black;
        font-weight: bold;
        --bubble-button-main-background-color: ${color};
        --bubble-sub-button-background-color: violet;

        --primary-text-color: black;
        --ha-font-family-body: 'Antonio', Arial, sans-serif;
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
    .bubble-name {
    font-size: ${fontSize};
        font-weight: 600;
    font-family: 'Antonio', Arial, sans-serif;
    align-items: flex-end;
        
        text-align: right;
        padding-right: ${rightRound==true?20:4}px;
        padding-bottom: 4px;
        order:2;
    }
    .bubble-state {
    font-size: ${fontSize};
        font-weight: 400;
    font-family: 'Antonio', Arial, sans-serif;
    align-items: flex-end;
        
        text-align: right;
        padding-right: ${rightRound==true?20:4}px;
        order: 1;
    }
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