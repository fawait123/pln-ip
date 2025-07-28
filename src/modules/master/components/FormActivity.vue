<script setup lang="ts">
import { reactive, ref, computed, type PropType, watch } from "vue";

import { Button, Input, Modal, Select } from "@/components";
import useVuelidate from "@vuelidate/core";
import { required, helpers } from "@vuelidate/validators";
import { useInfiniteQuery, useMutation } from "@tanstack/vue-query";
import {
  all_characters,
  mergeArrays,
  numbers_positive_negative,
} from "@/helpers/global";
import type { IPagination, IParams } from "@/types/GlobalType";

import type {
  ActivityCreateInterface,
  ActivityInterface,
} from "../types/AcitivityType";
import { useMasterStore } from "../stores/MasterStore";
import type { EquipmentInterface } from "../types/EquipmentType";

type OptionType = {
  value: string;
  label: string;
};

const props = defineProps({
  selectedValue: {
    type: Object as PropType<ActivityInterface | null>,
  },
});

const emit = defineEmits(["success", "error"]);

const masterStore = useMasterStore();

const modelValue = defineModel<boolean>({ default: false });
const is_loading_equipment = ref(false);
const options_equipment = ref<OptionType[]>([]);

const model = ref<ActivityCreateInterface>({
  name: "",
  duration: "",
  equipment_uuid: "",
});
const v$_form = reactive(useVuelidate());
const rules = computed(() => {
  return {
    name: {
      required: helpers.withMessage(`This field is required`, required),
    },
    duration: {
      required: helpers.withMessage(`This field is required`, required),
    },
    equipment_uuid: {
      required: helpers.withMessage(`This field is required`, required),
    },
  };
});

//--- GET EQUIPMENT
const params_equipment = reactive<IParams>({
  search: "",
  filter: "",
  currentPage: 1,
  perPage: 10,
});
const {
  data: dataEquipment,
  refetch: refetchEquipment,
  fetchNextPage: fetchNextPageEquipment,
  hasNextPage: hasNextPageEquipment,
  isFetchingNextPage: isFetchingNextPageEquipment,
} = useInfiniteQuery({
  queryKey: ["getEquipmentActivity"],
  enabled: !props.selectedValue && !is_loading_equipment.value,
  queryFn: async ({ pageParam = 1 }) => {
    try {
      const { data } = await masterStore.getEquipment({
        ...params_equipment,
        currentPage: pageParam,
      });

      const response = data.data as IPagination<EquipmentInterface[]>;

      return response;
    } catch (error: any) {
      throw error.response;
    } finally {
      is_loading_equipment.value = false;
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

//--- CREATE ACTIVITY
const { mutate: createActivity, isPending: isLoadingCreate } = useMutation({
  mutationFn: async (payload: ActivityCreateInterface) => {
    return await masterStore.createActivity(payload);
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

//--- UPDATE ACTIVITY
const { mutate: updateActivity, isPending: isLoadingUpdate } = useMutation({
  mutationFn: async ({
    id,
    payload,
  }: {
    id: string;
    payload: ActivityCreateInterface;
  }) => {
    return await masterStore.updateActivity(id, payload);
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
    updateActivity({
      id: props.selectedValue?.uuid,
      payload: model.value,
    });
  } else {
    createActivity(model.value);
  }
};

const setValue = () => {
  model.value = {
    name: props.selectedValue?.name || "",
    duration: (props.selectedValue?.duration || "").toString(),
    equipment_uuid: props.selectedValue?.equipment_uuid || "",
  };
};

const resetValue = () => {
  model.value = {
    name: "",
    duration: "",
    equipment_uuid: "",
  };
};

const timeout_equipment = ref(0);
const searchEquipment = () => {
  clearTimeout(timeout_equipment.value);
  timeout_equipment.value = window.setTimeout(() => {
    is_loading_equipment.value = true;
    params_equipment.currentPage = 1;
    refetchEquipment();
  }, 1000);
};
const scrollEquipment = (e: Event) => {
  const { scrollTop, scrollHeight, clientHeight } = e.target as HTMLElement;
  if (
    scrollTop + clientHeight >= scrollHeight - 1 &&
    hasNextPageEquipment.value &&
    !isFetchingNextPageEquipment.value
  ) {
    fetchNextPageEquipment();
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
  [modelValue, dataEquipment],
  ([newModel, newEquipment]) => {
    if (props.selectedValue) {
      const new_data: OptionType[] =
        newEquipment?.pages
          .flatMap((page) => page?.data)
          ?.map((item) => {
            return { value: item.uuid, label: item.name };
          }) || [];

      options_equipment.value = mergeArrays(
        [
          {
            value: props.selectedValue.equipment_uuid,
            label: props.selectedValue.equipment?.name,
          },
        ],
        new_data.filter(
          (item) => item.value !== props.selectedValue?.equipment_uuid
        )
      );
    } else {
      const new_data: OptionType[] =
        newEquipment?.pages
          .flatMap((page) => page?.data)
          ?.map((item) => {
            return { value: item.uuid, label: item.name };
          }) || [];

      options_equipment.value = new_data;
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
    title="Tambah Activity"
    v-model="modelValue"
  >
    <form
      class="flex flex-col gap-4 max-h-[calc(100vh-200px)] overflow-y-auto mx-[-20px] px-5"
      @submit.prevent="handleSubmit"
    >
      <Input
        v-model="model.name"
        :rules="rules.name"
        :custom_symbols="numbers_positive_negative"
        label="Nama"
      />
      <Input
        v-model="model.duration"
        :rules="rules.duration"
        :custom_symbols="all_characters"
        label="Duration"
      />
      <Select
        v-model="model.equipment_uuid"
        label="Equipment"
        options_label="label"
        options_value="value"
        v-model:model-search="params_equipment.search"
        :search="true"
        :loading="is_loading_equipment"
        :loading-next-page="isFetchingNextPageEquipment"
        :rules="rules.equipment_uuid"
        :options="options_equipment"
        @scroll="scrollEquipment"
        @search="searchEquipment"
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
