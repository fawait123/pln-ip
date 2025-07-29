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
} from "@/helpers/global";

import { useMasterStore } from "../stores/MasterStore";
import type {
    SequenceInterface,
    SequenceCreateModelInterface,
    SequenceCreateInterface,
} from "../types/SequenceTypes";
import { useRoute } from "vue-router";

const props = defineProps({
    selectedValue: {
        type: Object as PropType<SequenceInterface | null>,
    },
});

const emit = defineEmits(["success", "error"]);

const masterStore = useMasterStore();
const route = useRoute();
const modelValue = defineModel<boolean>({ default: false });
console.log(route.params?.id)
const model = ref<SequenceCreateModelInterface>({
    name: "",
    link: "",
    location_uuid: "",
    unit_uuid: "",
    machine_uuid: "",
    inspection_type_uuid: "",
    additional_scope_uuid: "",
});
const v$_form = reactive(useVuelidate());
const rules = computed(() => {
    return {
        name: {
            required: helpers.withMessage(`This field is required`, required),
        },
        link: {
            required: helpers.withMessage(`This field is required`, required),
        },
    };
});

//--- CREATE SEQUENCE
const { mutate: createHse, isPending: isLoadingCreate } = useMutation({
    mutationFn: async (payload: SequenceCreateInterface) => {
        return await masterStore.createSequence({
            name: payload.name,
            link: payload.link,
            inspection_type_uuid: null,
            additional_scope_uuid: String(route.params?.id),
        });
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

//--- UPDATE HSE
const { mutate: updateSequence, isPending: isLoadingUpdate } = useMutation({
    mutationFn: async ({
        id,
        payload,
    }: {
        id: string;
        payload: SequenceCreateInterface;
    }) => {
        return await masterStore.updateSequence(id, {
            name: payload.name,
            link: payload.link,
            inspection_type_uuid: null,
            additional_scope_uuid: String(route.params?.id),
        });
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
        updateSequence({
            id: props.selectedValue?.uuid,
            payload: {
                name: model.value.name,
                link: model.value.link,
                inspection_type_uuid: null,
                additional_scope_uuid: String(route.params?.id)
            },
        });
    } else {
        createHse({
            name: model.value.name,
            link: model.value.link,
            inspection_type_uuid: null,
            additional_scope_uuid: String(route.params?.id)
        });
    }
};

const setValue = () => {
    model.value.name = props.selectedValue?.name || "";
    model.value.link = props.selectedValue?.link || "";
};

const resetValue = () => {
    model.value = {
        name: "",
        link: "",
        location_uuid: "",
        unit_uuid: "",
        machine_uuid: "",
        inspection_type_uuid: "",
    };
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
</script>

<template>
    <Modal width="440" height="200" :showButtonClose="false" title="Tambah Unit" v-model="modelValue">
        <form class="flex flex-col gap-4 max-h-[calc(100vh-200px)] overflow-y-auto mx-[-20px] px-5"
            @submit.prevent="handleSubmit">
            <Input v-model="model.name" label="Nama" :rules="rules.name" :custom_symbols="all_characters" />
            <Input v-model="model.link" label="Link" :rules="rules.link" :custom_symbols="all_characters" />

            <div class="w-full flex items-center gap-4 mt-4">
                <Button text="Batal" class="w-full" variant="secondary" :disabled="isLoadingCreate || isLoadingUpdate"
                    @click="modelValue = false" />
                <Button type="submit" text="Simpan" class="w-full" color="blue"
                    :disabled="isLoadingCreate || isLoadingUpdate" :loading="isLoadingCreate || isLoadingUpdate" />
            </div>
        </form>
    </Modal>
</template>
