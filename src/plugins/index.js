/**
 * plugins/index.ts
 *
 * Automatically included in `./src/main.ts`
 */

// Plugins
import { loadFonts } from './webfontloader';
import vuetify from './vuetify';
const pinia = createPinia();
import router from '../router';

// Types
import { createPinia } from 'pinia';

export function registerPlugins (app) {
  loadFonts();
  app
    .use(vuetify)
    .use(router)
    .use(pinia);
}
