export class EntityManager {

  hass = null;
  lastStates = null;
  entities = [];
  devices = [];

  redAlert="";
  redAlertColor="#cc0000";
  yellowAlert="";
  yellowAlertColor="#d2bf50";

  outsideSun=null;
  outsideShadow=null;

  area = null;
  changeTracker = [];

  color1 = "#c69";
  color2 = "#cc99cc";
  color3 = "#99f";
  color4 = "#99c";

  constructor(hass) {
    this.updateTrackedStates(hass);
    this.entities = Object.values(this.hass.entities || {});
    this.devices = Object.values(this.hass.devices || {});
    // this.areas = Object.values(this.hass.areas || {});
    this.changeTracker = [];

    this.setColors();
    this.redAlert=this.entities.find(e=>e.labels.includes("redalert"))?.entity_id;
    this.yellowAlert=this.entities.find(e=>e.labels.includes("yellowalert"))?.entity_id;
    this.outsideShadow=this.entities.find(e=>e.labels.includes("outside_shadow"));
    this.outsideSun=this.entities.find(e=>e.labels.includes("outside_sun"));



  }
  
  getColors(area_id=undefined){
    const color1 = this.entities.find(e=>e.labels.includes("lcars_primary_color")&&e.area_id===area_id);
    const color2 = this.entities.find(e=>e.labels.includes("lcars_secondary_color")&&e.area_id===area_id);
    const color3 = this.entities.find(e=>e.labels.includes("lcars_tertiary_color")&&e.area_id===area_id);
    const color4 = this.entities.find(e=>e.labels.includes("lcars_quanternary_color")&&e.area_id===area_id);
    const color = this.entities.find(e=>e.labels.includes("lcars_color")&&e.area_id===area_id);
    
    if(!!color){

      const values = this.hass.states[color.entity_id]?.state;
      const colors = values.split(',');
      if (colors.length==4){
        return {color1: colors[0], color2: colors[1], color3: colors[2], color4: colors[3]};
      } 
    }

    //console.log({color4});
    if(!color1 || !color2 || !color3 || !color4){
      //abbrechen wenn kein komplettes Design vorliegt
      return {color1: this.color1, color2: this.color2, color3: this.color3, color4: this.color4};
    }
    const value1 = this.hass.states[color1.entity_id]?.state;
    const value2 = this.hass.states[color2.entity_id]?.state;
    const value3 = this.hass.states[color3.entity_id]?.state;
    const value4 = this.hass.states[color4.entity_id]?.state;
    const nullval=["","unknown","undefined",null,undefined];
    if (nullval.includes(value1) || nullval.includes(value2)  || nullval.includes(value3)  || nullval.includes(value4) ) {
      return {color1: this.color1, color2: this.color2, color3: this.color3, color4: this.color4};
    }

    return {color1: value1, color2: value2, color3: value3, color4: value4};

  }
  setColors(area_id=undefined){
    const colors = this.getColors(area_id);
    //console.log({colors});
    this.color1 = colors.color1;
    this.color2 = colors.color2;
    this.color3 = colors.color3;
    this.color4 = colors.color4;
  }

  _trackedEntityIds() {
    // hier alle relevanten entity_ids eintragen/ableiten
    // z.B. einzelne ID:

    return [...new Set(this.changeTracker.map(ct => ct.id))];

    // oder mehrere:
    // return this._config.entities || [];
  }
  reset() {
    this.lastStates = {};
  }
  changeDetection() {
    this.changeTracker.forEach(ct => {
      ct.element.hass = this.hass;
      // if(this._elementHasRelevantChange(newHass,ct.id)){
      // }
    })
  }
  updateTrackedStates(hass) {
    if (!!hass) {

      this.hass = hass
      this.changeDetection();
      this.lastStates = {};
      const ids = this._trackedEntityIds();
      //console.log(ids, hass);
      for (const id of ids) {
        this.lastStates[id] = this.hass.states[id];
      }
    }
  }
  hasRelevantChange(newHass) {
    const ids = this._trackedEntityIds();
    //console.log("ids", ids)
    if(ids.includes('*')){
      return true;
    }
    for (const id of ids) {
      const oldState = this.lastStates[id];
      const newState = newHass.states[id];
      ////console.log("states", { old: oldState, new: newState });
      if (!oldState && newState) return true;
      if (oldState && !newState) return true;
      if (!oldState && !newState) continue;

      // Vergleich: hier kannst du schärfer/granularer werden
      if (
        oldState.state !== newState.state ||
        oldState.last_changed !== newState.last_changed ||
        oldState.attributes?.current_position !== newState.attributes?.current_position ||
        oldState.attributes?.temperature !== newState.attributes?.temperature ||
        oldState.attributes?.current_temperature !== newState.attributes?.current_temperature
      ) {
        return true;
      }
    }
    return false;
  }

  updateHass(hass) {
    const needsRender = this.hasRelevantChange(hass);

    //console.log("needs render", { needsRender: needsRender, config: !this._config });
    if (needsRender) {

      this.updateTrackedStates(hass);

      //this._render();
    }
  }



  _addCard(type, name, config, id, track = true) {

    const fullname = `${name}${id}`;
    if (track) {
      this.changeTracker.push({ id: id, name: fullname, element: document.createElement(type, name) });
      const newElement = this.changeTracker.find(e => e.name == fullname);
      try {
        
        newElement.element.setConfig(config);
  
        newElement.element.hass = this.hass;
        return newElement.element;
      } catch (e) {
        console.error("error adding tracked card create set config",{type: type, name: name, config: config, id: id, changeTracker: this.changeTracker })
        throw new Error("error adding tracked card create set config");
        
      }
    } else {
      const newElement = document.createElement(type);
      
      try {
        newElement.setConfig(config);
        newElement.hass = this.hass;
        return newElement;
        
      } catch (e) {
        console.error("error adding NON tracked card create set config",{newElement: newElement,type: type, name: name, config: config, id: id, changeTracker: this.changeTracker, error: e })
        throw new Error("error adding NON tracked card create set config");
        
      }
    }

  }

