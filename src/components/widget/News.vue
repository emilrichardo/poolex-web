<template>
  <div class="bg-primary h-full w-full max-h-[340px] relative">
    <img
      class="w-full h-full relative z-0 object-cover"
      :src="newsData.image"
      alt="image_news"
    />
    <div
      class="caption absolute px-8 py-6 bottom-0 w-full left-0 z-10 bg-gradient-to-t from-black h-full text-white flex flex-col items-end justify-end"
    >
      <a :href="newsData.link">
        <h3 class="text-xl font-medium mb-2">{{ newsData.title }}</h3>
        <p class="text-sm">{{ newsData.caption }}</p>
      </a>
    </div>
  </div>
</template>
<script setup>
const newsData = ref({
  title: "Chat GPT-4 expands its capabilities with plugins",
  caption: "News from Washington Post",
  image: "https://picsum.photos/200/300",
  link: "https://picsum.photos",
});
</script>
