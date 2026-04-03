// ====================================================================
// VIEW BUILDER - Erstellt View-Definitionen
// ====================================================================

/**
 * Erstellt den Haupt-Übersichts-View
 */
export function createOverviewView(sections) {
  return {
    title: "Übersicht",
    path: "home",
    icon: "mdi:home",
    type: "panel",
    max_columns: 3,

    cards: sections
  };
}

export function createFloorView(sections, name, path) {
  return {
    title: name,
    path: path,
    icon: "mdi:home",
    type: "panel",
    max_columns: 3,
    // badges: personBadges.length > 0 ? personBadges : undefined,
    // header: personBadges.length > 0 ? {
    //   layout: "center",
    //   badges_position: "bottom",
    //   badges_wrap: "wrap"
    // } : undefined,
    cards: sections
  };
}



/**
 * Erstellt die Utility-Views (Lichter, Covers, Security, Batterien)
 */
export function createUtilityViews(entities, showSummaryViews = false, config = {}) {
  return [
    {
      title: "Lichter",
      path: "lights",
      icon: "mdi:lamps",
      subview: !showSummaryViews,
      strategy: {
        type: "custom:at_lcars-view-lights",
        entities,
        config // Übergebe config für areas_options Filterung
      }
    },
    {
      title: "Rollos & Vorhänge",
      path: "covers",
      icon: "mdi:blinds-horizontal",
      subview: !showSummaryViews,
      strategy: {
        type: "custom:at_lcars-view-covers",
        entities,
        device_classes: ["awning", "blind", "curtain", "shade", "shutter", "window"],
        config // Übergebe config für areas_options Filterung
      }
    },
    {
      title: "Sicherheit",
      path: "security",
      icon: "mdi:security",
      subview: !showSummaryViews,
      strategy: {
        type: "custom:at_lcars-view-security",
        entities,
        config // Übergebe config für areas_options Filterung
      }
    },
    {
      title: "Batterien",
      path: "batteries",
      icon: "mdi:battery-alert",
      subview: !showSummaryViews,
      strategy: {
        type: "custom:at_lcars-view-batteries",
        entities,
        config // Übergebe config für areas_options Filterung
      }
    }
  ];
}

/**
 * Erstellt Views für jeden sichtbaren Bereich
 */
export function createAreaViews(visibleAreas, devices, entities, showRoomViews = false, areasOptions = {}, dashboardConfig = {},basepath="/", type="control") {
  var pathSuffix="";

  switch (type) {
    case "config":
      pathSuffix="-config"
      break;
    case "all":
      pathSuffix="-all"
      break;
    case "stats":
      pathSuffix="-stats"
      break;
  
    default:
      break;
  }
  
  return visibleAreas.map(area => {
    const areaOptions = areasOptions[area.area_id] || {};
    return {
      title: area.name,
      
      path: area.area_id+pathSuffix,
      icon: area.icon || "mdi:floor-plan",
      subview: false,
      config: dashboardConfig,
      // theme: "LCARS Breen",
      strategy: {
        type: "custom:at-lcars-view-room",
        area,
        devices,
        entities,
        groups_options: areaOptions.groups_options || {},
        dashboardConfig, // Übergebe vollständige Dashboard-Config für Raum-Pins
        basepath: basepath,
        test: "bla",
        cardtype: "custom:at-lcars-room"+pathSuffix
      }
    };

  });
}
export function createAreaConfigViews(visibleAreas, devices, entities, showRoomViews = false, areasOptions = {}, dashboardConfig = {}, basepath="") {
  return visibleAreas.map(area => {
  
    const areaOptions = areasOptions[area.area_id] || {};
    
    return {
      title: area.name,
      path: `${area.area_id}-config`,
      icon: area.icon || "mdi:floor-plan",
      subview: !showRoomViews,
      // theme: "LCARS Breen",
      strategy: {
        type: "custom:at-lcars-view-room-config",
        area,
        devices,
        entities,
        groups_options: areaOptions.groups_options || {},
        dashboardConfig, // Übergebe vollständige Dashboard-Config für Raum-Pins
        basepath: basepath
      }
    };
  });
}
export function createAreaAllViews(visibleAreas, devices, entities, showRoomViews = false, areasOptions = {}, dashboardConfig = {}, basepath="") {
  return visibleAreas.map(area => {
    const areaOptions = areasOptions[area.area_id] || {};
    
    return {
      title: area.name,
      path: `${area.area_id}-all`,
      icon: area.icon || "mdi:floor-plan",
      subview: !showRoomViews,
      // theme: "LCARS Breen",
      strategy: {
        type: "custom:at-lcars-view-room-all",
        area,
        devices,
        entities,
        groups_options: areaOptions.groups_options || {},
        dashboardConfig, // Übergebe vollständige Dashboard-Config für Raum-Pins
        basepath: basepath
      }
    };
  });
}