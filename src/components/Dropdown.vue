<template>
  <section class="carousel-brands py-12 px-4 md:px-8">
    <h4 class="text-2xl lg:text-4xl font-medium mb-4 md:mb-8 text-center" v-if="content?.title">
      {{ content?.title }}
    </h4>

    <div class="flex flex-col gap-2 md:gap-3">
      <div v-for="item in content?.items" :key="item?.title">
        <div
          :class="`w-full  bg-slate-300 px-4 py-4 cursor-pointer flex flex-row justify-between ${listOpen === item?.title ? 'rounded-t-[6px]' : 'rounded-[6px] shadow-md'} transition-all`"
          @click="handleList(item?.title)">
          <h5>{{ item?.title }}</h5>
          <Icon v-if="listOpen === item?.title" name="ep:arrow-up-bold" size="24px"></Icon>
          <Icon v-else name="ep:arrow-down-bold" size="24px"></Icon>
        </div>

        <div v-if="listOpen === item?.title" class="bg-[#F1F3F6] transition-all px-4 py-2 rounded-b-[6px]">{{ item?.answer
        }}</div>
      </div>
    </div>
  </section>
</template>
<script setup>
const { content } = defineProps(["content"]);

const listOpen = ref("");

const handleList = (title) => {
  listOpen.value = listOpen.value === title ? "" : title;
};

</script>
