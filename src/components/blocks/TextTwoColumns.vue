<template>
  <section
    :class="`block_text  ${
      (content.headings?.align === 'center' && 'text-center') ||
      (content.headings?.align === 'left' && '') ||
      (content.headings?.align === 'right' && 'text-right')
    } ${backgrounds[content.background?.colors]} ${
      padding[content.internal_margin]
    }`"
  >
    <div class="container">
      <div :class="`grid gap-7 lg:gap-12 items-stretch  ${colsCounter}`">
        <div class="item flex flex-col" v-for="heading in content.headings">
          <h3 v-if="heading.headline" class="text-center text-2xl text-white">
            {{ heading.headline }}
          </h3>
          <div
            v-if="heading.caption"
            class="caption lg:h-full mina-h-[190px] bg-white px-14 py-8 xl:py-10 mt-5 lg:mt-8"
          >
            {{ heading.caption }}
          </div>
        </div>
      </div>
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
  xs: "pt-4",
  sm: "pt-8",
  md: "pt-18",
  lg: "pt-24",
  xl: "pt-36",
};

const colsCounter = computed(() => {
  if (content.headings.length === 1) {
    return "grid-cols-1 lg:grid-cols-1";
  } else if (content.headings.length === 2) {
    return "grid-cols-1 lg:grid-cols-2";
  } else if (content.headings.length === 3) {
    return "grid-cols-1 lg:grid-cols-2";
  }
});
</script>
<style>
.bg-product {
  color: white;
}
</style>
