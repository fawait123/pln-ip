<script setup lang="ts">
import { reactive, ref, computed, type PropType, watch } from "vue";
import type { AxiosError } from "axios";

import { Button, Checkbox, Input, Modal } from "@/components";
import useVuelidate from "@vuelidate/core";
import { required, helpers } from "@vuelidate/validators";
import { useMutation, useQuery } from "@tanstack/vue-query";
import { all_characters } from "@/helpers/global";

import type {
  PermissionInterface,
  RoleCreateInterface,
  RoleInterface,
} from "../types/RoleType";
import { useMasterStore } from "../stores/MasterStore";

const props = defineProps({
  selectedValue: {
    type: Object as PropType<RoleInterface | null>,
  },
});

const emit = defineEmits(["success", "error"]);

const masterStore = useMasterStore();

const modelValue = defineModel<boolean>({ default: false });

const model = ref<RoleCreateInterface>({
  name: "",
  display_name: "",
  permissions: ["location"],
});
const v$_form = reactive(useVuelidate());
const rules = computed(() => {
  return {
    name: {
      required: helpers.withMessage(`This field is required`, required),
    },
    display_name: {
      required: helpers.withMessage(`This field is required`, required),
    },
  };
});
const model_permissions = ref<
  { name: string; display_name: string; id: number; value: boolean }[]
>([]);

//--- GET PERMISSIONS
const {
  data: dataPermissions,
  isFetching: isLoadingPermissions,
  refetch: refetchPermissions,
} = useQuery({
  queryKey: ["getPermissionsMaster"],
  queryFn: async () => {
    try {
      const { data } = await masterStore.getPermission();
      const response = data.data as PermissionInterface[];

      model_permissions.value = response.map((item) => ({
        id: item.id,
        name: item.name,
        display_name: item.display_name,
        value: false,
      }));

      return response;
    } catch (error: any) {
      const err = error as AxiosError;
      throw err.response;
    }
  },
  refetchOnWindowFocus: false,
});
//--- END

//--- CREATE ROLE
const { mutate: createRole, isPending: isLoadingCreate } = useMutation({
  mutationFn: async (payload: RoleCreateInterface) => {
    return await masterStore.createRole(payload);
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

//--- UPDATE ROLE
const { mutate: updateRole, isPending: isLoadingUpdate } = useMutation({
  mutationFn: async ({
    id,
    payload,
  }: {
    id: number;
    payload: RoleCreateInterface;
  }) => {
    return await masterStore.updateRole(id, payload);
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
    updateRole({
      id: props.selectedValue?.id,
      payload: {
        name: model.value.name,
        display_name: model.value.display_name,
        permissions: model_permissions.value
          .filter((item) => item.value === true)
          .map((item) => item.name),
      },
    });
  } else {
    createRole({
      name: model.value.name,
      display_name: model.value.display_name,
      permissions: model_permissions.value
        .filter((item) => item.value === true)
        .map((item) => item.name),
    });
  }
};

const setValue = () => {
  model.value = {
    name: props.selectedValue?.name || "",
    display_name: props.selectedValue?.display_name || "",
    permissions: [],
  };
  model_permissions.value = model_permissions.value.map((item) => {
    const find_item = props.selectedValue?.permissions?.find(
      (el) => el?.id === item?.id
    );

    if (find_item) {
      return {
        ...item,
        value: true,
      };
    } else {
      return {
        ...item,
        value: false,
      };
    }
  });
};

const resetValue = () => {
  model.value = {
    name: "",
    display_name: "",
    permissions: [],
  };
  model_permissions.value = model_permissions.value.map((item) => ({
    ...item,
    value: false,
  }));
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

const test = ref(true);
</script>

<template>
  <Modal
    width="440"
    height="200"
    :showButtonClose="false"
    title="Tambah Role"
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
      <Input
        v-model="model.display_name"
        :rules="rules.display_name"
        :custom_symbols="all_characters"
        label="Display Name"
      />
      <div class="w-full flex flex-col">
        <p class="text-sm font-bold text-neutral-950">Permissions</p>
        <div class="flex flex-col gap-2 mt-2">
          <Checkbox
            v-for="(item, key) in model_permissions"
            :key="key"
            :label="item.display_name"
            v-model="model_permissions[key].value"
          />
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
