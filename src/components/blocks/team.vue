<template>
  <div class="error" v-if="!teamFromApi.error"><h3>Team</h3></div>
  <section v-else class="team bg-light py-24">
    <div class="container">
      <pre class="text-xs">{{
        useGetLocaleSections(locale, teamMultilang).team
      }}</pre>

      <div
        :class="`heading ${
          (teamData.content.align === 'center' && 'text-center') ||
          (teamData.content.align === 'left' && '') ||
          (teamData.content.align === 'right' && 'text-right')
        }`"
      >
        <h4
          class="text-2xl font-light mb-8"
          v-if="teamData.content.sub_headline"
        >
          {{ teamData.content?.sub_headline }}
        </h4>
        <h2 class="text-4xl font-light mb-8" v-if="teamData.content?.headline">
          {{ teamData.content?.headline }}
        </h2>
        <p class="text-xl font-light" v-if="teamData.content">
          {{ teamData.content.caption }}
        </p>
      </div>
      <div v-if="teamData.team" class="team-grid grid col-1 gap-8">
        <div
          v-for="item in useGetLocaleSections(locale, teamMultilang).team"
          :key="item.id"
          class="item-team bg-white rounded shadow-sm flex flex-col lg:flex-row items-center gap-8 pt-0 pb-10 lg:py-20"
        >
          <div
            v-if="item.image_profile.data"
            class="image bg-product max-w-[180px] sm:max-w-[320px] flex-none relative"
          >
            <img
              class="left-4 top-4"
              :src="item.image_profile.data.attributes.url"
              :alt="item.full_name"
            />
          </div>
          <div class="text px-8 lg:px-0">
            <h4 class="text-2xl font-semibold mb-2" v-if="item.full_name">
              {{ item.full_name }}
            </h4>
            <h5 class="mb-8" v-if="item.position">{{ item.position }}</h5>
            <p
              class="text-sm lg:text-xl font-light text-dark-200 lg:pr-16"
              v-if="item.body"
            >
              {{ item.body }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script setup>
import qs from "qs";
import { useGetLocaleSections } from "@/composables/getLocale";
const { locales, locale } = useI18n();

// team
const queryTeam = qs.stringify({
  populate: {
    localizations: {
      populate: {
        team: {
          populate: "*",
        },
      },
    },
    team: {
      populate: "*",
    },
    content: {
      populate: "*",
    },
  },
});
const teamFromApi = await useFetch(`/api/our-team?${queryTeam}`);

const teamData = ref(null);
const teamMultilang = ref(null);
if (teamFromApi.data) {
  teamData.value = teamFromApi.data.value.data.attributes;
  teamMultilang.value = teamFromApi.data.value.data;
}
</script>
