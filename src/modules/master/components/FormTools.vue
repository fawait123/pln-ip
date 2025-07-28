<script setup lang="ts">
import { reactive, ref, computed, type PropType, watch } from "vue";

import { Button, Input, Modal, Select } from "@/components";
import useVuelidate from "@vuelidate/core";
import { required, helpers } from "@vuelidate/validators";
import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/vue-query";
import type { IPagination, IParams } from "@/types/GlobalType";
import {
  all_characters,
  mergeArrays,
  numbers_positive_negative,
} from "@/helpers/global";

import type { LocationInterface } from "../types/LocationType";
import type { UnitInterface } from "../types/UnitType";
import type { MachineInterface } from "../types/MachineType";
import type { InspectionTypeInterface } from "../types/InspectionType";
import { useMasterStore } from "../stores/MasterStore";
import type {
  ToolsCreateInterface,
  ToolsCreateModelInterface,
  ToolsInterface,
} from "../types/ToolsType";
import type { GlobalUnitInterface } from "../types/GlobalUnitType";
import type { ActivityInterface } from "../types/AcitivityType";

type OptionType = {
  value: string;
  label: string;
};

const props = defineProps({
  selectedValue: {
    type: Object as PropType<ToolsInterface | null>,
  },
});

const emit = defineEmits(["success", "error"]);

const masterStore = useMasterStore();

const queryClient = useQueryClient();
const modelValue = defineModel<boolean>({ default: false });
const is_loading_global_unit = ref(false);
const options_global_unit = ref<OptionType[]>([]);
const is_loading_activity = ref(false);
const options_activity = ref<OptionType[]>([]);

const model = ref<ToolsCreateModelInterface>({
  name: "",
  qty: "",
  section: "",
  global_unit_uuid: "",
  activity_uuid: "",
});
const v$_form = reactive(useVuelidate());
const rules = computed(() => {
  return {
    name: {
      required: helpers.withMessage(`This field is required`, required),
    },
    activity_uuid: {
      required: helpers.withMessage(`This field is required`, required),
    },
    qty: {
      required: helpers.withMessage(`This field is required`, required),
    },
    section: {
      required: helpers.withMessage(`This field is required`, required),
    },
    global_unit_uuid: {
      required: helpers.withMessage(`This field is required`, required),
    },
  };
});

