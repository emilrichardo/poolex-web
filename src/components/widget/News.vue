<template>
  <div class="relative post-container">
    <ClientOnly>
      <iframe
        :src="faceSrc"
        :width="fbOptions.width"
        :height="fbOptions.height"
        style="border: none; overflow: hidden; width: 100%"
        scrolling="no"
        frameborder="0"
        allowfullscreen="true"
        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
      ></iframe>
    </ClientOnly>
  </div>
</template>
<script setup>
const screenWidth = ref(window.innerWidth);
const screenHeight = ref(window.innerHeight);

const handleResize = () => {
  screenWidth.value = window.innerWidth;
  screenHeight.value = window.innerHeight;
};

onUnmounted(() => {
  window.removeEventListener("resize", handleResize);
});

const fbOptions = ref({
  width: screenWidth.value < 380 ? "320" : "440",
  height: "350",
});
const faceSrc = `https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fpoolexofficial%2F&tabs=timeline&width=${fbOptions.value.width}&height=${fbOptions.value.height}&small_header=true&adapt_container_width=true&hide_cover=true&show_facepile=false&appId`;

const newsData = ref({
  title: "Chat GPT-4 expands its capabilities with plugins",
  caption: "News from Washington Post",
  image: "https://picsum.photos/200/300",
  link: "https://picsum.photos",
});
</script>
<style>
/* .post-container {
  position: relative;
  padding-bottom: 56.25%;
  padding-top: 35px;
  height: 0;
  overflow: hidden;
}
.iframe-fb{
  position: absolute;
top:0;
left: 0;
width: 100%;
height: 100%;
} */
</style>
