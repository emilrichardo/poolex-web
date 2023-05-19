<template>
  <section
    :class="`block_text py-24 ${
      (content.headings.align === 'center' && 'text-center') ||
      (content.headings.align === 'left' && '') ||
      (content.headings.align === 'right' && 'text-right')
    } ${backgrounds[content.background.colors]}`"
  >
    <div class="container max-w-[730px]">
      <h4 class="text-2xl font-light mb-8" v-if="content.headings">
        {{ content.headings?.sub_headline }}
      </h4>
      <h2 class="text-4xl font-medium mb-8" v-if="content.headings">
        {{ content.headings?.headline }}
      </h2>
      <p class="text-xl font-light" v-if="content.headings">
        {{ content.headings?.caption }}
      </p>
    </div>
  </section>
</template>

<script setup>
const { content } = defineProps(["content"]);
const backgrounds = {
  primary: "bg-primary",
  default: "bg-default",
  product: "bg-product",
};
</script>
