<script setup lang="ts">
import { reactive, ref, computed, type PropType, watch } from "vue";

import { Button, Input, Modal, Select } from "@/components";
import useVuelidate from "@vuelidate/core";
import { required, helpers } from "@vuelidate/validators";
import { useInfiniteQuery, useMutation } from "@tanstack/vue-query";
import { all_characters, mergeArrays } from "@/helpers/global";
import type { IPagination, IParams } from "@/types/GlobalType";

import type {
  SubBidangCreateInterface,
  SubBidangInterface,
} from "../types/SubBidangType";
import { useMasterStore } from "../stores/MasterStore";
import type { BidangInterface } from "../types/BidangType";

type OptionType = {
  value: string;
  label: string;
};

const props = defineProps({
  selectedValue: {
    type: Object as PropType<SubBidangInterface | null>,
  },
});

const emit = defineEmits(["success", "error"]);

const masterStore = useMasterStore();

const modelValue = defineModel<boolean>({ default: false });
const is_loading_bidang = ref(false);
const options_bidang = ref<OptionType[]>([]);

const model = ref<SubBidangCreateInterface>({
  name: "",
  bidang_uuid: "",
});
const v$_form = reactive(useVuelidate());
const rules = computed(() => {
  return {
    name: {
      required: helpers.withMessage(`This field is required`, required),
    },
    bidang_uuid: {
      required: helpers.withMessage(`This field is required`, required),
    },
  };
});

//--- GET BIDANG
const params_bidang = reactive<IParams>({
  search: "",
  filter: "",
  currentPage: 1,
  perPage: 10,
});
const {
  data: dataBidang,
  refetch: refetchBidang,
  fetchNextPage: fetchNextPageBidang,
  hasNextPage: hasNextPageBidang,
  isFetchingNextPage: isFetchingNextPageBidang,
} = useInfiniteQuery({
  queryKey: ["getBidangSubBidang"],
  enabled: !props.selectedValue && !is_loading_bidang.value,
  queryFn: async ({ pageParam = 1 }) => {
    try {
      const { data } = await masterStore.getBidang({
        ...params_bidang,
        currentPage: pageParam,
      });

      const response = data.data as IPagination<BidangInterface[]>;

      return response;
    } catch (error: any) {
      throw error.response;
    } finally {
      is_loading_bidang.value = false;
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

//--- CREATE SUBBIDANG
const { mutate: createSubBidang, isPending: isLoadingCreate } = useMutation({
  mutationFn: async (payload: SubBidangCreateInterface) => {
    return await masterStore.createSubBidang(payload);
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

//--- UPDATE SUBBIDANG
const { mutate: updateSubBidang, isPending: isLoadingUpdate } = useMutation({
  mutationFn: async ({
    id,
    payload,
  }: {
    id: string;
    payload: SubBidangCreateInterface;
  }) => {
    return await masterStore.updateSubBidang(id, payload);
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
    updateSubBidang({
      id: props.selectedValue?.uuid,
      payload: model.value,
    });
  } else {
    createSubBidang(model.value);
  }
};

const setValue = () => {
  model.value = {
    name: props.selectedValue?.name || "",
    bidang_uuid: props.selectedValue?.bidang_uuid || "",
  };
};

const resetValue = () => {
  model.value = {
    name: "",
    bidang_uuid: "",
  };
};

const timeout_bidang = ref(0);
const searchBidang = () => {
  clearTimeout(timeout_bidang.value);
  timeout_bidang.value = window.setTimeout(() => {
    is_loading_bidang.value = true;
    params_bidang.currentPage = 1;
    refetchBidang();
  }, 1000);
};
const scrollBidang = (e: Event) => {
  const { scrollTop, scrollHeight, clientHeight } = e.target as HTMLElement;
  if (
    scrollTop + clientHeight >= scrollHeight - 1 &&
    hasNextPageBidang.value &&
    !isFetchingNextPageBidang.value
  ) {
    fetchNextPageBidang();
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
  [modelValue, dataBidang],
  ([newModel, newBidang]) => {
    if (props.selectedValue) {
      const new_data: OptionType[] =
        newBidang?.pages
          .flatMap((page) => page?.data)
          ?.map((item) => {
            return { value: item.uuid, label: item.name };
          }) || [];

      options_bidang.value = mergeArrays(
        [
          {
            value: props.selectedValue.bidang_uuid,
            label: props.selectedValue.bidang?.name,
          },
        ],
        new_data.filter(
          (item) => item.value !== props.selectedValue?.bidang_uuid
        )
      );
    } else {
      const new_data: OptionType[] =
        newBidang?.pages
          .flatMap((page) => page?.data)
          ?.map((item) => {
            return { value: item.uuid, label: item.name };
          }) || [];

      options_bidang.value = new_data;
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
    title="Tambah Sub Bidang"
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
        v-model="model.bidang_uuid"
        label="Bidang"
        options_label="label"
        options_value="value"
        v-model:model-search="params_bidang.search"
        :search="true"
        :loading="is_loading_bidang"
        :loading-next-page="isFetchingNextPageBidang"
        :rules="rules.bidang_uuid"
        :options="options_bidang"
        @scroll="scrollBidang"
        @search="searchBidang"
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
