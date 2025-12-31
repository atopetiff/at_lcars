// ====================================================================
// VIEW STRATEGY - RAUM (generiert Raum-Configuration) - OPTIMIERT + KAMERAS
// ====================================================================

// import { AtRoomLayout } from "../cards/layoutcard.js";
class AtLcarsRoomConfigView {
  static async generate(config, hass) {
    const { area, devices, entities } = config;

    const card = {
      type: "custom:at-lcars-room-config",
      room: `${area.name}`,
      area_id: area.area_id,
    };

    return {
      type: "panel",
      cards: [card]

    };
  }
}

// Registriere Custom Element
customElements.define("ll-strategy-at-lcars-view-room-config", AtLcarsRoomConfigView);