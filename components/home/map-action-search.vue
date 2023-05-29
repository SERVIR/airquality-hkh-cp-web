<template>
  <v-menu v-model="isMenuOpen" location="end" :close-on-content-click="false">
    <template #activator="{ props }">
      <map-action icon="mdi mdi-magnify" style="top: 80px" v-bind="props" />
    </template>

    <div class="map-search-content">
      <!-- Search Activator -->
      <div class="d-flex">
        <v-text-field
          v-model="search"
          density="compact"
          variant="plain"
          :placeholder="$t('dictionary.search')"
          bg-color="white"
          hide-details
          autofocus
          @keyup.enter="performSearch"
        />
        <v-btn color="primary" dark :loading="searchLoading" @click="performSearch">Search</v-btn>
      </div>

      <!-- Search Menu -->
      <v-sheet v-if="showResult" elevation="6" class="map-search-results">
        <div v-if="!searchResults.length" class="d-flex justify-center align-center">
          {{ $t("map.search.emptySearchResultMessage") }}
        </div>
        <v-list density="compact">
          <v-list-item
            v-for="(searchResult, index) in searchResults"
            :key="index"
            :title="searchResult.display_name"
            :subtitle="`${searchResult.class} - ${searchResult.type}`"
            @click="onSearchResultItemClick(searchResult)"
          ></v-list-item>
        </v-list>
      </v-sheet>
    </div>
  </v-menu>

  <v-dialog v-model="isAddNewLocationPopupOpen" :width="320">
    <v-card style="">
      <v-card-title>
        <span class="text-h5">Add new location</span>
      </v-card-title>
      <v-card-item>
        <v-text-field v-model="newLocationName" label="Location Name" />
      </v-card-item>
      <v-card-actions>
        <v-spacer />
        <v-btn @click="isAddNewLocationPopupOpen = false">Cancel</v-btn>
        <v-btn color="primary" @click="saveNewLocation">Add</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <v-snackbar v-model="showSnackbar" location="top">
    {{ $t("map.addLocationSuccessMessage") }}
    <template #actions>
      <v-btn color="success" class="text-white" variant="text" @click="showSnackbar = false">
        {{ $t("dictionary.close") }}
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script setup>
import axios from "axios";

const sharedState = inject("sharedState");
const props = defineProps({
  addSearchedLocationMarker: Function,
});
const isMenuOpen = ref(false);

// Search
const search = ref("");
const searchLoading = ref(false);
const performSearch = async () => {
  searchResults.value = [];
  showResult.value = false;
  searchLoading.value = true;
  const url = `https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&q=${search.value}&polygon_geojson=0&bounded=0&limit=10`;
  const response = await axios.get(url);
  searchResults.value = response.data;
  searchLoading.value = false;
  showResult.value = true;
};

// Search Result
const searchResults = ref([]);
const showResult = ref(false);
const onSearchResultItemClick = (searchResult) => {
  const latlng = {
    lat: parseFloat(searchResult.lat),
    lng: parseFloat(searchResult.lon),
  };

  props.addSearchedLocationMarker({
    latlng,
    onClick: () => openAddLocationDialog(latlng, searchResult.address.city),
  });

  isMenuOpen.value = false;
  showResult.value = false;
  search.value = "";
  searchResults.value = [];
};

// Add location
const showSnackbar = ref(false);
const isAddNewLocationPopupOpen = ref(false);
const newLocationName = ref("");
const newLocationLatLng = ref(null);

const openAddLocationDialog = (latlng, name) => {
  isAddNewLocationPopupOpen.value = true;
  newLocationName.value = name;
  newLocationLatLng.value = latlng;
};

const saveNewLocation = () => {
  if (!sharedState.locations.find((l) => l.name == newLocationName.value)) {
    sharedState.locations.push({
      id: Math.max(...sharedState.locations.map((l) => l.id)) + 1,
      name: newLocationName.value,
      ...newLocationLatLng.value,
      selected: false,
      show: true,
      color: "",
    });
  }

  showSnackbar.value = true;
  isAddNewLocationPopupOpen.value = false;
};

watch(
  () => search.value,
  () => {
    searchResults.value = [];
    showResult.value = false;
  }
);
</script>

<style lang="scss">
.map-search-content {
  .v-text-field {
    width: 260px;
    height: 30px;
    border: 2px solid #c0beb8;
    margin-left: -2px;

    .v-field__input {
      margin-top: 2px;
      padding: 1px 12px;
      font-size: 14px;
      min-height: 20px;
    }
  }
  .v-btn {
    margin-left: -2px;
    height: 29px;
    border-radius: 0px;

    .v-btn__content {
      color: white;
    }
    .v-progress-circular {
      color: white;
    }
  }
}

.map-search-results {
  width: 336px;
  max-height: 60vh;
  overflow: auto;
  background: white;
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 8px 0px;

  .map-search-result {
    padding: 0px 12px;
    display: flex;
    align-items: center;
    cursor: pointer;

    &:hover {
      background: lightgray;
    }

    .map-search-result-icon {
      width: 20px;
      height: 20px;
      margin-right: 12px;
    }

    .map-search-result-title {
      font-size: 14px;
    }
    .map-search-result-subtitle {
      font-style: italic;
      font-size: 13px;
      color: gray;
    }
  }
}
</style>
