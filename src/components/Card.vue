<template>
  <div class="card bg-white rounded-lg overflow-hidden shadow-lg h-full">
    <div
      :class="` card-header py-3 px-4 text-light flex gap-3 items-center  ${
        isDraggable && 'cursor-move'
      }`"
    >
      <Icon
        v-if="isDraggable"
        size="24px"
        name="radix-icons:drag-handle-dots-2"
      ></Icon>
      <h3 class="text-lg">{{ title }}</h3>
      <Icon
        class="ml-auto mr-2"
        size="24px"
        name="radix-icons:dots-horizontal"
      ></Icon>
    </div>
    <div class="card-body h-full">
      <slot name="card-body" />
    </div>
  </div>
</template>
<script setup>
const { title, color } = defineProps(["title", "color", "isDraggable"]);
</script>
<style>
.card-header {
  --color: v-bind(color);
  background-color: var(--color);
}
</style>
