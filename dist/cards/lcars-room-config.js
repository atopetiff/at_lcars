import { scheduler } from "../utils/configs.js";
import { entitiesIn } from "../utils/entity-filter.js";
import { Card, EntityManager } from "../utils/entity-manager.js";
import { lcars_switch, lcars_button, lcars_climate, lcars_cb_alert_elbow, lcars_cb_alert_side, lcars_cb_alert_btn, lcars_nav_btn, lcars_mini_graph, lcars_climate_bubble, lcars_info } from "../utils/lcars-buttons.js";
import { font, scrollbar } from "../utils/scrollbar.js";
class AtLcarsRoomConfig extends Card {
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

  get css_tablet() {
    return `
    @media (width > 450px){
      .room {
        
        grid-template-areas:
          "infoborder   grid        grid  grid   grid   grid   grid   grid   .      side"
          "infoborder   grid        grid  grid   grid   grid   grid   grid   .      side"
          "footer       footer       footer footer  .       .       .       .       .      side"
          "footer       footer       footer footer  title   title   title   title   .      side"
          ".            .            .      .       title   title   title   title   .      side"
          "header       header       header header  title   title   title   title   .      side"
          "header       header       header header  .       .       .       .       .      side"
          "actionborder actionborder .      content content content content content .      side"
          "rooms        rooms        .      .       .       .       corner  corner  corner corner"
          "rooms        rooms        .      buttons buttons .       corner  corner  corner corner";
      }
    }
    @media (width > 550px){
      .room {
        grid-template-columns:
        150px 30px    4px      46px         4px    1fr     1fr     8px     24px    20px   4px     10px;
      grid-template-rows: 20px 22px 1fr 1fr 30px 4px 26px 4px 30px;
        grid-template-areas:
          "footer footer     .       header       header  header  title   title   title   title   .      side"
          "footer footer     .       header       header  header  .       .       .       .       .      side"
          "grid  actionborder actionborder       actionborder .       content content content content content .      side"
          "grid  actionborder actionborder       actionborder .       content content content content content .      side"
          "grid   rooms        rooms       rooms        .       content content content content content .      side"
          "grid   rooms        rooms       rooms        .       .       .       .       .       .       .      side"
          "grid   rooms        rooms       rooms        .       .       .       .       corner  corner  corner corner"
          "grid   .          .       .            .       .       .       .       corner  corner  corner corner"
          "infoborder   infoborder  infoborder infoborder      . buttons buttons .       corner  corner  corner corner";
      }
          .graph {
    --ha-border-radius-square: 0px 18px 0px 0px;
   margin-bottom:0px;
   padding-left: 0px;
    margin-top: -18px;
    padding-right: 4px;
}
      .actionborder{
      border-top: none;
      }
      .header:after{
        left: 46px;
        width: calc(100% - 46px);
      }
      .footer{
        border-radius: 0px;
          border-top-right-radius: 50px;
      }
      .footer:after{
        width: calc(100% - 30px);
        right: 30px;
        left: unset;
        top: 8px;
        border-radius: 0px;
        border-top-right-radius: 50px;
    }
        .infoborder{
          position: relative;
          border-bottom-right-radius: 50px;
        }
        .infoborder:after{
          content: "";
        background: black;
        position: absolute;
        width: calc(100% - 80px);
        height: calc(100% - 8px);
        top: 0px;
        left: 0px;
        border-bottom-right-radius: 20px;
        }
        .buttons>*{
        order:2;
        }
        .buttons:before{
          content: "";
          height: 100%;
          width: 20px;
          background: ${this.em.color2};
          order:1;
          border-radius: 15px 0px 0px 15px;

        }
    }
    `;
  }

