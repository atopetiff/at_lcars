function inner_radius(radius, top){
    if (radius==0) {
        return 0;
    }else{
        const newradius = radius - (top/1.5);
        if (newradius > 0) {
            return newradius;
        } else {
            return radius;
        }
    }
}
export function lcars_bubble_elbow(entity_id,radius,border,color_on = "green", color_off="fuchsia",innerRadiusOverwrite={ top_left: null, top_right: null, bottom_right: null, bottom_left: null }){
let color = "${state == 'on' ? '"+color_on+"' : '"+color_off+"'}";
let inner_radius_top_left = innerRadiusOverwrite.top_left?innerRadiusOverwrite.top_left:inner_radius(radius.top_left,border.top);
let inner_radius_top_right = innerRadiusOverwrite.top_right?innerRadiusOverwrite.top_right:inner_radius(radius.top_right,border.top);
let inner_radius_bottom_right = innerRadiusOverwrite.bottom_right?innerRadiusOverwrite.bottom_right:inner_radius(radius.bottom_right,border.bottom);
let inner_radius_bottom_left = innerRadiusOverwrite.bottom_left?innerRadiusOverwrite.bottom_left:inner_radius(radius.bottom_left,border.bottom);



    return {
    "type": "custom:bubble-card",
    "card_type": "button",
    "button_type": "state",
    "sub_button": {
        "main": [],
        "bottom": []
    },
    "entity": entity_id,
    "min_value": -10,
    "max_value": 35,
    "styles": `
    :host{
        height: 100%;
    }
    *{
    --stated-color: ${color};
    --ha-card-border-radius: ${radius.top_left}px ${radius.top_right}px ${radius.bottom_right}px ${radius.bottom_left}px !important;
    --bubble-button-border-radius: ${radius.top_left}px ${radius.top_right}px ${radius.bottom_right}px ${radius.bottom_left}px !important;
        --bubble-button-main-background-color: transparent;
        box-sizing: border-box;
        height: 100% !important;
    }
    
    .bubble-icon-container{
        margin: 0px;
    }
    
    .bubble-sub-button-container{
        right: 0px; 
    }
    
    .bubble-container{
        border-radius: ${radius.top_left}px ${radius.top_right}px ${radius.bottom_right}px ${radius.bottom_left}px;
        background-color: var(--stated-color);
        height: 100px;
        position: relative;
    }
    
    .bubble-container:after{
        top: ${border.top}px;
        left: ${border.left}px;
        content: \"\";
        position: absolute;
        width: calc(100% - ${border.right}px);
        height: calc(100% - ${border.bottom}px);
        background-color: black;
        z-index: 99;
        border-radius: ${inner_radius_top_left}px ${inner_radius_top_right}px ${inner_radius_bottom_right}px ${inner_radius_bottom_left}px;
    }
    
    
    `,
    "show_state": false,
    "show_name": false,
    "scrolling_effect": false,
    "force_icon": false,
    "show_icon": false,
    "button_action": {
        "tap_action": {
        "action": "toggle"
        }
    }
    }
}