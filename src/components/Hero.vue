<template>
  <section class="h-[80vh] w-full relative bg-primary-100 bg-opacity-20">
    <img
      class="h-full w-full object-cover absolute z-0"
      :src="background"
      alt=""
    />
    <div
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
const { title, caption, background } = defineProps([
  "title",
  "caption",
  "background",
]);
</script>
