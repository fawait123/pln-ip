<script setup lang="ts">
import { reactive, ref, computed, type PropType, watch } from "vue";

import { Button, Input, Modal, Select } from "@/components";
import useVuelidate from "@vuelidate/core";
import { required, helpers } from "@vuelidate/validators";
import { useInfiniteQuery, useMutation } from "@tanstack/vue-query";
import { all_characters, mergeArrays } from "@/helpers/global";
import type { IPagination, IParams } from "@/types/GlobalType";

import type {
  EquipmentCreateInterface,
  EquipmentInterface,
} from "../types/EquipmentType";
import { useMasterStore } from "../stores/MasterStore";
import type { ScopeInterface } from "../types/ScopeType";

type OptionType = {
  value: string;
  label: string;
};

const props = defineProps({
  selectedValue: {
    type: Object as PropType<EquipmentInterface | null>,
  },
});

const emit = defineEmits(["success", "error"]);

const masterStore = useMasterStore();

const modelValue = defineModel<boolean>({ default: false });
const is_loading_scope = ref(false);
const options_scope = ref<OptionType[]>([]);

const model = ref<EquipmentCreateInterface>({
  name: "",
  scope_standart_uuid: "",
});
const v$_form = reactive(useVuelidate());
const rules = computed(() => {
  return {
    name: {
      required: helpers.withMessage(`This field is required`, required),
    },
    scope_standart_uuid: {
      required: helpers.withMessage(`This field is required`, required),
    },
  };
});

//--- GET SCOPE
const params_scope = reactive<IParams>({
  search: "",
  filter: "",
  filters: [
    {
      group: "AND",
      operator: "NOT_NULL",
      column: "inspection_type_uuid",
      value: null,
    }
  ],
  currentPage: 1,
  perPage: 10,
});
const {
  data: dataScope,
  refetch: refetchScope,
  fetchNextPage: fetchNextPageScope,
  hasNextPage: hasNextPageScope,
  isFetchingNextPage: isFetchingNextPageScope,
} = useInfiniteQuery({
  queryKey: ["getScopeEquipment"],
  enabled: !props.selectedValue && !is_loading_scope.value,
  queryFn: async ({ pageParam = 1 }) => {
    try {
      const { data } = await masterStore.getScope({
        ...params_scope,
        currentPage: pageParam,
      });

      const response = data as IPagination<ScopeInterface[]>;

      return response;
    } catch (error: any) {
      throw error.response;
    } finally {
      is_loading_scope.value = false;
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

//--- CREATE EQUIPMENT
const { mutate: createEquipment, isPending: isLoadingCreate } = useMutation({
  mutationFn: async (payload: EquipmentCreateInterface) => {
    return await masterStore.createEquipment(payload);
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

//--- UPDATE EQUIPMENT
const { mutate: updateEquipment, isPending: isLoadingUpdate } = useMutation({
  mutationFn: async ({
    id,
    payload,
  }: {
    id: string;
    payload: EquipmentCreateInterface;
  }) => {
    return await masterStore.updateEquipment(id, payload);
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
    updateEquipment({
      id: props.selectedValue?.uuid,
      payload: model.value,
    });
  } else {
    createEquipment(model.value);
  }
};

const setValue = () => {
  model.value = {
    name: props.selectedValue?.name || "",
    scope_standart_uuid: props.selectedValue?.scope_standart_uuid || "",
  };
};

const resetValue = () => {
  model.value = {
    name: "",
    scope_standart_uuid: "",
  };
};

const timeout_scope = ref(0);
const searchScope = () => {
  clearTimeout(timeout_scope.value);
  timeout_scope.value = window.setTimeout(() => {
    is_loading_scope.value = true;
    params_scope.currentPage = 1;
    refetchScope();
  }, 1000);
};
const scrollScope = (e: Event) => {
  const { scrollTop, scrollHeight, clientHeight } = e.target as HTMLElement;
  if (
    scrollTop + clientHeight >= scrollHeight - 1 &&
    hasNextPageScope.value &&
    !isFetchingNextPageScope.value
  ) {
    fetchNextPageScope();
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
  [modelValue, dataScope],
  ([newModel, newScope]) => {
    if (props.selectedValue) {
      const new_data: OptionType[] =
        newScope?.pages
          .flatMap((page) => page?.data)
          ?.map((item) => {
            return { value: item.uuid, label: item.name };
          }) || [];
      options_scope.value = mergeArrays(
        [
          {
            value: props.selectedValue.scope_standart_uuid,
            label: props.selectedValue.scope_standart?.name,
          },
        ],
        new_data.filter(
          (item) => item.value !== props.selectedValue?.scope_standart_uuid
        )
      );
    } else {
      const new_data: OptionType[] =
        newScope?.pages
          .flatMap((page) => page?.data)
          ?.map((item) => {
            return { value: item?.uuid, label: item?.name };
          }) || [];
      options_scope.value = new_data;
    }
  },
  { deep: true, immediate: true }
);
</script>

<template>
  <Modal width="440" height="200" :showButtonClose="false" title="Tambah Equipment" v-model="modelValue">
    <form class="flex flex-col gap-4 max-h-[calc(100vh-200px)] overflow-y-auto mx-[-20px] px-5"
      @submit.prevent="handleSubmit">
      <Input v-model="model.name" :rules="rules.name" :custom_symbols="all_characters" label="Nama" />
      <Select v-model="model.scope_standart_uuid" label="Scope" options_label="label" options_value="value"
        v-model:model-search="params_scope.search" :search="true" :loading="is_loading_scope"
        :loading-next-page="isFetchingNextPageScope" :rules="rules.scope_standart_uuid" :options="options_scope"
        @scroll="scrollScope" @search="searchScope" />

      <div class="w-full flex items-center gap-4 mt-4">
        <Button text="Batal" class="w-full" variant="secondary" :disabled="isLoadingCreate || isLoadingUpdate"
          @click="modelValue = false" />
        <Button type="submit" text="Simpan" class="w-full" color="blue" :disabled="isLoadingCreate || isLoadingUpdate"
          :loading="isLoadingCreate || isLoadingUpdate" />
      </div>
    </form>
  </Modal>
</template>
