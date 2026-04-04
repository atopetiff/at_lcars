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
    {
        name: "show_battery_warn",
        title: "Batterie Warnung anzeigen",
        description: "Sollen Batterien Warnung unterhalb Batterie Warn Wert in der Raumansicht angezeigt werden",
        typ: "checkbox",
        default: true,
        dependencies: [
        ],
        depsFailValue: true
    },
    {
        name: "show_battery_value",
        title: "Batterie Warn Wert",
        description: "unterhalb dieser schwelle werden Entities mit dem label 'Battery' angezeigt",
        typ: "number",
        default: 30,
        dependencies: [
        ],
        depsFailValue: 30
    },
    {
        name: "show_battery_on_top",
        title: "Batterie Warnung oben",
        description: "Batterie Warnung über Räumen anzeigen. defaults to false",
        typ: "checkbox",
        default: false,
        dependencies: [
        ],
        depsFailValue: false
    },
    {
        name: "absolute_fullscreen",
        title: "Absoluter Fullscreen",
        description: "verwendet fixed für die Anzeigen sodas keine weiter anzeigen möglich sind",
        typ: "checkbox",
        default: true,
        dependencies: [
        ],
        depsFailValue: true
    },
];