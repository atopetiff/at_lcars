export function lcars_bubble_info(e,on="green",off="grey", border=true, icon=true, height=25){
let color = "white";
if (e.labels.map(l=>l.toLowerCase()).includes("temperatur")) {
    color = "${state > 0 ? (state>10?(state>15?(state>18?(state>21?(state>25?'#c00000ff':'#ff9d00ff'):'#009e00ff'):'#fff311ff'):'#ffff80ff'):'#5555ff') : '#aaaaff'}";
}else if (e.labels.map(l=>l.toLowerCase()).includes("luftfeuchte")) {
    color = "${state > 0? (state > 40? (state > 50?(state > 55?(state > 57?(state > 61?(state > 70?'#004cffff':'#00ffb7ff'):'#00cd85ff'):'#00bd00ff'):'#a6d400ff'):'#ff920dff'):'#b00000ff') :'#716d30ff'}"
} else if (e.labels.map(l=>l.toLowerCase()).includes("okwhenon")) {
    color = "${state == 'on' ? '"+on+"' : '"+off+"'}";
}else if (e.labels.map(l=>l.toLowerCase()).includes("fenster")) {
    color = "${state == 'off' ? '"+on+"' : '#cc0000'}";
}
else if (e.labels.map(l=>l.toLowerCase()).includes("okwhenoff")) {
    color = "${state == 'off' ? '"+on+"' : '"+off+"'}";
}
let borderWidth = "15px";
if (border==false) {
  borderWidth = "0px";
}


    return {
  "type": "custom:bubble-card",
  "card_type": "button",
  "button_type": "state",
  "entity": e.entity_id,
  "styles": `
  *{
  
    --stated-color: ${color};
    --mdc-icon-size: ${height}px !important;
    --primary-text-color: var(--stated-color);
  
    
    --bubble-icon-color: var(--stated-color);
    --bubble-button-main-background-color: transparent;
    --bubble-sub-button-background-color: violet;
    
    --ha-font-family-body: 'Antonio', Arial, sans-serif;
    --bubble-button-icon-background-color: transparent;
    text-transform: uppercase;
    box-sizing: border-box
  }
  .bubble-range-fill{
    border-right: 4px solid black;
      box-sizing: padding-box;
  }
  .bubble-icon-container, .large.bubble-icon-container{
  margin: 0px !important;
  min-width: 15px !important;
  min-height: ${height-2}px !important;
  
  }
  
  .bubble-sub-button-container{
  right: 0px; 
  }
  .bubble-container{
    border: unset;
    border-left: ${borderWidth} solid var(--stated-color);
    border-right: ${borderWidth} solid var(--stated-color);
    height: ${height}px !important;
  }
  .bubble-sub-button{
  padding: 0 4px
  }
  .bubble-state, .bubble-sub-button-name-container{
    font-family: 'Antonio', Arial, sans-serif;
    font-weight: bold;
    font-size: ${(height+0)}px;
    margin-top: -4px
  }
  .bubble-name-container{
  line-height: ${(height+2)}px;
  margin: 0px 4px 0px 0px;
  align-items: flex-end;
  }
  
  `,
  "show_state": true,
  "show_name": false,
  "scrolling_effect": true,
  "force_icon": false,
  "sub_button": {
    "main": [],
    "bottom": []
  },
  "show_icon": icon
};
}