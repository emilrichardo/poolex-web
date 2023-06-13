<template>
  <section
    :class="`block_text  ${
      (content.headings.align === 'center' && 'text-center') ||
      (content.headings.align === 'left' && '') ||
      (content.headings.align === 'right' && 'text-right')
    } ${backgrounds[content.background?.colors]} ${
      padding[content.internal_margin]
    }`"
  >
    <div class="container max-w-[730px]">
      <h4
        class="text-xl lg:text-2xl font-semibold mb-4 lg:mb-8"
        v-if="content.headings"
      >
        {{ content.headings?.sub_headline }}
      </h4>
      <h2
        class="text-2xl lg:text-4xl font-medium mb-4 lg:mb-8"
        v-if="content.headings"
      >
        {{ content.headings?.headline }}
      </h2>
      <p class="text-lg lg:text-xl font-light" v-if="content.headings">
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
  light: "bg-light",
};
const padding = {
  xs: "py-4",
  sm: "py-8",
  md: "py-18",
  lg: "py-24",
  xl: "py-36",
};
</script>
