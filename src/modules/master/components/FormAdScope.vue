<script setup lang="ts">
import { reactive, ref, computed, type PropType, watch } from "vue";
import { useRoute } from "vue-router";

import { Button, Icon, Input, Modal, Select } from "@/components";
import useVuelidate from "@vuelidate/core";
import { required, helpers } from "@vuelidate/validators";
import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/vue-query";
import type { IPagination, IParams } from "@/types/GlobalType";
import { all_characters, mergeArrays } from "@/helpers/global";

import { useMasterStore } from "../stores/MasterStore";
import type {
  ScopeCreateInterface,
  ScopeCreateModelInterface,
  ScopeInterface,
  ScopeUpdateInterface,
} from "../types/ScopeType";
import type { SubBidangInterface } from "../types/SubBidangType";

type OptionType = {
  value: string;
  label: string;
};

const props = defineProps({
  selectedValue: {
    type: Object as PropType<ScopeInterface | null>,
  },
});

const emit = defineEmits(["success", "error"]);

const masterStore = useMasterStore();

const route = useRoute();
const queryClient = useQueryClient();
const modelValue = defineModel<boolean>({ default: false });
const options_category = ref([
  { value: "mekanik", label: "Mekanik" },
  { value: "listrik", label: "Listrik" },
  { value: "instrument", label: "Instrument" },
]);
const is_loading_sub_bidang = ref(false);
const options_sub_bidang = ref<OptionType[]>([]);
const model_details = ref<{ name: string; id: string }[]>([
  { id: "0", name: "" },
]);

const model = ref<ScopeCreateModelInterface>({
  name: "",
  category: "",
  link: "",
  sub_bidang_uuid: "",
  additional_scope_uuid: route.params.id as string,
});
const v$_form = reactive(useVuelidate());
const rules = computed(() => {
  return {
    name: {
      required: helpers.withMessage(`This field is required`, required),
    },
    sub_bidang_uuid: {
      required: helpers.withMessage(`This field is required`, required),
    },
    category: {
      required: helpers.withMessage(`This field is required`, required),
    },
  };
});

