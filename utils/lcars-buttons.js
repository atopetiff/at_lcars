function lcars_base(entity, color = "coral", color_active = "red", state = true, height = "55px") {
  const card = {
    type: "custom:cb-lcars-button-card",
    cblcars_card_type: "cb-lcars-button-lozenge",
    show_label: false,
    variables: {
      // label: "Schlafzimmer",
      entity: entity,
      icon: {
        color: {
          default: "black",
          active: "goldenrod",
          background: {
            active: color_active,
            inactive: color_active
          },
          active: color,
          inactive: "black"
        },
        size: "25",
      },
      card: {
        height: height,
        min_height: "20px",
        color: {
          background: {
            default: color,
            active: color_active,
            inactive: color
          },
          active: color_active,
          inactive: color
        },
        border: {
          left: {
            size: 0
          },
          top: {
            left_radius: 28,
            size: 0,
            right_radius: 28
          },
          bottom: {
            left_radius: 28,
            size: 0,
            right_radius: 28
          },
          right: {
            size: 0
          }
        }
      },
      text: {
        state: {
          align_items: "flex-end",
          justify: "flex-start",
          padding: {
            left: 50,
            bottom: 6
          }
        },
        name: {
          padding: {
            bottom: 6
          },
          font_size: "15"
        },
        label: {
          align_items: "flex-start",
          padding: {
            top: 6
          }
        }
      }
    },
    tap_action: {
      action: "toggle"
    },
    double_tap_action: {
      action: "none"
    },
    hold_action: {
      action: "more-info"
    },
    show_icon: true,
    show_advanced: true,
    show_name: true,
    show_state: state
  };
  return card;
}

export function lcars_switch(entity, color = "coral", color_active = "red", state = true, height = "55px") {
  return lcars_base(entity, color, color_active, state, height);
}
export function lcars_button(entity, color = "coral", color_active = "red", state = true, height = "55px") {
  return {
    ...lcars_base(entity, color, color_active, state, height),
    tap_action: {
      action: "more-info"
    },
    double_tap_action: {
      action: "toggle"
    },
    hold_action: {
      action: "more-info"
    },
  };
}

function lcars_bubble(entity, color_active = "#00e1ff", color_inactive = "#006673") {
  const styles = `* {
    --row-height: 45px;
    --bubble-default-color: ${color_active};
    --bubble-icon-color: black;
    --bubble-button-main-background-color: ${color_inactive};
    --bubble-sub-button-background-color: #ffffffaa;
    --primary-text-color: black;
    --ha-font-family-body: 'Antonio', Arial, sans-serif;
    --bubble-button-icon-background-color: transparent;
    text-transform: uppercase
  }
  .bubble-range-fill{
    border-right: 4px solid black;
  }
  `;
  // console.log("styles",styles);
  return {
    type: "custom:bubble-card",
    card_type: "button",
    button_type: "slider",
    styles: styles,
    show_state: false,
    show_attribute: true,
    sub_button: [
      {

        attribute: "temperature",
        show_icon: false,
        show_background: false,
        show_arrow: false,
        state_background: false,
        show_name: false,
        show_attribute: true,
        tap_action: {
          action: "more-info"
        },
        hold_action: {
          action: "more-info"
        }
      },
      {
        select_attribute: "hvac_modes",
        show_attribute: false,
        attribute: "hvac_modes",
        show_icon: true,

        show_background: true,
        show_arrow: false,
        state_background: false,
        show_name: false,
        hold_action: {
          action: "more-info"
        }
      }
    ],
    entity: entity,
    button_action: {
      tap_action: {
        action: "none"
      }
    },
    attribute: "current_temperature",
    show_icon: false,
    show_name: false,
    tap_to_slide: false,
    relative_slide: false,
    slider_live_update: true
  };
}

