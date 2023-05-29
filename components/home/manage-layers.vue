<template>
  <v-dialog v-model="isDialogOpen" scrollable width="420">
    <template #activator="{ props }">
      <v-btn class="font-weight-bold" prepend-icon="mdi-layers" variant="text" v-bind="props">
        {{ $t("layers.manageLayers") }}
      </v-btn>
    </template>

    <v-card>
      <v-card-title>{{ $t("layers.manageLayers") }}</v-card-title>

      <v-card-text>
        <v-text-field
          v-model="search"
          variant="outlined"
          prepend-inner-icon="mdi-magnify"
          density="compact"
          :label="$t('layers.searchLayers')"
          clearable
          :error-messages="filteredLayers.length == 0 ? $t('layers.noLayersFound') : ''"
          @click:clear="search = ''"
        />

        <div style="height: 300px; overflow-y: auto">
          <v-checkbox
            v-for="layer in filteredLayers"
            :key="layer.name"
            v-model="selectedLayerNames"
            :value="layer.name"
            :label="layer.name"
            :disabled="!selectedLayerNames.includes(layer.name) && selectedLayerNames.length == 4"
            hide-details
            color="primary"
            density="compact"
          />
        </div>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn variant="text" @click="isDialogOpen = false">{{ $t("dictionary.close") }}</v-btn>
        <v-btn color="primary" @click="onApply">{{ $t("dictionary.apply") }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
const sharedState = inject("sharedState");
const isDialogOpen = ref(false);
const search = ref("");
const selectedLayerNames = ref([]);
const tabLayers = computed(() => sharedState.layers.filter((layer) => layer.tabId === sharedState.tabId));

const filteredLayers = computed(() =>
  tabLayers.value.filter((layer) => layer.name.toLowerCase().includes(search.value.toLowerCase()))
);

watch(
  () => sharedState.tabId,
  () => (selectedLayerNames.value = tabLayers.value.filter((layer) => layer.selected).map((layer) => layer.name)),
  { immediate: true }
);

const onApply = () => {
  tabLayers.value.forEach((layer) => (layer.selected = selectedLayerNames.value.includes(layer.name)));
  isDialogOpen.value = false;
};
</script>

<style lang="scss"></style>
