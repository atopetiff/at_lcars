
export function lcars_bubble_battery(entity, config = {}, color_active = "#00e1ff", color_inactive = "#006673") {
  const bubble = lcars_bubble(entity, config, color_active, color_inactive);
  return {
    ...bubble,
    show_state: true,
    button_action: {

      tap_action: {
        action: "more-info"
      }
    },
    sub_button: [
      // {


      //   show_icon: false,
      //   show_background: false,
      //   show_arrow: false,
      //   state_background: false,
      //   show_name: false,
      //   show_state: true,
      //   show_attribute: false,
      //   tap_action: {
      //     action: "more-info"
      //   },
      //   hold_action: {
      //     action: "more-info"
      //   }
      // },
      {

        show_attribute: false,
        show_icon: true,

        show_background: true,
        show_arrow: false,
        state_background: false,
        show_name: false,
        hold_action: {
          action: "more-info"
        }
      }
    ]
  };
}
function lcars_bubble(entity, config = {}, color_active = "#00e1ff", color_inactive = "#006673") {
  let extraModeCss = "";
  if (!!config.colorblind) {
    let border = "${state == 'off' ? '" + color_inactive + "' : '" + color_active + "'}"
    extraModeCss = `
        ${extraModeCss}
        .bubble-background{
            box-shadow: inset 0px 0px 0px 5px ${color_inactive} !important;
            opacity: 1 !important;
        }
        
        *{
        --bubble-button-main-background-color: transparent;
            --primary-text-color: white;
        }
            .bubble-range-fill{
            z-index: 200;
            }
        .bubble-name-container{
          z-index: 300;
        }
        .bubble-sub-button-container{
          z-index: 400;
        }

    `;
  }
  const styles = `* {
    --row-height: 45px;
    --bubble-default-color: ${color_active};
    --bubble-icon-color: black;
    --bubble-button-main-background-color: ${color_inactive};
    --bubble-sub-button-background-color: #ffffffaa;
    --primary-text-color: black;
    --ha-font-family-body: 'Antonio', monospace, Arial, sans-serif;
    --bubble-button-icon-background-color: transparent;
    text-transform: uppercase;
    font-family: 'Antonio',monospace, Arial, sans-serif;
  }
  .bubble-range-fill{
    /*border-right: 4px solid black;*/
    box-shadow: 4px 0px 0px 0px black
  }
  ${extraModeCss}

  `;
  // //console.log("styles",styles);
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
    show_name: true,
    tap_to_slide: false,
    relative_slide: false,
    slider_live_update: true
  };
}


export function lcars_climate_bubble(entity, config = {}, color_active = "#00e1ff", color_inactive = "#006673") {
  const slider = lcars_bubble(entity, config, color_active, color_inactive)
  return {
    ...slider,
    attribute: "current_temperature",
  };
}
export function lcars_slider_bubble(entity, config = {}, color_active = "#00e1ff", color_inactive = "#006673") {
  const slider = lcars_bubble(entity, config, color_active, color_inactive)
  return {
    ...slider,
    attribute: "current_temperature",
    sub_button: [
      // {
        
      //   show_attribute: true,
      //   attribute: "initial",
      //   show_icon: false,
      //   show_state: true,
      //   show_background: false,
      //   show_arrow: false,
      //   state_background: false,
      //   show_name: false,
      //   hold_action: {
      //     action: "more-info"
      //   }
      // }
    ],
    show_icon: true,
    show_state: true
  };
}
export function lcars_cover_bubble(entity, config = {}, color_active = "#00e1ff", color_inactive = "#006673") {
  const slider = lcars_bubble(entity, config, color_active, color_inactive)

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
export function lcars_cover_bubble_vert(entity, color_active = "#00e1ff", color_inactive = "#006673") {
  let slider = lcars_bubble(entity, config = {}, color_active, color_inactive);
  slider = {
    ...slider,
    styles: `
      ${slider.styles}
      :host{
        height: 100% !important;
      }
      *{
        height: 100% !important;
         --bubble-button-border-radius: 0px !important;
      }
      .bubble-range-fill{
        border-right: 0px solid black;
        border-bottom: 4px solid black;
      }
    `

  };

  return {
    ...slider,
    attribute: "current_position",
    show_state: true,
    show_attribute: false,
    sub_button: [

    ],
    min_value: 100,
    max_value: 0,
    step: 1,
    slider_fill_orientation: "top"

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



export function lcars_mini_graph(climate, heating = [], outside_shadow = null, outside_sun = null, valve_open = []) {
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

  valve_open.forEach(h => {
    entities.push({
      entity: h,
      name: "Ventil",
      color: "#bb00ff",
      smoothing: false,
      show_state: false,
      show_legend_state: true,
      show_indicator: true,
      show_graph: true,
      show_line: true,
      show_fill: false,
      show_points: true,
      show_legend: true,
      show_name: true,
      y_axis: "secondary"
    });
  });
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