export function lcars_info(entity, color_unavailable, color_inactive, color_active) {
  return {
    type: "custom:cb-lcars-button-card",
    cblcars_card_type: "cb-lcars-button-picard",
    show_label: false,
    variables: {
      label: "LCARS Button",
      entity: entity,
      card: {
        border: {
          left: {
            size: 15
          },
          right: {
            size: 15
          },
          top: {
            size: 0,
            left_radius: 15,
            right_radius: 15
          },
          bottom: {
            size: 0,
            left_radius: 15,
            right_radius: 15
          },
          inner: {}
        },
        height: "20px",
        min_height: "0px",
        color: {
          inactive: color_inactive,
          active: color_active,
          non_zero: color_active,
          default: color_unavailable,
          zero: color_unavailable,
          unavailable: color_unavailable,
          hvac_heat: color_active,
          hvac_cool: color_unavailable
        }
      },
      text: {
        state: {
          color: {
            default: color_inactive,
            zero: color_inactive,
            non_zero: color_inactive
          },
          font_size: "21",
          padding: {
            top: 0,
            right: 4,
            bottom: 3,
            left: 4
          },
          justify: "flex-end",
          align_items: "center"
        }
      },
      icon: {
        color: {
          active: color_active,
          inactive: color_inactive,
          default: color_inactive,
          background: {
            active: "transparent",
            inactive: "transparent"
          }
        }
      }
    },
    tap_action: {
      action: "more-info"
    },
    double_tap_action: {
      action: "more-info"
    },
    hold_action: {
      action: "more-info"
    },
    show_advanced: true,
    show_name: false,
    show_state: true,
    show_icon: true,
    margin: "0px"
  };
}


export function lcars_climate_bubble(entity, color_active = "#00e1ff", color_inactive = "#006673") {
  const slider = lcars_bubble(entity, color_active, color_inactive)
  return {
    ...slider,
    attribute: "current_temperature",
  };
}
export function lcars_cover_bubble(entity, color_active = "#00e1ff", color_inactive = "#006673") {
  const slider = lcars_bubble(entity, color_active, color_inactive)
  return {
    ...slider,
    attribute: "current_position",
    show_state: true,
    show_attribute: false,
    sub_button: [
      {
        entity: entity,
        icon: "mdi:window-shutter",
        tap_action: {
          action: "perform-action",
          target: {
            entity_id: entity
          },
          perform_action: "cover.close_cover"
        },
        hold_action: {
          action: "more-info"
        },
        state_background: false,
        visibility: []
      },
      {
        entity: entity,
        icon: "mdi:sun-angle",
        tap_action: {
          action: "perform-action",
          perform_action: "cover.set_cover_position",
          target: {
            entity_id: entity
          },
          data: {
            position: 13
          }
        },
        visibility: [],
        state_background: false
      },
      {
        entity: entity,
        tap_action: {
          action: "perform-action",
          perform_action: "cover.open_cover",
          target: {
            entity_id: entity
          }
        },
        icon: "mdi:window-shutter-open",
        state_background: false,
        show_background: true,
        visibility: []
      }
    ]

  };
}