//--- GET SUB BIDANG
const params_sub_bidang = reactive<IParams>({
  search: "",
  filters: "",
  currentPage: 1,
  perPage: 10,
});
const {
  data: dataSubBidang,
  refetch: refetchSubBidang,
  fetchNextPage: fetchNextPageSubBidang,
  hasNextPage: hasNextPageSubBidang,
  isFetchingNextPage: isFetchingNextPageSubBidang,
} = useInfiniteQuery({
  queryKey: ["getSubBidangScope"],
  enabled: !props.selectedValue && !is_loading_sub_bidang.value,
  queryFn: async ({ pageParam = 1 }) => {
    try {
      const { data } = await masterStore.getSubBidang({
        ...params_sub_bidang,
        currentPage: pageParam,
      });

      const response = data.data as IPagination<SubBidangInterface[]>;

      return response;
    } catch (error: any) {
      throw error.response;
    } finally {
      is_loading_sub_bidang.value = false;
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

//--- CREATE SCOPE
const { mutate: createScope, isPending: isLoadingCreate } = useMutation({
  mutationFn: async (payload: ScopeCreateInterface) => {
    console.log("PAYLOAD", payload);
    return await masterStore.createScope(payload);
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

//--- UPDATE SCOPE
const { mutate: updateScope, isPending: isLoadingUpdate } = useMutation({
  mutationFn: async ({
    id,
    payload,
  }: {
    id: string;
    payload: ScopeUpdateInterface;
  }) => {
    return await masterStore.updateScope(id, payload);
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
    const details =
      model_details.value.length === 1 && model_details.value?.[0]?.name === ""
        ? []
        : model_details.value.map((item) => {
            const find_item = props.selectedValue?.details?.find(
              (el) => el.uuid === item.id
            );

            if (find_item) {
              return {
                name: item.name,
                uuid: find_item.uuid,
              };
            } else {
              return {
                name: item.name,
                uuid: null,
              };
            }
          });

    updateScope({
      id: props.selectedValue?.uuid,
      payload: {
        name: model.value.name,
        additional_scope_uuid: model.value.additional_scope_uuid,
        category: model.value.category,
        link: model.value.link,
        details,
        sub_bidang_uuid: model.value.sub_bidang_uuid,
      },
    });
  } else {
    console.log("CREATEEE", model.value);
    createScope({
      name: model.value.name,
      additional_scope_uuid: model.value.additional_scope_uuid,
      category: model.value.category,
      link: model.value.link,
      sub_bidang_uuid: model.value.sub_bidang_uuid,
      details:
        model_details.value.length === 1 &&
        model_details.value?.[0]?.name === ""
          ? []
          : model_details.value
              .map((item) => ({ name: item.name }))
              .filter((item) => item.name !== ""),
    });
  }
};

const setValue = () => {
  model.value.name = props.selectedValue?.name || "";
  model.value.category = props.selectedValue?.category || "";
  model.value.link = props.selectedValue?.link || "";
  model.value.sub_bidang_uuid = props.selectedValue?.sub_bidang_uuid || "";
  model.value.additional_scope_uuid =
    props.selectedValue?.additional_scope_uuid || "";

  model_details.value =
    props.selectedValue?.details?.length === 0
      ? [{ name: "", id: "0" }]
      : props.selectedValue?.details?.map((item) => ({
          name: item.name,
          id: item.uuid,
        })) || [{ name: "", id: "0" }];
};

const resetValue = () => {
  model.value = {
    name: "",
    category: "",
    link: "",
    sub_bidang_uuid: "",
    additional_scope_uuid: route.params.id as string,
  };
  model_details.value = [{ name: "", id: "0" }];
};

const addDetails = () => {
  model_details.value = [
    ...model_details.value,
    { id: (model_details.value?.length + 1).toString(), name: "" },
  ];
};

const removeDetails = (id: string) => {
  if (model_details.value.length > 1) {
    model_details.value = model_details.value.filter((item) => item.id !== id);
  }
};

// sub bidang
const timeout_sub_bidang = ref(0);
const searchSubBidang = () => {
  clearTimeout(timeout_sub_bidang.value);
  timeout_sub_bidang.value = window.setTimeout(() => {
    is_loading_sub_bidang.value = true;
    params_sub_bidang.currentPage = 1;
    refetchSubBidang();
  }, 1000);
};
const scrollSubBidang = (e: Event) => {
  const { scrollTop, scrollHeight, clientHeight } = e.target as HTMLElement;
  if (
    scrollTop + clientHeight >= scrollHeight - 1 &&
    hasNextPageSubBidang.value &&
    !isFetchingNextPageSubBidang.value
  ) {
    fetchNextPageSubBidang();
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

// sub bidang
watch(
  dataSubBidang,
  (newSubBidang) => {
    if (props.selectedValue) {
      const new_data: OptionType[] =
        newSubBidang?.pages
          .flatMap((page) => page?.data)
          ?.map((item) => {
            return { value: item.uuid, label: item.name };
          }) || [];
      options_sub_bidang.value = mergeArrays(
        [
          {
            value: props.selectedValue?.sub_bidang_uuid,
            label: props.selectedValue?.sub_bidang?.name,
          },
        ],
        new_data.filter(
          (item) => item.value !== props.selectedValue?.sub_bidang_uuid
        )
      );
    } else {
      const new_data: OptionType[] =
        newSubBidang?.pages
          .flatMap((page) => page?.data)
          ?.map((item) => {
            return { value: item.uuid, label: item.name };
          }) || [];

      options_sub_bidang.value = new_data;
    }
  },
  { deep: true, immediate: true }
);
// end sub bidang
</script>

<template>
  <Modal
    width="440"
    height="200"
    :showButtonClose="false"
    title="Tambah Scope"
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
      <Select
        v-model="model.category"
        label="Kategori"
        options_label="label"
        options_value="value"
        :rules="rules.category"
        :options="options_category"
      />
      <Input
        v-model="model.link"
        label="Link"
        :custom_symbols="all_characters"
      />
      <Select
        v-model="model.sub_bidang_uuid"
        label="Sub Bidang"
        options_label="label"
        options_value="value"
        v-model:model-search="params_sub_bidang.search"
        :search="true"
        :loading="is_loading_sub_bidang"
        :loading-next-page="isFetchingNextPageSubBidang"
        :rules="rules.sub_bidang_uuid"
        :options="options_sub_bidang"
        @scroll="scrollSubBidang"
        @search="searchSubBidang"
      />
      <div>
        <div class="w-full flex justify-between items-center">
          <p class="text-sm font-bold text-neutral-950">Details</p>
          <button
            class="text-sm text-cyan-500 hover:text-cyan-600 font-bold"
            type="button"
            @click="addDetails"
          >
            Tambah
          </button>
        </div>
        <div class="flex flex-col gap-1">
          <div
            v-for="(item, key) in model_details"
            :key="key"
            class="w-full flex items-center gap-4 mt-2"
          >
            <Input
              v-model="model_details[key].name"
              :custom_symbols="all_characters"
            />
            <Icon
              v-if="model_details.length > 1"
              name="trash"
              class="text-red-500 cursor-pointer text-base hover:text-red-600"
              @click="removeDetails(item.id)"
            />
          </div>
        </div>
      </div>

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
