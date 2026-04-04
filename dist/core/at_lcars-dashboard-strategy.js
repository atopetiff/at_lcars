// ====================================================================
// DASHBOARD STRATEGY - Generiert die Hauptstruktur
// ====================================================================
// Nutzt direkt die im hass-Objekt verfügbaren Registry-Daten
// Keine WebSocket-Calls mehr nötig!
// ====================================================================

import { getVisibleAreas } from '../utils/at_lcars-helpers.js';
import {
  collectPersons,
  collectLights,
  collectCovers,
  collectSecurityUnsafe,
  collectBatteriesCritical,
  findWeatherEntity,
  findDummySensor
} from '../utils/at_lcars-data-collectors.js';
import { createPersonBadges } from '../utils/at_lcars-badge-builder.js';
import {
  createOverviewSection,
  createAreasSection,
  createWeatherEnergySection
} from '../utils/at_lcars-section-builder.js';
import {
  createOverviewView,
  createUtilityViews,
  createAreaViews,
  createFloorView,
  createAreaConfigViews,
  createAreaAllViews,
  createFloorStrat
} from '../utils/at_lcars-view-builder.js';

class AtLcarsDashboardStrategy {
  static async generate(config, hass) {
    // Nutze die bereits im hass-Objekt verfügbaren Registry-Daten
    // Diese sind als Objects verfügbar mit ID als Key
    // Konvertiere sie zu Arrays für die weitere Verarbeitung
    const areas = Object.values(hass.areas || {});
    const devices = Object.values(hass.devices || {});
    const entities = Object.values(hass.entities || {});
    const floors = Object.values(hass.floors || {});

    console.log(config);

    const floorWithGroup = floors.map(f => {
      var labelArea = areas.filter(a => a.name == f.name);
      var group = "noGroup";
      if (labelArea.length == 1) {
        const labels = labelArea[0].labels.filter(l => l.startsWith("floorgroup_"));
        if (labels.length == 1) {
          group = labels[0];
        }


      }
      return { ...f, group: group }
    });

    // console.log({floorWithGroup});
    var groups = Object.groupBy(floorWithGroup, ({ group }) => group);
    // console.log({groups});
    const protocols = entities.filter(e => e.labels.includes("protokoll")).map(e => { return e.entity_id });
    //console.log(protocols);

    const notHiddenAreas = areas.filter(a => a.labels.includes("hidden") === false);
    const noLevelFloor = floors.filter(f => f.level === null).map(f => f.floor_id);
    //console.log({noLevelFloor});
    let area_struct = {
      other: [
        ...notHiddenAreas.filter(a => a.floor_id === null || noLevelFloor.includes(a.floor_id)),
        // ...notHiddenAreas.filter(a=>floors.filter(f=>f.floor_id===a.floor_id&&f.level===null)),
        // ...floors.filter(f=>f.level===null).map(f=>{return {notHiddenAreas.filter(a=>a.floor_id===f.floor_id)};})
        // ...floors.filter(f=>f.level===null).map(f=>{return {floor_id: f.floor_id,name: f.name, level: f.level, areas: notHiddenAreas.filter(a=>a.floor_id===f.floor_id)};})
      ],
      inside: floors.filter(f => f.level !== null).map(f => { return { floor_id: f.floor_id, name: f.name, level: f.level, areas: notHiddenAreas.filter(a => a.floor_id === f.floor_id) }; })
    };




    // //console.log("areas",{areas:areas, floors:floors,struct: area_struct})

    // //console.log("RE",{"areas": areas});

    // Labels für Filterung von Entitäten
    const excludeLabels = entities
      .filter(e => e.labels?.includes("no_dboard"))
      .map(e => e.entity_id);

    // Filtere und sortiere Areale basierend auf Config
    const visibleAreas = getVisibleAreas(areas, config.areas_display);

    // Sammle alle benötigten Daten (übergebe config für areas_options Filterung)
    const persons = collectPersons(hass, excludeLabels, config);
    const lightsOn = collectLights(hass, excludeLabels, config);
    const coversOpen = collectCovers(hass, excludeLabels, config);
    const securityUnsafe = collectSecurityUnsafe(hass, excludeLabels, config);
    const batteriesCritical = collectBatteriesCritical(hass, excludeLabels, config);
    const weatherEntity = findWeatherEntity(hass, excludeLabels, config);
    const someSensorId = findDummySensor(hass, excludeLabels, config);


    //console.log("RE", coversOpen);
    // Erstelle Person-Badges (KORRIGIERT: mit hass Parameter)
    const personBadges = createPersonBadges(persons, hass);

    // Prüfe ob Wetter-Karte angezeigt werden soll (Standard: true)
    const showWeather = config.show_weather !== false;

    // Prüfe ob Energie-Dashboard angezeigt werden soll (Standard: true)
    const showEnergy = config.show_energy !== false;

    // Prüfe ob Such-Karte angezeigt werden soll (Standard: false)
    const showSearchCard = config.show_search_card === true;

    // Prüfe ob Zusammenfassungs-Views angezeigt werden sollen (Standard: false)
    const showSummaryViews = config.show_summary_views === true;

    // Prüfe ob Raum-Views angezeigt werden sollen (Standard: false)
    const showRoomViews = config.show_room_views === true;

    // Prüfe ob Bereiche nach Etagen gruppiert werden sollen (Standard: false)
    const groupByFloors = config.group_by_floors === true;

    const pathname = document.location.pathname;
    const split = pathname.split("/");
    // console.log(split);
    var base = "/"
    if (split.length >= 2) {
      base = `/${split[1]}`
    }
    // console.log(base);

    // Erstelle Sections für den Haupt-View
    const overviewSections = [
      {
        type: "custom:at-lcars-house",
        protocols: protocols,
        areas: area_struct,
        floorGroups: floorWithGroup,
        basepath: base
      }
      // createOverviewSection({
      //   lightsOn,
      //   coversOpen,
      //   securityUnsafe,
      //   batteriesCritical,
      //   someSensorId,
      //   showSearchCard,
      //   config,
      //   hass
      // }),
      // // Wenn groupByFloors aktiv ist, ist areasSections ein Array von Sections
      // ...(Array.isArray(areasSections) ? areasSections : [areasSections]),
      // // Füge Wetter & Energie Section(s) nur hinzu wenn nicht null/leer
      // ...(weatherEnergySection 
      //   ? (Array.isArray(weatherEnergySection) 
      //     ? weatherEnergySection 
      //     : [weatherEnergySection])
      //   : [])
    ];

    // console.log("area_struct",area_struct);

    // console.log("seperte views",!!config.group_by_floors);
    if (!config.group_by_floors) {
      let rooms = [];
      area_struct.inside.forEach(floor => {
        rooms = [
          ...rooms,
          ...floor.areas
        ];
      });
      rooms = [
        ...rooms,
        {
          aliases: [],
          area_id: null,
          floor_id: "none",
          humidity_entity_id: null,
          icon: "mdi:desktop-classic",
          labels: [],
          name: "NONE",
          picture: null,
          temperature_entity_id: null,
        }
      ]
      area_struct.inside = [
        {
          areas: rooms,
          floor_id: "all",
          level: 0,
          name: "EG"
        }
      ];

    }
    console.log("area_struct NEW", area_struct);


    // const floorViews = area_struct.inside.map(f=>{
    //   return createFloorView([{
    //     type: "custom:at-lcars-floor",
    //     areas: f.areas,
    //     basepath: base,
    //     dashboardConfig: config
    //   }], f.name, "floor-"+f.floor_id)
    // });
    let areas_sorted = [];

    if (config?.areas_display?.order) {


      area_struct.inside.forEach(f => {

        let areas = [];
        config.areas_display.order.forEach(o => {
          const area = f.areas.find(a => a.area_id == o);
          if (area) {
            areas.push(area);
          }
        });
        areas = [
          ...areas,
          ...f.areas.filter(ua => areas.some(a => a.area_id == ua.area_id) == false)
        ];

        areas_sorted = [
          ...areas_sorted,
          {
            ...f,
            areas: areas,

          }
        ]
      });

      area_struct = {
        ...area_struct,
        inside: areas_sorted
      };

    }
    const floorViews = area_struct.inside.map(f => {
      return createFloorStrat(f.name, "floor-" + f.floor_id, f.areas, config, base);
    });

    try {
      const fontUrl = new URL("./Antonio.woff2", import.meta.url).href;
      console.log(fontUrl)
      let link = document.createElement("link");
      link.setAttribute('type', 'font/woff2');
      link.setAttribute('rel', 'preload');
      link.setAttribute('as', 'font');
      link.setAttribute('href', fontUrl);
      link.setAttribute('crossorigin', "anonymous");
      document.head.appendChild(link);
      let style = document.createElement("style");
      
      style.textContent = `
  @font-face {
    font-family: "Antonio";
    src: url("${fontUrl}") format("woff2");
  
    font-style: normal;
    font-display: swap;
  }

  
`;
      document.head.appendChild(style);
    } catch (error) {
      console.error("Error adding font",error);
    }

    const roomViews = createAreaViews([
      ...area_struct.other,
      ...area_struct.inside.map(f => f.areas).flat()
    ], devices, entities, showRoomViews, config.areas_options || {}, config, base, "control");
    const roomConfigViews = createAreaViews([
      ...area_struct.other,
      ...area_struct.inside.map(f => f.areas).flat()
    ], devices, entities, showRoomViews, config.areas_options || {}, config, base, "config");

    const roomAllViews = createAreaViews([
      ...area_struct.other,
      ...area_struct.inside.map(f => f.areas).flat()
    ], devices, entities, showRoomViews, config.areas_options || {}, config, base, "all");

    const roomStatsViews = createAreaViews([
      ...area_struct.other,
      ...area_struct.inside.map(f => f.areas).flat()
    ], devices, entities, showRoomViews, config.areas_options || {}, config, base, "stats");

    // Erstelle alle Views mit areas_options und config
    const views = [
      ...floorViews,
      createOverviewView(overviewSections),
      ...roomViews,
      ...roomConfigViews,
      ...roomAllViews,
      ...roomStatsViews
      // ...createUtilityViews(entities, showSummaryViews, config),

    ];

    return {
      kiosk_mode: {
        hide_header: '{{ is_state("input_boolean.lcars_kiosk", "on") }}',
        hide_sidebar: false//'{{ is_state("input_boolean.lcars_kiosk", "on") }}'
      },
      title: "Dynamisches Dashboard",
      views
    };
  }

  // Füge die Methode hinzu, um den Config-Editor zu laden
  static async getConfigElement() {
    console.log("getconfigelement");
    // Der Editor sollte schon geladen sein, da er im Loader ist
    // Warte kurz, falls er noch lädt
    await import('./at_lcars-dashboard-strategy-editor.js');
    await customElements.whenDefined('at_lcars-dashboard-strategy-editor');
    return document.createElement('at_lcars-dashboard-strategy-editor');
  }
}

// Registriere Custom Element mit dem korrekten Namen
customElements.define("ll-strategy-dashboard-at-lcars-strategy", AtLcarsDashboardStrategy);
