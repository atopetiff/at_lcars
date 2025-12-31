import { lcars_cb_alert_omni, lcars_footer_alert, lcars_footer_left_alert, lcars_footer_right_alert, lcars_top_left_alert, lcars_top_right_alert } from "../utils/lcars-borders.js";
import { lcars_button } from "../utils/lcars-buttons.js";
//import { lcars_switch, lcars_button, lcars_climate, lcars_cover_open, lcars_cover_slider, lcars_cover_close, lcars_cover_summer } from "./lcars.js";
class AtLcarsProtocols extends HTMLElement {
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
    const rc = 'lcars_prot';
    return `
      .${rc}{
          height: 100%;
          width: 100%;
          margin: 0px 0px 0px 0px;
          display: grid;
          display: grid; 
          grid-template-columns: 1fr 8px 30px; 
          grid-template-rows: 30px 1fr; 
          gap: 0px 0px; 
          grid-template-areas: 
            "header header header"
            "content pad border"; 
          background-color: black;
          padding: 0px 0px 0px 0px;
          --ha-font-family-body: 'Antonio', Arial, sans-serif;
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
      .${rc}>.header { 
        grid-area: header;
        }
      .${rc}>.border { 
        grid-area: border;
        }
      .${rc}>.content { 
        grid-area: content;
            margin-top: -15px;
        border-top-right-radius: 20px;
          display: flex;
          flex-direction: column;
          gap: 8px;
          overflow: auto;
          max-height: 80vh;

        }
        .${rc}>.content>* {
          flex-basis: 55px;
          flex-grow: 0;
          flex-shrink: 0;
        } 
      
    `;
  }

  _html() {
    const tag = 'at-lcars-prot';
    const style_class = 'lcars_prot';
    return `
      <${tag} class="${style_class}">
        <div class="header"></div>
        <div class="border"></div>
        <div class="content"></div>
      </${tag}>
    `;
  }



  _addCard(selector, type, name, config, id) {
    const card = this.querySelector(selector);
    const fullname = `${name}${id}`;
    this.changeTracker.push({ id: id, name: fullname, element: document.createElement(type, name) });
    const newElement = this.changeTracker.find(e => e.name == fullname)
    newElement.element.setConfig(config);
    card.appendChild(this.changeTracker.find(e => e.name == fullname).element);
    newElement.element.hass = this._hass;
  }

  _render() {
    console.log("lcars protocols rerender");
    this.innerHTML = `
        <style>
            ${this._styles()}
        </style>
        ${this._html()}
      `;

    console.log(this._config.protocols);

    this._addCard(".header", "cb-lcars-elbow-card", "header", lcars_cb_alert_omni("cb-lcars-header-right", { top_left: 0, top_right: 30, bottom_right: 0, bottom_left: 0 }, { top: 8, right: 30, bottom: 0, left: 0 }, 'input_boolean.red_alert', "goldenrod"), 'input_boolean.red_alert');
    this._addCard(".border", "cb-lcars-elbow-card", "border", lcars_cb_alert_omni("cb-lcars-header-right", { top_left: 0, top_right: 0, bottom_right: 0, bottom_left: 0 }, { top: 0, right: 30, bottom: 0, left: 0 }, 'input_boolean.red_alert', "goldenrod"), 'input_boolean.red_alert');


    [
      ...this._config.protocols
    ].forEach(e => {
      this._addCard(".content", "cb-lcars-button-card", "prot", lcars_button(e, "yellow"), e);

    });
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

customElements.define("at-lcars-protocols", AtLcarsProtocols);