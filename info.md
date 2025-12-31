# AT LCARS Dashboard Strategy

voll automatische LCARS dashboards

Todo: configuration beschreiben

## Features

- sieht verdammt noch mal aus wie LCARS

## Installation

Nach der Installation über HACS:

1. Füge in deiner `configuration.yaml` hinzu:
   ```yaml
   lovelace:
     mode: storage
     resources:
       - url: /local/at-lcars-strategy/simon42-strategies-loader.js
         type: module
   ```

2. Erstelle ein neues Dashboard mit der Strategy:
   ```yaml
   strategy:
     type: custom:at-lcars-dashboard
   ```

Für detaillierte Anweisungen siehe das README.