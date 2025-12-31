import { lcars_footer_alert, lcars_footer_left_alert, lcars_cb_alert_omni, lcars_footer_right_alert, lcars_top_left_alert, lcars_top_right_alert } from "../utils/lcars-borders.js";
import { lcars_floor_plan_tempnav,lcars_floor_plan_window,lcars_floor_plan_humidity } from "../utils/lcars-buttons.js";

//import { lcars_switch, lcars_button, lcars_climate, lcars_cover_open, lcars_cover_slider, lcars_cover_close, lcars_cover_summer } from "./lcars.js";
class AtLcarsFloorPlan extends HTMLElement {
  constructor() {
    super();
    this.old = null;
    this.changeTracker = [];
    console.log("lcars floor")
    this._devices = [];
    this._areasWithEntities=[];
    this._entities = [];
  }
  setConfig(config) {
    // if (!config.entity) {
    //   throw new Error("You need to define an entity");
    // }
    console.log(config);
    this._config = config;
    this.config = config;
    this._hass = null;
    this._lastStates = {};
  }

  _trackedEntityIds() {
    // hier alle relevanten entity_ids eintragen/ableiten
    // z.B. einzelne ID:
    return [
      //this._config.entity
    ];

    // oder mehrere:
    // return this._config.entities || [];
  }

  _updateTrackedStates() {
    this._lastStates = {};
    const ids = this._trackedEntityIds();
    this._devices = Object.values(this._hass.devices || {});
    this._entities = Object.values(this._hass.entities || {});
    console.log("set devices and entities",{devices: this._devices, entities: this._entities});
    for (const id of ids) {
      this._lastStates[id] = this._hass.states[id];
    }
  }

  _elementHasRelevantChange(newHass, id) {
    const oldState = this._lastStates[id];
    const newState = newHass.states[id];
    console.log("states", { old: oldState, new: newState });
    if (!oldState && newState) return true;
    if (oldState && !newState) return true;

    // Vergleich: hier kannst du schärfer/granularer werden
    if (
      oldState.state !== newState.state ||
      oldState.last_changed !== newState.last_changed ||
      oldState.attributes?.current_position !== newState.attributes?.current_position
    ) {
      return true;
    }
    return false;

  }

  changeDetection(newHass) {
    this.changeTracker.forEach(ct => {
      ct.element.hass = this._hass;
      // if(this._elementHasRelevantChange(newHass,ct.id)){
      // }
    })
  }
  _hasRelevantChange(newHass) {
    const ids = this._trackedEntityIds();
    for (const id of ids) {
      const oldState = this._lastStates[id];
      const newState = newHass.states[id];
      console.log("states", { old: oldState, new: newState });
      if (!oldState && newState) return true;
      if (oldState && !newState) return true;
      if (!oldState && !newState) continue;

      // Vergleich: hier kannst du schärfer/granularer werden
      if (
        oldState.state !== newState.state ||
        oldState.last_changed !== newState.last_changed ||
        oldState.attributes?.current_position !== newState.attributes?.current_position
      ) {
        return true;
      }
    }
    return false;
  }

  groupEntities(){
    //  const windows = this._entities.filter(e=>e.labels.includes("fenster"))
    //   .filter(e=>
    //     (e.area_id&&e.area_id === a.area_id)
    //     ||(e.device_id && this._devices.filter(d=>d.area_id===a.area_id).some(d=>d.id === e.device_id))
    //   );
    //   console.log(`${a.area_id}:windows`,windows);
    const addArea = this._entities.map(e=>{
      if(!!e.area_id || e.device_id===null){
        return e;
      }
      const device = this._devices.find(d=>d.id===e.device_id);
      return {...e, area_id: device?.area_id};
    });
    console.log("mit Area",addArea.filter(a=>!!a.area_id))
    this._areasWithEntities = this._config.areas.map(a=>{
      const entities =  addArea.filter(e=>e.area_id===a.area_id);
      
      return {
        ...a,
        window_entity_id: entities.find(e=>e.labels.includes("fenster"))?.entity_id,
        entities: entities
      }
    });
    console.log("grouped", this._aresWithEntities);
  }

  set hass(hass) {
    // Erstes Mal: nur speichern und initial rendern
    // console.log("needs render", { has: !this._hass, config: !this._config });
    if (!this._hass && !!this._config) {
      this._hass = hass;
      this._updateTrackedStates();
      this.groupEntities();
      this._render();
      
      return;
    }
    // console.log("hass",hass.entities["switch.office_media"]);
    const needsRender = this._hasRelevantChange(hass);
    this.changeDetection(hass);
    this._hass = hass;
    // console.log("needs render", { needsRender: needsRender, config: !this._config });
    if (needsRender && !this._config == false) {
      this._updateTrackedStates();
      
      //this._render();
    }

  }

