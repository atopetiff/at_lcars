import { lcars_bubble_elbow } from "../utils/at_lacrs_bubble_elbow.js";
import { lcars_bubble_info } from "../utils/at_lcars_bubble_info.js";

import { Card, EntityManager } from "../utils/entity-manager.js";

import { lcars_bubble_lozenge, lcars_bubble_square, lcars_bubble_square_nav, lcars_bubble_square_nav_window } from "../utils/lcars-buttons-bubble.js";
import {  lcars_climate_bubble, lcars_cover_bubble, lcars_bubble_battery} from "../utils/at_lcars_bubble_climate.js";
import {  scrollbar } from "../utils/scrollbar.js";

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
      this.em = new EntityManager(hass,this._config);

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
  batteryRow(style_class, prefix) {

    return `
      
      <div class="${style_class}">

        <div class="window_left" id="${prefix}window_left"></div>
        <div class="info" id="${prefix}info" ></div>
        <div class="link"  id="${prefix}link"></div>
        <div class="buttons">
          <div class="battery" id="${prefix}battery"></div>
        </div>
        <div class="window_right" id="${prefix}window_right"></div>

      </div>
    `;
  }


  _styles() {
    const rc = 'lcars_floor';
    const bgGridColumns = "4px 15px 0.3fr 31px 4px 63px 2fr 15px 4px"
    return `
      /*at-lcars-floor{
        position: relative;
      }*/
      .${rc}_bg{
        z-index:0;
        background: black;
        position: ${this._dc.absolute_fullscreen==false?"absolute":"fixed"};

        top:${this._dc.absolute_fullscreen==false?"var(--header-height)":"0px"};
          width: 100%;
          height: 100% ;
          max-height: ${this._dc.absolute_fullscreen==false?"calc(100vh - calc(var(--header-height) + 23px))":"100vh"};
      
 
        left: 0;


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
          padding: 0px 0px 0px calc(env(safe-area-inset-left) / 2);

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

          z-index: 2;
          position: ${this._dc.absolute_fullscreen==false?"absolute":"fixed"};

          
          max-height: 100vh;
          left:0;
          top:${this._dc.absolute_fullscreen==false?"var(--header-height)":"0px"};
          width: 100%;
          height: 100% ;
          max-height: ${this._dc.absolute_fullscreen==false?"calc(100vh - calc(var(--header-height) + 23px))":"100vh"};
          margin: 0px 0px 0px 0px;
          display: grid;
          display: grid; 
          grid-template-columns: 19px 0.3fr 31px 4px 63px 2fr 19px;
          grid-template-rows: 24px 37px 1fr 23px; 
          gap: 0px 0px; 
          grid-template-areas: 
            ". . . . . nav nav"
            "outside outside alert alert alert quick quick"
            "content content content content content content content"
            ". . . . . . ."; 
          padding: 0px 0px 0px 0px;
          padding: 0px 0px 0px calc(env(safe-area-inset-left) / 2);
          
          --ha-font-family-body: 'Antonio', Arial, sans-serif;
      }
      .${rc}>.outside{
        grid-area: outside;
        display: flex;
        flex-direction: column;
        margin-top: -12px;
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
          flex-direction: column;
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
        flex-shrink: 0;
        display: grid;
         grid-template-columns: ${bgGridColumns};
         grid-template-rows: 1fr;
        gap: 0px; 
          grid-template-areas: 
            ". windowleft info link link link buttons windowright ."; 
          padding: 0px 0px 0px 0px;
          border-bottom: 4px solid black;
        }
      .${rc}>.content>.room_row.battery_row{
        flex-shrink: 1;
        flex-basis: 0px;
        }
      
       .${rc}>.content>.room_row>.window_left{
        grid-area: windowleft;
      }
      .${rc}>.content>.room_row>.info{
        grid-area: info;
        display: flex;
        flex-direction: column;
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
        flex-basis: 20px;
        flex-grow: 1;
        }
        .${rc}>.content>.room_row>.info>*:first-child{
          
        flex-basis: 22px;
        margin-left: 0px;
   
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
        .${rc}>.content>.room_row.battery_row>.buttons>*>*{
          flex-basis: 250px;
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
         
          grid-template-columns: 31px 4px 63px 1fr 4px;
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
           .${rc}>.outside{
            margin-top:0;
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
        
         grid-template-columns: 31px 4px 63px 1fr 4px;
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
          grid-template-columns: 31px 4px 63px 1fr;
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

  _html(showBatteries,batteriesOnTop) {
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
        ${showBatteries&&batteriesOnTop==true?this.batteryRow("room_row battery_row","bat"):""}
        ${this._rooms()}
        ${showBatteries&&batteriesOnTop==false?this.batteryRow("room_row battery_row","bat"):""}
        
        </div>
       
      </${tag}>
    `;
  }





  _render() {
    var batteryWarn=true
    if(this._dc.show_battery_warn==false){
      batteryWarn=false;
    }
    
    let batteryStates=[];
    if (batteryWarn) {
      
      var batteriesAll =this.em.entities.filter(e=>e.labels.map(l=>l.toLowerCase()).includes("battery"));
      console.log("Batteries All",batteriesAll);
      const minValBattery=this._dc?.show_battery_value?this._dc?.show_battery_value:30;
      batteryStates =Object.values(this.em.hass.states || {}).filter(s=>batteriesAll.some(ba=>ba.entity_id==s.entity_id&&Number(s.state)<minValBattery));
    }
    //console.log("lcars house rerender");
    this.innerHTML = `
        <style>
            ${this._styles()}
        </style>
        ${this._html(batteryStates.length>0,!!this._dc.show_battery_on_top)}
      `;


    
    
    if (batteryWarn) {
      
      batteryStates.map(bs=>bs.entity_id).forEach(e=>{
        this._addCard(
          `#batbattery`,
          "bubble-card",
          `batbattery${e}`,
          lcars_bubble_battery(e, this._dc, this.em.color1, this.em.color3,),
          e);
        });
        if (batteryStates.length>0) {
          this._addCard(`#batlink`, "bubble-card", `#batlink`, lcars_bubble_square_nav_window(null,"/history?label_id=battery" , "Batterien",{...this._dc,colorblind: false}, this.em.color1,"#cc0000",false,"55px","14px",35,this.em.color1,"mdi:battery-70"), null,false);
          
        }
      }

    
    console.log("Battery States", batteryStates);
    this._addCard(".topleft", "bubble-card", "hl", lcars_bubble_elbow(this.em.redAlert,{ top_left: 0, top_right: 20, bottom_right: 0, bottom_left: 0 }, { top: 8, right: 31, bottom: 0, left: 0 },"#cc0000",this.em.color2), this.em.redAlert);
    this._addCard(".topright", "bubble-card", "hr", lcars_bubble_elbow(this.em.redAlert,{ top_left: 30, top_right: 0, bottom_right: 0, bottom_left: 0 }, { top: 20, right: 0, bottom: 0, left: 63 },"#cc0000",this.em.color2), this.em.redAlert);

    this._areasWithEntities.forEach(a => {
      // console.log(a);

      if(a.window_entity_id){

        this._addCard(`#${a.area_id}window_left`, "bubble-card", `#${a.area_id}window_left`, lcars_bubble_elbow(a.window_entity_id,{ top_left: 20, top_right: 0, bottom_right: 0, bottom_left: 20 }, { top: 0, right: 20, bottom: 0, left: 0 },"#cc0000","black"), a.window_entity_id);
        this._addCard(`#${a.area_id}window_right`, "bubble-card", `#${a.area_id}window_right`, lcars_bubble_elbow(a.window_entity_id,{ top_left: 0, top_right: 20, bottom_right: 20, bottom_left: 0 }, { top: 0, right: 20, bottom: 0, left: 0 },"#cc0000","black"), a.window_entity_id);
      }
      // else{

      //   this._addCard(`#${a.area_id}window_left`, "bubble-card", `#${a.area_id}window_left`, lcars_bubble_elbow(null,{ top_left: 20, top_right: 0, bottom_right: 0, bottom_left: 20 }, { top: 0, right: 20, bottom: 0, left: 0 },"#cc0000","grey"), null,false);
      //   this._addCard(`#${a.area_id}window_right`, "bubble-card", `#${a.area_id}window_right`, lcars_bubble_elbow(null,{ top_left: 0, top_right: 20, bottom_right: 20, bottom_left: 0 }, { top: 0, right: 20, bottom: 0, left: 0 },"#cc0000","grey"), null,false);
      // }
      
      this._addCard(`#${a.area_id}link`, "bubble-card", `#${a.area_id}link`, lcars_bubble_square_nav_window(a.window_entity_id,this._config.basepath +"/"+ a.area_id , a.area_id,{...this._dc,colorblind: false}, this._dc?.monochrome==true?a.color3:a.color1,"#cc0000",false,"55px","14px",35,this._dc?.monochrome==true?a.color3:a.color1,a.icon), a.window_entity_id);
      // this._addCard(".buttons", 'bubble-card', "buttonb", lcars_bubble_square(this.em.yellowAlert, this.em.color2, this.em.yellowAlertColor), this.em.yellowAlert);
      
      if(!!a.temperature_entity_id){
        this._addCard(`#${a.area_id}info`, 'bubble-card', `#${a.area_id}info_temp`, lcars_bubble_info(a.entities.find(e=>e.entity_id==a.temperature_entity_id), "white", "#e0e0e0ff",false,true,20), a.temperature_entity_id);
      }
      if(!!a.humidity_entity_id){
        this._addCard(`#${a.area_id}info`, 'bubble-card', `#${a.area_id}info_temp`, lcars_bubble_info(a.entities.find(e=>e.entity_id==a.humidity_entity_id), "white", "#e0e0e0ff",false,true,20), a.humidity_entity_id);
      }
      [
        ...a.lights,
        ...a.powerToggles
      ].forEach(e => {
        this._addCard(
          `#${a.area_id}btns`,
          "bubble-card",
          `${a.area_id}lights${e}`,
          lcars_bubble_lozenge(e,this._dc, a.color3, a.color1, false, "45px","14px"),
          e);

      });
      if (!!a.climate_entity_id) {

        this._addCard(
          `#${a.area_id}climate`,
          "bubble-card",
          `${a.area_id}climate${a.climate_entity_id}`,
          lcars_climate_bubble(a.climate_entity_id, this._dc, a.color1, a.color3,),
          a.climate_entity_id);
      }
      a.covers.forEach(e => {

        this._addCard(
          `#${a.area_id}cover`,
          "bubble-card",
          `${a.area_id}cover${e}`,
          lcars_cover_bubble(e, this._dc, a.color1, a.color3,),
          e);
      });
    });
    this._addCard(".bottomright", "bubble-card", "fr", lcars_bubble_elbow(this.em.redAlert,{ top_left: 0, top_right: 0, bottom_right: 0, bottom_left: 20 }, { top: 0, right: 0, bottom: 8, left: 63 },"#cc0000",this.em.color2,{ top_left: null, top_right: null, bottom_right: null, bottom_left: 15 }), this.em.redAlert);
    this._addCard(".bottomleft", "bubble-card", "fle", lcars_bubble_elbow(this.em.redAlert,{ top_left: 0, top_right: 0, bottom_right: 20, bottom_left: 0 }, { top: 0, right: 31, bottom: 8, left: 0 },"#cc0000",this.em.color2,{ top_left: null, top_right: null, bottom_right: 15, bottom_left: null }), this.em.redAlert);
    


    const ausentemp = this.em.entities.filter(e => e.labels.includes("aussentemperatur"));
    [
      this.em.outsideShadow,
      this.em.outsideSun
    ].filter(e=>!!e).forEach(e => {
        
        this._addCard(`.out-temp`, 'bubble-card', `out-temp${e.entity_id}`, lcars_bubble_info(e, "white", "#e0e0e0ff",false,true,25), e.entity_id);


    });
    [
      ...this.em.entities.filter(e => e.labels.map(l=>l.toLowerCase()).includes("quick")),
      // ...this.em.entities.filter(e => e.labels.includes("protokoll")),

    ].forEach(e => {
      this._addCard(
        `.quick`,
        "bubble-card",
        `quick${e.entity_id}`,
        lcars_bubble_lozenge(e.entity_id,this._dc, this.em.color3, this.em.color1, false, "35px", "13px"),
        e.entity_id);

    });


    this._addCard(
          `.alert`,
          "bubble-card",
          `navalert`,
          lcars_bubble_square(this.em.redAlert,this._dc, this.em.color2, this.em.redAlertColor, false, "30px","14px",this.em.color2),
          this.em.redAlert);
    [

      {
        label: "Home",
        target: this._config.basepath+"/home"
      },
    ].forEach(e => {

      this._addCard(`.nav`, "bubble-card", `nav${e.label}`, lcars_bubble_square_nav(e.target , e.label,{...this._dc,colorblind: false}, this.em.color3), null,false);

    });

  }



  getCardSize() {
    return 3;
  }
}

customElements.define("at-lcars-floor", AtLcarsFloor);