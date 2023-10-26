<template>
  <div class="error" v-if="!teamFromApi.error">
    <h3>Team</h3>
  </div>
  <section v-else class="team bg-[#F1F1F7] py-24">
    <div class="container">
      <div :class="`heading ${(teamData.content.align === 'center' && 'text-center') ||
        (teamData.content.align === 'left' && '') ||
        (teamData.content.align === 'right' && 'text-right')
        }`">
        <h4 class="text-2xl font-light mb-8" v-if="teamData.content.sub_headline">
          {{ teamData.content?.sub_headline }}
        </h4>
        <h2 class="text-4xl font-light mb-8" v-if="teamData.content?.headline">
          {{ teamData.content?.headline }}
        </h2>
        <p class="text-xl font-light" v-if="teamData.content">
          {{ teamData.content.caption }}
        </p>
      </div>
      <div v-if="teamData.team" class="team-grid grid place-content-center col-1 gap-[40px] md:gap-8">
        <div v-for="item in useGetLocaleSections(locale, teamMultilang).team" :key="item.id"
          :class="`neomorph_team item-team mx-auto  max-w-[90%] bg-[#F6F7FB] rounded shadow-sm flex flex-col md:flex-row items-center gap-8 pt-0 pb-10 lg:py-20`">

          <div v-if="item.image_profile.data"
            :class="`image max-w-[180px] sm:max-w-[280px] flex-none relative ${item?.id % 2 !== 0 ? ' order-1 md:order-2 md:-mr-16 md:ml-5' : ' md:-ml-16 md:mr-5'}`">
            <NuxtImg class="left-4 top-4 rounded-bl-[95px] rounded-tr-[95px] -mt-4  md:mt-0"
              :src="item.image_profile.data.attributes.url" :alt="item.full_name" />
          </div>

          <div :class="`text px-8 lg:px-0 ${item?.id % 2 !== 0 && 'order-2 md:order-1 md:text-right'}`">
            <h4 class="text-2xl font-semibold mb-2" v-if="item.full_name">
              {{ item.full_name }}
            </h4>
            <h5 class="mb-8" v-if="item.position">{{ item.position }}</h5>
            <p :class="`text-sm lg:text-xl font-light text-dark-200  ${item?.id % 2 !== 0 ? 'lg:pl-16 ' : 'lg:pr-16'}`"
              v-if="item.body">
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

<style>
.neomorph_team {
  box-shadow: 8px 8px 16px #C9CAD1, -8px -8px 16px #fff;
}
</style>
