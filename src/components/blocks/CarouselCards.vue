<template>
  <section class="plans bg-light-100 py-16">
    <div
      :class="`block_text  ${
        (content.headings?.align === 'center' && 'text-center') ||
        (content.headings?.align === 'left' && '') ||
        (content.headings?.align === 'right' && 'text-right')
      }   `"
    >
      <div class="container max-w-[930px]">
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
    </div>
    <div ref="container" class="container relative"></div>
    <div class="carousel-container" :style="`margin-left: ${marginRight}px`">
      <Carousel v-bind="settings" :breakpoints="breakpoints">
        <Slide v-for="card in content.card" :key="card.id" class="plan">
          <div
            class="rounded overflow-hidden bg-white mx-4 xl:mx-6 flex flex-col h-full w-full"
          >
            <div
              v-if="card.card_head"
              class="py-3 px-8 bg-product text-white font-bold w-full text-left"
            >
              {{ card.card_head }}
            </div>
            <div class="px-4 py-4">
              <NuxtImg
                v-if="card.image.data"
                :src="card.image?.data?.attributes?.url"
                :alt="card.card_head"
                class="w-full h-44 object-cover rounded-md"
              />
              <h5 class="text-left py-4 text-sm" v-if="card.caption">
                {{ card.caption }}
              </h5>
            </div>
          </div>
        </Slide>
        <template #addons>
          <Pagination />
        </template>
      </Carousel>
    </div>

    <br />
  </section>
</template>
<script setup>
import { Carousel, Navigation, Pagination, Slide } from "vue3-carousel";
import "vue3-carousel/dist/carousel.css";
const { content } = defineProps(["content"]);

const settings = {
  wrapAround: true,
  autoplay: "4000",
  itemsToShow: 1,
  snapAlign: "center",
};

const breakpoints = {
  // 700px and up
  728: {
    itemsToShow: "2.5",
    snapAlign: "start",
  },
  // 1024 and up
  1080: {
    itemsToShow: "3.5",
    snapAlign: "start",
  },
};

const container = ref(null);
const containerWidth = ref(0);
const marginRight = ref();

onMounted(() => {
  const updateWidth = () => {
    const containerRect = container.value.getBoundingClientRect();
    containerWidth.value = containerRect.width;
    marginRight.value =
      window.innerWidth - (containerRect.left + containerRect.width);
  };
  updateWidth();
  window.addEventListener("resize", updateWidth);
});
</script>
<style>
.carousel__pagination {
  justify-content: center !important;
  padding-top: 24px;
}
</style>
