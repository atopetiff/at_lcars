
export function lcars_bubble_lozenge_button(entity, color = "coral", color_active = "red", state = true, height = "55px",fontSize="20px",) {
    return {
        ...lcars_bubble_base(entity,color, color_active, state, height, fontSize, ""),
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
export function lcars_bubble_square(entity, color = "coral", color_active = "red", state = true, height = "55px",fontSize="18px") {
    return lcars_bubble_base(entity,color, color_active, state, height, fontSize, false,false,"0px");
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
export function lcars_bubble_base(entity, color = "coral", color_active = "red", state = true, height = "55px", fontSize="18px", leftRound=true,rightRound=true,borderRadius="",showIcon=true) {

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
        show_state: false,
        show_icon: showIcon,
        styles: `
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
        --bubble-button-icon-background-color: ${color_active};
        text-transform: uppercase;
        --row-height: ${height};
        height: 100%;
        ${borderRadius==""?"":`--bubble-border-radius: ${borderRadius};`};

    }
    .bubble-icon-container {
        border-right: 6px solid black;
        border-top-right-radius: 0px;
        border-bottom-right-radius: 0px;
        ${leftRound==false?"border-top-left-radius: 0px; border-top-left-radius: 0px; ":""}
        margin: 0 !important;
        position: absolute;
        top: 0;
        height: 100%;
        padding-left: 4px;
        width: 35px;
    min-width: 35px !important;
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
    height: 80%;
    align-items: flex-end;
    justify-content: flex-end;
    font-size: 30px;

    }
    .bubble-name {
    font-size: ${fontSize};
        font-weight: 600;
    font-family: 'Antonio', Arial, sans-serif;
    align-items: flex-end;
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