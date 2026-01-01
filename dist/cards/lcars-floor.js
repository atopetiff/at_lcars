import { entitiesIn } from "../utils/entity-filter.js";
import { Card, EntityManager } from "../utils/entity-manager.js";
import { lcars_footer_alert, lcars_footer_left_alert, lcars_cb_alert_omni, lcars_footer_right_alert, lcars_top_left_alert, lcars_top_right_alert } from "../utils/lcars-borders.js";
import { lcars_floor_plan_tempnav, lcars_floor_plan_window, lcars_floor_plan_humidity, lcars_floor_row_windownav, lcars_room_row_info_temp, lcars_room_row_info_humidity, lcars_floor_row_window_left, lcars_floor_row_window_right, lcars_switch, lcars_climate_bubble, lcars_cover_bubble, lcars_nav_btn, lcars_cb_alert_btn } from "../utils/lcars-buttons.js";
import { font, scrollbar } from "../utils/scrollbar.js";

//import { lcars_switch, lcars_button, lcars_climate, lcars_cover_open, lcars_cover_slider, lcars_cover_close, lcars_cover_summer } from "./lcars.js";
class AtLcarsFloor extends Card {
  constructor() {
    super();
    this.old = null;
    this.changeTracker = [];
    //console.log("lcars floor")
    this._devices = [];
    this._areasWithEntities = [];
    this._entities = [];
    this.name = "tst";

  }


  set hass(hass) {

    // Erstes Mal: nur speichern und initial rendern
    // //console.log("needs render", { has: !this._hass, config: !this._config });
    if (!this.em && !!this._config) {
      //console.log("inital render floor");
      this.em = new EntityManager(hass);

      this.groupEntities();
      this._render();

      return;
    }
    this.em.updateHass(hass);

  }

  groupEntities() {

    this._areasWithEntities = this._config.areas.map(a => {
      const all = this.em.filterForArea(a.area_id);

      //const entities =  addArea.filter(e=>e.area_id===a.area_id);

      return {
        ...all.area,
        window_entity_id: all.window,
        climate_entity_id: all.climate,
        entities: all.entities,
        lights: all.lights,
        covers: all.covers,
        powerToggles: all.powerToggles
      }
    });
    //console.log("grouped", this._aresWithEntities);
  }

  row(style_class, prefix) {

    return `
      
      <div class="${style_class}">

        <div class="window_left" id="${prefix}window_left"></div>
        <div class="info" id="${prefix}info" ></div>
        <div class="link"  id="${prefix}link"></div>
        <div class="buttons">
          <div class="btns" id="${prefix}btns"></div>
          <div class="climate" id="${prefix}climate"></div>
          <div class="cover" id="${prefix}cover"></div>
        </div>
        <div class="window_right" id="${prefix}window_right"></div>

      </div>
    `;
  }


