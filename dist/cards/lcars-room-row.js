import { lcars_bubble_info } from "../utils/at_lcars_bubble_info.js";
import { EntityManager } from "../utils/entity-manager.js";
import { lcars_footer_alert, lcars_footer_left_alert, lcars_cb_alert_omni, lcars_footer_right_alert, lcars_top_left_alert, lcars_top_right_alert } from "../utils/lcars-borders.js";
import { lcars_floor_plan_tempnav, lcars_floor_plan_window, lcars_floor_plan_humidity, lcars_floor_row_window_left, lcars_floor_row_windownav, lcars_floor_row_window_right, lcars_room_row_info_temp, lcars_room_row_info_humidity, lcars_switch, lcars_climate, lcars_climate_bubble, lcars_cover_bubble } from "../utils/lcars-buttons.js";
import { font } from "../utils/scrollbar.js";

//import { lcars_switch, lcars_button, lcars_climate, lcars_cover_open, lcars_cover_slider, lcars_cover_close, lcars_cover_summer } from "./lcars.js";
class AtLcarsRoomRow extends HTMLElement {
  constructor() {
    super();
  }
  setConfig(config) {
    if (!config.area) {
      throw new Error("You need to define an Area");
    }
    this._config = config;
  }



  set hass(hass) {
    // Erstes Mal: nur speichern und initial rendern
    // //console.log("needs render", { has: !this._hass, config: !this._config });
    if (!this.em && !!this._config) {
      this.em = new EntityManager(hass);
      this.em.fillRoom(this._config.area);
      this._render();
      return;
    }

    this.em.updateHass(hass);
  }

  _styles() {
    const rc = "lcars_room_row";
    return `
      
      .${rc}{
          
          width: 100%;
          height: 100% ;
          /*max-height: calc(100vh - var(--header-height));*/
          margin: 0px 0px 0px 0px;
          display: grid;
          display: grid; 
          grid-template-columns: 4px 15px 0.3fr 28px 6px 66px 2fr 15px 4px; 
          grid-template-rows: 1fr; 
          gap: 0px; 
          grid-template-areas: 
            ". windowleft info link link link buttons windowright ."; 
          padding: 0px 0px 0px 0px;
          
          --ha-font-family-body: 'Antonio', Arial, sans-serif;

      }
      .${rc}>.window_left{
        grid-area: windowleft;
      }
      .${rc}>.info{
        grid-area: info;
        display: flex;
      }
        .${rc}>.info>*{
        flex-basis: 60px;
        margin-left: -9px;
        flex-grow: 1;
        }
      .${rc}>.link{
        grid-area: link;
      }
      .${rc}>.buttons{
        grid-area: buttons;
        display: grid;
        grid-template-columns: 2fr 1fr 1fr 1fr; 
        grid-template-rows: 1fr; 
        gap: 4px; 
        padding: 0px  4px 0px 4px;


      }
        .${rc}>.buttons>*{
          display: flex;
          gap: 4px;
          flex-wrap:wrap;
        }
        .${rc}>.buttons>*>*{
          flex-basis: 120px;
          flex-shrink:1;
          flex-grow: 1;
        }
        .${rc}>.buttons>.lights>*{

          flex-grow: 0;
        }
      .${rc}>.window_right{
        grid-area: windowright;
      }
    `;
  }



  _html(tag, style_class) {

    return `
      
      <${tag} class="${style_class}">

        <div class="window_left"></div>
        <div class="info"></div>
        <div class="link"></div>
        <div class="buttons">
          <div class="lights"></div>
          <div class="power"></div>
          <div class="climate"></div>
          <div class="cover"></div>
        </div>
        <div class="window_right"></div>

      </${tag}>
    `;
  }