export function lcars_climate(entity, icon = true, show_attribute = true) {
  return {
    type: "custom:slider-button-card",
    entity: entity,
    slider: {
      direction: "left-right",
      background: "solid",
      use_state_color: false,
      use_percentage_bg_opacity: false,
      show_track: false,
      toggle_on_click: false,
      force_square: false,
      show_attribute: false
    },
    show_name: false,
    show_state: true,
    compact: true,
    icon: {
      show: icon,
      use_state_color: true,
      tap_action: {
        action: "more-info"
      },
      icon: ""
    },
    action_button: {
      mode: "toggle",
      icon: "mdi:power",
      show: false,
      show_spinner: true,
      tap_action: {
        action: "toggle"
      }
    },
    show_attribute: show_attribute,
    attribute: "current_temperature"

  };
}
export function lcars_cover_open(entity, color_active = "red", color_inactive = "coral", color_moving = "yellow") {
  return {
    type: "custom:cb-lcars-button-card",
    cblcars_card_type: "cb-lcars-button-capped",
    show_label: true,
    variables: {
      label: "Auf",
      card: {
        color: {
          background: {
            unavailable: color_moving,
            inactive: color_inactive,
            default: color_moving,
            active: color_active
          }
        },
        border: {
          left: {
            size: 0
          },
          top: {
            left_radius: 28,
            size: 0,
            right_radius: 0
          },
          bottom: {
            left_radius: 28,
            size: 0,
            right_radius: 0
          },
          right: {
            size: 0
          }
        }
      },
      icon: {
        color: {
          background: {
            default: color_active,
            active: color_active,
            inactive: color_active
          },
          justify: "flex-start"
        }
      },
      text: {
        label: {
          justify: "flex-start",
          padding: {
            left: 44
          }
        }
      },
      entity: entity
    },
    double_tap_action: {
      action: "none"
    },
    hold_action: {
      action: "more-info"
    },
    show_icon: true,
    icon: "mdi:archive-arrow-up",
    show_advanced: true,
    tap_action: {
      action: "perform-action",
      perform_action: "cover.open_cover",
      target: {
        entity_id: entity
      }
    },
    show_state: false

  };
}
export function lcars_cover_close(entity, color_active = "red", color_inactive = "coral", color_moving = "yellow") {
  return {
    type: "custom:cb-lcars-button-card",
    cblcars_card_type: "cb-lcars-button-bullet",
    show_label: true,
    variables: {
      label: "Zu",
      card: {
        color: {
          background: {
            unavailable: color_moving,
            inactive: color_active,
            default: color_moving,
            active: color_inactive
          }
        },
        border: {
          left: {
            size: 0
          },
          top: {
            left_radius: 0,
            size: 0,
            right_radius: 28
          },
          bottom: {
            left_radius: 0,
            size: 0,
            right_radius: 28
          },
          right: {
            size: 0
          }
        }
      },
      icon: {
        color: {
          background: {
            default: color_active,
            active: color_active,
            inactive: color_active
          }
        },
        justify: "flex-start"
      },
      text: {
        label: {
          justify: "flex-start",
          padding: {
            left: 45
          }
        }
      },
      entity: entity,
      attribute: "current_position"
    },
    double_tap_action: {
      action: "none"
    },
    hold_action: {
      action: "more-info"
    },
    show_icon: true,
    icon: "mdi:archive-arrow-down",
    show_advanced: true,
    tap_action: {
      action: "perform-action",
      perform_action: "cover.close_cover",
      target: {
        entity_id: entity
      }
    },

  };
}
export function lcars_cover_summer(entity, color_active = "red", color_inactive = "coral", color_moving = "yellow") {
  return {
    type: "custom:cb-lcars-button-card",
    cblcars_card_type: "cb-lcars-button-bullet",
    show_label: true,
    variables: {
      label: "Sun",
      card: {
        color: {
          background: {
            unavailable: color_moving,
            default: color_moving,
            inactive: color_inactive
          }
        },
        border: {
          left: {
            size: 0
          },
          top: {
            left_radius: 0,
            size: 0,
            right_radius: 28
          },
          bottom: {
            left_radius: 0,
            size: 0,
            right_radius: 28
          },
          right: {
            size: 0
          }
        }
      },
      icon: {
        color: {
          background: {
            default: color_active,
            active: color_active,
            inactive: color_active
          }
        },
        justify: "flex-start"
      },
      text: {
        label: {
          justify: "flex-start",
          padding: {
            left: 45
          }
        }
      },
      entity: entity,
      custom_states: {
        enabled: true,
        states: [
          {
            attribute: "current_position",
            from: 10,
            to: 14,
            settings: {
              card: {
                color: {
                  background: {
                    default: color_active
                  }
                }
              },
              icon: {
                color: {
                  background: {
                    default: color_active
                  }
                }
              }
            }
          }
        ]
      }
    },
    double_tap_action: {
      action: "none"
    },
    hold_action: {
      action: "more-info"
    },
    show_icon: true,
    icon: "mdi:sun-angle-outline",
    show_advanced: true,
    tap_action: {
      action: "perform-action",
      perform_action: "cover.set_cover_position",
      target: {
        entity_id: [
          entity
        ]
      },
      data: {
        position: 13
      }
    }
  };
}
export function lcars_cover_slider(entity) {
  return {
    type: "custom:slider-button-card",
    entity: entity,
    slider: {
      direction: "top-bottom",
      background: "solid",
      use_state_color: false,
      use_percentage_bg_opacity: false,
      toggle_on_click: false,
      show_track: false,
      force_square: true,
      invert: true,
      show_attribute: false
    },
    show_name: true,
    show_state: true,
    compact: false,
    icon: {
      show: true,
      use_state_color: true,
      tap_action: {
        action: "more-info"
      },
      icon: ""
    },
    action_button: {
      mode: "toggle",
      icon: "mdi:power",
      show: false,
      show_spinner: true,
      tap_action: {
        action: "toggle"
      }
    }
  };
}

