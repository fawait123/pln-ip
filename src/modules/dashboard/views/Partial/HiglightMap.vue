<script setup lang="ts">
import { ref, onMounted, reactive, watch } from "vue";
import { useRouter } from "vue-router";
import type { AxiosError } from "axios";

import { useQuery } from "@tanstack/vue-query";
import { useDashboardStore } from "@/modules/dashboard/stores/DashboardStore";
import { colorMarker, markerData } from "@/constants";
import type { IPagination, IParams } from "@/types/GlobalType";
import type { LocationInterface } from "@/modules/master/types/LocationType";

type TSeries = {
  name: string;
  lat: number;
  lon: number;
  color: string;
  uuid: string;
};

const router = useRouter();
const dashboardStore = useDashboardStore();
const params = reactive<IParams>({
  search: "",
  filter: "",
  currentPage: 1,
  perPage: 1000,
});

const dataLocation = ref<TSeries[]>([]);

//--- GET LOCATION
const { refetch: refetchLocation, isFetching: isLoadingLocation } = useQuery({
  queryKey: ["getLocation"],
  queryFn: async () => {
    try {
      const { data } = await dashboardStore.getLocation(params);
      const response = data.data as IPagination<LocationInterface[]>;

      const arr_location = response.data.map((item) => ({
        name: item.name,
        lat: parseFloat(item.lat),
        lon: parseFloat(item.lon),
        color: item.color,
        uuid: item.uuid,
      }));

      dataLocation.value = arr_location;
      return arr_location;
    } catch (error: any) {
      const err = error as AxiosError;
      throw err.response;
    }
  },
  refetchOnWindowFocus: false,
});
//--- END

const chartOptions = ref<Record<string, any>>({
  chart: { map: null },
  legend: { enabled: false },
  title: { text: "" },
  mapNavigation: {
    enabled: true,
    enableDoubleClickZoomTo: true,
    buttonOptions: { alignTo: "spacingBox" },
  },
  colorAxis: {
    min: 0,
    stops: [
      [0, "#37AFE1"],
      [0.5, "#37AFE1"],
      [1, "#37AFE1"],
    ],
  },
  tooltip: {
    enabled: true,
    useHTML: true,
    formatter: function () {
      return this.series.name == "Lokasi"
        ? `<strong>${this.point.name}</strong>`
        : false;
    },
  },
  series: [
    {
      name: "Wilayah",
      enableMouseTracking: false,
      states: { hover: { enable: false } },
      dataLabels: {
        useHTML: true,
        enabled: true,
        format: "<b>{point.name}</b>",
        color: "#000000",
      },
      allAreas: true,
      data: [],
      joinBy: "slug",
    },
    {
      type: "mappoint",
      name: "Lokasi",
      dataLabels: { enabled: false },
      data: [],
      marker: { radius: 6, symbol: "circle" },
      point: {
        events: {
          click: (e) => {
            router.push(`/${e.point?.uuid}`);
          },
        },
      },
    },
  ],
});

watch(dataLocation, (newData) => {
  if (newData.length > 0) {
    chartOptions.value.series[1].data = newData;
  }
});

async function loadMapData() {
  try {
    const mapData = await fetch("/json/indonesia.json").then((res) =>
      res.json()
    );
    chartOptions.value.chart.map = mapData;

    chartOptions.value.series[0].data = mapData.features.map((item: any) => ({
      slug: item.properties.slug,
      color: ["Jawa Barat", "Aceh", "Bali"].includes(item.properties.state)
        ? "#0070c0"
        : "#2AB6C0",
      name: item.properties.state,
    }));
  } catch (error) {
    console.error("Error loading map data:", error);
  }
}

onMounted(() => {
  loadMapData();
});
</script>

<template>
  <div>
    <div class="map-title">
      <p class="text-center font-extrabold text-lg text-neutral-50">
        UNIT PEMBANGKIT PT PLN INDONESIA POWER
      </p>
    </div>
    <highcharts
      :constructorType="'mapChart'"
      class="hc"
      :options="chartOptions"
      ref="chart"
    ></highcharts>
    <div
      class="absolute z-50 pointer-events-none bottom-10 left-10 text-[#2AB6C0] max-w-[400px]"
    >
      <h1 class="text-2xl font-bold my-3 italic">GENERATE SCOPE</h1>
      <p class="text-justify indent-20">
        Aplikasi ini merupakan aplikasi berbasis web yang digunakan untuk
        membuat scope overhoul berdasarkan kondisi asset pembangkit yang
        dilengkapi dengan fitur visualisasi proses pekerjaan dan data penunjang,
        sehingga memudahkan planner untuk memastikan ketepatan durasi dan
        budgeting.
      </p>
    </div>
    <div class="flex gap-4 absolute right-16">
      <div
        class="flex flex-col items-center"
        v-for="(maker, i) in colorMarker"
        :key="i"
      >
        <div
          class="w-4 h-4 rounded-full border shadow-md"
          :style="{ backgroundColor: maker.hexColor }"
        />
        <span class="text-md text-slate-950">{{ maker.title }}</span>
      </div>
    </div>
  </div>
</template>

<style lang="sass">
.hc
  width: 100%
  height: 80vh

.map-title
  @apply w-[600px] py-2 bg-[#2AB6C0] opacity-[0.5] mr-[-22px] absolute z-[1] left-[50%] translate-x-[-50%]
  clip-path: polygon(5% 0, 100% 0, 95% 100%, 0% 100%)
</style>
