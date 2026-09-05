export function lcars_bubble_seperator(name,color="green", border=true, icon=false, height=25){

let borderWidth = "15px";
if (border==false) {
  borderWidth = "0px";
}


    return {
  "type": "custom:bubble-card",
  "card_type": "button",
  "button_type": "name",
  "name": name,
  "styles": `
  *{
  
    --stated-color: ${color};
    --mdc-icon-size: ${height}px !important;
    --primary-text-color: var(--stated-color);
  
    
    --bubble-icon-color: var(--stated-color);
    --bubble-button-main-background-color: transparent;
    --bubble-sub-button-background-color: violet;
    
    --ha-font-family-body: 'Antonio', monospace, Arial, sans-serif;
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
    font-family: 'Antonio', monospace, Arial, sans-serif;
    font-weight: bold;
    font-size: ${(height+0)}px;
    margin-top: -4px
  }
  .bubble-name-container{
  line-height: ${(height+2)}px;
  margin: 0px 4px 0px 0px;
  align-items: flex-end;
  height: 100%;
  }
  .bubble-name{
  font-size: ${(height+1)}px;
      font-family: 'Antonio', monospace, Arial, sans-serif;
      position: absolute;
      margin-top: -2px;

  }
  
  
  `,
  "show_state": true,
  "show_name": true,
  "scrolling_effect": true,
  "force_icon": false,
  "sub_button": {
    "main": [],
    "bottom": []
  },
  "show_icon": icon
};
}