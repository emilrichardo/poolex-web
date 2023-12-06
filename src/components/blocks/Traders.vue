<template>
  <section class="team bg-[#F1F1F7] py-24">
    <div class="container">
      <div class="`text-center`">
        <h2 class="heading text-4xl font-light mb-8 text-center" v-if="content?.title">
          {{ content?.title }}
        </h2>
      </div>
      <div v-if="content?.trader" class="team-grid grid place-content-center col-1 gap-[40px] md:gap-8">
        <div v-for="trader in content?.trader" :key="trader.id"
          :class="`neomorph_team item-team mx-auto max-w-[90%] bg-[#F6F7FB] rounded shadow-sm flex flex-col md:flex-row items-center gap-8 pt-0 pb-10 lg:py-20`">

          <div v-if="trader.image.data" :class="`image max-w-[180px] sm:max-w-[280px] flex-none relative ${trader?.id % 2 !== 0
            ? ' order-1 md:order-2 md:-mr-16 md:ml-5'
            : ' md:-ml-16 md:mr-5'
            }`">
            <NuxtImg class="left-4 top-4 rounded-bl-[95px] rounded-tr-[95px] -mt-4 md:mt-0"
              :src="trader.image.data?.attributes?.url" :alt="trader.name" />
          </div>

          <div :class="`text px-8 lg:px-0 ${trader?.id % 2 !== 0 && 'order-2 md:order-1 md:text-right'
            }`">
            <h4 class="text-2xl font-semibold mb-2" v-if="trader.name">
              {{ trader.name }}
            </h4>
            <h5 class="mb-8" v-if="trader.position">{{ trader.position }}</h5>
            <p :class="`text-sm lg:text-xl font-light text-dark-200 ${trader?.id % 2 !== 0 ? 'lg:pl-16 ' : 'lg:pr-16'
              }`" v-if="trader.description">
              {{ trader.description }}
            </p>

            <Button v-if="trader?.link" type="button" variant="default" size="sm" class="mt-2 text-white"
              @click="shouldOpenModal(trader?.link)">
              {{
                locale === "es" ? "Ver más" : "View more"
              }}
            </Button>
          </div>

        </div>
      </div>
    </div>
  </section>

  <Modal :id="`modal-id`" v-if="showModal && videoLink" @closeModal="closeModal" color="#766bf8">
    <iframe height="360" :src="getFullYoutubeLink(videoLink)" title=" YouTube video player" frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowfullscreen class="w-full min-w-[600px]"></iframe>
  </Modal>
</template>
<script setup>
const { content } = defineProps(["content"]);
const { locale } = useI18n();
const showModal = ref(false);
const videoLink = ref("")

const closeModal = () => {
  showModal.value = false;
};
const shouldOpenModal = (link) => {
  showModal.value = true;
  videoLink.value = link;
}

const getFullYoutubeLink = (shortLink) => {
  const videoCode = getVideoCodeFromLink(shortLink);
  return `https://www.youtube.com/embed/${videoCode}`;
};
const getVideoCodeFromLink = (link) => {
  // Extraer el código del video desde el enlace corto o completo
  const videoCode = link.split('/').pop().split('?')[0];
  return videoCode;
};
</script>
