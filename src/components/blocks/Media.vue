<template>
  <section :id="content?.id" :class="`${!card_web3 && !card_investment ? padding[content?.internal_margin] : ''
    }`" :style="`${!content?.background?.Gradient && content?.background?.Background_color
    ? 'background-color:' + content.background?.Background_color
    : 'background:linear-gradient(to ' +
    content.background?.bg_direction +
    ',' +
    content.background?.Background_color +
    ',' +
    content?.background?.Background_color_secondary +
    ')'
    } `">
    <div :class="`relative ${(content?.style === 'box-right-caption' ||
      content?.style === 'box-left-caption') &&
      'pt-10 lg:pt-0 lg:mt-14 xl:mt-32'
      } ${(content?.style === 'box-right-floating' ||
        content?.style === 'box-left-floating') &&
      'py-10 lg:py-0'
      }`">
      <div v-if="content?.style === 'box-right' ||
        content?.style === 'box-left' ||
        content?.style === 'box-left-caption' ||
        content?.style === 'box-right-caption' ||
        content?.style === 'box-left-floating' ||
        content?.style === 'box-right-floating'
        " :class="` absolute bottom-0 z-0 h-full ${content?.style === 'box-right' ||
    content?.style === 'box-right-caption' ||
    content?.style === 'box-right-floating'
    ? 'right-0'
    : 'left-0'
    } ${(content?.style === 'box-right' || content?.style === 'box-left') &&
    'hidden lg:block'
    }`"></div>

      <div :class="`container flex flex-col lg:flex-row ${content?.style === 'box-right-caption' ||
        content?.style === 'box-left-caption'
        ? 'relative justify-start'
        : 'justify-center'
        } ${(!content?.style ||
          content?.style === 'box-right-floating' ||
          content?.style === 'box-left-floating') &&
        'gap-y-8'
        } ${content?.image && 'wimagew'} ${content?.style === 'border-bottom' &&
        ' border-b-[14px] border-light-500 border-opacity-30'
        }`" :style="`${card_with_color ? 'align-items: normal;' : 'align-items:center'
    }`">
        <div :class="`block-image rounded-lg max-w-[600px] ${videoOpen && 'bg-black'}  ${content?.style === 'box-right-caption' ||
          content?.style === 'box-left-caption'
          ? 'lg:absolute lg:bottom-0 lg:h-[calc(100%_+_theme(spacing.14))] xl:h-[calc(100%_+_theme(spacing.32))]'
          : 'relative'
          }  ${card_investment && 'md:w-1/2 '} ${content?.image && 'flex flex-col items-center justify-center'
          } ${content?.image_side === 'right' && 'lg:order-1'} ${((content?.image_side === 'right' &&
            content?.style === 'box-right-caption') ||
            (content?.image_side === 'right' &&
              content?.style === 'box-left-caption')) &&
          'lg:right-0 lg:left-1/2'
          } ${((content?.image_side === 'left' &&
            content?.style === 'box-right-caption') ||
            (content?.image_side === 'left' &&
              content?.style === 'box-left-caption')) &&
          'lg:left-0 lg:right-1/2'
          } ${(content?.style === 'box-right-floating' ||
            content?.style === 'box-left-floating') &&
          ' mt-auto'
          } ${((content?.image_side === 'right' &&
            content?.style === 'box-right-floating') ||
            (content?.image_side === 'right' &&
              content?.style === 'box-left-floating')) &&
          'lg:pl-10 xl:pl-16'
          } ${((content?.image_side === 'left' &&
            content?.style === 'box-right-floating') ||
            (content?.image_side === 'left' &&
              content?.style === 'box-left-floating')) &&
          'lg:pr-10 xl:pr-16'
          }`">
          <div v-if="content?.features?.length > 4 && content.headings" class="caption-container mb-8">
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

          <NuxtImg :class="`w-[calc(150%_+_300px)] aspect-square h-auto bottom-0 z-10 hidden ${card_web3
            ? 'lg:h-[38rem]  absolute right-[10%] lg:flex '
            : 'hidden'
            } ${card_investment
              ? 'lg:h-[40rem] absolute left-[2%] lg:flex '
              : 'hidden'
            }`" v-if="content?.image?.image?.data?.attributes?.url && (card_web3 || card_investment)"
            :src="content?.image?.image?.data?.attributes?.url" :alt="content?.image?.image_title" />

          <NuxtImg :class="`w-full  mt-auto ${card_web3 || card_investment ? 'lg:hidden' : 'flex'
            } ${videoOpen && 'opacity-0'} ${content?.image?.image_caption &&
            'rounded-b-none rounded-t-lg lg:rounded-b-lg '
            } ${content?.style === 'box-right-caption' ||
              content?.style === 'box-left-caption' ||
              content?.style === 'box-right-floating' ||
              content?.style === 'box-left-floating'
              ? 'h-full -mt-24'
              : 'lg:min-h-[458px] my-auto'
            } ${content?.style === 'box-right-caption' ||
              content?.style === 'box-left-caption'
              ? 'object-contain'
              : 'object-cover'
            } ${content?.style === 'box-right' || content?.style === 'box-left'
              ? 'aspect-[11/7] lg:aspect-auto rounded-t-lg lg:rounded-t-none'
              : 'rounded-lg'
            }`" v-if="content?.image?.image?.data?.attributes?.url" :src="content?.image?.image?.data?.attributes?.url"
            :alt="content?.image?.image_title" :style="`${card_with_color ? 'max-heigth:500px;' : ''}
          `" />
          <div v-if="content?.video"
            class="video-overlay rounded-lg absolute top-0 left-0 h-full w-full grid justify-center items-center">
            <button v-if="!videoOpen" @click="openVideo(content?.video)"
              class="button-video w-24 h-24 rounded-full bg-product opacity-80 hover:opacity-100 transition-all hover:scale-105 hover:shadow-2xl text-white text-5xl">
              <Icon name="heroicons:play-20-solid"></Icon>
            </button>
            <div class="video-vimeo absolute left-0 top-0" ref="vimeoPlayer"></div>
          </div>

          <div v-if="content?.image?.image_caption" :class="`text-white image-caption w-full md:w-1/2 lg:absolute -bottom-12 bg-product px-5 py-6 md:px-12 md:py-10 rounded-b-lg lg:rounded-b-none ${content?.image_side === 'left' ? 'right-0' : 'left-0'
            } ${globalData?.currentProduct === 'trade' &&
            'bg-gradient-to-r from-[#9747FF] via-[#A8B2FF] via-40% to-[#1AAFFD]'
            } `">
            {{ content?.image?.image_caption }}
          </div>
        </div>

        <div :class="`caption items-center relative background_text
         ${(content?.style === 'box-right-caption' ||
            content?.style === 'box-left-caption') &&
          'bg-white px-5 py-6 md:pt-10 md:px-16 lg:px-10 xl:px-16 xl:pt-16 lg:mt-16 xl:mt-20'
          } ${content?.image && 'lg:w-1/2'} ${(content?.style === 'box-right-floating' ||
            content?.style === 'box-left-floating') &&
          'lg:py-10'
          } ${((content?.image_side === 'left' && !content?.style) ||
            (content?.image_side === 'right' &&
              content?.style === 'box-right-floating')) &&
          'lg:pl-14 xl:pl-24'
          } ${((content?.image_side === 'right' && !content?.style) ||
            (content?.image_side === 'left' &&
              content?.style === 'box-left-floating')) &&
          'lg:pr-14 xl:pr-24'
          } ${(content?.style === 'box-right' || content?.style === 'box-left') &&
          'px-5 py-6 md:px-16 md:py-10 lg:px-14 xl:px-24 bg-product lg:bg-transparent rounded-b-lg lg:rounded-b-none'
          } ${content?.style === 'box-right' &&
          content?.image_side === 'left' &&
          'lg:pr-6 xl:pr-24'
          } ${content?.style === 'box-left' &&
          content?.image_side === 'right' &&
          'lg:pl-0 xl:pl-24'
          } ${content?.headings?.align === 'center' && 'text-center'} ${content?.headings?.text_color === 'light'
            ? 'text-light'
            : 'text-dark'
          }
          `" :style="`${card_with_color &&
            'background-color: var(--product) !important; display:flex; align-items:center'
            };${card_investment &&
            'padding:0px !important; padding-top:24px !important '
            }
          `">
          <div v-if="content.features?.length < 4" class="caption-container">
            <h4 class="text-xl lg:text-2xl font-semibold mb-3 lg:mb-4" v-if="content?.headings">
              {{ content?.headings?.sub_headline }}
            </h4>
            <h2 class="text-2xl lg:text-4xl font-medium mb-4 lg:mb-8" v-if="content?.headings">
              {{ content?.headings?.headline }}
            </h2>
            <p class="text-lg lg:text-xl font-light" v-if="content?.headings">
              {{ content?.headings?.caption }}
            </p>
            <div class="rich-text">
              {{ content?.headings?.rich_text }}
            </div>

            <div v-if="content.button" class="cta-media mt-4">
              <nuxt-link :to="content.button?.url">
                <Button type="button" :variant="content.button?.variant">{{
                  content.button?.label
                }}</Button>
              </nuxt-link>
            </div>
          </div>

          <div v-if="content?.features" :class="`features`">
            <ul v-if="content?.features">
              <li v-for="feature in content?.features"
                class="flex flex-col md:flex-row gap-y-4 lg:items-center py-6 border-b border-light-500 last:border-0">
                <div v-if="feature?.icon?.data?.attributes?.url"
                  class="mr-4 rounded-full bg-product w-20 h-20 flex-none inline-flex justify-center items-center">
                  <NuxtImg class="" type="image" :src="feature?.icon?.data?.attributes?.url" :alt="feature?.title" />
                </div>

                <div :class="`caption flex flex-col gap-y-4`">
                  <h3 v-if="feature.title" :class="` font-medium ${content?.features?.length < 3 ? ' text-2xl ' : 'text-md'
                    }`">
                    {{ feature.title }}
                  </h3>
                  <p v-if="feature.caption" class="text-dark-200 font-light">
                    {{ feature.caption }}
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script setup>
import { useGlobalData } from "@/stores/getGlobaData";
const globalData = useGlobalData();
import Vimeo from "@vimeo/player";
import YouTube from "vue3-youtube";
const { content } = defineProps(["content"]);

const vimeoPlayer = ref(null);
const videoOpen = ref(false);

const openVideo = (data) => {
  const url = obtenerIDVideo(data?.video_url);

  if (url.plataforma === "Vimeo") {
    videoOpen.value = true;

    const options = {
      id: url.id, // ID del video de Vimeo
      width: 840,
    };

    const player = new Vimeo(vimeoPlayer.value, options);
    player.play();
  } else if (url.plataforma === "YouTube") {
    videoOpen.value = true;
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
  md: "py-16",
  lg: "py-24",
  xl: "py-36",
};

let card_with_color =
  content?.headings?.headline ===
  "Inteligencia Artificial, para transacciones Smart" ||
  content?.headings?.headline ===
  "Artificial Intelligence, for Smart transactions.";
let card_web3 =
  content?.headings?.headline === "Sumérgete en la Web3" ||
  content?.headings?.headline === "Dive into the Web3";
let card_investment =
  content?.headings?.headline === "Toma Acción Inteligente" ||
  content?.headings?.headline === "Take Smart Action";
</script>

<style>
.video-vimeo iframe {
  max-width: 100%;
}
</style>
