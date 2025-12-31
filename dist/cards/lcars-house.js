import { lcars_footer_alert, lcars_footer_left_alert,  lcars_cb_alert_omni, lcars_footer_right_alert, lcars_top_left_alert, lcars_top_right_alert } from "../utils/lcars-borders.js";
import { lcars_floor_plan_tempnav } from "../utils/lcars-buttons.js";

//import { lcars_switch, lcars_button, lcars_climate, lcars_cover_open, lcars_cover_slider, lcars_cover_close, lcars_cover_summer } from "./lcars.js";
class AtLcarsHouse extends HTMLElement {
  constructor() {
    super();
    this.old = null;
    this.changeTracker = [];
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


  set hass(hass) {
    // Erstes Mal: nur speichern und initial rendern
    // console.log("needs render", { has: !this._hass, config: !this._config });
    if (!this._hass && !!this._config) {
      this._hass = hass;
      this._updateTrackedStates();
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
    const rc = 'lcars_house';
    return `
      .${rc}_bg{
        z-index:0;
        background: black;
        position: absolute;
        width: 100%;
        height: 100%;
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
          height: calc(100% - var(--header-height));
          max-height: calc(100vh - var(--header-height));
          width: 100%;
          margin: 0px 0px 0px 0px;
          display: grid;
          display: grid; 
          grid-template-columns: 1fr 0.5fr 8px 2fr; 
          grid-template-rows: 50px 1fr 25px 25px; 
          gap: 0px 0px; 
          grid-template-areas: 
            "hl hl psh hr"
            "actions content content content"
            "actions fle psf fr"
            "flbar fle psf fr"; 
          padding: 0px 0px 0px 0px;
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
        gap: 0px 0px; 
        grid-template-areas: 
          "inside treppe ."
          "inside treppe solar"
          ".  treppe garage"; 
        gap: 4px;
        padding: 16px;
        filter: drop-shadow(0px 6px 0px black) drop-shadow(0px -6px 0px black);
        }
      .${rc}>.content>*{
        border: 2px solid white;
        box-sizing: border-box;
        border-radius: 4px;
        background: black;
        
        }
        .${rc}>.content>.inside{
          display: flex;
          flex-direction: column;
          
          border: none;
          
        }
        .${rc}>.content>.inside>* {
          background: black;
          border: 1px solid white;
          box-sizing: border-box;
          border-left-width: 2px;
          border-right-width: 2px;
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
    var others = this._config?.areas.other.map(a=>`<div class="${a.area_id}"></div>`).join("");
    var inside = `<div class="inside">
    ${this._config?.areas.inside.map(i=>{
      return `<div class="${i.floor_id}">
      </div>`
    }).join("")}
    </div>`
    ;
    return `
    ${inside}
    ${others}`
  }
  _houseOverviewCss(basepath){

    var others = this._config?.areas.other.map(a=>`${basepath}>.${a.area_id}{grid-area: ${a.area_id};}`).join(" ");
    var inside = `
    ${basepath}>.inside{
      grid-area: inside;
    }
    ${this._config?.areas.inside.map(i=>{
      return `${basepath}>.inside>.${i.floor_id}{
        flex-grow: 1;
      }`
      }).join("")}
      `;
        console.log("css", `${inside}${others}`);
    
    return `${inside}
    ${others}`
  }

  _html() {
    const tag = 'at-lcars-house';
    const style_class = 'lcars_house';
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

    console.log(this._config.areas);


    // this._addCard(".hl", "cb-lcars-elbow-card", "hl", lcars_top_left_alert('input_boolean.red_alert', "goldenrod"), 'input_boolean.red_alert');
    // this._addCard(".hr", "cb-lcars-elbow-card", "hr", lcars_top_right_alert('input_boolean.red_alert', "goldenrod"),'input_boolean.red_alert');
    // this._addCard(".fr", "cb-lcars-elbow-card", "fr", lcars_footer_right_alert('input_boolean.red_alert', "goldenrod"),'input_boolean.red_alert');
    // this._addCard(".fle", "cb-lcars-elbow-card", "fle", lcars_footer_left_alert('input_boolean.red_alert', "goldenrod"),'input_boolean.red_alert');
    // this._addCard(".flbar", "cb-lcars-elbow-card", "flbar", lcars_footer_alert('input_boolean.red_alert', "goldenrod"),'input_boolean.red_alert');
    this._addCard(".actions", "at-lcars-protocols", "actions", {type: "custom:at-lcars-protocols", protocols: this._config.protocols},'input_boolean.yellow_alert');
    this._addCard(".topleft", "cb-lcars-elbow-card", "hl", lcars_cb_alert_omni("cb-lcars-header-right", { top_left: 0, top_right: 30, bottom_right: 0, bottom_left: 0 }, { top: 20, right: 8, bottom: 0, left: 0 }, 'input_boolean.red_alert', "goldenrod"), 'input_boolean.red_alert');
    this._addCard(".topright", "cb-lcars-elbow-card", "hr", lcars_top_right_alert('input_boolean.red_alert', "goldenrod"),'input_boolean.red_alert');
    this._addCard(".bottomright", "cb-lcars-elbow-card", "fr", lcars_footer_right_alert('input_boolean.red_alert', "goldenrod"),'input_boolean.red_alert');
    
    this._config.areas.inside.forEach(f=>{
    
          this._addCard(`.${f.floor_id}`,"cb-lcars-button-card",f.floor_id,lcars_floor_plan_tempnav(null,f.name,"/at-lcars/"+f.floor_id+"?kiosk"),null);
        });
    // this._addCard(".bottomleft", "cb-lcars-elbow-card", "fle", lcars_footer_left_alert('input_boolean.red_alert', "goldenrod"),'input_boolean.red_alert');
    
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

customElements.define("at-lcars-house", AtLcarsHouse);