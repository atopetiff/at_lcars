export function scheduler(entities, title="", discover_existing=false) {
  let scheduler = {
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
    discover_existing: discover_existing,

  };
  if(title!=""){
    scheduler={
      ...scheduler,
      title: title
    }
  }
  if(entities.length>0){
    scheduler={
      ...scheduler,
      include: entities,
    };
  }
  return {
    ...scheduler
  }
}