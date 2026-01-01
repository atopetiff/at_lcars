
export function lcars_bubble_lozenge_button(entity, color = "coral", color_active = "red", state = true, height = "55px",fontSize="18px",) {
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
export function lcars_bubble_quad(entity, color = "coral", color_active = "red", state = true, height = "55px",fontSize="18px",) {
    return lcars_bubble_base(entity,color, color_active, state, height, fontSize, "0px");
}
export function lcars_bubble_base(entity, color = "coral", color_active = "red", state = true, height = "55px", fontSize="18px", borderRadius="") {

    return {
        type: "custom:bubble-card",
        card_type: "button",
        button_type: "switch",
        entity: entity,
        force_icon: false,
        show_name: true,
        icon: "",
        show_attribute: false,
        button_action: {},
        sub_button: [],
        use_accent_color: true,
        show_state: false,

        styles: `
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
        
        ${borderRadius==""?"":`--bubble-border-radius: ${borderRadius};`};

    }
    .bubble-icon-container {
        border-right: 6px solid black;
        border-top-right-radius: 0px;
        border-bottom-right-radius: 0px;
        margin: 0 !important;
        position: absolute;
        top: 0;
        height: 100%;
        padding-left: 4px;
        width: 35px;
    min-width: 35px !important;
    }

    .bubble-content-container {
        height: 100%;
    }

    .bubble-name-container {
    margin: 0px 24px 0px 52px;
    height: 80%;
    align-items: flex-end;
    justify-content: flex-end;
    font-size: 30px;
    }
    .bubble-name {
    font-size: ${fontSize};
    }
    `

    };
}