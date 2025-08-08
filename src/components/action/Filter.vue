<script setup lang="ts">
import { PopoverArrow, PopoverClose, PopoverContent, PopoverPortal, PopoverRoot, PopoverTrigger } from 'radix-vue'
import { Icon } from '..';
import { computed, type PropType } from 'vue';

type Size = "lg" | "md" | "sm";
const props = defineProps({
    class: {
        type: String
    },
    size: {
        type: String as PropType<Size>,
        default: "md",
        validator: function (value: string) {
            return ["lg", "md", "sm"].indexOf(value) !== -1;
        },
    },
    title: {
        type: String,
    }
});

const propsSize = computed(() => {
    let size = 'w-[260px]';
    if (props.size == "md") {
        size = 'w-[400px]'
    }

    if (props.size == 'lg') {
        size = 'w-[600px]'
    }

    return size;
})
</script>

<template>
    <PopoverRoot>
        <PopoverTrigger :class="props.class" aria-label="Update dimensions">
            <slot />
        </PopoverTrigger>
        <PopoverPortal>
            <PopoverContent side="bottom" :side-offset="5"
                :class="['rounded p-5 bg-white shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2)] focus:shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2),0_0_0_2px_theme(colors.green7)] will-change-[transform,opacity] data-[state=open]:data-[side=top]:animate-slideDownAndFade data-[state=open]:data-[side=right]:animate-slideLeftAndFade data-[state=open]:data-[side=bottom]:animate-slideUpAndFade data-[state=open]:data-[side=left]:animate-slideRightAndFade', propsSize]">
                <div class="flex flex-col gap-2.5">
                    <p class="text-blue-950 text-[15px] leading-[19px] font-semibold mb-2.5">
                        {{ props.title }}
                    </p>
                    <slot name="content" />
                </div>
                <PopoverClose
                    class="rounded-full bg-blue-900 h-[25px] w-[25px] inline-flex items-center justify-center text-grass11 absolute top-[5px] right-[5px] hover:bg-green4 focus:shadow-[0_0_0_2px] focus:shadow-green7 outline-none cursor-default"
                    aria-label="Close">
                    <Icon name="close-circle" />
                </PopoverClose>
                <PopoverArrow class="fill-white" />
            </PopoverContent>
        </PopoverPortal>
    </PopoverRoot>
</template>