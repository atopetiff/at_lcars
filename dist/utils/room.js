import { lcars_bubble_elbow } from "./at_lacrs_bubble_elbow.js";
import { Card } from "./entity-manager.js";
import { lcars_bubble_square, lcars_bubble_square_nav } from "./lcars-buttons-bubble.js";


export class RoomCard extends Card {
  constructor() {
    super();
  }


  css_tablet(color1, color2, color3, color4, leftWidth = "300px", showGraph = true) {

    const graph = showGraph == true ? 'graph' : 'grid';
    return `
    @media (width > 450px){
      .room {
        
        grid-template-areas:
          "infoborder   ${graph}     ${graph} ${graph}   grid   grid   grid   grid   .      side"
          "infoborder   ${graph}     ${graph} ${graph}   grid   grid   grid   grid   .      side"
          "footer       footer       footer   footer  .       .       .       .       .      side"
          "footer       footer       footer   footer  title   title   title   title   .      side"
          ".            .            .        .       title   title   title   title   .      side"
          "header       header       header   header  title   title   title   title   .      side"
          "header       header       header   header  .       .       .       .       .      side"
          "actionborder actionborder .        content content content content content .      side"
          "rooms        rooms        .        .       .       .       corner  corner  corner corner"
          "rooms        rooms        .        buttons buttons .       corner  corner  corner corner";
      }
    }
    @media (width > 550px){
      .room {
        grid-template-columns:
        ${leftWidth} 30px    4px      46px         4px    1fr     1fr     6px     24px    20px   4px     10px;
      grid-template-rows: 20px 22px 1fr 1fr 30px 4px 26px 4px 30px;
        grid-template-areas:
          "footer    footer     .       header       header  header  title   title   title   title   .      side"
          "footer    footer     .       header       header  header  .       .       .       .       .      side"
          "${graph}  actionborder actionborder       actionborder .       content content content content content .      side"
          "grid      actionborder actionborder       actionborder .       content content content content content .      side"
          "grid      rooms        rooms       rooms        .       content content content content content .      side"
          "grid      rooms        rooms       rooms        .       .       .       .       .       .       .      side"
          "grid      rooms        rooms       rooms        .       .       .       .       corner  corner  corner corner"
          "grid      .          .       .            .       .       .       .       corner  corner  corner corner"
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
          background: ${color2};
          order:1;
          border-radius: 15px 0px 0px 15px;

        }
        .grid{
          align-content: space-between;
          ${showGraph==false?"margin-top: -16px;":""}
        }
        .graph{
          margin-top: -33px;
          border-top-right-radius: 35px;
        }
    }
    `;
  }

