import { lcars_cover_slider } from "../utils/at_lcars_slider_button.js";
import { Card, EntityManager } from "../utils/entity-manager.js";
import { lcars_bubble_cover_close, lcars_bubble_cover_open, lcars_bubble_cover_summer, lcars_bubble_lozenge } from "../utils/lcars-buttons-bubble.js";
import { font } from "../utils/scrollbar.js";
class AtLcarsCover extends Card {
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

  _render() {


    this.innerHTML = `
        <style>
        ${font()}
            .cover_root{
                height: 100px;
                margin: 0px 0px 0px 0px;
                display: grid;
                grid-template-columns: 1fr 1.5fr 1.5fr;
                grid-template-rows: 1fr 1fr;
                grid-template-areas:
                    "open slider close"
                    "open slider summer";
                background-color: black;
                padding: 0px 0px 0px 0px;
                --ha-font-family-body: 'Antonio', Arial, sans-serif;
                gap: 4px;
            }
            .cover_root>*{
                overflow: hidden;
            }
            
            
            .cover_root>*{
                flex-basis: 300px;
              flex-grow: 1;
              flex-shrink: 1;
              
            }

            .cover_root>.cover_open{
              grid-area: open;
              height: 100px !important;
            }
            .cover_root>.cover_slider{
              grid-area: slider;
              --slider-color: ${this._config.color1};
              --ha-card-background: ${this._config.color3};
            }
            .cover_root>.cover_close{
              grid-area: close;
              height: 48px !important;
            }
            .cover_root>.cover_summer{
              grid-area: summer;
              height: 48px !important;
            }

        </style>
        <at-cover class="cover_root">
          <div class="cover_open"></div>
          <div class="cover_slider"></div>
          <div class="cover_close"></div>
          <div class="cover_summer"></div>
          

        </at-cover>
      `;


    //------------------------------------------------------------------


    this._addCard(".cover_open", 'bubble-card', `open`,
      lcars_bubble_cover_open(this._config.entity, this._config.color3, this._config.color1, false, "45px", "14px"),
      this._config.entity
    );
    this._addCard(".cover_slider",'slider-button-card',
      `slider`,
      lcars_cover_slider(this._config.entity),
      this._config.entity
    );
 
    this._addCard(".cover_close", 'bubble-card', `cover_close`,
      lcars_bubble_cover_close(this._config.entity, this._config.color3, this._config.color1, false, "45px", "14px"),
      this._config.entity
    );
 
    this._addCard(".cover_summer", 'bubble-card', `cover_summer`,
      lcars_bubble_cover_summer(this._config.entity, this._config.color3, this._config.color1, false, "45px", "14px"),
      this._config.entity
    );
    

  }



  getCardSize() {
    return 3;
  }
}

customElements.define("at-lcars-cover", AtLcarsCover);