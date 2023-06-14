<template>
  <section
    class="py-24"
    :id="`section-icons-${content.id}`"
    :style="` ${
      content.background?.Background_color &&
      'background-color:' + content.background?.Background_color
    }`"
  >
    <div class="conyainer">
      <h3 v-if="content.title" class="text-center text-4xl mb-24 font-semibold">
        {{ content.title }}
      </h3>
    </div>

    <div
      :class="`container flex flex-wrap gap-y-16 justify-center items-center ${
        content.icons.length > 6 ? ' ' : ' max-w-[933px]'
      }`"
    >
      <div
        v-for="icon in content.icons"
        :class="`item-icon flex items-center flex-col  ${
          content.icons.length > 6 ? ' md:basis-1/4' : 'md:basis-1/3 '
        }`"
      >
        <img
          v-if="icon.icon.data.attributes.url"
          :src="icon.icon.data.attributes.url"
          :alt="icon.title"
        />

        <h3 class="text-md lg:text-2xl mt-9 font-light">{{ icon.title }}</h3>
      </div>
    </div>
    <div class="container mt-16" v-if="content.footer">
      <p>{{ content.footer }}</p>
    </div>
  </section>
</template>
<script setup>
const { content } = defineProps(["content"]);
</script>
