export function lcars_cb_alert_omni(base_type, radius,border, entity, color_inactive="green", color_active="#cc0000"){
 return {
  type: "custom:cb-lcars-elbow-card",
  cblcars_card_type: base_type,
  enable_resize_observer: false,
  tap_action: {
    action: "toggle"
  },
  double_tap_action: {
    action: "none"
  },
  hold_action: {
    action: "none"
  },
  show_advanced: true,
  variables: {
    card: {
    min_height: "20px",
      border: {
        bottom: {
          size: border.bottom,
          right_radius: radius.bottom_right,
          left_radius: radius.bottom_left
        },
        left: {
            size: border.left
        },
        inner: {
            // factor: 1
        },
        right: {
          size: border.right
        },
        top:{
            size: border.top,
            right_radius: radius.top_right,
            left_radius: radius.top_left
        }
      },
      color: {
        background: {},
        default: color_inactive,
        active: color_active,
        inactive: color_inactive
      },
     
    },

    entity: entity
  }
};
 
}
export function lcars_top_right_alert(entity, color_inactive="green", color_active="#cc0000"){
    const base_type ="cb-lcars-header";
    const radius={top_left: 30, top_right:0,bottom_right:0,bottom_left:0}
    const border={top: 20, right:0,bottom:0,left:60}
    return lcars_cb_alert_omni(base_type, radius,border,entity,color_inactive,color_active);
}
export function lcars_top_left_alert(entity, color_inactive="green", color_active="#cc0000"){
    const base_type ="cb-lcars-header-right";
    const radius={top_left: 0, top_right:30,bottom_right:0,bottom_left:0}
    const border={top: 20, right:60,bottom:0,left:0}
    return lcars_cb_alert_omni(base_type, radius,border,entity,color_inactive,color_active);
}
export function lcars_footer_right_alert(entity, color_inactive="green", color_active="#cc0000"){
    const base_type ="cb-lcars-footer";
    const radius={top_left: 0, top_right:0,bottom_right:0,bottom_left:30}
    const border={top: 0, right:0,bottom:20,left:60}
    return lcars_cb_alert_omni(base_type, radius,border,entity,color_inactive,color_active);
}

export function lcars_footer_left_alert(entity, color_inactive="green", color_active="#cc0000"){
    const base_type ="cb-lcars-footer-right";
    const radius={top_left: 0, top_right:0,bottom_right:30,bottom_left:0}
    const border={top: 0, right:60,bottom:20,left:0}
    return lcars_cb_alert_omni(base_type, radius,border,entity,color_inactive,color_active);
}
export function lcars_footer_alert(entity, color_inactive="green", color_active="#cc0000"){
    const base_type ="cb-lcars-footer";
    const radius={top_left: 0, top_right:0,bottom_right:0,bottom_left:0}
    const border={top: 0, right:0,bottom:20,left:0}
    return lcars_cb_alert_omni(base_type, radius, border,entity,color_inactive,color_active);
}