export function lcars_cb_alert_elbow(entity, color_inactive = "green", color_active = "#cc0000") {
  return {
    type: "custom:cb-lcars-elbow-card",
    cblcars_card_type: "cb-lcars-footer-right",
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
        border: {
          bottom: {
            size: 30,
            right_radius: 50
          },
          left: {},
          inner: {},
          right: {
            size: 10
          }
        },
        color: {
          background: {},
          default: color_inactive,
          active: color_active,
          inactive: color_inactive
        },
        height: "60px",

      },
      entity: entity
    }
  };

}

export function lcars_cb_alert_side(entity, color_inactive = "green", color_active = "#cc0000") {
  return {
    type: "custom:cb-lcars-elbow-card",
    cblcars_card_type: "cb-lcars-header-callout-right",
    enable_resize_observer: false,
    tap_action: {
      action: "none"
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
        border: {
          bottom: {
            size: 30,
            right_radius: 0,
            left_radius: 0
          },
          left: {},
          inner: {},
          right: {
            size: 10
          },
          top: {
            right_radius: 0,
            left_radius: 0
          }
        },
        color: {
          background: {},
          default: color_inactive,
          active: color_active,
          inactive: color_inactive
        },
        width: "10px"
      },
      entity: entity
    }
  };
}

export function lcars_cb_alert_btn(entity, color_inactive = "green", color_active = "#cc0000") {
  return {
    type: "custom:cb-lcars-button-card",
    cblcars_card_type: "cb-lcars-button-bullet",
    show_label: false,
    variables: {
      icon: {

        size: "22",
      },
      label: "LCARS Button",
      entity: entity,
      card: {
        min_height: "20px",
        border: {
          left: {},
          top: {
            left_radius: 0,
            right_radius: 0
          },
          bottom: {
            left_radius: 0,
            right_radius: 0
          },
          right: {}
        },
        color: {
          background: {
            default: color_active,
            inactive: color_inactive,
            active: color_active
          }
        }
      }
    },
    tap_action: {
      action: "toggle"
    },
    double_tap_action: {
      action: "none"
    },
    hold_action: {
      action: "more-info"
    },
    show_advanced: true,
    show_icon: true,
    show_state: true
  };
}

