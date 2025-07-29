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

import { useMasterStore } from "../stores/MasterStore";
import type {
  ManpowerCreateInterface,
  ManpowerCreateModelInterface,
  ManpowerInterface,
} from "../types/ManpowerType";
import type { ActivityInterface } from "../types/AcitivityType";

type OptionType = {
  value: string;
  label: string;
};

const props = defineProps({
  selectedValue: {
    type: Object as PropType<ManpowerInterface | null>,
  },
});

const emit = defineEmits(["success", "error"]);

const masterStore = useMasterStore();

const modelValue = defineModel<boolean>({ default: false });
const is_loading_activity = ref(false);
const options_activity = ref<OptionType[]>([]);

const model = ref<ManpowerCreateModelInterface>({
  name: "",
  qty: "",
  type: "",
  note: "",
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
    type: {
      required: helpers.withMessage(`This field is required`, required),
    },
    note: {
      required: helpers.withMessage(`This field is required`, required),
    },
  };
});

//--- GET LOCATION
const params_activity = reactive<IParams>({
  search: "",
  filters: [
    {
      group: "AND",
      operator: "NOT_NULL",
      column: "equipment.scopeStandart.inspection_type_uuid",
      value: null,
    }
  ],
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
  queryKey: ["getActivityManpower"],
  enabled: !props.selectedValue && !is_loading_activity.value,
  queryFn: async ({ pageParam = 1 }) => {
    try {
      const { data } = await masterStore.getActivity({
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

//--- CREATE MANPOWER
const { mutate: createManpower, isPending: isLoadingCreate } = useMutation({
  mutationFn: async (payload: ManpowerCreateInterface) => {
    return await masterStore.createManpower(payload);
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

//--- UPDATE MANPOWER
const { mutate: updateManpower, isPending: isLoadingUpdate } = useMutation({
  mutationFn: async ({
    id,
    payload,
  }: {
    id: string;
    payload: ManpowerCreateInterface;
  }) => {
    return await masterStore.updateManpower(id, payload);
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
    updateManpower({
      id: props.selectedValue?.uuid,
      payload: {
        name: model.value.name,
        qty: parseFloat(model.value.qty),
        type: model.value.type,
        note: model.value.note,
        activity_uuid: model.value.activity_uuid,
      },
    });
  } else {
    createManpower({
      name: model.value.name,
      qty: parseFloat(model.value.qty),
      type: model.value.type,
      note: model.value.note,
      activity_uuid: model.value.activity_uuid,
    });
  }
};

const setValue = () => {
  model.value.name = props.selectedValue?.name || "";
  model.value.qty = props.selectedValue?.qty?.toString() || "";
  model.value.type = props.selectedValue?.type || "";
  model.value.note = props.selectedValue?.note || "";

  model.value.activity_uuid =
    props.selectedValue?.activity_uuid || "";
};

const resetValue = () => {
  model.value = {
    name: "",
    activity_uuid: "",
    note: "",
    qty: "",
    type: "",
  };
};

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
            value:
              props.selectedValue?.activity_uuid,
            label:
              props.selectedValue?.activity?.name,
          },
        ],
        new_data.filter(
          (item) =>
            item.value !==
            props.selectedValue?.activity_uuid,
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
  <Modal width="440" height="200" :showButtonClose="false" title="Tambah Unit" v-model="modelValue">
    <form class="flex flex-col gap-4 max-h-[calc(100vh-200px)] overflow-y-auto mx-[-20px] px-5"
      @submit.prevent="handleSubmit">
      <Input v-model="model.name" label="Nama" :rules="rules.name" :custom_symbols="all_characters" />
      <Input v-model="model.qty" label="Quantity" :rules="rules.qty" :custom_symbols="numbers_positive_negative" />
      <Input v-model="model.type" label="Type" :rules="rules.type" :custom_symbols="all_characters" />
      <Input v-model="model.note" label="Note" :rules="rules.note" :custom_symbols="all_characters" />
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
