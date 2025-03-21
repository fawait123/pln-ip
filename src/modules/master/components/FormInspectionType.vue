<script setup lang="ts">
import { reactive, ref, computed, type PropType, watch } from "vue";

import { Button, Input, Modal, Select } from "@/components";
import useVuelidate from "@vuelidate/core";
import { required, helpers } from "@vuelidate/validators";
import { useInfiniteQuery, useMutation } from "@tanstack/vue-query";
import { all_characters, mergeArrays } from "@/helpers/global";
import type { IPagination, IParams } from "@/types/GlobalType";

import type {
  InspectionTypeCreateInterface,
  InspectionTypeInterface,
} from "../types/InspectionType";
import { useMasterStore } from "../stores/MasterStore";
import type { MachineInterface } from "../types/MachineType";

type OptionType = {
  value: string;
  label: string;
};

const props = defineProps({
  selectedValue: {
    type: Object as PropType<InspectionTypeInterface | null>,
  },
});

const emit = defineEmits(["success", "error"]);

const masterStore = useMasterStore();

const modelValue = defineModel<boolean>({ default: false });
const is_loading_machine = ref(false);
const options_machine = ref<OptionType[]>([]);

const model = ref<InspectionTypeCreateInterface>({
  name: "",
  machine_uuid: "",
});
const v$_form = reactive(useVuelidate());
const rules = computed(() => {
  return {
    name: {
      required: helpers.withMessage(`This field is required`, required),
    },
    machine_uuid: {
      required: helpers.withMessage(`This field is required`, required),
    },
  };
});

//--- GET MACHINE
const params_machine = reactive<IParams>({
  search: "",
  filter: "",
  currentPage: 1,
  perPage: 10,
});
const {
  data: dataMachine,
  refetch: refetchMachine,
  fetchNextPage: fetchNextPageMachine,
  hasNextPage: hasNextPageMachine,
  isFetchingNextPage: isFetchingNextPageMachine,
} = useInfiniteQuery({
  queryKey: ["getMachineMachine"],
  enabled: !props.selectedValue && !is_loading_machine.value,
  queryFn: async ({ pageParam = 1 }) => {
    try {
      const { data } = await masterStore.getMachine({
        ...params_machine,
        currentPage: pageParam,
      });

      const response = data.data as IPagination<MachineInterface[]>;

      return response;
    } catch (error: any) {
      throw error.response;
    } finally {
      is_loading_machine.value = false;
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

//--- CREATE INSPECTION TYPE
const { mutate: createInspectionType, isPending: isLoadingCreate } =
  useMutation({
    mutationFn: async (payload: InspectionTypeCreateInterface) => {
      return await masterStore.createInspectionType(payload);
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

//--- UPDATE INSPECTION TYPE
const { mutate: updateInspectionType, isPending: isLoadingUpdate } =
  useMutation({
    mutationFn: async ({
      id,
      payload,
    }: {
      id: string;
      payload: InspectionTypeCreateInterface;
    }) => {
      return await masterStore.updateInspectionType(id, payload);
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
    updateInspectionType({
      id: props.selectedValue?.uuid,
      payload: model.value,
    });
  } else {
    createInspectionType(model.value);
  }
};

const setValue = () => {
  model.value = {
    name: props.selectedValue?.name || "",
    machine_uuid: props.selectedValue?.machine_uuid || "",
  };
};

const resetValue = () => {
  model.value = {
    name: "",
    machine_uuid: "",
  };
};

const timeout_machine = ref(0);
const searchMachine = () => {
  clearTimeout(timeout_machine.value);
  timeout_machine.value = window.setTimeout(() => {
    is_loading_machine.value = true;
    params_machine.currentPage = 1;
    refetchMachine();
  }, 1000);
};
const scrollMachine = (e: Event) => {
  const { scrollTop, scrollHeight, clientHeight } = e.target as HTMLElement;
  if (
    scrollTop + clientHeight >= scrollHeight - 1 &&
    hasNextPageMachine.value &&
    !isFetchingNextPageMachine.value
  ) {
    fetchNextPageMachine();
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
  [modelValue, dataMachine],
  ([newModel, newLocation]) => {
    if (props.selectedValue) {
      const new_data: OptionType[] =
        newLocation?.pages
          .flatMap((page) => page?.data)
          ?.map((item) => {
            return { value: item.uuid, label: item.name };
          }) || [];

      options_machine.value = mergeArrays(
        [
          {
            value: props.selectedValue.machine_uuid,
            label: props.selectedValue.machine?.name,
          },
        ],
        new_data.filter(
          (item) => item.value !== props.selectedValue?.machine_uuid
        )
      );
    } else {
      const new_data: OptionType[] =
        newLocation?.pages
          .flatMap((page) => page?.data)
          ?.map((item) => {
            return { value: item.uuid, label: item.name };
          }) || [];

      options_machine.value = new_data;
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
    title="Tambah Tipe Inspeksi"
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
        v-model="model.machine_uuid"
        label="Mesin"
        options_label="label"
        options_value="value"
        v-model:model-search="params_machine.search"
        :search="true"
        :loading="is_loading_machine"
        :loading-next-page="isFetchingNextPageMachine"
        :rules="rules.machine_uuid"
        :options="options_machine"
        @scroll="scrollMachine"
        @search="searchMachine"
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
