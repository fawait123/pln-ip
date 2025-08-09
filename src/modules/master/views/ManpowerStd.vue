<script setup lang="ts">
import { computed, reactive, ref } from "vue";
import type { AxiosError } from "axios";

import { Button, Icon, ModalDelete, Table, Toast } from "@/components";
import { useMutation, useQuery } from "@tanstack/vue-query";
import type { IPagination, ResponseDocumentInterface } from "@/types/GlobalType";

import { useMasterStore } from "../stores/MasterStore";
import FormManpowerStd from "../components/FormManpowerStd.vue";
import FilterManpowerStd from "../components/FilterManpowerStd.vue";
import type { ManpowerStdCreateModelInterface, ManpowerStdInterface } from "../types/ManpowerStdType";
import { ColumnsManpowerStd } from "../constants/ManpowerStdConstant";

const dataForm = ref<ManpowerStdCreateModelInterface | null>(null)
const masterStore = useMasterStore();
const total_item = ref(0);
const params = reactive({
    search: "",
    filter: "",
    filters: [
        {
            group: "AND",
            operator: "NOT_NULL",
            column: "activity.equipment.scopeStandart.inspection_type_uuid",
            value: "",
        }
    ],
    currentPage: 1,
    perPage: 10,
});
const open_form = ref(false);
const open_delete = ref(false);
const selected_item = ref<ManpowerStdInterface | null>(null);
const toastRef = ref<InstanceType<typeof Toast> | null>(null);
const timeout = ref(0);

//--- GET SCOPE
const {
    data: dataScope,
    isFetching: isLoadingScope,
    refetch: refetchScope,
} = useQuery({
    queryKey: ["getManpowerStd"],
    queryFn: async () => {
        try {
            const { data } = await masterStore.getManpowerStd(params);
            const response = data.data as IPagination<ManpowerStdInterface[]>;
            total_item.value = response.total;

            return response;
        } catch (error: any) {
            const err = error as AxiosError;
            throw err.response;
        }
    },
    refetchOnWindowFocus: false,
});
//--- END

//--- DELETE SCOPE
const { mutate: deleteScope, isPending: isLoadingDelete } = useMutation({
    mutationFn: async (id: string) => {
        return await masterStore.deleteManpowerStd(id);
    },
    onSuccess: () => {
        toastRef.value?.showToast({
            title: "Success",
            description: "Deleted successfully",
            type: "success",
        });
        open_delete.value = false;
        refetchScope();
    },
    onError: (error: any) => {
        toastRef.value?.showToast({
            title: "Error",
            description: error?.response?.data?.message || "Something went wrong",
            type: "error",
        });
    },
});
//--- END

const pagination = computed(() => {
    return {
        totalItems: total_item.value,
        itemsPerPage: params.perPage,
        currentPage: params.currentPage,
    };
});

const changePage = (e: number) => {
    params.currentPage = e;
    refetchScope();
};

const changeLimit = (e: string) => {
    params.perPage = parseInt(e);
    params.currentPage = 1;
    refetchScope();
};

const searchTable = () => {
    clearTimeout(timeout.value);
    timeout.value = window.setTimeout(() => {
        params.currentPage = 1;
        refetchScope();
    }, 1000);
};

const handleSuccess = () => {
    toastRef.value?.showToast({
        title: "Success",
        description: "Saved successfully",
        type: "success",
    });
    params.currentPage = 1;
    refetchScope();
};

const handleError = (error: any) => {
    toastRef.value?.showToast({
        title: "Error",
        description: error?.response?.data?.message || "Something went wrong",
        type: "error",
    });
};

const handleCreate = () => {
    selected_item.value = null;
    open_form.value = true;
};

const handleUpdate = (item: ManpowerStdInterface) => {
    selected_item.value = item;
    open_form.value = true;
};

const handleDelete = (item: ManpowerStdInterface) => {
    selected_item.value = item;
    open_delete.value = true;
};

const onDelete = () => {
    deleteScope(selected_item.value?.uuid as string);
};

const setFilter = () => {
    params.filters = [
        {
            group: "AND",
            operator: "NOT_NULL",
            column: "inspection_type_uuid",
            value: "",
        },
        {
            group: "AND",
            operator: "EQ",
            column: "inspection_type_uuid",
            value: String(dataForm.value?.inspection_type_uuid),
        },
        {
            group: "AND",
            operator: "EQ",
            column: "sub_bidang_uuid",
            value: String(dataForm.value?.sub_bidang_uuid),
        }
    ];
}

const resetFilter = () => {
    dataForm.value = null;
    params.filters = [
        {
            group: "AND",
            operator: "NOT_NULL",
            column: "inspection_type_uuid",
            value: "",
        }
    ];
}

const handleOnFilter = (data: ManpowerStdCreateModelInterface) => {
    dataForm.value = data;
    setFilter()
    refetchScope();
}

const handleResetFilter = () => {
    resetFilter()
    refetchScope();
}

const previewDocument = (document: ResponseDocumentInterface) => {
    window.open(import.meta.env.VITE_API_BASE_URL.replace("api", "") + document.document_link, '_blank')
}

const handleRemoveSuccess = () => {
    refetchScope();
}
</script>

<template>
    <Toast ref="toastRef" />
    <ModalDelete v-model="open_delete" :title="selected_item?.uuid" :loading="isLoadingDelete" @delete="onDelete" />
    <div class="relative w-full">
        <Button v-if="dataForm?.activity_uuid" icon_only="plus" class="absolute right-0" size="sm" rounded="full"
            color="blue" @click="handleCreate" />

        <div class="flex gap-8">
            <div class="w-[330px]">
                <FilterManpowerStd @filter="handleOnFilter" @reset-filter="handleResetFilter"
                    :loading="isLoadingScope" />
            </div>
            <div class="w-full">
                <Table label-create="User" :columns="ColumnsManpowerStd" :entities="dataScope?.data || []"
                    :loading="isLoadingScope" :pagination="pagination" :is-create="false"
                    v-model:model-search="params.search" @change-page="changePage" @change-limit="changeLimit"
                    @search="searchTable">
                    <template #column_action="{ entity }">
                        <div class="flex items-center justify-center gap-4">
                            <Icon name="pencil" class="icon-action-table" @click="handleUpdate(entity)" />
                            <Icon name="trash" class="icon-action-table" @click="handleDelete(entity)" />
                        </div>
                    </template>
                    <template #column_manpower="{ entity }">
                        <p class="text-base text-neutral-50 text-left underline cursor-pointer">
                            {{ entity.manpower?.name ?? "-" }}
                        </p>
                    </template>
                </Table>
            </div>
        </div>

        <FormManpowerStd :data-form="dataForm" v-model="open_form" :selected-value="selected_item"
            @success="handleSuccess" @error="handleError" @removeSucess="handleRemoveSuccess" />
    </div>
</template>