  _styles() {
    const rc = 'lcars_floor';
    const bgGridColumns = "4px 15px 0.3fr 31px 6px 63px 2fr 15px 4px"
    return `
      .${rc}_bg{
        z-index:0;
        background: black;
        position: absolute;
        width: 100%;
        height: 100%;
          /*max-height: calc(100vh - var(--header-height));*/
        display: grid; 
          grid-template-columns: ${bgGridColumns};
          grid-template-rows: 50px 1fr 1fr 25px; 
          gap: 0px 0px; 
          grid-template-areas: 
            "tl tl tl tl . tr tr tr tr"
            "tl tl tl tl . tr tr tr tr"
            "bl bl bl bl . br br br br"
            "bl bl bl bl . br br br br"; 
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
          grid-template-columns: 19px 0.3fr 31px 6px 63px 2fr 19px;
          grid-template-rows: 24px 37px 1fr 23px; 
          gap: 0px 0px; 
          grid-template-areas: 
            ". . . . . nav nav"
            "outside outside alert alert alert quick quick"
            "content content content content content content content"
            ". . . . . . ."; 
          padding: 0px 0px 0px 0px;
          
          --ha-font-family-body: 'Antonio', Arial, sans-serif;
      }
      .${rc}>.outside{
        grid-area: outside;
        display: flex;

      }
      .${rc}>.quick{
        grid-area: quick;
        display: flex;
        gap: 4px;
        padding: 0px 4px 0px 4px;
        overflow: auto;
        }
        .${rc}>.quick>*{
          flex-basis: 120px;
          flex-shrink: 0;
        }
         .${rc}>.outside>.out-temp,.${rc}>.outside.out-hum{
          display:flex;
          flex-direction: row;
         }
         .${rc}>.outside>.out-temp>*,.${rc}>.outside>.out-hum>*{
          flex-basis: 50px;
          flex-grow: 1;
          height: 17px;
         }
      .${rc},${rc} *{
        --ha-font-family-body: 'Antonio', Arial, sans-serif;
        font-family: 'Antonio', Arial, sans-serif;
      }
      .${rc}>*{
          overflow: hidden;
      }
      .${rc}>*>*{
          /*overflow: hidden;*/
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
        display: flex; 
        flex-direction: column;
        gap: 0px;
        background: transparent;
    padding:  0px;
    overflow: auto;
          border-top: 4px solid black;
         }
      .${rc}>.content>.room_row{
        box-sizing: border-box;
        border-radius: 0px;
        background: black;
        position: relative;
        flex-basis: 45px;
        display: grid;
         grid-template-columns: ${bgGridColumns};
         grid-template-rows: 1fr;
        gap: 0px; 
          grid-template-areas: 
            ". windowleft info link link link buttons windowright ."; 
          padding: 0px 0px 0px 0px;
          border-bottom: 4px solid black;
        }

       .${rc}>.content>.room_row>.window_left{
        grid-area: windowleft;
      }
      .${rc}>.content>.room_row>.info{
        grid-area: info;
        display: flex;
      }
      .alert{
        grid-area: alert;
            padding-top: 4px;
      }
      .nav{
      grid-area: nav;
    display: flex
;
    flex-direction: row;
    align-items: flex-start;
    gap: 0px;
    margin-left: 20px;
    height: 20px;
    justify-content: flex-end;
      }
      .nav>*{
            height: 20px !important;
    flex-basis: 120px;
    border-left: 4px solid black;

      }
      .${rc}>.content>.room_row>.info>*{
        flex-basis: 50px;
        flex-grow: 1;
        }
        .${rc}>.content>.room_row>.info>*:first-child{
          
        flex-basis: 60px;
        margin-left: -9px;
   
        }
      .${rc}>.content>.room_row>.link{
        grid-area: link;
      }
      .${rc}>.content>.room_row>.buttons{
        grid-area: buttons;
        display: grid;
        display: flex;
        grid-template-columns: 1.5fr  1fr 1fr; 
        grid-template-rows: 1fr; 
        gap: 4px; 
        padding: 0px  4px 0px 4px;

      }
      .${rc}>.content>.room_row>.buttons>*{
        display: flex;
        gap: 4px;
        flex-wrap:wrap;
        flex-grow:1;
        flex-shrink:1;
      }
        .${rc}>.content>.room_row>.buttons>.btns{
          flex-basis: 234px;
          flex-grow:1;
          min-widht: 110px;
        } 
        .${rc}>.content>.room_row>.buttons>.climate{
          flex-basis: 200px;
          max-width: 270px;
          min-width: 150px;
          } 
          .${rc}>.content>.room_row>.buttons>.cover{
            flex-basis: 200px;
            max-width: 270px;
            min-width: 150px;
        } 
        .${rc}>.content>.room_row>.buttons>*>*{
          flex-basis: 115px;
          flex-shrink:1;
          flex-grow: 1;
          height: 45px !important;
        }
        .${rc}>.content>.room_row>.buttons>.btns>*{

          flex-grow: 0;
        }
      .${rc}>.content>.room_row>.window_right{
        grid-area: windowright;
      }
        
        .${rc}>.content>.inside{
          display: flex;
          flex-direction: column;
          
          border: none;
          
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
      @media (width < 630px) {
        .${rc}>.content>.room_row>.buttons{
          flex-wrap: wrap;
        }
      }
      @media (width < 400px) {
      .${rc}{
         
          grid-template-columns: 31px 6px 63px 1fr 4px;
          grid-template-rows: 24px 35px 35px 1fr 25px; 
          gap: 0px 0px; 
          grid-template-areas: 
            ". . . nav nav "
            ". . . outside outside"
            "alert alert alert quick quick"
            "content content content content content"
            ". . . . ."; 
          padding: 0px 0px 0px 0px;
          
          --ha-font-family-body: 'Antonio', Arial, sans-serif;
      }
          .${rc}>.outside>.out-temp,.${rc}>.outside.out-hum{
  
          flex-direction: row;
         }
          .${rc}>.outside>.out-temp>*,.${rc}>.outside.out-hum>*{
  
          flex-basis: 50%;
         }
        .${rc}>.content>.room_row>.buttons{
          flex-wrap: wrap;
        }
        .${rc}>.content>.room_row{
        
         grid-template-columns: 31px 6px 63px 1fr 4px;
         grid-template-rows: 45px 1fr;
        gap: 0px; 
          grid-template-areas: 
            "link link link info ."
            "link link link buttons ."; 
          padding: 0px 0px 0px 0px;
        }
          .${rc}>.content>.room_row>.window_left,.${rc}>.content>.room_row>.window_right{
          display: none;
          }
        .${rc}_bg{
          grid-template-columns: 6px 31px 6px 63px 1fr 4px;
        grid-template-areas:
        "tl . tr tr tr tr"
        "tl . tr tr tr tr"
        "bl . br br br br"
        "bl . br br br br";
        padding: 0px 0px 0px 0px;
        }
        .${rc}_bg>.topleft,.${rc}_bg>*.bottomleft{
         /* display: none;*/
        }
          .${rc}>.content>.room_row>.buttons>.btns>*{
          flex-basis: calc(50% - 4px);
          flex-grow:1;
          flex-shrink: 0;
          min-widht: unset;
          
        } 
        .${rc}>.content>.room_row>.buttons>.climate,.${rc}>.content>.room_row>.buttons>.cover{
            flex-basis: 100%;
            max-width: 100%;
            min-width: unset;
        } 
      }
        ${scrollbar(this.em.color1, this.em.color2, this.em.color3, this.em.color4)}
    `;
  }