  _styles() {
    const rc = 'lcars_floor';
    return `
      .${rc}_bg{
        z-index:0;
        background: black;
        position: absolute;
        width: 100%;
        height: 100%;
          /*max-height: calc(100vh - var(--header-height));*/
        display: grid; 
          grid-template-columns: 1.5fr 8px 2fr; 
          grid-template-rows: 50px 1fr 1fr 25px; 
          gap: 0px 0px; 
          grid-template-areas: 
            "tl . tr"
            "tl .  tr"
            "bl . br"
            "bl . br"; 
          padding: 0px 0px 0px 0px;
      }
      .${rc}_bg>.topleft{
        grid-area: tl;
      }
      .${rc}_bg>.topright{
        grid-area: tr;
      }
      .${rc}_bg>.bottomleft{
        grid-area: bl;
      }
      .${rc}_bg>.bottomright{
        grid-area: br;
      }
      .${rc}{
          z-index: 1;
          position: absolute;
          width: 100%;
          height: 100% ;
          /*max-height: calc(100vh - var(--header-height));*/
          margin: 0px 0px 0px 0px;
          display: grid;
          display: grid; 
          grid-template-columns: 0.7fr 1fr 0.5fr 8px 2fr 0.7fr; 
          grid-template-rows: 50px 1fr 25px 25px; 
          gap: 0px 0px; 
          grid-template-areas: 
            "hl hl hl psh hr hr"
            ". content content content content ."
            "actions actions fle psf fr fr"
            "flbar flbar fle psf fr fr"; 
          padding: 0px 0px 0px 0px;
          /*grid-template-columns: 12px 1.3fr 8px 2fr; 
          grid-template-rows: 50px 0.15fr 0.7fr 0.15fr 25px 25px; 
          gap: 0px 0px; 
          grid-template-areas: 
            ". hl . hr"
            ". .  . ."
            ". content . ."
            ". .  . ."
            ". fle . fr"
            ". fle . fr"; 
          padding: 0px 0px 0px 0px;*/
          --ha-font-family-body: 'Antonio', Arial, sans-serif;
      }
      .${rc}>.bgborder1{
        background-color: goldenrod;
      }
      .${rc},${rc} *{
        --ha-font-family-body: 'Antonio', Arial, sans-serif;
        font-family: 'Antonio', Arial, sans-serif;
      }
      .${rc}>*{
          overflow: hidden;
      }
      .${rc}>*>*{
          overflow: hidden;
          width: 100%;
          height: 100%;
      }
      .${rc}>.hl { 
        grid-area: hl;
        }
      .${rc}>.hr { 
        grid-area: hr;
        }
      .${rc}>.content { 
        grid-area: content;
        display: grid; 
        grid-template-columns: 1fr 0.5fr 1fr; 
        grid-template-rows: 1fr 1fr 1fr; 
        background: transparent;
        gap: 0px 0px; 
       grid-template-columns: 4px 2.4fr 4px 2.3fr 4px 1.3fr 4px 0.8fr 4px 1fr 4px 2.3fr 4px;
        grid-template-rows: 4px 1.3fr 4px 1.9fr 4px 1.1fr 4px 1.4fr 4px 1.9fr 4px 1.3fr 4px;
        grid-template-areas: 
            ".      .       .       .      . .     .     eingang eingang eingang  eingang  eingang eingang"
            ".      esszimmer   .       kuche  . bad   .     eingang eingang eingang  eingang  eingang eingang"
            ".      esszimmer   .       kuche  . bad   .     .       .       .        .        .        ."
            ".      esszimmer   .       kuche  . bad   .     flur_ext flur_ext flur_ext  .        office    ."
            ".      esszimmer   .       kuche  . .     .     flur_ext flur_ext flur_ext  .        office    ."
            ".      esszimmer   .       kuche  . flur   flur   flur     flur     flur      .        office    ."
            ".      .       .       .      . flur   flur   flur     flur     flur      .        office    ."
            ".      wohnzimmer  wohnzimmer  wohnzimmer . flur   flur   flur     flur     flur      .        office    ."
            ".      wohnzimmer  wohnzimmer  wohnzimmer . .     .     .       .       .        .        .        ."
            ".      wohnzimmer  wohnzimmer  wohnzimmer . fitness fitness fitness   .       schlafzimmer schlafzimmer schlafzimmer ."
            ".      .       .       .      . fitness fitness fitness   .       schlafzimmer schlafzimmer schlafzimmer ."
            "balkon balkon  balkon  balkon . fitness fitness fitness   .       schlafzimmer schlafzimmer schlafzimmer ."
            "balkon balkon  balkon  balkon . .     .     .       .       .        .        .        .";
        gap: 0px;
        padding: 0px;
       filter: drop-shadow(0px 4px 0px white) drop-shadow(0px -4px 0px white) drop-shadow(4px 0px 0px white) drop-shadow(-4px 0px 0px white) drop-shadow(-6px 6px 0px black) drop-shadow(6px -6px 0px black);
        }
      .${rc}>.content>*{
        box-sizing: border-box;
        border-radius: 0px;
        background: black;
        position: relative;
        
        }
        .${rc}>.content>.inside{
          display: flex;
          flex-direction: column;
          
          border: none;
          
        }
        .${rc}>.content>*>* {
          position: absolute;
          top: 0px;
          left: 0px;
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          padding: 5px;
          box-sizing: border-box;
        } 
          
        .${rc}>.content>.inside>*:first-child {
          border-top-width: 2px;
          
          border-top-left-radius: 4px;
          border-top-right-radius: 4px;
        }
        .${rc}>.content>.inside>*:last-child {
          border-bottom-width: 2px;
          
          border-bottom-left-radius: 4px;
          border-bottom-right-radius: 4px;
        }
      ${this._houseOverviewCss(`.${rc}>.content`)}
      .${rc}>.fr { 
        grid-area: fr;
        
        }
      .${rc}>.fle { 
        grid-area: fle;
        }
      .${rc}>.flbar { 
        grid-area: flbar;
        }
      .${rc}>.actions { 
        grid-area: actions;
        background-color: lightblue;
        }
      
    `;
  }

