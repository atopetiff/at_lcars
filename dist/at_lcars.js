// ====================================================================
// at_lcars DASHBOARD STRATEGIES - LOADER (MIT REAKTIVEN GROUP-CARDS)
// ====================================================================
// Diese Datei lädt alle Strategy-Module inklusive der neuen reaktiven
// Lights Group Cards
// 
// Installation in Home Assistant:
// 1. Alle Dateien in /config/www/at_lcars-strategy/ speichern
// 2. In configuration.yaml hinzufügen:
//    lovelace:
//      resources:
//        - url: /local/at_lcars-strategy/at_lcars-strategies-loader.js
//          type: module
// 3. Home Assistant neu starten
// 
// Verwendung im Dashboard:
// strategy:
//   type: custom:at_lcars-dashboard
// ====================================================================

// Lade Helper-Funktionen
import './utils/at_lcars-helpers.js';
import './utils/at_lcars-data-collectors.js';
import './utils/at_lcars-badge-builder.js';
import './utils/at_lcars-section-builder.js';
import './utils/at_lcars-view-builder.js';
import './utils/lcars-borders.js';

// Lade Custom Cards

import './cards/lcars-cover.js'; 
import './cards/lcars-protokolle.js'; 
import './cards/lcars-house.js'; 
import './cards/lcars-floor.js'; 
import './cards/lcars-room.js'; 
import './cards/lcars-room-config.js'; 
import './cards/lcars-room-all.js'; 
import './cards/lcars-room-stats.js'; 

// Lade Core-Module
import './core/at_lcars-dashboard-strategy.js';

// // Lade View-Module
import './views/lcars-view-room.js';
import './views/lcars-view-room-config.js';
import './views/lcars-view-room-all.js';
import './views/lcars-view-floor.js';


//console.log('AT LCARS loaded successfully');
