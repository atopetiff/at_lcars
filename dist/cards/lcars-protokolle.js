import { lcars_bubble_elbow } from "../utils/at_lacrs_bubble_elbow.js";
import { Card, EntityManager } from "../utils/entity-manager.js";
import { lcars_bubble_lozenge } from "../utils/lcars-buttons-bubble.js";
import { font } from "../utils/scrollbar.js";
class AtLcarsProtocols extends Card {
  constructor() {
    super();

  }
  set hass(hass) {
  
      // Erstes Mal: nur speichern und initial rendern
      // //console.log("needs render", { has: !this._hass, config: !this._config });
      if (!this.em && !!this._config) {
        //console.log("inital render floor");
        this.em = new EntityManager(hass);
  
        this._render();
  
        return;
      }
      this.em.updateHass(hass);
  
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
        z-index:0;
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
          z-index: 90;

        }
        .${rc}>.content>* {
          flex-basis: 45px;
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



 

  _render() {
    //console.log("lcars protocols rerender");
    this.innerHTML = `
        <style>
            ${font()}
            ${this._styles()}
        </style>
        ${this._html()}
      `;

    //console.log(this._config.protocols);
    this._addCard(".header", "bubble-card", "header", lcars_bubble_elbow(this.em.redAlert,{ top_left: 0, top_right: 30, bottom_right: 0, bottom_left: 0 }, { top: 8, right: 30, bottom: 0, left: 0 },"#cc0000",this.em.color2), this.em.redAlert);
  
    this._addCard(".border", "bubble-card", "border", lcars_bubble_elbow(this.em.redAlert,{ top_left: 0, top_right: 0, bottom_right: 0, bottom_left: 0 }, { top: 0, right: 30, bottom: 0, left: 0 },"#cc0000",this.em.color2), this.em.redAlert);
    

    [
      ...this._config.protocols
    ].forEach(e => {

      this._addCard(".content", 'bubble-card', `prot`,
              lcars_bubble_lozenge(e,this._dc, this.em.color3, this.em.color1, false, "45px", "14px"),
              e
            );

    });
 
  }



  getCardSize() {
    return 3;
  }
}

customElements.define("at-lcars-protocols", AtLcarsProtocols);