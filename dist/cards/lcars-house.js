import { lcars_bubble_elbow } from "../utils/at_lacrs_bubble_elbow.js";
import { Card, EntityManager } from "../utils/entity-manager.js";

import { lcars_bubble_square_nav } from "../utils/lcars-buttons-bubble.js";

import { font } from "../utils/scrollbar.js";
class AtLcarsHouse extends Card {
  constructor() {
    super();
  }
set hass(hass) {

    // Erstes Mal: nur speichern und initial rendern
    // //console.log("needs render", { has: !this._hass, config: !this._config });
    if (!this.em && !!this._config) {
      //console.log("inital render floor");
      this.em = new EntityManager(hass);

      // this.groupEntities();
      this._render();

      return;
    }
    this.em.updateHass(hass);

  }



 



  _styles() {
    const rc = 'lcars_house';
    return `
      at-lcars-house{
        position: relative;
      }
      .${rc}_bg{
        z-index:0;
        background: black;
        position: ${this._dc.absolute_fullscreen==false?"absolute":"fixed;"}
        top: 0;
        left: 0;
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
          z-index: 200;
          position: ${this._dc.absolute_fullscreen==false?"absolute":"fixed;"}
          top: 0;
          left:0;

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
          padding: 0px 0px 0px calc(env(safe-area-inset-left) / 2);
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
        filter: drop-shadow(0px 6px 0px black) drop-shadow(0px -6px 0px black) drop-shadow(6px 0px 0px black)  drop-shadow(-6px 0px 0px black);
        }
      .${rc}>.content>*{
        border: none;
        box-sizing: border-box;
        border-radius: 0px;
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
    
    var inside = `
    ${this._config?.floorGroups
      //.filter(f=>f.group!="floorgroup_config")
      .map(i=>{
      return `<div class="${i.floor_id}">
      </div>`
    }).join("")}
    `
    ;
    return `
    ${inside}
    `
  }
  _houseOverviewCss(basepath){
    const noConfig = this._config?.floorGroups
    //.filter(f=>f.group!="floorgroup_config")
    ;
    const distinctLevels =[... new Set(noConfig.map(f=>f.level))].sort().reverse();
    const gridRows = distinctLevels.map(l=> "1fr").join(" ");
    const distinctGroups =[... new Set(noConfig.map(f=>f.group))].sort();
    const gridcols = distinctGroups.map(l=> "1fr").join(" ");
    // console.log({distinctLevels: distinctLevels, gridRows: gridRows, distinctGroups: distinctGroups, gridcols: gridcols});

    var area = distinctLevels.map(l=>{
      return distinctGroups.map(g=>{return g+l}).join(" ");
    });
    const templateareas = '"'+area.join('" "')+'"'
    // console.log("areas", templateareas);
    const css = `
    .lcars_house>.content{
        grid-template-columns: ${gridcols}; 
        grid-template-rows: ${gridRows}; 
        gap: 8px 8px; 
        grid-template-areas: 
          ${templateareas}; 
    }
    `
//       const arr = [1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 5];
// const set = [...new Set(arr)];
// console.log(set); // [1, 2, 3, 4, 5]
    var others = noConfig.map(f=>`${basepath}>.${f.floor_id}{grid-area: ${f.group}${f.level};}`).join(" ");
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
        //console.log("css", `${inside}${others}`);
    
    return `
    ${others}
    ${css}`
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

  


  _render() {
    //console.log("lcars house rerender");
    this.innerHTML = `
        <style>
        
            ${this._styles()}
        </style>
        ${this._html()}
      `;

    //console.log(this._config.areas);


    this._addCard(".actions", "at-lcars-protocols", "actions", {type: "custom:at-lcars-protocols", protocols: this._config.protocols},'input_boolean.yellow_alert');
    this._addCard(".topleft", "bubble-card", "corner", lcars_bubble_elbow(this.em.redAlert,{ top_left: 0, top_right: 30, bottom_right: 0, bottom_left: 0 }, { top: 20, right: 8, bottom: 0, left: 0 },"#cc0000",this.em.color2), this.em.redAlert);
    
    this._addCard(".topright", "bubble-card", "hr", lcars_bubble_elbow(this.em.redAlert,{ top_left: 30, top_right: 0, bottom_right: 0, bottom_left: 0 }, { top: 20, right: 0, bottom: 0, left: 63 },"#cc0000",this.em.color2), this.em.redAlert);

    this._addCard(".bottomright", "bubble-card", "fr", lcars_bubble_elbow(this.em.redAlert,{ top_left: 0, top_right: 0, bottom_right: 0, bottom_left: 30 }, { top: 0, right: 0, bottom: 8, left: 63 },"#cc0000",this.em.color2), this.em.redAlert);
    
    this._config?.floorGroups
    // .filter(f=>f.group!="floorgroup_config")
    .forEach(f=>{
    

          this._addCard(`.${f.floor_id}`, "bubble-card", f.floor_id, lcars_bubble_square_nav(this._config.basepath+"/floor-"+f.floor_id, f.name,this._dc, this.em.color3), null,false);
          
        });
    
  }



  getCardSize() {
    return 3;
  }
}

customElements.define("at-lcars-house", AtLcarsHouse);