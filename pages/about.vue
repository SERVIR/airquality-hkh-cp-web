<template>
  <v-container class="about-view px-6">
    <h2 class="text-center mt-8">{{ $t("about.title") }}</h2>
    <section class="mt-6">{{ $t("about.section_01") }}</section>

    <section class="mt-4">
      {{ $t("about.section_02.title") }}:
      <v-list>
        <v-list-item v-for="index in 6" :key="index" :title="$t(`about.section_02.list.item_${index}`)" />
      </v-list>
    </section>

    <section class="mt-4">
      {{ $t("about.section_03.title") }}:
      <v-list>
        <v-list-item v-for="index in 4" :key="index" :title="$t(`about.section_03.list.item_${index}`)" />
      </v-list>
    </section>

    <section class="mt-4">
      {{ $t("about.section_04.title") }}:
      <v-list>
        <v-list-item v-for="index in 4" :key="index" :title="$t(`about.section_04.list.item_${index}`)" />
      </v-list>
    </section>

    <section class="mt-4">{{ $t("about.section_05") }}</section>

    <section class="mt-4">
      {{ $t("about.section_06.title") }}:
      <v-list>
        <v-list-item v-for="index in 4" :key="index" :title="$t(`about.section_06.list.item_${index}`)" />
      </v-list>
    </section>

    <section class="mt-4">{{ $t("about.section_07") }}</section>

    <div class="datasource-container">
      <h3 class="mt-8">{{ $t("about.datasource.title") }}</h3>
      <section class="d-flex flex-wrap">
        <div class="datasource-wrapper">
          <label>Ground-based observation</label>
          <v-list>
            <about-list-item-link
              text="Atmospheric Department of Environment Nepal"
              link="https://pollution.gov.np/portal/#/home"
            />
            <about-list-item-link
              text="AirNow"
              link="https://www.airnow.gov/international/us-embassies-and-consulates/"
            />
          </v-list>
        </div>

        <div class="datasource-wrapper">
          <label>Satellite products</label>
          <v-list>
            <about-list-item-link text="MODIS" link="https://modis.gsfc.nasa.gov/data/" />
            <about-list-item-link text="TROPOMI" link="https://sentinel.esa.int/web/sentinel/sentinel-data-access" />
          </v-list>
        </div>

        <div class="datasource-wrapper">
          <label>Emission inventory</label>
          <v-list>
            <about-list-item-link text="REAS" link="https://www.nies.go.jp/REAS/" />
            <about-list-item-link text="EDGAR-HTAP" link="https://edgar.jrc.ec.europa.eu/dataset_htap_v2" />
            <about-list-item-link text="GAINS" link="https://gains.iiasa.ac.at/models/" />
          </v-list>
        </div>

        <div class="datasource-wrapper">
          <label>Air quality models</label>
          <v-list>
            <about-list-item-link
              text="GEOS-CF"
              link="https://gmao.gsfc.nasa.gov/weather_prediction/GEOS-CF/data_access/"
            />
          </v-list>
        </div>
      </section>
    </div>

    <div class="info-container d-flex mt-8">
      <div class="info-wrapper">
        <h3>Pollutants</h3>

        <div class="mb-3">
          <span class="pollutant">Particulate Pollutants:</span>
          <span>PM2.5, PM10, PM1, TSP, AOD</span>
        </div>

        <div>
          <span class="pollutant">Gaseous Pollutants:</span>
          <span>CO, NOx, SO2, O3</span>
        </div>
      </div>

      <div class="info-wrapper">
        <h3>{{ $t("about.categories.title") }}</h3>
        <div v-for="(_, index) in 4" :key="index">{{ $t(`about.categories.items[${index}]`) }}</div>
      </div>

      <div class="info-wrapper">
        <h3>{{ $t("about.contact.title") }}</h3>
        <div>{{ $t("about.contact.name") }}</div>
        <div>{{ $t("about.contact.designation") }}</div>
        <div>ICIMOD</div>
        <div>bhupesh.adhikary@icimod.org</div>
      </div>
    </div>

    <div class="disclaimer">
      <h3>{{ $t("about.disclaimer.title") }}</h3>
      <div>{{ $t("about.disclaimer.subTitle[0]") }}</div>
      <div>{{ $t("about.disclaimer.subTitle[1]") }}</div>
    </div>
  </v-container>
</template>

<script setup></script>

<style lang="scss">
.about-view {
  .v-list {
    padding-top: 2px;

    .v-list-item {
      min-height: 20px;

      .v-list-item-title {
        line-height: 20px;
      }
    }
  }

  .datasource-wrapper {
    flex: 1 0 50%;
    margin-top: 16px;

    label {
      font-weight: bold;
      color: #444;
    }
  }

  .info-wrapper {
    flex: 1 0 33%;

    &:first-child {
      flex-basis: 44%;
    }

    h3 {
      margin-bottom: 16px;
    }
  }

  .pollutant {
    font-weight: bold;
    color: #333;
    margin-right: 8px;
  }

  .disclaimer {
    margin: 64px auto;
    text-align: center;
  }
}

@media (min-width: 1920px) {
  .about-view {
    max-width: 1200px;
  }
}

@media (max-width: 920px) {
  .about-view {
    .datasource-container {
      text-align: center;

      .datasource-wrapper {
        flex-basis: 100%;
      }
    }
  }
}

@media (max-width: 1150px) {
  .about-view {
    .info-container {
      flex-wrap: wrap;
      text-align: center;

      .info-wrapper {
        flex-basis: 100% !important;

        &:not(:first-child) {
          margin-top: 24px;
        }
      }
    }
  }
}
</style>
