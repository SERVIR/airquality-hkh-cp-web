<template>
  <div class="app-header-nav d-flex" :class="{ mobile: props.isMobile }">
    <v-btn :to="localePath({ path: '/' })" variant="text" color="white" size="large">
      {{ $t("dictionary.home") }}
    </v-btn>
    <v-btn :to="localePath({ path: '/emission' })" variant="text" color="white" size="large">
      {{ $t("dictionary.emission") }}
    </v-btn>
    <v-btn :to="localePath({ path: '/about' })" variant="text" color="white" size="large">
      {{ $t("dictionary.about") }}
    </v-btn>

    <v-menu v-model="isLanguageMenuOpen" min-width="100">
      <template #activator="{ props }">
        <v-btn
          class="language-btn"
          v-bind="props"
          variant="text"
          color="white"
          prepend-icon="mdi-earth"
          :append-icon="isLanguageMenuOpen ? 'mdi-chevron-up' : 'mdi-chevron-down'"
          size="large"
        >
          {{ selectedLanguage }}
        </v-btn>
      </template>

      <v-list>
        <v-list-item
          v-for="language in ['en', 'ne']"
          :key="language"
          :title="language.toUpperCase()"
          :active="selectedLanguage === language"
          color="primary"
          min-height="36"
          @click="onLanguageChange(language)"
        />
      </v-list>
    </v-menu>
  </div>
</template>

<script setup>
const props = defineProps({
  isMobile: { type: Boolean },
});

const $i18n = useI18n();
const switchLocalePath = useSwitchLocalePath();
const localePath = useLocalePath();
const selectedLanguage = ref($i18n.locale?.value || "en");
const isLanguageMenuOpen = ref(false);

const onLanguageChange = (language) => {
  selectedLanguage.value = language;
  navigateTo(switchLocalePath(language));
};
</script>

<style lang="scss">
.app-header-nav {
  gap: 8px;

  &.mobile {
    flex-direction: column;
    margin-top: 16px;
  }

  .v-btn {
    justify-content: flex-start;
  }

  .language-btn {
    .v-btn__prepend {
      margin-right: 4px;
    }
    span.v-btn__content {
      text-transform: uppercase;
    }
    .v-btn__append {
      margin-left: 2px;
    }
  }
}
</style>
