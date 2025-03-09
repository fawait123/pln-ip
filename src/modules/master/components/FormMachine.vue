<script setup lang="ts">
import { reactive, ref, computed, type PropType, watch } from "vue";

import { Button, Input, Modal, Select, Textarea } from "@/components";
import useVuelidate from "@vuelidate/core";
import { required, helpers } from "@vuelidate/validators";
import { useInfiniteQuery, useMutation } from "@tanstack/vue-query";

import type {
  MachineCreateInterface,
  MachineInterface,
} from "../types/MachineType";
import { useMasterStore } from "../stores/MasterStore";
import type { IPagination, IParams } from "@/types/GlobalType";
import type { UnitInterface } from "../types/UnitType";
import { mergeArrays } from "@/helpers/global";

type OptionType = {
  value: string;
  label: string;
};

const props = defineProps({
  selectedValue: {
    type: Object as PropType<MachineInterface | null>,
  },
});

const emit = defineEmits(["success", "error"]);

const masterStore = useMasterStore();

const modelValue = defineModel<boolean>({ default: false });
const is_loading_unit = ref(false);
const options_unit = ref<OptionType[]>([]);

const model = ref<MachineCreateInterface>({
  name: "",
  unit_uuid: "",
});
const v$_form = reactive(useVuelidate());
const rules = computed(() => {
  return {
    name: {
      required: helpers.withMessage(`This field is required`, required),
    },
    unit_uuid: {
      required: helpers.withMessage(`This field is required`, required),
    },
  };
});

//--- GET UNIT
const params_unit = reactive<IParams>({
  search: "",
  filter: "",
  currentPage: 1,
  perPage: 10,
});
const {
  data: dataUnit,
  refetch: refetchUnit,
  fetchNextPage: fetchNextPageUnit,
  hasNextPage: hasNextPageUnit,
  isFetchingNextPage: isFetchingNextPageUnit,
} = useInfiniteQuery({
  queryKey: ["getUnitMachine"],
  enabled: !props.selectedValue && !is_loading_unit.value,
  queryFn: async ({ pageParam = 1 }) => {
    try {
      const { data } = await masterStore.getUnit({
        ...params_unit,
        currentPage: pageParam,
      });

      const response = data.data as IPagination<UnitInterface[]>;

      return response;
    } catch (error: any) {
      throw error.response;
    } finally {
      is_loading_unit.value = false;
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

//--- CREATE MACHINE
const { mutate: createMachine, isPending: isLoadingCreate } = useMutation({
  mutationFn: async (payload: MachineCreateInterface) => {
    return await masterStore.createMachine(payload);
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

//--- UPDATE MACHINE
const { mutate: updateMachine, isPending: isLoadingUpdate } = useMutation({
  mutationFn: async ({
    id,
    payload,
  }: {
    id: string;
    payload: MachineCreateInterface;
  }) => {
    return await masterStore.updateMachine(id, payload);
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
    updateMachine({
      id: props.selectedValue?.uuid,
      payload: model.value,
    });
  } else {
    createMachine(model.value);
  }
};

const setValue = () => {
  model.value = {
    name: props.selectedValue?.name || "",
    unit_uuid: props.selectedValue?.unit_uuid || "",
  };
};

const resetValue = () => {
  model.value = {
    name: "",
    unit_uuid: "",
  };
};

const timeout_location = ref(0);
const searchUnit = () => {
  clearTimeout(timeout_location.value);
  timeout_location.value = window.setTimeout(() => {
    is_loading_unit.value = true;
    params_unit.currentPage = 1;
    refetchUnit();
  }, 1000);
};
const scrollUnit = (e: Event) => {
  const { scrollTop, scrollHeight, clientHeight } = e.target as HTMLElement;
  if (
    scrollTop + clientHeight >= scrollHeight - 1 &&
    hasNextPageUnit.value &&
    !isFetchingNextPageUnit.value
  ) {
    fetchNextPageUnit();
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
  [modelValue, dataUnit],
  ([newModel, newLocation]) => {
    if (props.selectedValue) {
      const new_data: OptionType[] =
        newLocation?.pages
          .flatMap((page) => page?.data)
          ?.map((item) => {
            return { value: item.uuid, label: item.name };
          }) || [];

      options_unit.value = mergeArrays(
        [
          {
            value: props.selectedValue.unit_uuid,
            label: props.selectedValue.unit?.name,
          },
        ],
        new_data.filter((item) => item.value !== props.selectedValue?.unit_uuid)
      );
    } else {
      const new_data: OptionType[] =
        newLocation?.pages
          .flatMap((page) => page?.data)
          ?.map((item) => {
            return { value: item.uuid, label: item.name };
          }) || [];

      options_unit.value = new_data;
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
    title="Tambah Mesin"
    v-model="modelValue"
  >
    <form
      class="flex flex-col gap-4 max-h-[calc(100vh-200px)] overflow-y-auto mx-[-20px] px-5"
      @submit.prevent="handleSubmit"
    >
      <Input v-model="model.name" :rules="rules.name" label="Nama" />
      <Select
        v-model="model.unit_uuid"
        label="Unit"
        options_label="label"
        options_value="value"
        v-model:model-search="params_unit.search"
        :search="true"
        :loading="is_loading_unit"
        :loading-next-page="isFetchingNextPageUnit"
        :rules="rules.unit_uuid"
        :options="options_unit"
        @scroll="scrollUnit"
        @search="searchUnit"
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