  css_mobile_new(color1, color2, color3, color4, contentHeigth = "1.3fr", showGraph = true) {
    const graph = showGraph == true ? 'graph' : 'grid';
    return `
    :host{
      background: black;
      overflow: hidden;
    }
    .room {
        height: 100%;
        width: 100%;
        max-height: ${this._dc.absolute_fullscreen==false?"calc(100vh - var(--header-height))":"100vh"};
        margin: 0px 0px 0px 0px;  
        background: black;

        /*testen ob es probleme verursacht!!*/
        /*position: fixed;*/
        ${this._dc.absolute_fullscreen==false?"":"position: fixed;"}
        padding: 0px 0px 0px calc(env(safe-area-inset-left) / 2);

        top:0px;
        
        left:0px;

      display: grid;
      overflow: hidden;
      grid-template-columns:
        30px          50px         6px    1fr     1fr     6px     24px    20px   4px     10px;
      grid-template-rows: 0.7fr 0.3fr 22px 8px 4px 8px 22px ${contentHeigth} 30px 30px;
      gap: 0px 0px;
      grid-auto-flow: row;
      grid-template-areas:
        "infoborder   ${graph}     ${graph}  ${graph}   ${graph}   ${graph}   ${graph}   ${graph}   .      side"
        "infoborder   grid         grid      grid       grid       grid       grid       grid       .      side"
        "footer       footer       footer    footer     .          .          .          .          .      side"
        "footer       footer       footer    footer     title      title      title      title      .      side"
        ".            .            .         .          title      title      title      title      .      side"
        "header       header       header    header     title      title      title      title      .      side"
        "header       header       header    header     .          .          .          .          .      side"
        "actionborder actionborder .         content    content    content    content    content    .      side"
        "rooms        rooms        .         .          .          .          corner     corner     corner corner"
        "rooms        rooms        .         buttons    buttons    .          corner     corner     corner corner";
    }

    .rooms{
        grid-area: rooms;
        background-color: ${color3};
    }

    .side{
        grid-area: side;
        background-color: ${color2};
    }

    .side { grid-area: side; }

    .corner { grid-area: corner; z-index: 1; }

    .content { grid-area: content; z-index: 90; }

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
      align-content: flex-end;
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
        gap: 6px;
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
        background-color: ${color4};
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
      border-top: 10px solid ${color2};
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
        margin-top: -15px;
        margin-bottom: -20px;
        z-index: 1;
        border-top-left-radius: 20px;
        border-bottom-right-radius: 20px;
        overflow: auto;
        display: flex;
        flex-direction: column;
        gap: 6px;
    }
    .content>.power{
        display:flex;
        flex-wrap: wrap;
        gap: 6px;

    }
    .content>.power>*{
        flex-basis: 135px;
      flex-grow: 1;
      flex-shrink: 1;
      height: 45px !important;
      
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
        background-color: ${color4};
        border-bottom-left-radius: 50px;
        position: relative;
    }
    
    .header{
        grid-area: header;
        background-color: ${color2};
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
          background-color: ${color2};
      }
    .title>span{
        font-family: 'Antonio', monospace, Arial, sans-serif;
        text-transform: uppercase;
        font-size: 22px;
        line-height: 20px;
        padding: 0px 4px 1px 4px;
    }
    .title>.end{
        height: 100%;
        background-color: ${color1};
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
    `;
  }

  setupLayout(type="control") {
    //------------------------------------------------------------------
    //rooms
    this._addCard(".rooms", 'bubble-card',
      "rooms",
      lcars_bubble_square_nav(this._config.basepath + "/floor-" + this._config.floor_id, "Räume",{...this._dc,colorblind: false}, this.em.color3),
      null,
      false
    );

    //------------------------------------------------------------------


    //------------------------------------------------------------------

    this._addCard(".corner", "bubble-card", "corner", lcars_bubble_elbow(this.em.redAlert,{ top_left: 0, top_right: 0, bottom_right: 50, bottom_left: 0 }, { top: 0, right: 10, bottom: 30, left: 0 },"#cc0000",this.em.color2), this.em.redAlert);
    
    //------------------------------------------------------------------
    //corner side
    this._addCard(".side", "bubble-card", "side", lcars_bubble_elbow(this.em.redAlert,{ top_left: 0, top_right: 0, bottom_right: 0, bottom_left: 0 }, { top: 0, right: 10, bottom: 0, left: 0 },"#cc0000",this.em.color2), this.em.redAlert);

    //------------------------------------------------------------------
    //alert buttons
    this._addCard(".buttons", 'bubble-card', "buttonb", lcars_bubble_square(this.em.yellowAlert,this._dc, this.em.color2, this.em.yellowAlertColor,false,"30px","12px",this.em.color2), this.em.yellowAlert);
    this._addCard(".buttons", 'bubble-card', "buttona", lcars_bubble_square(this.em.redAlert,this._dc, this.em.color2, this.em.redAlertColor,false,"30px","12px",this.em.color2), this.em.redAlert);


    //------------------------------------------------------------------
    //Navigation

    [
      {
        label: "Control",
        target: this._config.basepath + "/" + this._config.area_id,
        color: type=="control"?this.em.color1:this.em.color3
      },
      {
        label: "Config",
        target: this._config.basepath + "/" + this._config.area_id + "-config",
        color: type=="config"?this.em.color1:this.em.color3
      },
      {
        label: "Statistik",
        target: this._config.basepath + "/" + this._config.area_id + "-stats",
        color: type=="stats"?this.em.color1:this.em.color3
      },
      {
        label: "All",
        target: this._config.basepath + "/" + this._config.area_id + "-all",
        color: type=="all"?this.em.color1:this.em.color3
      },
    ].forEach(e => {
      this._addCard(".actionborder", 'bubble-card', `actionborder${e.label}`, lcars_bubble_square_nav(e.target, e.label,{...this._dc,colorblind: false}, e.color), null, false);
    });


  }
}