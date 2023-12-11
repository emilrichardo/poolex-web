<template>
  <section :class="`min-h-screen lg:min-h-[80vh] bg-white w-full bg-opacity-20 ${content.image_width === 'half'
    ? 'grid grid-cols-12'
    : 'flex flex-col md:flex-row'
    }`">
    <div :class="`px-4 md:px-6 h-full max-w-[500px] mx-auto md:mx-0 flex items-center justify-center order-2 mdorder-1 ${content.image_width === 'half'
      ? 'md:col-span-6 col-span-12'
      : 'w-full'
      }`">
      <div class="flex flex-col justify-center h-full px-4 lg:px-0 lg:text-left text-center">
        <h2 class="text-3xl lg:text-5xl mb-6">
          {{ content.headings?.headline }}
        </h2>
        <h4 class="text-lg lg:text-xl mb-12" v-if="content.headings?.caption">
          {{ content.headings?.caption }}
        </h4>
      </div>
    </div>

    <NuxtImg v-if="content.image?.image?.data?.attributes?.url" :class="`${content.image_width === 'half'
      ? 'md:col-span-6 col-span-12 border-b-[24px] border-product'
      : 'w-full'
      } h-full object-cover order-1 md:order-2 `" :src="content.image?.image?.data?.attributes?.url" alt="hero" />
  </section>
</template>

<script setup>
const { content } = defineProps(["content"]);
</script>