export function lcars_nav_btn(target, label, color = "blue", padding = { top: 6, right: 6, bottom: 6, left: 6 }) {
  return {
    type: "custom:cb-lcars-button-card",
    cblcars_card_type: "cb-lcars-button-lozenge",
    show_label: true,
    variables: {
      label: label,
      card: {
        color: {
          background: {
            default: color
          }
        },
        border: {
          top: {
            left_radius: 0,
            right_radius: 0
          },
          bottom: {
            left_radius: 0,
            right_radius: 0
          }
        },
        min_height: "15px"
      },
      text: {
        label: {
          align_items: "flex-end",
          padding: {
            top: padding?.right,
            right: padding?.right,
            bottom: padding?.bottom,
            left: padding?.left
          },
          justify: "flex-end",
          align: "right"
        }
      }
    },
    tap_action: {
      action: "navigate",
      navigation_path: target
    },
    double_tap_action: {
      action: "none"
    },
    hold_action: {
      action: "none"
    },
    show_advanced: true,
    show_name: false
  };
}



export function lcars_floor_plan_window(entity) {
  return {
    type: "custom:cb-lcars-button-card",
    cblcars_card_type: "cb-lcars-button-picard",
    show_label: false,
    variables: {
      label: "Fenster",
      entity: entity,
      card: {
        color: {
          default: "blue",
          active: "#cc0000",
          inactive: "black"
        },
        border: {
          left: {
            size: 5
          },
          top: {
            size: 5
          },
          right: {
            size: 5
          },
          bottom: {
            size: 5
          }
        }
      }
    },
    tap_action: {
      action: "none"
    },
    double_tap_action: {
      action: "none"
    },
    hold_action: {
      action: "none"
    }
  };
}

function foreground_range_color(from, to, color) {
  var base = {// attribute: "current_position",

    settings: {
      text: {
        state: {
          color: {
            default: color,
            non_zero: color,
            zero: color
          }
        }
      },
      icon: {
        color: {
          default: color
        }
      }
    }
  };
  if (!!from) {
    base = { ...base, from: from };
  }
  if (!!to) {
    base = { ...base, to: to };
  }
  return base;
}

function lcars_room_row_info(entity, fontSize = "25", height = "42px", padding_left = 18) {
  return {
    type: "custom:cb-lcars-button-card",
    cblcars_card_type: "cb-lcars-button-picard",
    show_label: false,
    variables: {
      label: "LCARS Button",
      entity: entity,
      text: {
        state: {
          padding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: padding_left
          },
          justify: "flex-start",
          align_items: "center",
          font_size: fontSize
        }
      },
      card: {
        height: height,
        min_height: "15px",
        border: {
          left: {
            size: 0
          },
          top: {
            size: 0
          },
          right: {
            size: 0
          },
          bottom: {
            size: 0
          },
          inner: {
            width: null
          }
        }
      },
      icon: {
        justify: "flex-start",
        align_items: "flex-start",
        size: "15"
      },

    },
    tap_action: {
      action: "more-info"
    },
    double_tap_action: {
      action: "none"
    },
    hold_action: {
      action: "more-info"
    },
    show_state: true,
    show_icon: true,
    numeric_precision: 1,
    show_units: false
  };
}
export function lcars_room_row_info_temp(entity, fontSize = "25", height = "42px", padding_left = 18) {
  const info = lcars_room_row_info(entity, fontSize, height, padding_left);
  return {
    ...info,
    variables: {
      ...info.variables,
      custom_states: {
        enabled: true,

        states: [
          foreground_range_color(null, 0, "#aaaaff"),
          foreground_range_color(0, 10, "#5555ff"),
          foreground_range_color(10, 15, "#ffff80ff"),
          foreground_range_color(15, 18, "#fff311ff"),
          foreground_range_color(18, 21, "#009e00ff"),
          foreground_range_color(21, 25, "#ff9d00ff"),
          foreground_range_color(25, null, "#c00000ff"),
        ]
      }
    }
  }

}
export function lcars_room_row_info_humidity(entity) {
  const info = lcars_room_row_info(entity);
  return {
    ...info,
    numeric_precision: 0,
    variables: {
      ...info.variables,
      custom_states: {
        enabled: true,

        states: [
          foreground_range_color(null, 40, "#b00000ff"),
          foreground_range_color(40, 50, "#ff920dff"),
          foreground_range_color(50, 55, "#a6d400ff"),
          foreground_range_color(55, 57, "#00bd00ff"),
          foreground_range_color(57, 61, "#00cd85ff"),
          foreground_range_color(61, 70, "#00ffb7ff"),
          foreground_range_color(70, null, "#004cffff"),
        ]
      }
    }
  }

}

