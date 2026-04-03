export const LcarsOptions = [
     {
        name: "colorblind",
        title: "Farbenblinden Modus",
        description: "vereinfacht Farbdarstellung um Farbfehlsichtigkeiten auszugleichen",
        typ: "checkbox",
        default: false,
        dependencies: [
        ],
        depsFailValue: false
    },
     {
        name: "use_mini_graph_card",
        title: "Mini graph Karte verwenden",
        description: "Übersicht Temperatur und Heizung in Raum",
        typ: "checkbox",
        default: false,
        dependencies: [
            "mini-graph-card"
        ],
        depsFailValue: false
    },
    {
        name: "use_slider_button_card",
        title: "SliderButton Card verwenden",
        description: "Für Rollo in Raum ansicht",
        typ: "checkbox",
        default: false,
        dependencies: [
            "slider-button-card"
        ],
        depsFailValue: false
    },
    {
        name: "use_scheduler_card",
        title: "Scheduler Card verwenden",
        description: "Scheduler Card in der Config Ansicht anzeigen",
        typ: "checkbox",
        default: false,
        dependencies: [
            
        ],
        depsFailValue: false
    },
    {
        name: "use_plotly_card",
        title: "Plotly Graph Card verwenden",
        description: "Ploty Card in der Statistik Ansicht anzeigen",
        typ: "checkbox",
        default: false,
        dependencies: [
        ],
        depsFailValue: false
    },
    
];