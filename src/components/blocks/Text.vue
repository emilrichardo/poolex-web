<template>
  <section :class="`block_text  ${(content.headings.align === 'center' && 'text-center') ||
    (content.headings.align === 'left' && '') ||
    (content.headings.align === 'right' && 'text-right')
    } ${padding[content.internal_margin]}`" :style="`${!content?.background?.Gradient && content?.background?.Background_color ?
    'background-color:' + content.background?.Background_color : 'background:linear-gradient(to ' + content.background?.bg_direction + ',' + content.background?.Background_color + ',' + content?.background?.Background_color_secondary + ')'
    }`">
    <div :class="`container max-w-[730px] ${content?.headings?.text_color === 'light'
      ? 'text-light'
      : 'text-dark'
      } `">
      <h4 class="text-xl lg:text-2xl font-semibold mb-4 lg:mb-8" v-if="content.headings">
        {{ content.headings?.sub_headline }}
      </h4>
      <h2 class="text-2xl lg:text-4xl font-medium mb-4 lg:mb-8" v-if="content.headings">
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
