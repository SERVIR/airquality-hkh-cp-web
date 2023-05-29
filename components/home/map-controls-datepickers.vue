<template>
  <div class="home-map-controls-tab-datepickers px-4">
    <div class="date-control" v-for="dateKey in ['startDate', 'endDate']" :key="dateKey">
      <div class="date-control-title" v-text="$t(`map.${dateKey}`)" />
      <v-menu v-model="dateMenuModel[dateKey]" location="bottom right">
        <template #activator="{ props }">
          <v-btn
            v-bind="isRecent ? {} : props"
            :class="{ 'date-control-recent': isRecent }"
            :active="isRecent ? false : null"
            :variant="isRecent ? 'text' : 'outlined'"
            :ripple="!isRecent"
            :prepend-icon="isRecent ? '' : 'mdi-calendar'"
            density="compact"
          >
            {{ displayDates[dateKey] }}
          </v-btn>
        </template>
        <Datepicker
          :model-value="dates[dateKey]"
          :format="vuepicDatepickerFormat"
          :is24="false"
          :min-date="dateKey == 'endDate' ? dates.startDate : null"
          inline
          @update:model-value="onDateUpdate(dateKey, $event)"
        />
      </v-menu>
    </div>
  </div>
</template>

<script setup>
import { TAB_ID_RECENT, TABS } from "@/data/tabs";
import { utcDateStrToTimzezoneTimestamp, jsDateToUtcStr, FORMAT_DATETIME_AMPM } from "@/utils/date-utils";
import moment from "moment-timezone";
import Datepicker from "@vuepic/vue-datepicker";

const sharedState = inject("sharedState");
const isRecent = computed(() => sharedState.tabId === TAB_ID_RECENT);
const vuepicDatepickerFormat = "yyyy-MM-dd HH:mm a";
const displayDateFormat = "YYYY-MM-DD HH:mm A";
const dates = ref({
  startDate: "",
  endDate: "",
});
const displayDates = computed(() => ({
  startDate: dates.value.startDate ? moment(dates.value.startDate, FORMAT_DATETIME_AMPM).format(displayDateFormat) : "",
  endDate: dates.value.endDate ? moment(dates.value.endDate, FORMAT_DATETIME_AMPM).format(displayDateFormat) : "",
}));
const dateMenuModel = ref({
  startDate: false,
  endDate: false,
});

watch(
  () => ({
    startDate: sharedState.startDate,
    endDate: sharedState.endDate,
    timezone: sharedState.timezone,
  }),
  ({ timezone }) => {
    dates.value.startDate = utcDateStrToTimzezoneTimestamp(sharedState.startDate, timezone);
    dates.value.endDate = utcDateStrToTimzezoneTimestamp(sharedState.endDate, timezone);
  },
  { immediate: true, deep: true }
);

const onDateUpdate = (dateKey, date) => {
  dates.value[dateKey] = date;
  dateMenuModel.value[dateKey] = false;
  sharedState[dateKey] = jsDateToUtcStr(date, sharedState.timezone);
};
</script>

<style lang="scss">
@import "@vuepic/vue-datepicker/dist/main.css";

$datepickerColor: rgb(171 171 171);

.home-map-controls-tab-datepickers {
  font-size: 14px;

  .date-control {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 4px;
    height: 26px;

    .date-control-title {
      width: 92px;
    }

    .v-btn {
      width: 170px;
      border-color: $datepickerColor;

      &.date-control-recent {
        padding: 0px;
        justify-content: flex-start;
      }

      .v-btn__prepend {
        i {
          color: $datepickerColor;
        }
      }

      .v-btn__content {
        font-weight: 500;
      }
    }
  }
}

.dp__instance_calendar {
  font-size: 14px;

  .dp__calendar_row {
    margin: 0px;

    .dp__cell_inner {
      padding: 4px;
    }
  }
}
.dp__input {
  padding-top: 0px;
  padding-bottom: 0px;
  padding-right: 24px;
  font-size: 13px;
}
.dp__selection_preview {
  display: none;
}
.dp__action_buttons {
  display: flex;
  justify-content: space-around;
  width: 100%;
}
</style>
