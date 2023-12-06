<template>
  <section class="py-24 bg-[#f0f4f8]" :id="`section-icons-${content.id}`">
    <div v-if="content.title" class="conyainer mb-16">
      <h3 v-if="content.title" class="text-2xl text-center lg:text-4xl font-medium mb-4 lg:mb-8">
        {{ content.title }}
      </h3>
      <hr class="border-b mx-auto w-4/5 border-[#eaedf0] last:border-[6px]" />
    </div>

    <div :class="`container flex flex-wrap gap-y-6 gap-x-4 md:gap-y-8 justify-center items-center ${content.icons.length > 6 ? ' ' : ' max-w-[1100px]'
      }`">
      <div v-for="icon in content.icons" :class="`neomorphism max-w-[300px] p-3 sm:p-6 rounded-md item-icon flex items-center flex-col sm:flex-row bg-[#f0f4f8]  ${content.icons.length > 6
        ? 'w-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4'
        : 'w-full sm:basis-1/2 md:basis-1/3 '
        }`">
        <NuxtImg v-if="icon.icon?.data?.attributes?.url" :src="icon.icon?.data?.attributes?.url" :alt="icon?.title"
          class="max-w-[140px]" />

        <h3 class="text-md lg:text-lg mt-6 sm:mt-0 sm:mr-2 text-left">
          {{ icon?.title }}
        </h3>
      </div>
    </div>
    <div class="container mt-16" v-if="content.footer">
      <p>{{ content?.footer }}</p>
    </div>
  </section>
</template>
<script setup>
const { content } = defineProps(["content"]);
</script>
