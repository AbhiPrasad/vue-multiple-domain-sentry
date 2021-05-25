import Vue from "vue";
import App from "./App.vue";

import * as Sentry from "@sentry/vue";
import { Integrations } from "@sentry/tracing";

Vue.config.productionTip = false;

Sentry.init({
  debug: true,
  dsn: process.env.VUE_APP_SENTRY_DSN,
  integrations: [new Integrations.BrowserTracing()],

  // We recommend adjusting this value in production, or using tracesSampler
  // for finer control
  tracesSampleRate: 1.0,
  Vue,
  tracingOptions: {
    trackComponents: true,
  },
});

new Vue({
  render: (h) => h(App),
}).$mount("#app");
