<template>
  <section class="h-[100vh] lg:h-[80vh] bg-white w-full relative bg-opacity-20">
    <img
      v-if="background"
      :class="` ${
        bgStyle === 'half'
          ? 'md:w-1/2 right-0 border-b-[24px] border-product'
          : 'w-full'
      } h-1/2 lg:h-full  object-cover absolute z-0`"
      :src="background"
      alt=""
    />
    <div
      v-if="bgStyle !== 'half'"
      class="overlay z-0 hidden lg:block bg-gradient-to-t lg:bg-gradient-to-r from-white via-white h-full absolute w-screen lg:w-2/3"
    ></div>
    <div class="container h-full flex items-center">
      <div
        class="flex flex-col z-10 absolute px-4 lg:px-0 lg:relative max-w-[566px] lg:text-left bottom-10 left-0 lg:bottom-auto text-center"
      >
        <h2 class="text-3xl lg:text-5xl mb-6">{{ title }}</h2>
        <h4 class="text-lg lg:text-xl mb-12" v-if="caption">
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