  roomDevices = [];
  roomEntities = [];
  roomWindow = null;
  roomClimate = null;
  roomTemperature = null;
  roomTemperatureEntity = null;
  roomHumidity = null;
  roomHumidityEntity = null;
  roomLights = [];
  roomTrvs = [];
  roomPowers = [];
  roomCover = [];
  everyRoom = [];
  area = null;



  fillRoom(area_id) {

    // // this.area = this.areas.find(a=>a.area_id===area_id);
    // this.area = this.hass.areas[area_id];
    // //console.log(this.area, this.areas);
    // this.roomTemperature = this.area.temperature_entity_id;
    // this.roomHumidity = this.area.humidity_entity_id;
    // this.roomDevices = this.devices.filter(d => d.area_id === area_id).map(d => d.id);
    // this.roomEntities = this.entities.filter(e =>
    //   e.area_id && e.area_id === area_id
    //   || (e.device_id && this.roomDevices.includes(e.device_id))
    // );
    // this.roomWindow = this.roomEntities.find(e => e.labels.includes("fenster"))?.entity_id;
    // this.roomClimate = this.roomEntities.find(e => e.labels.includes("thermostat"))?.entity_id;
    // this.roomCover = this.roomEntities.filter(e => e.labels.includes("cover")).map(e => e.entity_id);
    // this.everyRoom = this.entities.filter(e => e.labels.includes("everyroom"));
    // this.roomLights = this.roomEntities.filter(e => e.labels.includes("licht")).map(e => e.entity_id);
    // //console.log("target room", area_id, this.roomEntities, this.area);

    const filtered = this.filterForArea(area_id);
    this.area = filtered.area;
    this.roomTemperature = filtered.temperature;
    this.roomTemperatureEntity = filtered.temperature_entity;
    this.roomHumidity = filtered.humidity;
    this.roomHumidityEntity = filtered.humidity_entity;
    this.roomDevices = filtered.devices;
    this.roomEntities = filtered.entities;
    this.roomWindow = filtered.window;
    this.roomClimate = filtered.climate;
    this.roomCover = filtered.covers;
    this.everyRoom = filtered.everyRoom;
    this.roomLights = filtered.lights;
    this.roomPowers = filtered.powerToggles;
    this.roomTrvs = filtered.trvs;
    this.roomInfos = filtered.info;
    this.setColors(area_id);

  }

  filterForArea(area_id){
    
    const roomDevices = this.devices.filter(d => d.area_id === area_id).map(d => d.id);
    const roomEntities = this.entities.filter(e =>
      e.area_id && e.area_id === area_id
      || (e.device_id && roomDevices.includes(e.device_id))
    );
    var colors = this.getColors(area_id);
    const everyroom = this.entities.filter(e => e.labels.includes("everyroom"));
    return {
      area: {
        ...this.hass.areas[area_id],
        color1: colors.color1,
        color2: colors.color2,
        color3: colors.color3,
        color4: colors.color4
      },
      temperature: this.hass.areas[area_id].temperature_entity_id,
      temperature_entity: roomEntities.find(e => e.entity_id==this.hass.areas[area_id].temperature_entity_id),
      humidity: this.hass.areas[area_id].humidity_entity_id,
      humidity_entity: roomEntities.find(e => e.entity_id==this.hass.areas[area_id].humidity_entity_id),
      devices: roomDevices,
      entities: roomEntities,
      window: roomEntities.find(e => e.labels.includes("fenster"))?.entity_id,
      climate: roomEntities.find(e => e.labels.includes("thermostat"))?.entity_id,
      covers: roomEntities.filter(e => e.labels.includes("cover")).map(e => e.entity_id),
      everyRoom: everyroom.map(e=>e.entity_id),
      lights: roomEntities.filter(e => e.labels.includes("licht")).map(e => e.entity_id),
      trvs: roomEntities.filter(e => e.labels.includes("heizung")).map(e => e.entity_id),
      powerToggles: roomEntities.filter(e => e.labels.includes("powertoggle")&&e.labels.includes("licht")==false).map(e => e.entity_id),
      info: [
        ...everyroom.filter(e=>e.labels.includes("info")),
        ...roomEntities.filter(e=>e.labels.includes("info"))
      ]
    };
  }


}

export class Card extends HTMLElement {
  constructor() {
    super();
  }
  _addCard(selector, type, name, config, id, track = true) {
    try {
      
      const card = this.querySelector(selector);
      const fullname = `${name}${id}`;
      // setTimeout(() => {
        card.appendChild(this.em._addCard(type, name, config, id, track));
        
      // }, 0);
    } catch (e) {
      console.error("Error adding Card to selector", {selector:selector, id:id, msg:e})
    }
  }
  _addHTMLCard(selector, html, config, id, track = true) {
    try {
      const card = this.querySelector(selector);
     let cardEl = document.createElement("hui-history-graph-card","#graph");
     card.appendChild(cardEl);
     setTimeout(() => {
      
      cardEl.config(config);
     }, 0);

        
      // }, 0);
    } catch (e) {
      console.error("Error adding Card to selector", {selector:selector, id:id, msg:e})
    }
  }

  setConfig(config) {
    // if (!config.entity) {
    //   throw new Error("You need to define an entity");
    // }
    //console.log(config);
    this._config = config;
    this.config = config;
    // this._hass = null;
    this._lastStates = {};
  }


}