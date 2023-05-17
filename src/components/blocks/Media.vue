<template>
  <section :id="content.id" class="py-36">
    <div class="container">
      <div :class="` ${content.image && 'flex items-center'}`">
        <div
          :class="`caption  ${content.image && 'w-1/2 px-24'} ${
            content.image_side === 'left' && 'order-2'
          } ${content.headings.align === 'center' && 'text-center'}`"
        >
          <h2
            class="text-4xl font-semibold mb-8"
            v-if="content.headings.headline"
          >
            {{ content.headings.headline }}
          </h2>
          <p class="text-xl font-light" v-if="content.headings.caption">
            {{ content.headings.caption }}
          </p>
        </div>
        <div
          :class="` block-image relative  ${content.image && 'w-1/2'} ${
            content.image_side === 'left' && 'order-1'
          }`"
        >
          <img
            class="rounded h-[458px] object-cover"
            v-if="content.image.image.data.attributes.url"
            :src="content.image.image.data.attributes.url"
            :alt="content.image.image_title"
          />
          <div
            v-if="content.image.image_caption"
            class="image-caption max-w-[519px] absolute -bottom-12 bg-product right-0 px-12 py-10"
          >
            {{ content.image.image_caption }}
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script setup>
const { content } = defineProps(["content"]);
</script>
