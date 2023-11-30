<template>
  <section
    class="min-h-[100vh] lg:h-[80vh] bg-white w-full relative bg-opacity-20"
  >
    <NuxtImg
      v-if="content.image?.image?.data?.attributes?.url"
      :class="` ${
        content.image_width === 'half'
          ? 'md:w-1/2 right-0 border-b-[24px] border-product'
          : 'w-full'
      } h-1/2 lg:h-full  object-cover absolute z-0`"
      :src="content.image?.image?.data?.attributes?.url"
      alt="hero"
    />

    <div
      v-if="content.image_width !== 'half'"
      class="overlay z-0 hidden lg:block bg-gradient-to-t lg:bg-gradient-to-r from-white via-white h-full absolute w-screen lg:w-2/3"
    ></div>
    <div class="container h-full flex items-center">
      <div
        class="flex flex-col justify-center z-10 absolute h-1/2 px-4 lg:px-0 lg:relative max-w-[566px] lg:text-left bottom-10 left-0 lg:bottom-auto text-center"
      >
        <h2 class="text-3xl lg:text-5xl mb-6">
          {{ content.headings?.headline }}
        </h2>
        <h4 class="text-lg lg:text-xl mb-12" v-if="content.headings?.caption">
          {{ content.headings?.caption }}
        </h4>
      </div>
    </div>
  </section>
</template>
<script setup>
const { content } = defineProps(["content"]);
</script>
