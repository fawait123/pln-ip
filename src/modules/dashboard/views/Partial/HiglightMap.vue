<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

// Mengatur opsi Highcharts untuk peta
const chartOptions = ref<Record<string, any>>({
  chart: {
    map: null,
  },
  title: {
    text: "Wilayah Indonesia",
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
          color: "#03045e",
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
            ? "#03045e"
            : "#00b4d8",
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
  <highcharts
    :constructorType="'mapChart'"
    class="hc"
    :options="chartOptions"
    ref="chart"
  >
  </highcharts>
</template>

<style>
.hc {
  width: 100%;
  height: 100vh;
}
</style>
