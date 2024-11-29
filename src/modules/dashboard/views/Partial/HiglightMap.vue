<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

// Mengatur opsi Highcharts untuk peta
const chartOptions = ref<Record<string, any>>({
  chart: {
    map: null,
  },
  legend: {
    enabled: false
  },
  title: {
    text: "",
  },
  mapNavigation: {
    enabled: true,
    buttonOptions: {
      alignTo: "spacingBox",
    },
  },
  colorAxis: {
    min: 0,
    stops: [
      [0, "#37AFE1"], // Color at minimum value
      [0.5, "#37AFE1"], // Color at mid-range
      [1, "#37AFE1"], // Color at maximum value
    ],
  },
  tooltip: {
    useHTML: true, // Menggunakan HTML untuk kustomisasi
    pointFormat: '<b class="text-md">{point.name}</b>', // Format isi tooltip
  },
  series: [
    {
      name: "Wilayah",
      states: {
        hover: {
          color: "#FFB200",
        },
      },
      dataLabels: {
        enabled: true,
        format: "{point.name}",
      },
      allAreas: true,
      data: [],
      joinBy: "slug",
      point: {
        events: {
          click: (e) => {
            handleClick(e);
          },
        },
      },
    },
  ],
});

// Fungsi untuk memuat data peta secara dinamis
async function loadMapData() {
  try {
    const mapData = await fetch("/json/indonesia.json").then((res) =>
      res.json()
    );
    chartOptions.value.chart.map = mapData;

    // Menambahkan data kecamatan setelah peta dimuat
    chartOptions.value.series[0].data = mapData.features.map(
      (item: Record<string, any>) => {
        return {
          slug: item.properties.slug,
          // value: 10,
          color: [
            "Jawa Barat",
            "Aceh",
            "Bali",
            "Jambi",
            "Jawa Timur",
            "Kalimantan Barat",
            "Gorontalo",
            "Maluku",
          ].includes(item.properties.state)
            ? "#0070c0"
            : ["Kalimantan Timur", "Papua", "Maluku Utara", "Sulawesi Selatan", "Riau", "Lampung", "Nusa Tenggara Timur"].includes(item.properties.state) ? "#00B0F0" : "#2AB6C0",
          name: item.properties.state,
        };
      }
    );
  } catch (error) {
    console.error("Error loading map data:", error);
  }
}

const handleClick = (event: any) => {
  console.log("clicked", event.point);
  router.push(`/priok`);
};

// Memuat data peta ketika komponen dipasang
onMounted(() => {
  loadMapData();
});
</script>

<template>
  <div class="relative">
    <div class="py-1 px-2 bg-[#2AB6C0] transform -skew-x-12 max-w-[40%] text-center text-white opacity-[0.5] mx-auto">
      <h1 class="text-3xl font-bold">UNIT PEMBANGKIT PT PLN INDONESIA POWER</h1>
    </div>
    <highcharts :constructorType="'mapChart'" class="hc" :options="chartOptions" ref="chart"></highcharts>
    <div class="absolute z-50 bottom-20 left-10 text-[#2AB6C0] max-w-[400px]">
      <h1 class="text-2xl font-bold my-3 italic">GENERATE SCOPE</h1>
      <p class="text-justify indent-20">Aplikasi ini merupakan aplikasi berbasis web yang digunakan untuk membuat scope
        overhoul
        berdasarkan kondisi
        asset pembangkit yang dilengkapi dengan fitur visualisasi proses pekerjaan dan data penunjang, sehingga
        memudahkan planner untuk memastikan ketepatan durasi dan budgeting.</p>
    </div>
  </div>
</template>

<style>
.hc {
  width: 100%;
  height: 80vh;
}
</style>
