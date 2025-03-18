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
import { all_characters, numbers_positive_negative } from "@/helpers/global";

import type { LocationInterface } from "../types/LocationType";
import type { UnitInterface } from "../types/UnitType";
import type { MachineInterface } from "../types/MachineType";
import type { InspectionTypeInterface } from "../types/InspectionType";
import { useMasterStore } from "../stores/MasterStore";
import type {
  PartCreateInterface,
  PartCreateModelInterface,
  PartInterface,
} from "../types/PartType";

type OptionType = {
  value: string;
  label: string;
};

const props = defineProps({
  selectedValue: {
    type: Object as PropType<PartInterface | null>,
  },
});

const emit = defineEmits(["success", "error"]);

const masterStore = useMasterStore();

const queryClient = useQueryClient();
const modelValue = defineModel<boolean>({ default: false });
const is_loading_location = ref(false);
const options_location = ref<OptionType[]>([]);
const is_loading_unit = ref(false);
const options_unit = ref<OptionType[]>([]);
const is_loading_machine = ref(false);
const options_machine = ref<OptionType[]>([]);
const is_loading_inspection = ref(false);
const options_inspection = ref<OptionType[]>([]);

const model = ref<PartCreateModelInterface>({
  name: "",
  note: "",
  qty: "",
  no_drawing: "",
  global_unit_uuid: "",
  location_uuid: "",
  unit_uuid: "",
  machine_uuid: "",
  inspection_type_uuid: "",
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
    unit_uuid: {
      required: helpers.withMessage(`This field is required`, required),
    },
    machine_uuid: {
      required: helpers.withMessage(`This field is required`, required),
    },
    inspection_type_uuid: {
      required: helpers.withMessage(`This field is required`, required),
    },
    qty: {
      required: helpers.withMessage(`This field is required`, required),
    },
    note: {
      required: helpers.withMessage(`This field is required`, required),
    },
    no_drawing: {
      required: helpers.withMessage(`This field is required`, required),
    },
    global_unit_uuid: {
      required: helpers.withMessage(`This field is required`, required),
    },
  };
});

