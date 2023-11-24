<template>
  <section
    :class="`block_text py-24 ${
      (content.headings.align === 'center' && 'text-center') ||
      (content.headings.align === 'left' && '') ||
      (content.headings.align === 'right' && 'text-right')
    }`"
  >
    <div class="container max-w-[870px]">
      <h4 class="text-2xl font-semibold mb-8" v-if="content.headings">
        {{ content.headings?.sub_headline }}
      </h4>
      <h2 class="text-4xl font-light mb-8" v-if="content.headings">
        {{ content.headings?.headline }}
      </h2>
      <p class="text-xl font-light" v-if="content.headings">
        {{ content.headings?.caption }}
      </p>
    </div>
    <div
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-9 mx-auto mt-24 max-w-[870px]"
    >
      <div
        v-for="item in memberships"
        @click="openModal(item.id)"
        class="item flex flex-col items-center bg-white shadow hover:bg-purple-200 hover:cursor-pointer hover:scale-105 p-4 rounded"
      >
        <NuxtImg
          v-if="item.attributes?.icon"
          :src="item.attributes?.icon?.data?.attributes?.url"
          :alt="item.attributes?.name"
          class="w-28 mb-4"
        />
        <h3
          class="text-md lg:text-xl font-semibold text-dark-100"
          v-if="item.attributes?.name"
        >
          {{ localeMemberships(locale, item).attributes?.name }}
        </h3>
        <p class="text-xs" v-if="item.attributes?.description">
          {{ localeMemberships(locale, item).attributes?.description }}
        </p>

        <Modal
          :id="`modal-${item.id}`"
          v-if="showModal === item.id"
          :title="`${
            locale === 'es' ? 'Beneficios Licencia' : 'License Benefits'
          } ${item.attributes?.name}`"
          @closeModal="closeModal"
          :color="item.attributes?.color"
        >
          <ul v-if="item.attributes?.features" class="text-left">
            <li
              v-for="feat in localeMemberships(locale, item).attributes
                ?.features"
              :key="item.id"
              class="py-2"
            >
              <span> {{ feat.label }}: </span>
              <span>{{ feat.value }}</span>
            </li>
          </ul>
        </Modal>
      </div>
    </div>
  </section>
</template>

<script setup>
import qs from "qs";

const { locale } = useI18n();

const memberships = ref([]);

const query = qs.stringify(
  {
    populate: {
      icon: {
        populate: "*",
      },
      features: {
        populate: "*",
      },
      localizations: {
        populate: "*",
      },
    },
  },
  {
    encodeValuesOnly: true, // prettify URL
  }
);

const membershipsFromApi = await useFetch(`/api/memberships?${query}`);

memberships.value = membershipsFromApi.data?.value?.data;

const { content } = defineProps(["content"]);

const showModal = ref(false);

const openModal = (id) => {
  showModal.value = id;
};

const closeModal = () => {
  showModal.value = false;
};

const localeMemberships = (locale, text) => {
  if (locale === "es" && text.attributes.localizations.data.length > 0) {
    return text.attributes?.localizations?.data[0];
  } else {
    return text;
  }
};
</script>