  _houseOverview(){
    var html = ""
    var rooms = this._config?.areas.map(a=>{
      // const windows = this._entities.filter(e=>e.labels.includes("fenster"))
      // .filter(e=>
      //   (e.area_id&&e.area_id === a.area_id)
      //   ||(e.device_id && this._devices.filter(d=>d.area_id===a.area_id).some(d=>d.id === e.device_id))
      // );
      // console.log(`${a.area_id}:windows`,windows);
        return `<div class="${a.area_id}"><div id="${a.area_id}_temp" style="z-index:1;"></div><div id="${a.area_id}_window" style="z-index:0;"></div><div id="${a.area_id}_humidity" style="z-index:0;"></div></div>`;
    }
    ).join("");
    // console.log("html",rooms);
    return `${rooms}`

  }
  _houseOverviewCss(basepath){

    var rooms = this._config?.areas.map(a=>`${basepath}>.${a.area_id}{grid-area: ${a.area_id};}`).join(" ");
    
        // console.log("css", `${rooms}`);
        return rooms;
  }

  _html() {
    const tag = 'at-lcars-floor';
    const style_class = 'lcars_floor';
    return `
      <div class="${style_class}_bg">
        <div class="topleft"></div>
        <div class="topright"></div>
        <div class="bottomleft"></div>
        <div class="bottomright"></div>
      </div>
      <${tag} class="${style_class}">
        <div class="bgborder"></div>
        <div class="hl"></div>
        <div class="hr"></div>
        <div class="content">
        ${this._houseOverview()}
        </div>
        <div class="fr"></div>
        <div class="fle"></div>
        <div class="flbar"></div>
        <div class="actions"></div>
      </${tag}>
    `;
  }

  

  _addCard(selector, type, name, config, id) {
    const card = this.querySelector(selector);
    const fullname =`${name}${id}`;
    this.changeTracker.push({id:id,name:fullname,element:document.createElement(type, name)});
    const newElement = this.changeTracker.find(e=>e.name==fullname)
    newElement.element.setConfig(config);
    card.appendChild(this.changeTracker.find(e=>e.name==fullname).element);
    newElement.element.hass = this._hass;
  }

