<script setup lang="ts">
import "leaflet/dist/leaflet.css";
import { ref, computed, watch, onMounted, provide, nextTick } from "vue";

import {
    LMap,
    LTileLayer,
    LMarker,
    LPopup,
    LGeoJson,
    LIcon,
    LPolyline,
    LControlAttribution,
} from "@vue-leaflet/vue-leaflet";
import axios from "axios";
import { useRouter } from "vue-router";

const geoJsonStyle = {
    color: "rgb(6 182 212)",
    weight: 1,
    opacity: 0.8,
    fillColor: "rgb(6 182 212)",
    fillOpacity: 0.5,
};

const router = useRouter()
const geoJsonData = ref(null);
const pulauList = ref([
    { name: "Priok", position: [-6.132055, 106.871483], id: "priok" },
    { name: "Cilegon", position: [-6.01667, 106.01667], id: "cilegon" },
    // { name: "Salak", position: [-6.42477, 106.55467] },
    // { name: "Darajat", position: [-7.227906, 107.908699] },
    // { name: "Kamojang", position: [-7.167, 107.800] },
    { name: "Lontar", position: [-4.733, 103.833], id: "lontar" },
    // { name: "Adipala", position: [-7.667959, 109.1642208] },
    // { name: "Pelabuhan Ratu", position: [-6.9833, 106.5500] },
    // { name: "Labuan", position: [-6.3785775, 105.8289573] },
    // { name: "Suralaya", position: [-5.91573, 106.01089] },
]);

const loadGeoJsonData = async () => {
    try {
        const response = await axios.get("/json/indonesia.json");
        geoJsonData.value = response.data;
    } catch (error) { }
};

const detail = (value: string) => {
    router.push(`/${value}`)
}

onMounted(() => {
    loadGeoJsonData();
});
</script>

<template>
    <div class="h-[calc(100vh-200px)]">
        <l-map ref="map" :use-global-leaflet="false" :zoom="5" :min-zoom="5" :center="[-2.5489, 118.0149]"
            style="width: 100%; height: 100%" :options="{
                attributionControl: false,
                zoomControl: true,
                editable: true,
                gestureHandling: true,
                scrollWheelZoom: false,
                maxBounds: [
                    [-11, 94],
                    [6, 141],
                ],
                maxBoundsViscosity: 2.0,
            }">
            <l-tile-layer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" layer-type="base"
                name="OpenStreetMap" minZoom: 0 maxZoom: 20
                attribution='&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'></l-tile-layer>
            <l-geo-json :options-style="geoJsonStyle" :geojson="geoJsonData" />

            <l-marker v-for="pulau in pulauList" :key="pulau.name" :lat-lng="pulau.position">
                <l-popup class="cursor-pointer font-semibold hover:text-cyan-500" @click="detail(pulau.id)">{{
                    pulau.name
                }}</l-popup>
            </l-marker>
        </l-map>
    </div>
</template>