export function lcars_floor_row_window_left(entity, color, color_open) {
  return {
    type: "custom:cb-lcars-button-card",
    cblcars_card_type: "cb-lcars-button-capped",
    show_label: false,
    variables: {
      label: "LCARS Button",
      entity: entity,
      card: {
        border: {
          left: {
            size: 0
          },
          top: {
            size: 0,
            left_radius: 50,
            right_radius: 0
          },
          right: {
            size: 0
          },
          bottom: {
            size: 0,
            left_radius: 50,
            right_radius: 0
          },
        },
        color: {
          background: {
            default: "grey",
            active: color_open,
            inactive: color
          }
        },
        min_height: "15px",
        // height: "42px"

      }
    },
    tap_action: {
      action: "more-info"
    },
    double_tap_action: {
      action: "none"
    },
    hold_action: {
      action: "none"
    }
  };
}
export function lcars_floor_row_window_right(entity, color, color_open) {
  const left = lcars_floor_row_window_left(entity, color, color_open);
  return {
    ...left,
    type: "cb-lcars-button-bullet",
    variables: {
      ...left.variables,
      card: {
        ...left.variables.card,
        border: {
          left: {
            size: 0
          },
          top: {
            size: 0,
            left_radius: 0,
            right_radius: 50
          },
          right: {
            size: 0
          },
          bottom: {
            size: 0,
            left_radius: 0,
            right_radius: 50
          }
        }
      }
    }

  };
}


export function lcars_floor_row_windownav(entity, name, area_id, icon, target_path, color, color_open) {
  return {
    type: "custom:cb-lcars-button-card",
    cblcars_card_type: "cb-lcars-button-capped",
    show_label: true,
    variables: {
      label: name,
      entity: entity,
      icon: {
        size: "22",
        color: {
          background: {
            default: "grey",
            inactive: color,
            active: color_open
          }
        }
      },
      card: {
        border: {
          left: {
            size: 0
          },
          top: {
            size: 0,
            left_radius: 0,
            right_radius: 0
          },
          right: {
            size: 0
          },
          bottom: {
            size: 0,
            left_radius: 0,
            right_radius: 0
          }
        },
        color: {
          background: {
            default: "grey",
            active: color,
            inactive: color
          }
        },
        min_height: "15",
        // height: "42px"
      },
      text: {
        label: {
          font_size: "-1",
          justify: "flex-end",
          align_items: "flex-end",
          padding: {
            top: 6,
            right: 6,
            bottom: 4,
            left: 6
          }
        }
      }
    },
    tap_action: {
      action: "navigate",
      navigation_path: target_path
    },
    double_tap_action: {
      action: "none"
    },
    hold_action: {
      action: "perform-action",
      perform_action: "light.turn_off",
      target: {
        area_id: area_id
      }
    },
    show_icon: true,
    icon: icon
  };
}



