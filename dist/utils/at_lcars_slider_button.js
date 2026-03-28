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
