export function scheduler(entities) {
  return {
    type: "custom:scheduler-card",
    default_editor: "scheme",
    sort_by: [
      "state",
      "title"
    ],
    display_options: {
      primary_info: "default",
      secondary_info: [
        "relative-time",
        "days",
        "time"
      ]
    },
    show_header_toggle: false,
    discover_existing: false,
    include: entities
  };
}