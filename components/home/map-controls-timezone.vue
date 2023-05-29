<template>
  <div class="map-controls-timezone d-flex justify-space-between align-center px-4">
    <div>{{ $t("dictionary.date") + (sharedState.tabId === TAB_ID_RECENT ? " " + $t("map.last24Hrs") : "") }}</div>
    <v-autocomplete
      :model-value="sharedState.timezone"
      class="timezone-autocomplete"
      :items="timezones"
      :menu-props="{ contentClass: 'timezone-autocomplete-menu', location: 'bottom left' }"
      density="compact"
      variant="outlined"
      hide-details
      @update:model-value="updateTimezone"
    />
  </div>
</template>

<script setup>
import { TAB_ID_RECENT } from "@/data/tabs";
import moment from "moment-timezone";

const sharedState = inject("sharedState");
const timezoneCookie = useCookie("timezone");
sharedState.timezone = timezoneCookie.value || "UTC";

const pinnedTimezons = ["UTC", "Asia/Kathmandu", "Asia/Kolkata"];
const timezones = [...pinnedTimezons, ...moment.tz.names().filter((t) => !pinnedTimezons.includes(t))].slice(0, 30);

const updateTimezone = (tz) => {
  sharedState.timezone = tz;
  timezoneCookie.value = tz;
};
</script>

<style lang="scss">
.map-controls-timezone {
  font-size: 14px;
}

.timezone-autocomplete {
  max-width: 170px;

  .v-field {
    height: 24px;

    .v-field__field {
      height: 24px;

      .v-field__input {
        padding-top: 0px;
        min-height: 24px;
        height: 24px;

        .v-autocomplete__selection-text,
        input {
          font-size: 14px;
        }
      }
    }
    .v-field__append-inner {
      padding-top: 0px;
    }
  }
}

.timezone-autocomplete-menu {
  .v-list {
    .v-list-item {
      min-height: 28px;
    }
  }
}
</style>