  _rooms() {
    var html = ""
    var rooms = this._config?.areas.map(a => {
      return this.row("room_row", a.area_id);
    }
    ).join("");
    // //console.log("html",rooms);
    return `${rooms}`

  }
  _houseOverviewCss(basepath) {

    var rooms = this._config?.areas.map(a => `${basepath}>.${a.area_id}{grid-area: ${a.area_id};}`).join(" ");

    // //console.log("css", `${rooms}`);
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
        <div class="outside">
          <div class="out-temp"></div> 
        </div>
        <div class="quick"></div> 
        <div class="alert"></div>
        <div class="nav"></div>
        <div class="content">
          ${this._rooms()}
        </div>
       
      </${tag}>
    `;
  }





  _render() {
    //console.log("lcars house rerender");
    this.innerHTML = `
        <style>
            ${font()}
            ${this._styles()}
        </style>
        ${this._html()}
      `;


    
    //console.log("config", this._config);

    this._addCard(".topleft", "cb-lcars-elbow-card", "hl", lcars_cb_alert_omni("cb-lcars-header-right", { top_left: 0, top_right: 30, bottom_right: 0, bottom_left: 0 }, { top: 20, right: 31, bottom: 0, left: 0 }, this.em.redAlert, this.em.color2), this.em.redAlert);
    // this._addCard(".topright", "cb-lcars-elbow-card", "hr", lcars_top_right_alert(this.em.redAlert, "goldenrod"),this.em.redAlert);
    this._addCard(".topright", "cb-lcars-elbow-card", "hr", lcars_cb_alert_omni("cb-lcars-header", { top_left: 30, top_right: 0, bottom_right: 0, bottom_left: 0 }, { top: 20, right: 0, bottom: 0, left: 63 }, this.em.redAlert, this.em.color2), this.em.redAlert);

    this._areasWithEntities.forEach(a => {
      // this._addCard(".content","at-lcars-room-row",`${a.area_id}`,{type: "custom:at-lcars-room-row",area: a.area_id},'*');

      this._addCard(`#${a.area_id}window_left`, "cb-lcars-button-card", `#${a.area_id}window_left`, lcars_floor_row_window_left(a.window_entity_id, "black", "#cc0000"), a.window_entity_id);
      this._addCard(`#${a.area_id}window_right`, "cb-lcars-button-card", `#${a.area_id}window_right`, lcars_floor_row_window_right(a.window_entity_id, "black", "#cc0000"), a.window_entity_id);
      this._addCard(`#${a.area_id}link`, "cb-lcars-button-card", `#${a.area_id}link`, lcars_floor_row_windownav(a.window_entity_id, a.name, a.area_id, a.icon, "/at-lcars/" + a.area_id, a.color3, "#cc0000"), a.window_entity_id);
      this._addCard(`#${a.area_id}info`, "cb-lcars-button-card", `#${a.area_id}info_temp`, lcars_room_row_info_temp(a.temperature_entity_id), a.temperature_entity_id);
      this._addCard(`#${a.area_id}info`, "cb-lcars-button-card", `#${a.area_id}info_temp`, lcars_room_row_info_humidity(a.humidity_entity_id), a.humidity_entity_id);
      [
        ...a.lights,
        ...a.powerToggles
      ].forEach(e => {
        this._addCard(
          `#${a.area_id}btns`,
          "cb-lcars-button-card",
          `${a.area_id}lights${e}`,
          lcars_switch(e, a.color3, a.color1, false, "45px"),
          e);

      });
      if (!!a.climate_entity_id) {

        this._addCard(
          `#${a.area_id}climate`,
          "bubble-card",
          `${a.area_id}climate${a.climate_entity_id}`,
          lcars_climate_bubble(a.climate_entity_id, a.color1, a.color3,),
          a.climate_entity_id);
      }
      a.covers.forEach(e => {

        this._addCard(
          `#${a.area_id}cover`,
          "bubble-card",
          `${a.area_id}cover${e}`,
          lcars_cover_bubble(e, a.color1, a.color3,),
          e);
      });
    });
    this._addCard(".bottomright", "cb-lcars-elbow-card", "fr", lcars_cb_alert_omni("cb-lcars-footer", { top_left: 0, top_right: 0, bottom_right: 0, bottom_left: 30 }, { top: 0, right: 0, bottom: 8, left: 63 }, this.em.redAlert, this.em.color2), this.em.redAlert);
    this._addCard(".bottomleft", "cb-lcars-elbow-card", "fle", lcars_cb_alert_omni("cb-lcars-footer-right", { top_left: 0, top_right: 0, bottom_right: 30, bottom_left: 0 }, { top: 0, right: 31, bottom: 8, left: 0 }, this.em.redAlert, this.em.color2), this.em.redAlert);
    // this._addCard(".topleft", "cb-lcars-elbow-card", "left", lcars_cb_alert_omni("cb-lcars-header-right", { top_left: 0, top_right: 30, bottom_right: 30, bottom_left: 0 }, { top: 20, right: 60, bottom: 20, left: 0 }, this.em.redAlert, "goldenrod"), this.em.redAlert);


    const ausentemp = this.em.entities.filter(e => e.labels.includes("aussentemperatur"));
    [
      this.em.outsideShadow,
      this.em.outsideSun
    ].filter(e=>!!e).forEach(e => {

      this._addCard(`.out-temp`, "cb-lcars-button-card", `out-temp${e}`, lcars_room_row_info_temp(e, "25", "30px", 22), e);
    });
    [
      ...this.em.entities.filter(e => e.labels.includes("aussenlicht")),
      // ...this.em.entities.filter(e => e.labels.includes("protokoll")),

    ].forEach(e => {
      this._addCard(
        `.quick`,
        "cb-lcars-button-card",
        `quick${e.entity_id}`,
        lcars_switch(e.entity_id, this.em.color3, this.em.color1, false, "35px"),
        e.entity_id);

    });

    this._addCard(".alert", 'cb-lcars-button-card', "navalert", lcars_cb_alert_btn(this.em.redAlert, this.em.color2, this.em.redAlertColor), this.em.redAlert);
    [

      {
        label: "Home",
        target: "/at-lcars/home"
      },
    ].forEach(e => {
      this._addCard(".nav", 'cb-lcars-button-card', `nav${e.label}`, lcars_nav_btn(e.target, e.label, this.em.color3,{top: 2, right:4, bottom:2, left:4}), null, false);
    });


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

customElements.define("at-lcars-floor", AtLcarsFloor);