<template>
  <section class="h-[80vh] bg-white w-full relative bg-opacity-20">
    <img
      :class="` ${
        bgStyle === 'half'
          ? 'md:w-1/2 right-0 border-b-[24px] border-product'
          : 'w-full'
      } h-full  object-cover absolute z-0`"
      :src="background"
      alt=""
    />
    <div
      v-if="bgStyle !== 'half'"
      class="overlay z-0 bg-gradient-to-r from-white via-white h-full absolute w-2/3"
    ></div>
    <div class="container mx-auto h-full flex items-center">
      <div class="flex flex-col z-10 relative max-w-[566px] text-left">
        <h2 class="text-5xl mb-6">{{ title }}</h2>
        <h4 class="text-xl mb-12" v-if="caption">
          {{ caption }}
        </h4>
        <slot name="cta" />
      </div>
    </div>
  </section>
</template>
<script setup>
const { title, caption, background, bgStyle } = defineProps([
  "title",
  "caption",
  "background",
  "bgStyle",
]);
</script>
