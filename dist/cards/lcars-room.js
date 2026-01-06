import { entitiesIn } from "../utils/entity-filter.js";
import { Card, EntityManager } from "../utils/entity-manager.js";
import { lcars_bubble_base, lcars_bubble_lozenge, lcars_bubble_quad } from "../utils/lcars-buttons-bubble.js";
import { lcars_switch, lcars_button, lcars_climate, lcars_cb_alert_elbow, lcars_cb_alert_side, lcars_cb_alert_btn, lcars_nav_btn, lcars_mini_graph, lcars_climate_bubble, lcars_info } from "../utils/lcars-buttons.js";
import { RoomCard } from "../utils/room.js";
import { font, scrollbar } from "../utils/scrollbar.js";
class AtLcarsRoom extends RoomCard {
  constructor() {
    super();
  }



  set hass(hass) {

    // Erstes Mal: nur speichern und initial rendern
    // //console.log("needs render", { has: !this._hass, config: !this._config });
    if (!this.em && !!this._config) {
      //console.log("inital render room");
      this.em = new EntityManager(hass);
      this.em.fillRoom(this._config.area_id)

      this._render();

      return;
    }
    this.em.updateHass(hass);

  }

  get html_new() {
    return `
    <ha-card class="room">
      <div class="rooms"></div>
      <div class="side"></div>
      <div class="corner"></div>
      <div class="actionborder"></div>
      <div class="content">
          <div class="power"></div>
          <div class="climate"></div>
          <div class="trv"></div>
          <div class="covers"></div>
      
      </div>
      <div class="infoborder"></div>
      <div class="footer"></div>
      <div class="header"></div>
      <div class="title">
        <div class="fill"></div>
        <span>${this.config.room}</span>
        <div class="end"></div>
      </div>
      <div class="graph"></div>
      <div class="grid"></div>
      <div class="buttons"></div>
      <div class="actionborder"></div>
    


    </ha-card>
    `;
  }

  _render() {
    //console.log("lcars room rerender");
    
    this.innerHTML = `
        <style>
            ${font()}
            ${scrollbar(this.em.color1, this.em.color2, this.em.color3, this.em.color4)}
            ${this.css_mobile_new(this.em.color1, this.em.color2, this.em.color3, this.em.color4)}
            ${this.css_tablet(this.em.color1, this.em.color2, this.em.color3, this.em.color4)}
        </style>
        ${this.html_new}
      `;

    this.setupLayout("control");
    //------------------------------------------------------------------
    //Buttons
    [
      ...this.em.roomLights,
      ...this.em.roomPowers,
      ...this.em.roomEntities.filter(e=>e.labels.includes("button")).map(e=>e.entity_id)
    ].forEach(e => {
      this._addCard(".power", 'bubble-card', `power${e}`,
        lcars_bubble_lozenge(e, this.em.color3, this.em.color1, false, "45px", "14px"),
        e
      );
    });
    //------------------------------------------------------------------
    //Climate
    if (!!this.em.roomClimate) {
      [
        this.em.roomClimate
      ].forEach(e => {
        this._addCard(".climate", 'bubble-card', `climate${e}`,
          lcars_climate_bubble(e, this.em.color1, this.em.color3,),
          e
        );
      });
    }
    //------------------------------------------------------------------
    //Thermostate
    [
      ...this.em.roomTrvs
    ].forEach(e => {
      this._addCard(".climate", 'bubble-card', `trv${e}`,
        lcars_climate_bubble(e, this.em.color1, this.em.color3,),
        e
      );
    });

    //------------------------------------------------------------------
    //Covers
    [
      ...this.em.roomCover
    ].forEach(e => {
      this._addCard(
        ".covers",
        'at-lcars-cover',
        `climate${e}`,
        {
          type: "custom:at-cover",
          entity: e,
          color1: this.em.color1,
          color2: this.em.color2,
          color3: this.em.color3,
          color4: this.em.color4
        },
        e
      );

    });
    
    
    //------------------------------------------------------------------

    if(!!this.em.roomClimate){
    this._addCard(
      ".graph",
      'mini-graph-card',
      `graph`,
      lcars_mini_graph(this.em.roomClimate, this.em.roomTrvs, this.em.outsideShadow, this.em.outsideSun),
      this.em.roomClimate
    );
}
    [
      ...this.em.roomInfos
    ].forEach(e => {
      this._addCard(".grid", 'cb-lcars-button-card', `grid${e}`, lcars_info(e, "#656565ff", "#e0e0e0ff", this.em.color1), e);
    });


  }



  getCardSize() {
    return 3;
  }
}

customElements.define("at-lcars-room", AtLcarsRoom);