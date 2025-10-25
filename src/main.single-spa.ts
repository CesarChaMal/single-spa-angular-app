
import { enableProdMode, NgZone } from '@angular/core';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { Router } from '@angular/router';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import singleSpaAngular from 'single-spa-angular';
import { singleSpaPropsSubject } from './single-spa/single-spa-props';

if (environment.production) {
  enableProdMode();
}

const lifecycles = singleSpaAngular({
  bootstrapFunction: singleSpaProps => {
    singleSpaPropsSubject.next(singleSpaProps);
    return platformBrowserDynamic().bootstrapModule(AppModule);
  },
  template: '<app-root />',
  Router,
  NgZone,
  domElementGetter: () => document.getElementById('angular-app')
});

export const bootstrap = lifecycles.bootstrap;
export const mount = (props: any) => {
  console.log('🅰️ Angular App mounted');
  return (lifecycles.mount as any)(props);
};
export const unmount = (props: any) => {
  console.log('🅰️ Angular App unmounted');
  return (lifecycles.unmount as any)(props);
};

export default {
  bootstrap,
  mount,
  unmount,
};
