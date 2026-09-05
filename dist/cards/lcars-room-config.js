import { lcars_slider_bubble } from "../utils/at_lcars_bubble_climate.js";
import { lcars_bubble_info } from "../utils/at_lcars_bubble_info.js";
import { lcars_bubble_seperator } from "../utils/at_lcars_bubble_seperator.js";
import { scheduler } from "../utils/configs.js";
import { Card, EntityManager } from "../utils/entity-manager.js";
import { lcars_bubble_lozenge, lcars_bubble_lozenge_button } from "../utils/lcars-buttons-bubble.js";
import { RoomCard } from "../utils/room.js";
import { scrollbar } from "../utils/scrollbar.js";
class AtLcarsRoomConfig extends RoomCard {
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
      this.em = new EntityManager(hass,this.config);
      this.em.fillRoom(this._config.area_id)

      this._render();

      return;
    }
    this.em.updateHass(hass);

  }


  get css_addon() {
    return `
    .scheduler{
      --ha-card-background: black;
      --switch-checked-color: ${this.em.color1};
      --switch-checked-button-color: ${this.em.color1};
      --switch-checked-track-color: ${this.em.color1};
      --icon-primary-color:  ${this.em.color1};
      --wa-color-on-normal:  ${this.em.color1} !important;
      --wa-color-brand-on-normal:  ${this.em.color1} !important;
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

      <div class="everyroomconfigheader textheader"></div>
      <div class="everyroomconfig"></div>
          <div class="configheader textheader"></div>
          <div class="config"></div>
          <div class="automationsheader textheader"></div>
          <div class="automations"></div>
          <div class="climate"></div>
          <div class="trv"></div>
          <div class="covers"></div>
          <div class="scheduler"></div>
          <div class="hiddenbtnheader textheader"></div>
          <div class="hiddenbtn"></div>
          <div class="colorheader textheader"></div>
          <div class="color"></div>
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

    this.setupLayout('config');



    //------------------------------------------------------------------
    //Buttons
    let configs =this.em.roomEntities.filter(e => e.labels.map(l => l.toLowerCase()).some(l => l == "config"));
    this._addCard(".everyroomconfigheader", 'bubble-card', `everyroomconfigtext`,
      lcars_bubble_seperator("Global", this.em.color3,  true, false, 25),
      null,false
    );
    [
      ...this.em.entities.filter(e => e.labels.map(l => l.toLowerCase()).some(l => l == "everyconfig") && configs.includes(e.entity_id)==false).map(e => e.entity_id),
    ].forEach(e => {
      this._addCard(".everyroomconfig", 'bubble-card', `everyroomconfig${e}`,
        lcars_bubble_lozenge_button(e, this._dc, this.em.color3, this.em.color1, false, "45px", "14px", true),
        e
      );
    });
    
    console.log("room configs", configs);
    let automations =  configs.filter(e=>e.platform=="automation");
    let color = configs.filter(e=>e.labels.map(l => l.toLowerCase()).some(l => l == "lcars_color"));
    let hiddenbuttons = configs.filter(e=>e.labels.map(l => l.toLowerCase()).some(l => l == "hiddenbutton"));
    this._addCard(".configheader", 'bubble-card', `configtext`,
      lcars_bubble_seperator("Config", this.em.color3,  true, false, 25),
      null,false
    );
    configs = configs.filter(e=>[...automations, ...color,...hiddenbuttons].some(a=>a.entity_id==e.entity_id)==false);
    [
      ...configs
    ].forEach(e => {
      if (e.platform=="input_number") {
        this._addCard(".config", 'bubble-card', `config${e}`,
          lcars_slider_bubble(e.entity_id, this._dc, this.em.color1, this.em.color3),
          e.entity_id
        );
        
      } else {
        this._addCard(".config", 'bubble-card', `config${e}`,
          lcars_bubble_lozenge_button(e.entity_id, this._dc, this.em.color3, this.em.color1, false, "45px", "14px", true),
          e.entity_id
        );
        
      }
    });
 
  this._addCard(".automationsheader", 'bubble-card', `automationstext`,
      lcars_bubble_seperator("Automations", this.em.color3,  true, false, 25),
      null,false
    );
    [
      ...automations.map(e=>e.entity_id)
    ].forEach(e => {
      this._addCard(".automations", 'bubble-card', `automations${e}`,
        lcars_bubble_lozenge_button(e, this._dc, this.em.color3, this.em.color1, false, "45px", "14px", true),
        e
      );
    });
    




    if (!!this._dc?.use_scheduler_card) {

      this._addCard(".scheduler", 'scheduler-card', `scheduler`, scheduler([...this.em.roomEntities.map(e => e.entity_id), ...this.em.everyRoom,...configs.map(e=>e.entity_id)]), "*");
      if(this.em.area.labels.map(l=>l.toLowerCase()).includes("config")){
        this._addCard(".scheduler", 'scheduler-card', `allscheduler`, scheduler([],"Alle Zeitpläne",true), "*");

      }
    }

    //hiddenbuttons. schalter zwar nützlich aber nicht empfehlenswert in hauptansicht
    this._addCard(".hiddenbtnheader", 'bubble-card', `hiddenbtntext`,
      lcars_bubble_seperator("Hidden Buttons", this.em.color3,  true, false, 25),
      null,false
    );
    [
      ...hiddenbuttons.map(e=>e.entity_id)
    ].forEach(e => {
      this._addCard(".hiddenbtn", 'bubble-card', `hiddenbtn${e}`,
        lcars_bubble_lozenge_button(e, this._dc, this.em.color3, this.em.color1, false, "45px", "14px", true),
        e
      );
    });

    //Colors
    this._addCard(".colorheader", 'bubble-card', `colortext`,
      lcars_bubble_seperator("Color", this.em.color3,  true, false, 25),
      null,false
    );
    [
      ...color.map(e=>e.entity_id)
    ].forEach(e => {
      this._addCard(".color", 'bubble-card', `color${e}`,
        lcars_bubble_lozenge_button(e, this._dc, this.em.color3, this.em.color1, false, "45px", "14px", true),
        e
      );
    });

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

customElements.define("at-lcars-room-config", AtLcarsRoomConfig);