//--- GET LOCATION
const params_location = reactive<IParams>({
  search: "",
  filters: "",
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
  queryKey: ["getLocationManpower"],
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

//--- GET UNIT
const params_unit = reactive<IParams>({
  search: "",
  filters: "",
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
  queryKey: ["getUnitManpower"],
  enabled: false,
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

//--- GET MACHINE
const params_machine = reactive<IParams>({
  search: "",
  filters: "",
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
  queryKey: ["getMachineManpower"],
  enabled: false,
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

//--- GET INSPECTION
const params_inspection = reactive<IParams>({
  search: "",
  filters: "",
  currentPage: 1,
  perPage: 10,
});
const {
  data: dataInspection,
  refetch: refetchInspection,
  fetchNextPage: fetchNextPageInspection,
  hasNextPage: hasNextPageInspection,
  isFetchingNextPage: isFetchingNextPageInspection,
} = useInfiniteQuery({
  queryKey: ["getInspectionManpower"],
  enabled: false,
  queryFn: async ({ pageParam = 1 }) => {
    try {
      const { data } = await masterStore.getInspectionType({
        ...params_inspection,
        currentPage: pageParam,
      });

      const response = data.data as IPagination<InspectionTypeInterface[]>;

      return response;
    } catch (error: any) {
      throw error.response;
    } finally {
      is_loading_inspection.value = false;
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

//--- CREATE PART
const { mutate: createPart, isPending: isLoadingCreate } = useMutation({
  mutationFn: async (payload: PartCreateInterface) => {
    return await masterStore.createPart(payload);
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

//--- UPDATE PART
const { mutate: updatePart, isPending: isLoadingUpdate } = useMutation({
  mutationFn: async ({
    id,
    payload,
  }: {
    id: string;
    payload: PartCreateInterface;
  }) => {
    return await masterStore.updatePart(id, payload);
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
    updatePart({
      id: props.selectedValue?.uuid,
      payload: {
        name: model.value.name,
        qty: parseFloat(model.value.qty),
        note: model.value.note,
        no_drawing: model.value.no_drawing,
        global_unit_uuid: model.value.global_unit_uuid,
        additional_scope_uuid: null,
        inspection_type_uuid: model.value.inspection_type_uuid,
      },
    });
  } else {
    createPart({
      name: model.value.name,
      qty: parseFloat(model.value.qty),
      note: model.value.note,
      no_drawing: model.value.no_drawing,
      global_unit_uuid: model.value.global_unit_uuid,
      additional_scope_uuid: null,
      inspection_type_uuid: model.value.inspection_type_uuid,
    });
  }
};

const setValue = () => {
  model.value.name = props.selectedValue?.name || "";
  model.value.qty = props.selectedValue?.qty?.toString() || "";
  model.value.note = props.selectedValue?.note || "";
  model.value.no_drawing = props.selectedValue?.no_drawing || "";
};

const resetValue = () => {
  model.value = {
    name: "",
    location_uuid: "",
    unit_uuid: "",
    machine_uuid: "",
    inspection_type_uuid: "",
    note: "",
    no_drawing: "",
    qty: "",
    global_unit_uuid: "",
  };
  refetchLocation();
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

const timeout_unit = ref(0);
const searchUnit = () => {
  clearTimeout(timeout_unit.value);
  timeout_unit.value = window.setTimeout(() => {
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

const timeout_inspection = ref(0);
const searchInspection = () => {
  clearTimeout(timeout_inspection.value);
  timeout_inspection.value = window.setTimeout(() => {
    is_loading_inspection.value = true;
    params_inspection.currentPage = 1;
    refetchInspection();
  }, 1000);
};
const scrollInspection = (e: Event) => {
  const { scrollTop, scrollHeight, clientHeight } = e.target as HTMLElement;
  if (
    scrollTop + clientHeight >= scrollHeight - 1 &&
    hasNextPageInspection.value &&
    !isFetchingNextPageInspection.value
  ) {
    fetchNextPageInspection();
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
  () => model.value.location_uuid,
  (value) => {
    queryClient.removeQueries({ queryKey: ["getMachineManpower"] });
    queryClient.removeQueries({ queryKey: ["getInspectionManpower"] });
    model.value.unit_uuid = "";
    model.value.machine_uuid = "";
    model.value.inspection_type_uuid = "";
    params_unit.filters = `location_uuid,${value}`;
    refetchUnit();
  }
);

watch(
  () => model.value.unit_uuid,
  (value) => {
    queryClient.removeQueries({ queryKey: ["getInspectionManpower"] });
    model.value.machine_uuid = "";
    model.value.inspection_type_uuid = "";
    params_machine.filters = `unit_uuid,${value}`;
    refetchMachine();
  }
);

watch(
  () => model.value.machine_uuid,
  (value) => {
    model.value.inspection_type_uuid = "";
    params_inspection.filters = `machine_uuid,${value}`;
    refetchInspection();
  }
);

watch(
  [modelValue, dataLocation],
  ([_, newLocation]) => {
    if (props.selectedValue) {
      // const new_data: OptionType[] =
      //   newLocation?.pages
      //     .flatMap((page) => page?.data)
      //     ?.map((item) => {
      //       return { value: item.uuid, label: item.name };
      //     }) || [];
      // options_location.value = mergeArrays(
      //   [
      //     {
      //       value: props.selectedValue.location_uuid,
      //       label: props.selectedValue.location?.name,
      //     },
      //   ],
      //   new_data.filter(
      //     (item) => item.value !== props.selectedValue?.location_uuid
      //   )
      // );
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

watch(
  dataUnit,
  (newUnit) => {
    if (props.selectedValue) {
      // const new_data: OptionType[] =
      //   newUnit?.pages
      //     .flatMap((page) => page?.data)
      //     ?.map((item) => {
      //       return { value: item.uuid, label: item.name };
      //     }) || [];
      // options_unit.value = mergeArrays(
      //   [
      //     {
      //       value: props.selectedValue.lo,
      //       label: props.selectedValue.,
      //     },
      //   ],
      //   new_data.filter(
      //     (item) => item.value !== props.selectedValue?.location_uuid
      //   )
      // );
    } else {
      const new_data: OptionType[] =
        newUnit?.pages
          .flatMap((page) => page?.data)
          ?.map((item) => {
            return { value: item.uuid, label: item.name };
          }) || [];

      options_unit.value = new_data;
    }
  },
  { deep: true, immediate: true }
);

watch(
  dataMachine,
  (newMachine) => {
    if (props.selectedValue) {
      // const new_data: OptionType[] =
      //   newMachine?.pages
      //     .flatMap((page) => page?.data)
      //     ?.map((item) => {
      //       return { value: item.uuid, label: item.name };
      //     }) || [];
      // options_unit.value = mergeArrays(
      //   [
      //     {
      //       value: props.selectedValue.lo,
      //       label: props.selectedValue.,
      //     },
      //   ],
      //   new_data.filter(
      //     (item) => item.value !== props.selectedValue?.location_uuid
      //   )
      // );
    } else {
      const new_data: OptionType[] =
        newMachine?.pages
          .flatMap((page) => page?.data)
          ?.map((item) => {
            return { value: item.uuid, label: item.name };
          }) || [];

      options_machine.value = new_data;
    }
  },
  { deep: true, immediate: true }
);

watch(
  dataInspection,
  (newInspection) => {
    if (props.selectedValue) {
      // const new_data: OptionType[] =
      //   newInspection?.pages
      //     .flatMap((page) => page?.data)
      //     ?.map((item) => {
      //       return { value: item.uuid, label: item.name };
      //     }) || [];
      // options_unit.value = mergeArrays(
      //   [
      //     {
      //       value: props.selectedValue.lo,
      //       label: props.selectedValue.,
      //     },
      //   ],
      //   new_data.filter(
      //     (item) => item.value !== props.selectedValue?.location_uuid
      //   )
      // );
    } else {
      const new_data: OptionType[] =
        newInspection?.pages
          .flatMap((page) => page?.data)
          ?.map((item) => {
            return { value: item.uuid, label: item.name };
          }) || [];

      options_inspection.value = new_data;
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
        label="Nama"
        :rules="rules.name"
        :custom_symbols="all_characters"
      />
      <Input
        v-model="model.qty"
        label="Quantity"
        :rules="rules.qty"
        :custom_symbols="numbers_positive_negative"
      />
      <Input
        v-model="model.note"
        label="Note"
        :rules="rules.note"
        :custom_symbols="all_characters"
      />
      <Input
        v-model="model.no_drawing"
        label="No. Drawing"
        :rules="rules.no_drawing"
        :custom_symbols="all_characters"
      />
      <Input
        v-model="model.global_unit_uuid"
        label="Unit"
        disabled
        :rules="rules.global_unit_uuid"
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
      <Select
        v-model="model.inspection_type_uuid"
        label="Tipe Inspeksi"
        options_label="label"
        options_value="value"
        v-model:model-search="params_inspection.search"
        :search="true"
        :loading="is_loading_inspection"
        :loading-next-page="isFetchingNextPageInspection"
        :rules="rules.inspection_type_uuid"
        :options="options_inspection"
        @scroll="scrollInspection"
        @search="searchInspection"
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