//--- GET GLOBAL UNIT
const params_global_unit = reactive<IParams>({
  search: "",
  filters: "",
  currentPage: 1,
  perPage: 10,
});
const {
  data: dataGlobalUnit,
  refetch: refetchGlobalUnit,
  fetchNextPage: fetchNextPageGlobalUnit,
  hasNextPage: hasNextPageGlobalUnit,
  isFetchingNextPage: isFetchingNextPageGlobalUnit,
} = useInfiniteQuery({
  queryKey: ["getGlobalUnitManpower"],
  enabled: !props.selectedValue && !is_loading_global_unit.value,
  queryFn: async ({ pageParam = 1 }) => {
    try {
      const { data } = await masterStore.getGlobalUnit({
        ...params_global_unit,
        currentPage: pageParam,
      });

      const response = data.data as IPagination<GlobalUnitInterface[]>;

      return response;
    } catch (error: any) {
      throw error.response;
    } finally {
      is_loading_global_unit.value = false;
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

//--- GET ACTIVITY
const params_activity = reactive<IParams>({
  search: "",
  filters: "",
  currentPage: 1,
  perPage: 10,
});
const {
  data: dataActivity,
  refetch: refetchActivity,
  fetchNextPage: fetchNextPageActivity,
  hasNextPage: hasNextPageActivity,
  isFetchingNextPage: isFetchingNextPageActivity,
} = useInfiniteQuery({
  queryKey: ["getActivityTools"],
  enabled: !props.selectedValue && !is_loading_activity.value,
  queryFn: async ({ pageParam = 1 }) => {
    try {
      const { data } = await masterStore.getActivityList({
        ...params_activity,
        currentPage: pageParam,
      });

      const response = data.data as IPagination<ActivityInterface[]>;

      return response;
    } catch (error: any) {
      throw error.response;
    } finally {
      is_loading_activity.value = false;
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

//--- CREATE TOOLS
const { mutate: createTools, isPending: isLoadingCreate } = useMutation({
  mutationFn: async (payload: ToolsCreateInterface) => {
    return await masterStore.createTools(payload);
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

//--- UPDATE TOOLS
const { mutate: updateTools, isPending: isLoadingUpdate } = useMutation({
  mutationFn: async ({
    id,
    payload,
  }: {
    id: string;
    payload: ToolsCreateInterface;
  }) => {
    return await masterStore.updateTools(id, payload);
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
    updateTools({
      id: props.selectedValue?.uuid,
      payload: {
        name: model.value.name,
        qty: parseFloat(model.value.qty),
        section: model.value.section,
        global_unit_uuid: model.value.global_unit_uuid,
        activity_uuid: model.value.activity_uuid,
      },
    });
  } else {
    createTools({
      name: model.value.name,
      qty: parseFloat(model.value.qty),
      section: model.value.section,
      global_unit_uuid: model.value.global_unit_uuid,
      activity_uuid: model.value.activity_uuid,
    });
  }
};

const setValue = () => {
  model.value.name = props.selectedValue?.name || "";
  model.value.qty = props.selectedValue?.qty?.toString() || "";
  model.value.section = props.selectedValue?.section || "";

  model.value.global_unit_uuid = props.selectedValue?.global_unit_uuid || "";
  model.value.activity_uuid = props.selectedValue?.activity_uuid || "";
};

const resetValue = () => {
  model.value = {
    name: "",
    activity_uuid: "",
    section: "",
    qty: "",
    global_unit_uuid: "",
  };
};

const timeout_global_unit = ref(0);
const searchGlobalUnit = () => {
  clearTimeout(timeout_global_unit.value);
  timeout_global_unit.value = window.setTimeout(() => {
    is_loading_global_unit.value = true;
    params_global_unit.currentPage = 1;
    refetchGlobalUnit();
  }, 1000);
};
const scrollGlobalUnit = (e: Event) => {
  const { scrollTop, scrollHeight, clientHeight } = e.target as HTMLElement;
  if (
    scrollTop + clientHeight >= scrollHeight - 1 &&
    hasNextPageGlobalUnit.value &&
    !isFetchingNextPageGlobalUnit.value
  ) {
    fetchNextPageGlobalUnit();
  }
};

// activity
const timeout_activity = ref(0);
const searchActivity = () => {
  clearTimeout(timeout_activity.value);
  timeout_activity.value = window.setTimeout(() => {
    is_loading_activity.value = true;
    params_activity.currentPage = 1;
    refetchActivity();
  }, 1000);
};
const scrollActivity = (e: Event) => {
  const { scrollTop, scrollHeight, clientHeight } = e.target as HTMLElement;
  if (
    scrollTop + clientHeight >= scrollHeight - 1 &&
    hasNextPageActivity.value &&
    !isFetchingNextPageActivity.value
  ) {
    fetchNextPageActivity();
  }
};
// end

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
  [modelValue, dataGlobalUnit],
  ([_, newGlobalUnit]) => {
    if (props.selectedValue) {
      const new_data: OptionType[] =
        newGlobalUnit?.pages
          .flatMap((page) => page?.data)
          ?.map((item) => {
            return { value: item.uuid, label: item.name };
          }) || [];
      options_global_unit.value = mergeArrays(
        [
          {
            value: props.selectedValue?.global_unit_uuid,
            label: props.selectedValue?.global_unit?.name,
          },
        ],
        new_data.filter(
          (item) => item.value !== props.selectedValue?.global_unit_uuid
        )
      );
    } else {
      const new_data: OptionType[] =
        newGlobalUnit?.pages
          .flatMap((page) => page?.data)
          ?.map((item) => {
            return { value: item.uuid, label: item.name };
          }) || [];

      options_global_unit.value = new_data;
    }
  },
  { deep: true, immediate: true }
);

watch(
  [modelValue, dataActivity],
  ([_, newActivity]) => {
    if (props.selectedValue) {
      const new_data: OptionType[] =
        newActivity?.pages
          .flatMap((page) => page?.data)
          ?.map((item) => {
            return { value: item.uuid, label: item.name };
          }) || [];
      options_activity.value = mergeArrays(
        [
          {
            value: props.selectedValue?.activity_uuid,
            label: props.selectedValue?.activity?.name,
          },
        ],
        new_data.filter(
          (item) => item.value !== props.selectedValue?.activity_uuid
        )
      );
    } else {
      const new_data: OptionType[] =
        newActivity?.pages
          .flatMap((page) => page?.data)
          ?.map((item) => {
            return { value: item.uuid, label: item.name };
          }) || [];

      options_activity.value = new_data;
    }
  },
  { deep: true, immediate: true }
);
</script>

<template>
  <Modal width="440" height="200" :showButtonClose="false" title="Tambah Tools" v-model="modelValue">
    <form class="flex flex-col gap-4 max-h-[calc(100vh-200px)] overflow-y-auto mx-[-20px] px-5"
      @submit.prevent="handleSubmit">
      <Input v-model="model.name" label="Nama" :rules="rules.name" :custom_symbols="all_characters" />
      <Input v-model="model.qty" label="Quantity" :rules="rules.qty" :custom_symbols="numbers_positive_negative" />
      <Input v-model="model.section" label="Section" :rules="rules.section" :custom_symbols="all_characters" />
      <Select v-model="model.global_unit_uuid" label="Global Unit" options_label="label" options_value="value"
        v-model:model-search="params_global_unit.search" :search="true" :loading="is_loading_global_unit"
        :loading-next-page="isFetchingNextPageGlobalUnit" :rules="rules.global_unit_uuid" :options="options_global_unit"
        @scroll="scrollGlobalUnit" @search="searchGlobalUnit" />
      <Select v-model="model.activity_uuid" label="Aktifitas" options_label="label" options_value="value"
        v-model:model-search="params_activity.search" :search="true" :loading="is_loading_activity"
        :loading-next-page="isFetchingNextPageActivity" :rules="rules.activity_uuid" :options="options_activity"
        @scroll="scrollActivity" @search="searchActivity" />

      <div class="w-full flex items-center gap-4 mt-4">
        <Button text="Batal" class="w-full" variant="secondary" :disabled="isLoadingCreate || isLoadingUpdate"
          @click="modelValue = false" />
        <Button type="submit" text="Simpan" class="w-full" color="blue" :disabled="isLoadingCreate || isLoadingUpdate"
          :loading="isLoadingCreate || isLoadingUpdate" />
      </div>
    </form>
  </Modal>
</template>
