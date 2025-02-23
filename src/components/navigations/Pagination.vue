<script setup lang="ts">
import { Select, Icon } from "@/components";
import { ref, onMounted, watch, computed, type PropType } from "vue";

interface ListPageType {
  label: string;
  value: string;
}

const props = defineProps({
  totalItems: {
    type: [Number, String],
    default: 0,
  },
  itemsPerPage: {
    type: [Number, String],
    default: 10,
  },
  currentPage: {
    type: [Number, String],
    default: 1,
  },
  defaultLimit: {
    type: String as PropType<"10" | "20" | "50" | "100">,
    default: "10",
  },
});

const emit = defineEmits(["changePage", "changeLimit"]);

const list_limit = ref<ListPageType[]>([
  {
    label: "10 Baris",
    value: "10",
  },
  {
    label: "20 Baris",
    value: "20",
  },
  {
    label: "50 Baris",
    value: "50",
  },
  {
    label: "100 Baris",
    value: "100",
  },
]);

const model_limit = ref("10");
const model_page = ref(1);

watch(
  () => props.currentPage,
  (value) => {
    model_page.value = parseInt(value.toString());
  }
);

const currentDataCount = computed(() => {
  const lastPage = Math.ceil(
    parseInt(props.totalItems?.toString()) /
      parseInt(props.itemsPerPage?.toString())
  );

  if (model_page.value < lastPage) {
    return props.itemsPerPage;
  } else if (model_page.value === lastPage) {
    return (
      parseInt(props.totalItems?.toString()) %
        parseInt(props.itemsPerPage?.toString()) ||
      parseInt(props.itemsPerPage?.toString())
    );
  }

  return 0;
});

const clickHandler = (value: number) => {
  emit("changePage", value);
};

onMounted(() => {
  model_limit.value = props.defaultLimit;
  model_page.value = parseInt(props.currentPage.toString());
});
</script>

<template>
  <div class="v-pagination">
    <div class="v-pagination--page">
      <VueAwesomePaginate
        :total-items="totalItems"
        :items-per-page="itemsPerPage"
        :maxPagesShown="2"
        v-model="model_page"
        @click="clickHandler"
      >
        <template #prev-button>
          <Icon name="caret-left" class="pagination-icon" />
        </template>
        <template #next-button>
          <Icon name="caret-right" class="pagination-icon" />
        </template>
      </VueAwesomePaginate>
    </div>
    <div class="v-pagination--limit">
      <p class="v-pagination--limit--text">
        Menampilkan {{ currentDataCount }} dari {{ totalItems }}
      </p>
      <div class="max-w-[120px] w-full">
        <Select
          id="select-pagination"
          variant="tertiary"
          v-model="model_limit"
          :options="list_limit"
          options_label="label"
          options_value="value"
          @select="(e) => $emit('changeLimit', e.value)"
        />
      </div>
    </div>
  </div>
</template>

<style lang="sass">
.v-pagination
  @apply flex items-center justify-between gap-2 px-3 py-2 bg-[rgb(47,85,151,0.6)] rounded-lg
  &--limit
    @apply flex items-center gap-3
    &--text
      @apply text-sm text-neutral-50
  &--page
    .pagination-container
      @apply flex gap-3
    .paginate-buttons
      @apply min-w-[38px] min-h-[38px] text-neutral-50 text-sm cursor-pointer rounded-lg bg-[rgb(47,85,151,0.6)]
      &:hover
        @apply text-neutral-300
    .active-page
      @apply bg-cyan-500 text-white
      &:hover
        @apply bg-cyan-600 text-white
    .next-button, .back-button
      @apply border-[2px] border-[rgb(47,85,151)] bg-[rgb(47,85,151,0.6)] text-neutral-50
      &:hover
        @apply text-neutral-300
</style>
