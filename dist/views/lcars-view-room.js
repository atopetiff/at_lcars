// ====================================================================
// VIEW STRATEGY - RAUM (generiert Raum-Details) -
// ====================================================================
class AtLcarsRoomView {
  static async generate(config, hass) {
    const { area, devices, entities, basepath, cardtype, dashboardConfig } = config;

  

    const card = {
      type: cardtype,
      room: `${area.name}`,
      area_id: area.area_id,
      floor_id: area.floor_id,
      basepath: basepath,
      dashboardConfig: dashboardConfig
    };

    return {
      type: "panel",
      cards: [card]

    };
  }
}

// Registriere Custom Element
customElements.define("ll-strategy-at-lcars-view-room", AtLcarsRoomView);