// ====================================================================
// VIEW STRATEGY - RAUM (generiert Raum-Details) -
// ====================================================================
class AtLcarsRoomAllView {
  static async generate(config, hass) {
    const { area, devices, entities, basepath } = config;

 
  

    const card = {
      type: "custom:at-lcars-room-all",
      room: `${area.name}`,
      area_id: area.area_id,
      floor_id: area.floor_id,
      basepath: basepath
    };

    return {
      type: "panel",
      cards: [card]

    };
  }
}

// Registriere Custom Element
customElements.define("ll-strategy-at-lcars-view-room-all", AtLcarsRoomAllView);