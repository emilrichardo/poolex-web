<template>
  <section
    :id="content.id"
    :class="`${padding[content.internal_margin]}`"
    :style="`${
      content.background?.Background_color &&
      'background-color:' + content.background?.Background_color
    } `"
  >
    <div :class="` container relative `">
      <div
        v-if="
          content.style === 'box-right' ||
          content.style === 'box-left' ||
          content.style === 'box-left-caption' ||
          content.style === 'box-right-caption'
        "
        :class="` bg-product  w-screen absolute bottom-0 z-0 ${
          content.style === 'box-right-caption' ||
          content.style === 'box-left-caption'
            ? ' h-[80%]'
            : 'h-full'
        } ${
          content.style === 'box-right' || content.style === 'box-right-caption'
            ? 'left-0'
            : 'right-0'
        }`"
      ></div>

      <div
        :class="`md:flex justify-center items-center ${
          content.image && 'wimagew'
        }  ${
          content.style === 'border-bottom' &&
          ' border-b-[14px] border-light-500 border-opacity-30'
        }`"
      >
        <div
          :class="`caption max-w-[851px] relative ${
            (content.style === 'box-right-caption' ||
              content.style === 'box-left-caption') &&
            'bg-white py-16 -bottom-28'
          } ${content.image && 'md:w-1/2 px-8 md:px-24'} ${
            content.image_side === 'left' && 'order-2'
          } ${content.headings?.align === 'center' && 'text-center'}`"
        >
          <h4 class="text-2xl font-semibold mb-8" v-if="content.headings">
            {{ content.headings?.sub_headline }}
          </h4>
          <h2 class="text-4xl font-medium mb-8" v-if="content.headings">
            {{ content.headings?.headline }}
          </h2>
          <p class="text-xl font-light" v-if="content.headings">
            {{ content.headings?.caption }}
          </p>

          <div v-if="content.features" class="features">
            <ul v-if="content.features">
              <li
                v-for="feature in content.features"
                class="flex py-6 border-b border-light-500 last:border-0"
              >
                <div
                  class="mr-4 rounded-full bg-product w-20 h-20 flex-none inline-flex justify-center items-center"
                >
                  <img
                    class=""
                    type="image"
                    v-if="feature.icon"
                    :src="feature.icon.data.attributes.url"
                    :alt="feature.title"
                  />
                </div>

                <div class="caption">
                  <h3 class="text-2xl font-medium mb-4">{{ feature.title }}</h3>
                  <p class="text-dark-200 font-light">{{ feature.caption }}</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div
          :class="` block-image relative rounded-lg ${
            videoOpen && 'bg-black'
          }  ${content.image && 'md:w-1/2 flex justify-center'} ${
            content.image_side === 'left' && 'order-1'
          }`"
        >
          <img
            :class="` min-h-[258px] lg:min-h-[458px] object-cover rounded-lg  ${
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
              class="button-video w-24 h-24 rounded-full bg-product opacity-80 hover:opacity-100 transition-all hover:scale-105 hover:shadow-2xl text-white text-5xl"
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

const padding = {
  xs: "py-4",
  sm: "py-8",
  md: "py-18",
  lg: "py-24",
  xl: "py-36",
};
</script>
<style>
.video-vimeo iframe {
  max-width: 100%;
}
</style>