export function lcars_floor_plan_tempnav(entity, name, target_path) {
  return {
    type: "custom:cb-lcars-button-card",
    cblcars_card_type: "cb-lcars-button-picard",
    show_label: true,
    variables: {
      label: name,
      entity: entity,
      card: {

        border: {
          left: {
            size: 0
          },
          top: {
            size: 0
          },
          right: {
            size: 0
          },
          bottom: {
            size: 0
          }
        }
      },
      text: {
        label: {
          justify: "flex-end",
          font_size: "-20",
          align_items: "flex-end",
          color: {
            default: "white",
            zero: "grey",
            non_zero: "yellow"
          }
        },
        state: {
          justify: "flex-start",
          font_size: "-5",
          align_items: "flex-start",
          color: {
            zero: "grey",
            non_zero: "yellow",
            default: "white"
          }
        }
      }
    },
    tap_action: {
      action: "navigate",
      navigation_path: target_path
    },
    double_tap_action: {
      action: "none"
    },
    hold_action: {
      action: "more-info"
    },
    show_state: !!entity,
    show_advanced: true
  };
}
export function lcars_floor_plan_humidity(entity) {
  return {
    type: "custom:cb-lcars-button-card",
    cblcars_card_type: "cb-lcars-button-picard",
    show_label: false,
    variables: {
      label: "Luftfeuchte",
      entity: entity,
      card: {

        border: {
          left: {
            size: 0
          },
          top: {
            size: 0
          },
          right: {
            size: 0
          },
          bottom: {
            size: 0
          }
        }
      },
      text: {
        label: {
          justify: "flex-end",
          align_items: "flex-end",
          color: {
            default: "white",
            zero: "grey",
            non_zero: "yellow"
          }
        },
        state: {
          justify: "flex-start",
          align_items: "center",
          font_size: "-10",
          color: {
            zero: "grey",
            non_zero: "yellow",
            default: "white"
          }
        }
      }
    },
    tap_action: {
      action: "none"
    },
    double_tap_action: {
      action: "none"
    },
    hold_action: {
      action: "none"
    },
    show_state: !!entity,
    show_advanced: true
  };
}

export function lcars_mini_graph(climate, heating = [], outside_shadow = null, outside_sun = null) {
  const entities = [
    {
      entity: climate,
      attribute: "current_temperature",
      color: "orange",
      smoothing: false,
      show_state: false,
      show_legend_state: false,
      show_indicator: true,
      show_graph: true,
      show_line: true,
      show_bar: true,
      show_fill: true,
      show_points: true,
      show_legend: false,
      show_name: true,
      name: "Ist"
    },
    {
      entity: climate,
      attribute: "temperature",
      color: "yellow",
      smoothing: false,
      show_state: false,
      show_legend_state: true,
      show_indicator: true,
      show_graph: true,
      show_line: true,
      show_fill: false,
      show_points: false,
      show_legend: true,
      show_name: true,
      name: "Soll"
    },
  ];
 
    heating.forEach(h => {
      entities.push({
        entity: h,
        attribute: "temperature",
        name: "Heizung",
        color: "red",
        smoothing: false,
        show_state: false,
        show_legend_state: true,
        show_indicator: true,
        show_graph: true,
        show_line: true,
        show_fill: false,
        show_points: true,
        show_legend: true,
        show_name: true
      });
    });

  
  if (!!outside_shadow) {
    entities.push({
      entity: outside_shadow,
      name: "Schatten",
      color: "blue",
      smoothing: false,
      show_state: true,
      show_legend_state: true,
      show_indicator: true,
      show_graph: true,
      show_line: true,
      show_fill: true,
      show_points: true,
      show_legend: true,
      show_name: true
    });
  }

  if (!!outside_sun) {
    entities.push({
      entity: outside_sun,
      name: "Balkon",
      color: "lightblue",
      smoothing: false,
      show_state: false,
      show_legend_state: true,
      show_indicator: true,
      show_graph: true,
      show_line: true,
      show_fill: true,
      show_points: true,
      show_legend: true,
      show_name: true
    });
  }
  return {
    type: "custom:mini-graph-card",
    show: {
      state: true,
      icon: false,
      graph: "line",
      labels: true,
      name: false,
      name_adaptive_color: true,
      smoothing: false
    },
    name: false,
    points_per_hour: 4,
    hours_to_show: 12,
    height: 110,
    font_size: 70,
    line_width: 3,
    entities: [
      ...entities
    ]
  };
}