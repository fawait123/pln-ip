<script setup lang="ts">
import { reactive, ref, computed, type PropType, watch } from "vue";

import { Button, Input, Modal, Select } from "@/components";
import useVuelidate from "@vuelidate/core";
import { required, helpers } from "@vuelidate/validators";
import { useInfiniteQuery, useMutation } from "@tanstack/vue-query";
import { all_characters, mergeArrays } from "@/helpers/global";
import type { IPagination, IParams } from "@/types/GlobalType";

import type { UnitCreateInterface, UnitInterface } from "../types/UnitType";
import { useMasterStore } from "../stores/MasterStore";
import type { LocationInterface } from "../types/LocationType";

type OptionType = {
  value: string;
  label: string;
};

const props = defineProps({
  selectedValue: {
    type: Object as PropType<UnitInterface | null>,
  },
});

const emit = defineEmits(["success", "error"]);

const masterStore = useMasterStore();

const modelValue = defineModel<boolean>({ default: false });
const is_loading_location = ref(false);
const options_location = ref<OptionType[]>([]);

const model = ref<UnitCreateInterface>({
  name: "",
  location_uuid: "",
});
const v$_form = reactive(useVuelidate());
const rules = computed(() => {
  return {
    name: {
      required: helpers.withMessage(`This field is required`, required),
    },
    location_uuid: {
      required: helpers.withMessage(`This field is required`, required),
    },
  };
});

//--- GET LOCATION
const params_location = reactive<IParams>({
  search: "",
  filter: "",
  currentPage: 1,
  perPage: 10,
});
const {
  data: dataLocation,
  refetch: refetchLocation,
  fetchNextPage: fetchNextPageLocation,
  hasNextPage: hasNextPageLocation,
  isFetchingNextPage: isFetchingNextPageLocation,
} = useInfiniteQuery({
  queryKey: ["getLocationUnit"],
  enabled: !props.selectedValue && !is_loading_location.value,
  queryFn: async ({ pageParam = 1 }) => {
    try {
      const { data } = await masterStore.getLocation({
        ...params_location,
        currentPage: pageParam,
      });

      const response = data.data as IPagination<LocationInterface[]>;

      return response;
    } catch (error: any) {
      throw error.response;
    } finally {
      is_loading_location.value = false;
    }
  },
  refetchOnWindowFocus: false,
  getNextPageParam: (lastPage) => {
    if (!lastPage?.data?.length) return undefined;
    return lastPage.current_page + 1;
  },
  initialPageParam: 1,
});
//--- END

//--- CREATE UNIT
const { mutate: createUnit, isPending: isLoadingCreate } = useMutation({
  mutationFn: async (payload: UnitCreateInterface) => {
    return await masterStore.createUnit(payload);
  },
  onSuccess: () => {
    modelValue.value = false;
    emit("success");
  },
  onError: (error) => {
    console.log(error);
    emit("error", error);
  },
});
//--- END

//--- UPDATE UNIT
const { mutate: updateUnit, isPending: isLoadingUpdate } = useMutation({
  mutationFn: async ({
    id,
    payload,
  }: {
    id: string;
    payload: UnitCreateInterface;
  }) => {
    return await masterStore.updateUnit(id, payload);
  },
  onSuccess: async () => {
    modelValue.value = false;
    emit("success");
  },
  onError: (error) => {
    console.log(error);
    emit("error", error);
  },
});
//--- END

const handleSubmit = async () => {
  const isValid = await v$_form.value.$validate();

  if (!isValid) return;

  if (props.selectedValue) {
    updateUnit({
      id: props.selectedValue?.uuid,
      payload: model.value,
    });
  } else {
    createUnit(model.value);
  }
};

const setValue = () => {
  model.value = {
    name: props.selectedValue?.name || "",
    location_uuid: props.selectedValue?.location_uuid || "",
  };
};

const resetValue = () => {
  model.value = {
    name: "",
    location_uuid: "",
  };
};

const timeout_location = ref(0);
const searchLocation = () => {
  clearTimeout(timeout_location.value);
  timeout_location.value = window.setTimeout(() => {
    is_loading_location.value = true;
    params_location.currentPage = 1;
    refetchLocation();
  }, 1000);
};
const scrollLocation = (e: Event) => {
  const { scrollTop, scrollHeight, clientHeight } = e.target as HTMLElement;
  if (
    scrollTop + clientHeight >= scrollHeight - 1 &&
    hasNextPageLocation.value &&
    !isFetchingNextPageLocation.value
  ) {
    fetchNextPageLocation();
  }
};

watch(modelValue, (value) => {
  if (!value) {
    setTimeout(() => {
      resetValue();
    }, 500);
  } else {
    if (props.selectedValue) {
      setValue();
    } else {
      resetValue();
    }
  }
});

watch(
  [modelValue, dataLocation],
  ([newModel, newLocation]) => {
    if (props.selectedValue) {
      const new_data: OptionType[] =
        newLocation?.pages
          .flatMap((page) => page?.data)
          ?.map((item) => {
            return { value: item.uuid, label: item.name };
          }) || [];

      options_location.value = mergeArrays(
        [
          {
            value: props.selectedValue.location_uuid,
            label: props.selectedValue.location?.name,
          },
        ],
        new_data.filter(
          (item) => item.value !== props.selectedValue?.location_uuid
        )
      );
    } else {
      const new_data: OptionType[] =
        newLocation?.pages
          .flatMap((page) => page?.data)
          ?.map((item) => {
            return { value: item.uuid, label: item.name };
          }) || [];

      options_location.value = new_data;
    }
  },
  { deep: true, immediate: true }
);
</script>

<template>
  <Modal
    width="440"
    height="200"
    :showButtonClose="false"
    title="Tambah Unit"
    v-model="modelValue"
  >
    <form
      class="flex flex-col gap-4 max-h-[calc(100vh-200px)] overflow-y-auto mx-[-20px] px-5"
      @submit.prevent="handleSubmit"
    >
      <Input
        v-model="model.name"
        :rules="rules.name"
        :custom_symbols="all_characters"
        label="Nama"
      />
      <Select
        v-model="model.location_uuid"
        label="Lokasi"
        options_label="label"
        options_value="value"
        v-model:model-search="params_location.search"
        :search="true"
        :loading="is_loading_location"
        :loading-next-page="isFetchingNextPageLocation"
        :rules="rules.location_uuid"
        :options="options_location"
        @scroll="scrollLocation"
        @search="searchLocation"
      />

      <div class="w-full flex items-center gap-4 mt-4">
        <Button
          text="Batal"
          class="w-full"
          variant="secondary"
          :disabled="isLoadingCreate || isLoadingUpdate"
          @click="modelValue = false"
        />
        <Button
          type="submit"
          text="Simpan"
          class="w-full"
          color="blue"
          :disabled="isLoadingCreate || isLoadingUpdate"
          :loading="isLoadingCreate || isLoadingUpdate"
        />
      </div>
    </form>
  </Modal>
</template>
