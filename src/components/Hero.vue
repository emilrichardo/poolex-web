<template>
  <section class="min-h-[100vh] lg:h-[80vh] bg-white w-full relative bg-opacity-20">
    {{ content }}
    <NuxtImg v-if="background" :class="`  ${bgStyle === 'half'
      ? 'w-screen lg:w-1/2 right-0 border-b-[24px] border-product'
      : 'w-full'
      } h-[calc(46vh+90px)] md:h-[46vh] lg:h-full  object-cover lg:absolute z-0`" :src="background" alt="bg" />
    <div v-if="bgStyle !== 'half'"
      class="overlay z-0 hidden lg:block bg-gradient-to-t lg:bg-gradient-to-r from-white via-white h-full absolute w-screen lg:w-2/3">
    </div>
    <div class="container h-full flex items-center">
      <div
        class="flex flex-col justify-center z-10 min-h-[46vh] w-full lg:w-1/2 lg:min-h-min px-4 lg:pl-0 lg:pr-12 lg:relative lg:max-w-[566px] lg:text-left text-center pt-4 lg:pt-0">
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
const { title, caption, background, bgStyle, content } = defineProps([
  "title",
  "caption",
  "background",
  "bgStyle",
  "content",
]);
</script>
