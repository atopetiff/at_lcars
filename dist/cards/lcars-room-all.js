
import { Card, EntityManager } from "../utils/entity-manager.js";
import { lcars_bubble_lozenge, lcars_bubble_lozenge_button } from "../utils/lcars-buttons-bubble.js";
import { RoomCard } from "../utils/room.js";
import { font, scrollbar } from "../utils/scrollbar.js";
class AtLcarsRoomAll extends RoomCard {
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
          <div class="direct"></div>
          <div class="devices"></div>
      </div>
      <div class="infoborder"></div>
      <div class="footer"></div>
      <div class="header"></div>
      <div class="title">
        <div class="fill"></div>
        <span>${this._config.room}</span>
        <div class="end"></div>
      </div>
      <div class="grid">
        <div class="light">
          <h2>Licht</h2>
        </div>
        <div class="powerToggles">
          <h2>PowerToggles</h2>
        </div>
        <div class="button">
          <h2>Buttons</h2>
        </div>
        
        <div class="windows">
          <h2>Fenster</h2>
        </div>
        <div class="batteries">
          <h2>Battery</h2>
        </div>
        <div class="climates">
          <h2>Klima</h2>
        </div>
        <div class="trvs">
          <h2>TRVs</h2>
        </div>

        <div class="info">
          <h2>Info</h2>
        </div>
        <div class="config">
          <h2>Config</h2>
        </div>
       
      </div>
      <div class="buttons"></div>
      <div class="actionborder"></div>
    


    </ha-card>
    `;
  }

    get css_addon(){
    return `
    .devices,.direct{
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
     .content>.power>*{
      flex-basis: 300px;
    }

    .grid{
      flex-direction: column;
      flex-wrap: nowrap
    }
    .grid>*{
      display: flex;
      flex-direction: column;
      gap: 4px;
      height: unset !important;
      
    }
    .grid h2{
    margin: 0px;
    }
    .content>*>*,
    .grid>*>*{
    height: 45px;
    }
    `;
  }

  _render() {
    //console.log("lcars room rerender");
    this.innerHTML = `
        <style>
            ${font()}
            ${scrollbar(this.em.color1, this.em.color2, this.em.color3, this.em.color4)}
            ${this.css_mobile_new(this.em.color1, this.em.color2, this.em.color3, this.em.color4,"2fr",false)}
            ${this.css_tablet(this.em.color1, this.em.color2, this.em.color3, this.em.color4,"300px", false)}
            ${this.css_addon}
        </style>
        ${this.html_new}
      `;

    this.setupLayout('all');

    

    //------------------------------------------------------------------
    //Buttons
    [
      ...this.em.roomEntities.filter(e=>e.labels.includes("config")).map(e=>e.entity_id)
    ].forEach(e => {
      this._addCard(".config", 'bubble-card', `config${e}`,
        lcars_bubble_lozenge_button(e,this._dc, this.em.color3, this.em.color1, false, "45px", "14px"),
        e
      );
    });
    
    //------------------------------------------------------------------
    //corner side
    // const graph = this.querySelector(".graph");
    // const graphCard = document.createElement('mini-graph-card');
    // // thilcars_mini_graph(this._config.climate[0], this._config.trv[0], this._config.outside_shadow, this._config.outside_sun));
    // graph.appendChild(graphCard);
    // graphCard.hass = this._hass;

    this.em.roomDevices.forEach(rd=>{
      const device = this.em.devices.find(d=>d.id==rd);
      
      
      const card = this.querySelector(".devices");
      card.appendChild(document.createTextNode(device.name));
      this.em.entities.filter(e=>e.device_id==rd).forEach(e=>{
        var targets =[];
       [
          {label: "config", target:".config"},
          {label: "battery", target:".batteries"},
          {label: "info", target:".info"},
          {label: "powertoggle", target:".powerToggles"},
          {label: "licht", target:".light"},
          {label: "heizung", target:".trvs"},
          {label: "thermostat", target:".climates"},
          {label: "fenster", target:".windows"},
          {label: "button", target:".button"},
        ].forEach(c=>{
          if (e.labels.includes(c.label)) {
            targets.push(c.target);
          }
        });
        if (targets.length==0) {
          targets.push(".devices");
        }
        targets.forEach(t=>{

          this._addCard(t, 'bubble-card', `${t}${rd}${e.entity_id}`,
            lcars_bubble_lozenge_button(e.entity_id,this._dc, this.em.color3, this.em.color4, false, "45px", "14px"),
            e.entity_id
          );
        });
      })
      console.log("device",this.em.devices.find(d=>d.id==rd),this.em.entities.filter(e=>e.device_id==rd));

    });
    

      const card = this.querySelector(".direct");
      card.appendChild(document.createTextNode("helpers / automations ..."));
      this.em.roomEntities.filter(e=>e.area_id!=null && e.labels.includes("config")==false).forEach(e=>{
      this._addCard(".direct", 'bubble-card', `dev${e.entity_id}`,
        lcars_bubble_lozenge_button(e.entity_id,this._dc, this.em.color3, this.em.color4, false, "45px", "14px"),
        e.entity_id
      );
      });
     
    
  

  }



  getCardSize() {
    return 3;
  }
}

customElements.define("at-lcars-room-all", AtLcarsRoomAll);