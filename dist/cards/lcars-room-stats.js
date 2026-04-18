import { lcars_bubble_info } from "../utils/at_lcars_bubble_info.js";
import { scheduler } from "../utils/configs.js";
import { entitiesIn } from "../utils/entity-filter.js";
import { Card, EntityManager } from "../utils/entity-manager.js";
import { lcars_bubble_nav, lcars_bubble_square_nav } from "../utils/lcars-buttons-bubble.js";
import { RoomCard } from "../utils/room.js";
import { scrollbar } from "../utils/scrollbar.js";
import { stats_batteries, stats_climate } from "../utils/stats.js";
class AtLcarsRoomStats extends RoomCard {
  constructor() {
    super();
    this.old = null;
    this.changeTracker = [];
  }



  set hass(hass) {
    this._hass = hass;
    // Erstes Mal: nur speichern und initial rendern
    // //console.log("needs render", { has: !this._hass, config: !this._config });
    if (!this.em && !!this._config) {
      //console.log("inital render room");
      this.em = new EntityManager(hass,this.config);
      this.em.fillRoom(this._config.area_id)

      this._render();

      return;
    }
    this.em.updateHass(hass);

  }


  get css_addon() {
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
      .content>.links{
      display: flex;
    flex-direction: row;
    gap: 8px;
    flex-wrap: wrap;
    overflow: auto;
    justify-content: stretch;
    justify-items: self-start;
    padding-right: 20px;
      }
      .content>.links>*{
        flex-basis: 150px;
        height: 45px;
        flex-grow:1;
      
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
      <div class="links"></div>

      </div>
      <div class="infoborder"></div>
      <div class="footer"></div>
      <div class="header"></div>
      <div class="title">
        <div class="fill"></div>
        <span>${this._config.room}</span>
        <div class="end"></div>
      </div>
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
            ${scrollbar(this.em.color1, this.em.color2, this.em.color3, this.em.color4)}
            ${this.css_mobile_new(this.em.color1, this.em.color2, this.em.color3, this.em.color4, "2fr", false)}
            ${this.css_tablet(this.em.color1, this.em.color2, this.em.color3, this.em.color4, "150px", false)}
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

    let hist = {

      type: "history-graph",
      entities: {
        entity: "climate.b_dining_trv",
      },
      title: "ölkm"
    };


    let valveOpen = this.em.roomEntities.filter(e => e.labels.map(l => l.toLowerCase()).includes("valve_open")).map(e => e.entity_id);
    if (!!this._dc?.use_plotly_card) {
      this._addCard(".content", "plotly-graph", "climate",
        stats_climate(this.em.roomClimate, this.em.roomTemperature, this.em.roomHumidity, this.em.roomTrvs, this.em.outsideSun.entity_id, this.em.outsideShadow.entity_id, valveOpen),
        this.em.roomTemperature,
        true
      );
    }
    // this._addHTMLCard(".content","hui-history-graph-card","climate",
    //   hist,
    //  "climate.b_dining_trv",
    //   true
    // );

    // const content = this.querySelector('.content');
    // const card = document.createElement('hui-history-graph-card');
    // card.hass = this._hass;
    // const cardConfig = {
    //     type: 'tile',
    //     entity: "climate.b_dining_trv",
    //     vertical: false,
    //     state_content: 'last_changed'
    //   };
    // card.setConfig(hist);
    // content.appendChild(card);



    const batteries = this.em.roomEntities.filter(e => e.labels.includes("battery")).map(e => e.entity_id);
    if (!!this._dc?.use_plotly_card) {
      this._addCard(".content", "plotly-graph", "batteries",
        stats_batteries(batteries),
        this.em.roomTemperature,
        true
      );
    }
    const elements = [
      ...this.em.roomEntities.filter(e => e.labels.map(l => l.toLowerCase()).some(l => ["window", "fenster"].includes(l))).map(e => e.entity_id),
      this.em.roomClimate,
      this.em.roomTemperature,
      ...this.em.roomEntities.filter(e => e.labels.map(l => l.toLowerCase()).some(l => ["climate", "valve_open"].includes(l))).map(e => e.entity_id),
      this.em.roomHumidity,
      ...this.em.roomTrvs,
      this.em.outsideSun.entity_id,
      this.em.outsideShadow.entity_id,
    ];
    let elmstring = elements.join('%2C');
    const power = [
      ...this.em.roomEntities.filter(e => e.labels.map(l => l.toLowerCase()).some(l => ["powerconsumption", "power"].includes(l))).map(e => e.entity_id),
    ];
    let powerstring = power.join('%2C');
    const stats = [
      ...this.em.roomEntities.filter(e => e.labels.map(l => l.toLowerCase()).some(l => ["stats", "showstats"].includes(l))).map(e => e.entity_id),
    ];
    let statsstring = stats.join('%2C');


    this._addCard(".links", 'bubble-card', `climate`, lcars_bubble_nav("/history?entity_id=" + elmstring, "Climate", { ...this._dc, colorblind: false }, this.em.color1,this.em.color1,false,"45px","13px","mdi:poll"), null, false);
    this._addCard(".links", 'bubble-card', `battery`, lcars_bubble_nav("/history?entity_id=" + batteries.join('%2C'), "Batteries", { ...this._dc, colorblind: false }, this.em.color1,this.em.color1,false,"45px","13px","mdi:poll"), null, false);
    this._addCard(".links", 'bubble-card', `power`, lcars_bubble_nav("/history?entity_id=" + powerstring, "Strom", { ...this._dc, colorblind: false }, this.em.color1,this.em.color1,false,"45px","13px","mdi:poll"), null, false);
    this._addCard(".links", 'bubble-card', `stats`, lcars_bubble_nav("/history?entity_id=" + statsstring, "stats", { ...this._dc, colorblind: false }, this.em.color1,this.em.color1,false,"45px","13px","mdi:poll"), null, false);
    this._addCard(".links", 'bubble-card', `all`, lcars_bubble_nav("/history?area_id=" + this.em.area.area_id, "all", { ...this._dc, colorblind: false }, this.em.color1,this.em.color1,false,"45px","13px","mdi:poll"), null, false);
    
    this._addCard(".links", 'bubble-card', `climate`, lcars_bubble_nav("/logbook?entity_id=" + elmstring, "LOG Climate", { ...this._dc, colorblind: false }, this.em.color1,this.em.color1,false,"45px","13px","mdi:format-list-bulleted"), null, false);
    this._addCard(".links", 'bubble-card', `battery`, lcars_bubble_nav("/logbook?entity_id=" + batteries.join('%2C'), "LOG Batteries", { ...this._dc, colorblind: false }, this.em.color1,this.em.color1,false,"45px","13px","mdi:format-list-bulleted"), null, false);
    this._addCard(".links", 'bubble-card', `power`, lcars_bubble_nav("/logbook?entity_id=" + powerstring, "LOG Strom", { ...this._dc, colorblind: false }, this.em.color1,this.em.color1,false,"45px","13px","mdi:format-list-bulleted"), null, false);
    this._addCard(".links", 'bubble-card', `stats`, lcars_bubble_nav("/logbook?entity_id=" + statsstring, "LOG stats", { ...this._dc, colorblind: false }, this.em.color1,this.em.color1,false,"45px","13px","mdi:format-list-bulleted"), null, false);
    this._addCard(".links", 'bubble-card', `all`, lcars_bubble_nav("/logbook?area_id=" + this.em.area.area_id, "LOG all", { ...this._dc, colorblind: false }, this.em.color1,this.em.color1,false,"45px","13px","mdi:format-list-bulleted"), null, false);
    console.log("roominfos", this.em.roomInfos);
    let addedInfos = [];
    [
      ...this.em.roomInfos
    ].forEach(e => {
      try {
        if (addedInfos.includes(e.entity_id) == false) {

          addedInfos.push(e.entity_id);
          this._addCard(".grid", 'bubble-card', `grid${e.entity_id}`, lcars_bubble_info(e, this.em.color1, "#e0e0e0ff", true, true, 20), e.entity_id);
        }

      } catch (error) {
        console.error("error adding info", e, error)
      }
    });


  }



  getCardSize() {
    return 3;
  }
}

customElements.define("at-lcars-room-stats", AtLcarsRoomStats);