import Vue from "vue";
import App from "./App.vue";

import * as Sentry from "@sentry/vue";
import { Integrations, extractTraceparentData } from "@sentry/tracing";

Vue.config.productionTip = false;

Sentry.init({
  debug: true,
  dsn: process.env.VUE_APP_SENTRY_DSN,
  integrations: [
    new Integrations.BrowserTracing({
      beforeNavigate: (ctx) => {
        if (ctx.op === "pageload") {
          const queryParams = location.search.substr(1).split("&");
          const traceparentData = extractTraceparentData(queryParams[0].split("=")[1]);
          console.log(traceparentData);
          return { ...ctx, ...traceparentData };
        }
        return ctx;
      },
    }),
  ],

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
