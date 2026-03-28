import { lcars_bubble_info } from "../utils/at_lcars_bubble_info.js";
import { scheduler } from "../utils/configs.js";
import { entitiesIn } from "../utils/entity-filter.js";
import { Card, EntityManager } from "../utils/entity-manager.js";
import { lcars_bubble_lozenge, lcars_bubble_lozenge_button } from "../utils/lcars-buttons-bubble.js";
import { lcars_switch, lcars_button, lcars_climate, lcars_cb_alert_elbow, lcars_cb_alert_side, lcars_cb_alert_btn, lcars_nav_btn, lcars_mini_graph, lcars_climate_bubble, lcars_info } from "../utils/lcars-buttons.js";
import { RoomCard } from "../utils/room.js";
import { font, scrollbar } from "../utils/scrollbar.js";
import { stats_batteries, stats_climate } from "../utils/stats.js";
class AtLcarsRoomStats extends RoomCard {
  constructor() {
    super();
    this.old = null;
    this.changeTracker = [];
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


  get css_addon(){
    return `
   
      @media (width > 550px){
      .room {
        grid-template-columns:
       0px 30px    4px      46px         4px    1fr     1fr     8px     24px    20px   4px     10px;
       
  }
       .content>*{
      height: 90vh;
    }
       .grid{
       display: none;}
        }
    .content{
          --card-background-color: black;
    --ha-card-border-radius: 0px;
    --ha-card-border-width: 0;
    flex-basis: 100%;
      display: block;
      flex-direction: column;
      scroll-snap-type: y mandatory;
      scroll-snap-align: center;
    }
    .content>*{
      flex-basis: 100%;
      height: 100% !important;
      min-height: 100% !important;
      scroll-snap-align: start;
      flex-shrink:0;
      display: block;
    }

    .content>.power>*{
      flex-basis: 300px;
    }

    `;
  }

  get html_new() {
    return `
    <ha-card class="room">
      <div class="rooms"></div>
      <div class="side"></div>
      <div class="corner"></div>
      <div class="actionborder"></div>
      <div class="content">

      </div>
      <div class="infoborder"></div>
      <div class="footer"></div>
      <div class="header"></div>
      <div class="title">
        <div class="fill"></div>
        <span>${this._config.room}</span>
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
            ${this.css_mobile_new(this.em.color1, this.em.color2, this.em.color3, this.em.color4,"2fr",false)}
            ${this.css_tablet(this.em.color1, this.em.color2, this.em.color3, this.em.color4,"150px", false)}
            ${this.css_addon}
        </style>
        ${this.html_new}
      `;

    this.setupLayout('stats');

    

    // //------------------------------------------------------------------
    // //Buttons
    // [
    //   ...this.em.roomEntities.filter(e=>e.labels.includes("showstats")).map(e=>e.entity_id)
    // ].forEach(e => {
    //   this._addCard(".power", 'bubble-card', `power${e}`,
    //     lcars_bubble_lozenge_button(e, this.em.color3, this.em.color1, false, "45px", "14px"),
    //     e
    //   );
    // });
    

    // var config = {
    //   // type: "history-graph",
    //   entities: [{entity: "climate.b_dining_trv"}]

    // };

    
    // this._addCard(".scheduler", 'hui-history-graph-card', `scheduler`, config,"",false);
    
    this._addCard(".content","plotly-graph","climate",
      stats_climate(this.em.roomClimate,this.em.roomTemperature, this.em.roomHumidity,this.em.roomTrvs, this.em.outsideSun.entity_id, this.em.outsideShadow.entity_id),
      this.em.roomTemperature,
      true
    );

    const batteries = this.em.roomEntities.filter(e=>e.labels.includes("battery")).map(e=>e.entity_id)
    this._addCard(".content","plotly-graph","batteries",
      stats_batteries(batteries),
      this.em.roomTemperature,
      true
    );

    [
      ...this.em.roomInfos
    ].forEach(e => {
      // this._addCard(".grid", 'cb-lcars-button-card', `grid${e.entity_id}`, lcars_info(e.entity_id, "#656565ff", "#e0e0e0ff", this.em.color1), e.entity_id);
            this._addCard(".grid", 'bubble-card', `grid${e.entity_id}`, lcars_bubble_info(e, this.em.color1, "#e0e0e0ff",true,true,20), e.entity_id);
    });


  }



  getCardSize() {
    return 3;
  }
}

customElements.define("at-lcars-room-stats", AtLcarsRoomStats);