  get css_mobile_new() {
    return `
    :host{
      background: red;

    }
    .room {
        height: 100%;
        width: 100%;
        max-height: 100vh;
        margin: 0px 0px 0px 0px;  
        background: black;
      display: grid;
      overflow: hidden;
      grid-template-columns:
        30px          50px         4px    1fr     1fr     8px     24px    20px   4px     10px;
      grid-template-rows: 0.7fr 0.3fr 22px 8px 4px 8px 22px 2fr 30px 30px;
      gap: 0px 0px;
      grid-auto-flow: row;
      grid-template-areas:
        "infoborder   grid         grid   grid    grid    grid    grid    grid    .      side"
        "infoborder   grid         grid   grid    grid    grid    grid    grid    .      side"
        "footer       footer       footer footer  .       .       .       .       .      side"
        "footer       footer       footer footer  title   title   title   title   .      side"
        ".            .            .      .       title   title   title   title   .      side"
        "header       header       header header  title   title   title   title   .      side"
        "header       header       header header  .       .       .       .       .      side"
        "actionborder actionborder .      content content content content content .      side"
        "rooms        rooms        .      .       .       .       corner  corner  corner corner"
        "rooms        rooms        .      buttons buttons .       corner  corner  corner corner";
    }

    .rooms{
        grid-area: rooms;
        background-color: yellow;
    }

    .side{
        grid-area: side;
        background-color: ${this.em.color2};
    }

    .side { grid-area: side; }

    .corner { grid-area: corner; }

    .content { grid-area: content; }

    .infoborder { grid-area: infoborder; }

    .footer { grid-area: footer; }

    .header { grid-area: header; }

    .title { grid-area: title; }

    .graph { grid-area: graph; }

    .grid {
      grid-area: grid;
      display: flex;
      flex-wrap: wrap;
      gap: 5px;
      align-content: flex-start;
      padding: 4px;
      overflow: scroll;
      margin-bottom: -18px;
      
    }
    .grid>*{
      flex-basis: 120px;
      height: 20px !important;
      flex-grow: 1;
      
    }

    .buttons{
        grid-area: buttons;
        display: flex;
        gap: 8px
    }
    .buttons>*{
        flex-basis: 50px;
        flex-grow: 1;
        flex-shrink: 1;
    }

    .actionborder { grid-area: actionborder; }


    
        
    
    
    
    /*Content*/
    .infoborder{
        grid-area: infoborder;
        background-color: ${this.em.color4};
    }
    
    .graph{
          grid-area: graph;
        --ha-card-background: black;
        --ha-border-radius-square: 0px 0px 0px 18px;
        flex-shrink: 1;
        order: 1;
        /* border-right: 10px solid #009999; */
        border-bottom-right-radius: 25px;
        overflow: scroll;
        /* border-bottom: 10px solid #009999; */
        flex-grow: 0;
        /*margin-bottom: -18px;*/
        padding-left: 4px;
    }
    
    .actionborder{
      border-top: 10px solid ${this.em.color2};
      grid-area: actionborder;
      display: flex;
      flex-direction: column;
      gap: 4px;
      padding: 4px 0px 4px 0px;
    }
      .actionborder>*{
        flex-shrink: 1;
        flex-grow: 1;
      }
    .content{
        grid-area: content;
        background-color: black;
        margin-top: -17px;
        margin-bottom: -20px;
        z-index: 1;
        border-top-left-radius: 20px;
        border-bottom-right-radius: 20px;
        overflow: auto;
        display: flex;
        flex-direction: column;
        gap: 8px;
    }
    .content>.power{
        display:flex;
        flex-wrap: wrap;
        gap: 8px;

    }
    .content>.power>*{
        flex-basis: 135px;
      flex-grow: 1;
      flex-shrink: 1;
      height: 55px !important;
    }

    .content>.climate{
      display: flex;
      flex-direction: column;
      overflow: visible;
      gap: 4px;

    }
    .content>.climate>*{
      overflow: visible;
      --slider-color: red;
      --ha-card-background: rgba(0,0,0,0.6);
      --ha-card-border-radius: 50px;


      }
    .content>.climate>*:not(:first-child){
      pointer-events: none !important;
    }
      /*.content>.actions>.climate>*:first-child{
      --ha-card-border-radius: 25px 25px 0px 0px;
      }
      .content>.actions>.climate>*:last-child{
      --ha-card-border-radius: 0px 0px 25px 25px;
      }*/


    /*Splitter*/
    .footer{
        grid-area: footer;
        background-color: ${this.em.color4};
        border-bottom-left-radius: 50px;
        position: relative;
    }
    
    .header{
        grid-area: header;
        background-color: ${this.em.color2};
        border-top-left-radius: 50px;
        position: relative;
    }
    .title{
      grid-area: title;
      background-color: black;
      
      display: grid;
      grid-template-columns: 1fr auto 20px;
      grid-template-rows: 1fr;
      align-items: center;
      padding-left: 4px;
      }
      .title>.fill{
          height: 100%;
          background-color: ${this.em.color2};
      }
    .title>span{
        font-family: 'Antonio', Arial, sans-serif;
        text-transform: uppercase;
        font-size: 22px;
        line-height: 20px;
        padding: 0px 4px 1px 4px;
    }
    .title>.end{
        height: 100%;
        background-color: ${this.em.color1};
        border-top-right-radius: 100%;
        border-bottom-right-radius: 100%;
    }

    .footer:after,
    .header:after{
        content: "";
        position: absolute;
        
        height: calc(100% - 8px);
        background: black;
        }
    .footer:after{
            
        width: calc(100% - 30px);  
        left: 30px;
        bottom: 8px;
        right: 0px;
        border-bottom-left-radius: 50px;
    }
    .header:after{
        width: calc(100% - 80px);
        left: 80px;
        top: 8px;
        border-top-left-radius: 50px;
    }

    .scheduler{
      --ha-card-background: black;
      --switch-checked-color: ${this.em.color1};
      --switch-checked-button-color: ${this.em.color1};
      --switch-checked-track-color: ${this.em.color1};
      --icon-primary-color:  ${this.em.color1};
      --wa-color-on-normal:  ${this.em.color1} !important;
      --wa-color-brand-on-normal:  ${this.em.color1} !important;
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

          <div class="power"></div>
          <div class="climate"></div>
          <div class="trv"></div>
          <div class="covers"></div>
          <div class="scheduler"></div>
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
            ${this.css_mobile_new}
            ${this.css_tablet}
        </style>
        ${this.html_new}
      `;

    //------------------------------------------------------------------
    //rooms
    this._addCard(".rooms", 'cb-lcars-button-card',
      "rooms",
      lcars_nav_btn(this._config.basepath+"/"+this._config.floor_id, "Räume", this.em.color3),
      null,
      false
    );

    //------------------------------------------------------------------
    //Buttons
    [
      ...this.em.roomEntities.filter(e=>e.labels.includes("config")).map(e=>e.entity_id)
    ].forEach(e => {
      this._addCard(".power", 'cb-lcars-button-card', `power${e}`,
        lcars_button(e, this.em.color3, this.em.color1, false, "45px"),
        e
      );
    });
    
    //------------------------------------------------------------------
    //corner alert
    this._addCard(".corner", 'cb-lcars-button-card', "corner",
      lcars_cb_alert_elbow(this.em.redAlert, this.em.color2),
      this.em.redAlert
    );
    //------------------------------------------------------------------
    //corner side
    this._addCard(".side", 'cb-lcars-button-card', "side", lcars_cb_alert_side(this.em.redAlert, this.em.color2), this.em.redAlert);
    //------------------------------------------------------------------
    //alert buttons
    this._addCard(".buttons", 'cb-lcars-button-card', "buttonb", lcars_cb_alert_btn(this.em.yellowAlert, this.em.color2, this.em.yellowAlertColor), this.em.yellowAlert);
    this._addCard(".buttons", 'cb-lcars-button-card', "buttona", lcars_cb_alert_btn(this.em.redAlert, this.em.color2, this.em.redAlertColor), this.em.redAlert);


    //------------------------------------------------------------------
    //Covers

    [
      {
        label: "Statistik",
        target: "/stats"
      },
      {
        label: "Control",
        target: this._config.basepath+"/" + this._config.area_id
      },
    ].forEach(e => {
      this._addCard(".actionborder", 'cb-lcars-button-card', `actionborder${e.label}`, lcars_nav_btn(e.target, e.label, this.em.color3), null, false);
    });

    //------------------------------------------------------------------
    //corner side
    // const graph = this.querySelector(".graph");
    // const graphCard = document.createElement('mini-graph-card');
    // // thilcars_mini_graph(this._config.climate[0], this._config.trv[0], this._config.outside_shadow, this._config.outside_sun));
    // graph.appendChild(graphCard);
    // graphCard.hass = this._hass;


    
    this._addCard(".scheduler", 'scheduler-card', `scheduler`, scheduler([...this.em.roomEntities.map(e=>e.entity_id), ...this.em.everyRoom]), "*");

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

customElements.define("at-lcars-room-config", AtLcarsRoomConfig);