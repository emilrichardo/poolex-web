<template>
  <section class="team bg-light py-24">
    <div :class="`container`">
      <div
        :class="`heading ${
          (content.headings.align === 'center' && 'text-center') ||
          (content.headings.align === 'left' && '') ||
          (content.headings.align === 'right' && 'text-right')
        }`"
      >
        <div class="container max-w-[730px]">
          <h4 class="text-2xl font-light mb-8" v-if="content.headings">
            {{ content.headings?.sub_headline }}
          </h4>
          <h2 class="text-4xl font-light mb-8" v-if="content.headings">
            {{ content.headings?.headline }}
          </h2>
          <p class="text-xl font-light" v-if="content.headings">
            {{ content.headings?.caption }}
          </p>
        </div>
      </div>
      <div
        v-if="globalData.team.attributes?.team"
        class="team-grid grid col-1 gap-8"
      >
        <div
          v-for="item in globalData.team?.attributes?.team"
          :key="globalData.team.id"
          class="item-team bg-white rounded shadow-sm flex items-center gap-8 py-20"
        >
          <div
            v-if="item.image_profile.data"
            class="image bg-product max-w-[320px] flex-none relative"
          >
            <img
              class="left-4 top-4 opacity-20"
              :src="item.image_profile.data.attributes.url"
              :alt="item.full_name"
            />
          </div>
          <div class="text">
            <h4 class="text-2xl font-semibold mb-2" v-if="item.full_name">
              {{ item.full_name }}
            </h4>
            <h5 class="mb-8" v-if="item.position">{{ item.position }}</h5>
            <p class="text-xl font-light text-dark-200 pr-16" v-if="item.body">
              {{ item.body }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script setup>
import { useGlobalData } from "@/stores/getGlobaData";
const { content } = defineProps(["content"]);

import qs from "qs";

const globalData = useGlobalData();
</script>