  _render() {
    console.log("lcars house rerender");
    this.innerHTML = `
        <style>
            ${this._styles()}
        </style>
        ${this._html()}
      `;

    console.log("config",this._config);


    // this._addCard(".hl", "cb-lcars-elbow-card", "hl", lcars_top_left_alert('input_boolean.red_alert', "goldenrod"), 'input_boolean.red_alert');
    // this._addCard(".hr", "cb-lcars-elbow-card", "hr", lcars_top_right_alert('input_boolean.red_alert', "goldenrod"),'input_boolean.red_alert');
    // this._addCard(".fr", "cb-lcars-elbow-card", "fr", lcars_footer_right_alert('input_boolean.red_alert', "goldenrod"),'input_boolean.red_alert');
    // this._addCard(".fle", "cb-lcars-elbow-card", "fle", lcars_footer_left_alert('input_boolean.red_alert', "goldenrod"),'input_boolean.red_alert');
    // this._addCard(".flbar", "cb-lcars-elbow-card", "flbar", lcars_footer_alert('input_boolean.red_alert', "goldenrod"),'input_boolean.red_alert');
    // this._addCard(".actions", "at-lcars-protocols", "actions", {type: "custom:at-lcars-protocols", protocols: this._config.protocols},'input_boolean.yellow_alert');
    this._addCard(".topleft", "cb-lcars-elbow-card", "hl", lcars_cb_alert_omni("cb-lcars-header-right", { top_left: 0, top_right: 30, bottom_right: 0, bottom_left: 0 }, { top: 20, right: 8, bottom: 0, left: 0 }, 'input_boolean.red_alert', "goldenrod"), 'input_boolean.red_alert');
    this._addCard(".topright", "cb-lcars-elbow-card", "hr", lcars_top_right_alert('input_boolean.red_alert', "goldenrod"),'input_boolean.red_alert');
    this._addCard(".bottomright", "cb-lcars-elbow-card", "fr", lcars_footer_right_alert('input_boolean.red_alert', "goldenrod"),'input_boolean.red_alert');
    
    this._areasWithEntities.forEach(a=>{

      this._addCard(`#${a.area_id}_temp`,"cb-lcars-button-card",`${a.area_id}_temp`,lcars_floor_plan_tempnav(a.temperature_entity_id,a.name,"/at-lcars/"+a.area_id+"?kiosk"),a.temperature_entity_id);
      this._addCard(`#${a.area_id}_humidity`,"cb-lcars-button-card",`${a.area_id}_humidity`,lcars_floor_plan_humidity(a.humidity_entity_id),a.humidity_entity_id);
      this._addCard(`#${a.area_id}_window`,"cb-lcars-button-card",`${a.area_id}_window`,lcars_floor_plan_window(a.window_entity_id),a.window_entity_id);
    });
    this._addCard(".bottomleft", "cb-lcars-elbow-card", "fle", lcars_cb_alert_omni("cb-lcars-footer-right", { top_left: 0, top_right: 0, bottom_right: 30, bottom_left: 0 }, { top: 0, right: 8, bottom: 20, left: 0 }, 'input_boolean.red_alert', "goldenrod"), 'input_boolean.red_alert');
    // this._addCard(".topleft", "cb-lcars-elbow-card", "left", lcars_cb_alert_omni("cb-lcars-header-right", { top_left: 0, top_right: 30, bottom_right: 30, bottom_left: 0 }, { top: 20, right: 60, bottom: 20, left: 0 }, 'input_boolean.red_alert', "goldenrod"), 'input_boolean.red_alert');


    // const climate = this.querySelector(".climate");
    // [
    //   ...this._config.climate
    // ].forEach(e => {
    //   const card = document.createElement('slider-button-card');
    //   card.hass = this._hass;
     
    //   const lcarscard = lcars_climate(e);
    //   card.setConfig(lcarscard);
    //   climate.appendChild(card);

    // });
    // //------------------------------------------------------------------
    // const slider = this.querySelector(".cover_slider");
    // const sliderCard = document.createElement('slider-button-card', "slider");
    // sliderCard.setConfig(lcars_cover_slider(this._config.entity));
    // slider.appendChild(sliderCard);
    // sliderCard.hass = this._hass;
    // //------------------------------------------------------------------
    // const close = this.querySelector(".cover_close");
    // const closeCard = document.createElement('cb-lcars-button-card', "close");
    // closeCard.setConfig(lcars_cover_close(this._config.entity));
    // close.appendChild(closeCard);
    // closeCard.hass = this._hass;
    // //------------------------------------------------------------------
    // const summer = this.querySelector(".cover_summer");
    // const summerCard = document.createElement('cb-lcars-button-card', "summer");
    // summerCard.setConfig(lcars_cover_summer(this._config.entity));
    // summer.appendChild(summerCard);
    // summerCard.hass = this._hass;


  }



  getCardSize() {
    return 3;
  }
}

customElements.define("at-lcars-floor-plan", AtLcarsFloorPlan);