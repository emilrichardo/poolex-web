<template>
  <div class="container max-w-[1024px] py-24">
    <h3 class="text-center text-3xl font-semibold mb-8" v-if="content.title">
      {{ content.title }}
    </h3>
    <ul
      class="grid grid-cols-2 bg-light rounded-lg shadow-lg shadog-[#C6DDFF] px-24 py-16 gap-8"
    >
      <li v-for="item in content.item" class="flex items">
        <Icon
          name="heroicons:check-circle-solid"
          class="flex-none text-product mr-4"
          size="32"
        ></Icon>
        <span>{{ item.item }}</span>
      </li>
    </ul>
  </div>
</template>
<script setup>
const { content } = defineProps(["content"]);
</script>
