<template>
  <div class="container max-w-screen-lg py-24">
    <h3 class="text-center text-3xl font-semibold mb-8" v-if="content.title">
      {{ content.title }}
    </h3>
    <ul
      class="grid grid-cols-1 md:grid-cols-2 bg-light/50 rounded-lg shadow-lg shadog-[#C6DDFF] px-5 py-4 sm:p-10 lg:p-14 gap-3 sm:gap-4 md:gap-6"
    >
      <li v-for="item in content.item" class="flex items-start items">
        <Icon
          name="heroicons:check-circle-solid"
          class="flex-none text-product mr-1.5 mt-0.5 sm:mr-2 md:mt-0 lg:mr-3 lg:-mt-1 w-5 md:w-6 lg:w-8 aspect-square"
          size="none"
        ></Icon>
        <span>{{ item.item }}</span>
      </li>
    </ul>
  </div>
</template>
<script setup>
const { content } = defineProps(["content"]);
</script>
