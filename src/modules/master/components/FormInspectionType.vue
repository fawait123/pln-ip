<script setup lang="ts">
import { reactive, ref, computed, type PropType, watch } from "vue";

import { Button, Input, Modal, Select } from "@/components";
import useVuelidate from "@vuelidate/core";
import { required, helpers } from "@vuelidate/validators";
import { useInfiniteQuery, useMutation, useQueryClient } from "@tanstack/vue-query";
import { all_characters, mergeArrays } from "@/helpers/global";
import type { IPagination, IParams } from "@/types/GlobalType";

import type {
  InspectionTypeCreateInterface,
  InspectionTypeInterface,
  InspectionTypeModelCreateInterface,
} from "../types/InspectionType";
import { useMasterStore } from "../stores/MasterStore";
import type { MachineInterface } from "../types/MachineType";
import type { LocationInterface } from "../types/LocationType";
import type { UnitInterface } from "../types/UnitType";

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
const queryClient = useQueryClient();
const modelValue = defineModel<boolean>({ default: false });
const is_loading_unit = ref(false);
const options_unit = ref<OptionType[]>([]);
const is_loading_location = ref(false);
const options_location = ref<OptionType[]>([]);
const is_loading_machine = ref(false);
const options_machine = ref<OptionType[]>([]);

const model = ref<InspectionTypeModelCreateInterface>({
  name: "",
  machine_uuid: "",
  location_uuid: "",
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
    location_uuid: {
      required: helpers.withMessage(`This field is required`, required),
    },
    machine_uuid: {
      required: helpers.withMessage(`This field is required`, required),
    },
  };
});


//--- GET UNIT
const params_unit = reactive<IParams>({
  search: "",
  filter: "",
  filters: [],
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
  queryKey: ["getUnitInspection"],
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
  queryKey: ["getLocationInspection"],
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
  queryKey: ["getMachineInspection"],
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
    location_uuid: props?.selectedValue?.machine?.unit?.location_uuid || "",
    unit_uuid: props.selectedValue?.machine?.unit_uuid || "",
  };
};

const resetValue = () => {
  model.value = {
    name: "",
    machine_uuid: "",
    location_uuid: props?.selectedValue?.machine?.unit?.location_uuid || "",
    unit_uuid: props.selectedValue?.machine?.unit_uuid || "",
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

// location
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
// end

const selectLocation = (e: OptionType) => {
  queryClient.removeQueries({ queryKey: ["getUnitInspection"] });
  queryClient.removeQueries({ queryKey: ["getMachineInspection"] });
  model.value.unit_uuid = "";
  model.value.machine_uuid = "";
  params_unit.filters = [
    {
      group: "AND",
      operator: "EQ",
      column: "location_uuid",
      value: e.value,
    }
  ];
  refetchUnit();
};

const selectUnit = (e: OptionType) => {
  queryClient.removeQueries({ queryKey: ["getMachineInspection"] });
  model.value.machine_uuid = "";
  params_machine.filters = [
    {
      group: "AND",
      operator: "EQ",
      column: "unit_uuid",
      value: e.value,
    }
  ];
  refetchMachine();
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
            value: props.selectedValue?.machine.unit?.location_uuid,
            label: props.selectedValue?.machine.unit?.location?.name,
          },
        ],
        new_data.filter(
          (item) => item.value !== props.selectedValue?.machine?.unit?.location_uuid
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

watch(
  [modelValue, dataUnit],
  ([newModel, newUnit]) => {
    if (props.selectedValue) {
      const new_data: OptionType[] =
        newUnit?.pages
          .flatMap((page) => page?.data)
          ?.map((item) => {
            return { value: item.uuid, label: item.name };
          }) || [];

      options_unit.value = mergeArrays(
        [
          {
            value: props.selectedValue.machine?.unit_uuid,
            label: props.selectedValue.machine?.unit?.name,
          },
        ],
        new_data.filter((item) => item.value !== props.selectedValue?.machine?.unit_uuid)
      );
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
  <Modal width="440" height="200" :showButtonClose="false"
    :title="props.selectedValue ? 'Ubah Tipe Inspeksi' : 'Tambah Tipe Inspeksi'" v-model="modelValue">
    <form class="flex flex-col gap-4 max-h-[calc(100vh-200px)] overflow-y-auto mx-[-20px] px-5"
      @submit.prevent="handleSubmit">
      <Select v-model="model.location_uuid" label="Lokasi" options_label="label" options_value="value"
        v-model:model-search="params_location.search" :search="true" :loading="is_loading_location"
        :loading-next-page="isFetchingNextPageLocation" :rules="rules.location_uuid" :options="options_location"
        @scroll="scrollLocation" @search="searchLocation" @select="selectLocation" />
      <Select v-model="model.unit_uuid" label="Unit" options_label="label" options_value="value"
        v-model:model-search="params_unit.search" :search="true" :loading="is_loading_unit"
        :loading-next-page="isFetchingNextPageUnit" :rules="rules.unit_uuid" :options="options_unit"
        @scroll="scrollUnit" @search="searchUnit" @select="selectUnit" />
      <Select v-model="model.machine_uuid" label="Mesin" options_label="label" options_value="value"
        v-model:model-search="params_machine.search" :search="true" :loading="is_loading_machine"
        :loading-next-page="isFetchingNextPageMachine" :rules="rules.machine_uuid" :options="options_machine"
        @scroll="scrollMachine" @search="searchMachine" />
      <Input v-model="model.name" :rules="rules.name" :custom_symbols="all_characters" label="Nama Inspeksi" />

      <div class="w-full flex items-center gap-4 mt-4">
        <Button text="Batal" class="w-full" variant="secondary" :disabled="isLoadingCreate || isLoadingUpdate"
          @click="modelValue = false" />
        <Button type="submit" text="Simpan" class="w-full" color="blue" :disabled="isLoadingCreate || isLoadingUpdate"
          :loading="isLoadingCreate || isLoadingUpdate" />
      </div>
    </form>
  </Modal>
</template>
