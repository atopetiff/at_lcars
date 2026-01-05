export function stats_climate(climate, temperature, humidity, trvs, outside_sun, outside_shadow) {

  var entities = [];

  if (!!trvs) {
    entities= trvs.map(t=>{
      return {
      entity: t,
      attribute: "temperature",
      yaxis: "y9",
      line: {
        color: "#ff4444",
        width: 2
      },
      show_value: true
    }
    });
  }

  if (!!climate) {
    entities.push({
        entity: climate,
        attribute: "temperature",
        line: {
          color: "#22bb22",
          width: 2
        },
        yaxis: "y9",
        show_value: true
      });
  }
  if (!!temperature) {
    entities.push( {
        entity: temperature,
        line: {
          color: "orange",
          width: 3
        },
        yaxis: "y9",
        show_value: true
      });
  }
  if (!!humidity) {
    entities.push({
        entity: humidity,
        yaxis: "y1",
        statistic: "mean",
        period: "auto",
        line: {
          color: "#09f",
          width: 3
        },
        show_value: true
      });
  }
  if (!!outside_sun) {
    entities.push({
        entity: outside_sun,
        yaxis: "y9",
        fill: "tozeroy",
        line: {
          color: "#44aaff"
        }
      });
  }
  if (!!outside_shadow) {
    entities.push({
        entity: outside_shadow,
        yaxis: "y9",
        fill: "tozeroy",
        line: {
          color: "#0000ff"
        },
        show_value: true
      });
  }

  return {
    type: "custom:plotly-graph",
    entities: [
      ...entities,
      {
        entity: "",
        name: "Now",
        yaxis: "y1",
        showlegend: false,
        line: {
          width: 1,
          dash: "dot",
          color: "deepskyblue"
        },
        x: "$ex [Date.now()-1, Date.now()-1]",
        y: [
          45,
          55
        ]
      },
      {
        entity: "",
        name: "Now",
        yaxis: "y9",
        showlegend: false,
        line: {
          width: 1,
          dash: "dot",
          color: "deepskyblue"
        },
        x: "$ex [Date.now()-1, Date.now()-1]",
        y: [
          0,
          35
        ]
      }
    ],
    refresh_interval: 10,
    title: "Climate",
    hours_to_show: 12,
    layout: {
      yaxis: {
        visible: true,
        fixedrange: true
      },
      yaxis9: {
        visible: true,
        fixedrange: true
      },
      xaxis: {
        rangeselector: {
          y: 1.2,
          buttons: [
            {
              count: 1,
              step: "minute"
            },
            {
              count: 1,
              step: "hour"
            },
            {
              count: 12,
              step: "hour"
            },
            {
              count: 1,
              step: "day"
            },
            {
              count: 7,
              step: "day"
            }
          ]
        }
      }
    }
  };

}

export function stats_batteries(batteries){

return  {
  type: "custom:plotly-graph",
  entities: [
    ...batteries.map(b=>{
      return  {
        entity: b,
        yaxis: "y1",
        line: {
          width: 1
        },
        show_value: true
      };
    }),
    {
      entity: "",
      name: "Now",
      yaxis: "y1",
      showlegend: false,
      line: {
        width: 1,
        dash: "dot",
        color: "deepskyblue"
      },
      x: "$ex [Date.now()-1, Date.now()-1]",
      y: [
        0,
        100
      ]
    }
  ],
  refresh_interval: 10,
  hours_to_show: 120,
  layout: {
    yaxis: {
      visible: true,
      fixedrange: true
    },
    xaxis: {
      rangeselector: {
        y: 1.2,
        buttons: [
          {
            count: 1,
            step: "minute"
          },
          {
            count: 1,
            step: "hour"
          },
          {
            count: 12,
            step: "hour"
          },
          {
            count: 1,
            step: "day"
          },
          {
            count: 7,
            step: "day"
          },
          {
            count: 1,
            step: "month"
          }
        ]
      }
    }
  }
}
}