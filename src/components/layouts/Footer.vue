<script setup lang="ts">
import { Icon } from "@/components";
</script>

<template>
  <div class="pln-footer">
    <div class="footer-title">
      <p class="footer-title--title">Generate Scope</p>
      <p class="footer-title--subtitle">Website</p>
      <a class="footer-title--url">www.plnindonesiapower.co.id</a>
    </div>
    <div class="office">
      <p>Office</p>
      <p>
        Jl. K.S. Tubun No.8 6, RT.6/RW.1, Kota Bambu Sel., Kec. Palmerah, Kota
        Jakarta Barat, Daerah Khusus Ibukota Jakarta 11420
      </p>
    </div>
    <div class="link">
      <p class="link--title">Link</p>
      <div class="link--wrapper">
        <a>About Us</a>
        <a>Feature</a>
        <a>Contact</a>
      </div>
    </div>
    <div class="social-media">
      <p class="social-media--title">Social Media</p>
      <div class="social-media--wrapper">
        <div class="social-media-icon">
          <Icon name="instagram" class="text-neutral-950 text-lg" />
        </div>
        <div class="social-media-icon">
          <Icon name="facebook" class="text-neutral-950 text-lg" />
        </div>
        <div class="social-media-icon">
          <Icon name="twitter" class="text-neutral-950 text-lg" />
        </div>
        <div class="social-media-icon">
          <Icon name="whatsapp" class="text-neutral-950 text-lg" />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="sass">
.pln-footer
  @apply bg-neutral-950 bg-opacity-50 p-4 grid grid-cols-[20%_30%_10%_40%] gap-6
  .footer-title
    @apply text-neutral-50
    &--title
      @apply text-lg font-extrabold
    &--subtitle
      @apply mt-3 text-sm font-extrabold
    &--url
      @apply mt-1 text-sm cursor-pointer
  .social-media
    @apply flex flex-col gap-3
    &--title
      @apply text-neutral-50 text-sm font-extrabold
    &--wrapper
      @apply flex items-center gap-4
      .social-media-icon
        @apply w-10 h-10 bg-white rounded-full flex items-center justify-center
  .link
    @apply flex flex-col gap-4
    &--title
      @apply text-neutral-50 text-sm font-extrabold
    &--wrapper
      @apply flex flex-col gap-1
      > a
        @apply cursor-pointer text-sm text-neutral-50
  .office
    @apply flex flex-col gap-4
    > p
      @apply text-neutral-50 text-sm
      &:first-child
        @apply font-extrabold
</style>
