import { lcars_bubble_info } from "../utils/at_lcars_bubble_info.js";
import { entitiesIn } from "../utils/entity-filter.js";
import { Card, EntityManager } from "../utils/entity-manager.js";
import { lcars_bubble_base, lcars_bubble_lozenge } from "../utils/lcars-buttons-bubble.js";
import { lcars_mini_graph, lcars_climate_bubble } from "../utils/at_lcars_bubble_climate.js";
import { RoomCard } from "../utils/room.js";
import { font, scrollbar } from "../utils/scrollbar.js";
class AtLcarsRoom extends RoomCard {
  constructor() {
    super();
  }



  set hass(hass) {
    // console.log(hass);
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
      ...this.em.roomEntities.filter(e => e.labels.includes("button")).map(e => e.entity_id)
    ].forEach(e => {

      try {
        this._addCard(".power", 'bubble-card', `power${e}`,
          lcars_bubble_lozenge(e,this._dc, this.em.color3, this.em.color1, false, "45px", "14px"),
          e
        );
      } catch (error) {
        console.log("error adding switch",e,error);
      }
    });
    //------------------------------------------------------------------
    //Climate
    try {

      if (!!this.em.roomClimate) {
        [
          ...this.em.roomClimates
        ].forEach(e => {
          this._addCard(".climate", 'bubble-card', `climate${e}`,
            lcars_climate_bubble(e,this._dc, this.em.color1, this.em.color3,),
            e
          );
        });
      }
    } catch (e) {
      console.error("error adding climates", e)
    }
    //------------------------------------------------------------------
    //Thermostate
    try {
      [
        ...this.em.roomTrvs
      ].forEach(e => {
        this._addCard(".climate", 'bubble-card', `trv${e}`,
          lcars_climate_bubble(e, this._dc, this.em.color1, this.em.color3,),
          e
        );
      });
    } catch (e) {
      console.error("error adding trvs", e)
    }

    //------------------------------------------------------------------
    //Covers
    try {
      [
        ...this.em.roomCover
      ].forEach(e => {
        this._addCard(
          ".covers",
          'at-lcars-cover',
          `climate${e}`,
          {
            type: "custom:at-cover",
            dashboardConfig: this._dc,
            entity: e,
            color1: this.em.color1,
            color2: this.em.color2,
            color3: this.em.color3,
            color4: this.em.color4
          },
          e
        );

      });
    } catch (e) {
      console.error("error adding covers");
    }

    if(!!this._dc?.use_mini_graph_card){

      //------------------------------------------------------------------
      let valveOpen=this.em.roomEntities.filter(e=>e.labels.map(l=>l.toLowerCase()).includes("valve_open")).map(e=>e.entity_id);
      if (!!this.em.roomClimate) {
        try {
          this._addCard(
            ".graph",
            'mini-graph-card',
            `graph`,
            lcars_mini_graph(this.em.roomClimate, this.em.roomTrvs, this.em.outsideShadow.entity_id, this.em.outsideSun.entity_id,valveOpen),
            this.em.roomClimate
          );
        } catch (e) {
          console.error("error adding graph",e)
        }
      }
    }
    console.log("roominfos", this.em.roomInfos);
    let addedInfos = [];
    [
      ...this.em.roomInfos
    ].forEach(e => {
      try {
        if(addedInfos.includes(e.entity_id)==false){

          addedInfos.push(e.entity_id);
          this._addCard(".grid", 'bubble-card', `grid${e.entity_id}`, lcars_bubble_info(e, this.em.color1, "#e0e0e0ff", true, true, 20), e.entity_id);
        }
        
      } catch (error) {
        console.error("error adding info",e,error)
      }
    });


  }



  getCardSize() {
    return 3;
  }
}

customElements.define("at-lcars-room", AtLcarsRoom);