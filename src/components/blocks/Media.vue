<template>
  <section
    :id="content.id"
    class="py-36"
    :style="`${
      content.background?.Background_color &&
      'background-color:' + content.background?.Background_color
    } `"
  >
    <div class="container">
      <div
        :class="` flex justify-center items-center ${
          content.image && 'wimagew'
        }`"
      >
        <div
          :class="`caption max-w-[851px] ${content.image && 'w-1/2 px-24'} ${
            content.image_side === 'left' && 'order-2'
          } ${content.headings.align === 'center' && 'text-center'}`"
        >
          <h4
            class="text-2xl font-semibold mb-8"
            v-if="content.headings.sub_headline"
          >
            {{ content.headings.sub_headline }}
          </h4>
          <h2
            class="text-4xl font-semibold mb-8"
            v-if="content.headings.headline"
          >
            {{ content.headings.headline }}
          </h2>
          <p class="text-xl font-light" v-if="content.headings.caption">
            {{ content.headings?.caption }}
          </p>
        </div>
        <div
          :class="` block-image relative bg-black rounded-lg   ${
            content.image && 'w-1/2'
          } ${content.image_side === 'left' && 'order-1'}`"
        >
          <img
            :class="` h-[458px] object-cover rounded-lg  ${
              videoOpen && 'opacity-0'
            }`"
            v-if="content.image?.image.data.attributes.url"
            :src="content.image?.image.data.attributes.url"
            :alt="content.image?.image_title"
          />

          <div
            v-if="content.video"
            class="video-overlay rounded-lg absolute top-0 left-0 h-full w-full grid justify-center items-center"
          >
            <button
              v-if="!videoOpen"
              @click="openVideo(content.video)"
              class="button-video w-24 h-24 rounded-full bg-product bg-opacity-20 text-white text-5xl"
            >
              <Icon name="heroicons:play-20-solid"></Icon>
            </button>
            <div
              class="video-vimeo absolute left-0 top-0"
              ref="vimeoPlayer"
            ></div>
          </div>

          <div
            v-if="content.image?.image_caption"
            class="image-caption max-w-[519px] absolute -bottom-12 bg-product right-0 px-12 py-10"
          >
            {{ content.image?.image_caption }}
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script setup>
import Vimeo from "@vimeo/player";

const { content } = defineProps(["content"]);

const vimeoPlayer = ref(null);
const videoOpen = ref(false);

const openVideo = (data) => {
  const url = obtenerIDVideo(data.video_url);
  console.log(obtenerIDVideo(data.video_url));

  if (url.plataforma === "Vimeo") {
    videoOpen.value = true;
    const options = {
      id: url.id, // ID del video de Vimeo
      width: 840,
    };

    const player = new Vimeo(vimeoPlayer.value, options);
    player.play();
  } else if (url.plataforma === "YouTube") {
    console.log("you");
  }
};

function obtenerIDVideo(url) {
  const vimeoRegex = /vimeo\.com\/(\d+)/;
  const youtubeRegex = /(?:youtube\.com\/watch\?v=|youtu\.be\/)(\w+)/;

  if (vimeoRegex.test(url)) {
    const match = url.match(vimeoRegex);
    return {
      plataforma: "Vimeo",
      id: match[1],
    };
  } else if (youtubeRegex.test(url)) {
    const match = url.match(youtubeRegex);
    return {
      plataforma: "YouTube",
      id: match[1],
    };
  } else {
    return null;
  }
}
</script>
<style>
.video-vimeo iframe {
  max-width: 100%;
}
</style>
