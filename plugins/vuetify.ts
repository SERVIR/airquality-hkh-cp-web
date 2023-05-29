import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

const defaultTheme = {
  dark: false,
  colors: {
    primary: "#036cb6",
  },
};

export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
    components,
    directives,
    theme: {
      defaultTheme: "defaultTheme",
      themes: {
        defaultTheme,
      },
    },
  });

  nuxtApp.vueApp.use(vuetify);
});
