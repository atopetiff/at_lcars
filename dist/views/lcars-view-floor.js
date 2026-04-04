// ====================================================================
// VIEW STRATEGY - RAUM (generiert Raum-Details) -
// ====================================================================
class AtLcarsFloorView {
  static async generate(config, hass) {
    const {  basepath, dashboardConfig,areas } = config;

 
  

    const card = {
      type: "custom:at-lcars-floor",
      basepath: basepath,
      dashboardConfig,
      areas: areas
    };

    return {
      type: "panel",
      cards: [card]

    };
  }
}

// Registriere Custom Element
customElements.define("ll-strategy-at-lcars-view-floor", AtLcarsFloorView);