  _add_Card(selector, type, name, config, id, track = true) {
    const card = this.querySelector(selector);
    const fullname = `${name}${id}`;
    if (track) {
      this.changeTracker.push({ id: id, name: fullname, element: document.createElement(type, name) });
      const newElement = this.changeTracker.find(e => e.name == fullname)
      newElement.element.setConfig(config);
      card.appendChild(this.changeTracker.find(e => e.name == fullname).element);
      newElement.element.hass = this._hass;
    } else {
      const newElement = document.createElement(type, name);
      newElement.setConfig(config);
      card.appendChild(newElement);
      newElement.hass = this._hass;
    }
  }
  _addCard(selector, type, name, config, id, track = true) {
    const card = this.querySelector(selector);
    const fullname = `${name}${id}`;
    card.appendChild(this.em._addCard(type, name, config, id, track));
  }
  _render() {
    //console.log("lcars house rerender");
    const tag = 'at-lcars-room-row';
    const style_class = 'lcars_room_row';
    this.innerHTML = `
        <style>
            ${font()}
            ${this._styles()}
        </style>
        ${this._html(tag, style_class)}
      `;

    //console.log("config", this.em.roomWindow);


    this._addCard(".window_left", "cb-lcars-button-card", "wl", lcars_floor_row_window_left(this.em.roomWindow, "fuchsia", "#cc0000"), this.em.roomWindow);
    this._addCard(".window_right", "cb-lcars-button-card", "wr", lcars_floor_row_window_right(this.em.roomWindow, "fuchsia", "#cc0000"), this.em.roomWindow);
    this._addCard(".link", "cb-lcars-button-card", "link", lcars_floor_row_windownav(this.em.roomWindow, this.em.area.name, this.em.area.area_id, this.em.area.icon, "/at-lcars/" + this.em.area.area_id + "?kiosk", this.em.color3, "#cc0000"), this.em.roomWindow);
    // this._addCard(".info", "cb-lcars-button-card", "infotemp", lcars_room_row_info_temp(this.em.roomTemperature), this.em.roomTemperature);
    this._addCard(".info", 'bubble-card', `infotemp`, lcars_bubble_info(this.em.roomTemperature_entity, "white", "#e0e0e0ff",false,true,20), this.em.roomTemperature_entity.entity_id);
    this._addCard(".info", "cb-lcars-button-card", "infotemp", lcars_room_row_info_humidity(this.em.roomHumidity), this.em.roomHumidity);
// this._addCard(".grid", 'cb-lcars-button-card', `grid${e.entity_id}`, lcars_info(e.entity_id, "#656565ff", "#e0e0e0ff", this.em.color1), e.entity_id);
    this.em.roomLights.forEach(e => {
      this._addCard(
        ".lights",
        "cb-lcars-button-card",
        `lights${e}`,
        lcars_switch(e, this.em.color3, this.em.color1, false, null),
        e);

    });
    if (!!this.em.roomClimate) {

      this._addCard(
        ".climate",
        "bubble-card",
        `climate${this.em.roomClimate}`,
        lcars_climate_bubble(this.em.roomClimate, this.em.color1, this.em.color3,),
        this.em.roomClimate);
    }
    this.em.roomCover.forEach(e =>  {

      this._addCard(
        ".cover",
        "bubble-card",
        `cover${e}`,
        lcars_cover_bubble(e, this.em.color1, this.em.color3,),
        e);
    });

    // this._addCard(".hr", "cb-lcars-elbow-card", "hr", lcars_top_right_alert('input_boolean.red_alert', "goldenrod"),'input_boolean.red_alert');
    // this._addCard(".fr", "cb-lcars-elbow-card", "fr", lcars_footer_right_alert('input_boolean.red_alert', "goldenrod"),'input_boolean.red_alert');
    // this._addCard(".fle", "cb-lcars-elbow-card", "fle", lcars_footer_left_alert('input_boolean.red_alert', "goldenrod"),'input_boolean.red_alert');
    // this._addCard(".flbar", "cb-lcars-elbow-card", "flbar", lcars_footer_alert('input_boolean.red_alert', "goldenrod"),'input_boolean.red_alert');
    // this._addCard(".actions", "at-lcars-protocols", "actions", {type: "custom:at-lcars-protocols", protocols: this._config.protocols},'input_boolean.yellow_alert');
    // this._addCard(".topleft", "cb-lcars-elbow-card", "hl", lcars_cb_alert_omni("cb-lcars-header-right", { top_left: 0, top_right: 30, bottom_right: 0, bottom_left: 0 }, { top: 20, right: 8, bottom: 0, left: 0 }, 'input_boolean.red_alert', "goldenrod"), 'input_boolean.red_alert');
    // this._addCard(".topright", "cb-lcars-elbow-card", "hr", lcars_top_right_alert('input_boolean.red_alert', "goldenrod"),'input_boolean.red_alert');
    // this._addCard(".bottomright", "cb-lcars-elbow-card", "fr", lcars_footer_right_alert('input_boolean.red_alert', "goldenrod"),'input_boolean.red_alert');

    // this._areasWithEntities.forEach(a=>{

    //   this._addCard(`#${a.area_id}_temp`,"cb-lcars-button-card",`${a.area_id}_temp`,lcars_floor_plan_tempnav(a.temperature_entity_id,a.name,"/at-lcars/"+a.area_id+"?kiosk"),a.temperature_entity_id);
    //   this._addCard(`#${a.area_id}_humidity`,"cb-lcars-button-card",`${a.area_id}_humidity`,lcars_floor_plan_humidity(a.humidity_entity_id),a.humidity_entity_id);
    //   this._addCard(`#${a.area_id}_window`,"cb-lcars-button-card",`${a.area_id}_window`,lcars_floor_plan_window(a.window_entity_id),a.window_entity_id);
    // });
    // this._addCard(".bottomleft", "cb-lcars-elbow-card", "fle", lcars_cb_alert_omni("cb-lcars-footer-right", { top_left: 0, top_right: 0, bottom_right: 30, bottom_left: 0 }, { top: 0, right: 8, bottom: 20, left: 0 }, 'input_boolean.red_alert', "goldenrod"), 'input_boolean.red_alert');
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

customElements.define("at-lcars-room-row", AtLcarsRoomRow);