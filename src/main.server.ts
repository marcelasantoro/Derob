import 'zone.js/node'; // zone para o lado do servidor (SSR)

import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app';
import { appConfig } from './app/app.config';

/**
 * Angular (com o builder atual) espera um "default export" que
 * seja uma função que faça o bootstrap da aplicação no server.
 */
export default function bootstrap() {
  return bootstrapApplication(App, appConfig);
}
