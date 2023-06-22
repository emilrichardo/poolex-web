<template>
  <section
    :class="`block_text py-24 ${
      (content.headings.align === 'center' && 'text-center') ||
      (content.headings.align === 'left' && '') ||
      (content.headings.align === 'right' && 'text-right')
    }`"
  >
    <div class="container max-w-[870px]">
      <h4 class="text-2xl font-semibold mb-8" v-if="content.headings">
        {{ content.headings?.sub_headline }}
      </h4>
      <h2 class="text-4xl font-light mb-8" v-if="content.headings">
        {{ content.headings?.headline }}
      </h2>
      <p class="text-xl font-light" v-if="content.headings">
        {{ content.headings?.caption }}
      </p>
    </div>
    <div
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-9 mx-auto mt-24 max-w-[870px]"
    >
      <div
        v-for="item in content.membership"
        class="item flex flex-col items-center"
      >
        <NuxtImg
          v-if="item.icon"
          :src="item.icon?.data?.attributes?.url"
          :alt="item.title"
          class="w-28 mb-4"
        />
        <h3
          class="text-md lg:text-xl font-semibold text-dark-100"
          v-if="item.title"
        >
          {{ item.title }}
        </h3>
      </div>
    </div>
  </section>
</template>

<script setup>
const { content } = defineProps(["content"]);
</script>
