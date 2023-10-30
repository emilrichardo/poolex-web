<template>
  <div class="m-2 mr-1 pr-2 pt-3 pb-3 scrollContained overflow-x-hidden max-h-[300px] gap-3 grid">
    <ClientOnly>
      <div v-for="item in eventosData"
        class="neomorphism_card p-2 w-full bg-[#EDF5FD] hover:bg-[#deefff] rounded-md relative">
        <a class="flex flex-row" :href="item.attributes.url" target="_blank">

          <NuxtImg class="z-20 min-h-[40px] min-w-[105px] max-h-[70px] rounded-md object-cover bg-center bg-gray-500"
            alt="image_news_events" :src="item.attributes.image.data.attributes.url" />
          <div class="flex flex-col w-full pl-2">

            <div class="flex flex-row justify-between">
              <h4 class="flex text-slate-800 text-xs capitalize">{{
                item.attributes.modo !== "no aplica" ? item.attributes.modo : ""
              }}</h4>
              <h5 class="flex text-slate-600 text-xs">{{ item.attributes.date }}</h5>
            </div>

            <p class="h-full  overflow-hidden break-words text-sm text-[#033F5B] text-ellipsis flex-nowrap line-clamp-3">
              {{
                item.attributes.description
              }}
            </p>

            <div
              class="after:bg-[#0aaffb] after:w-8 after:h-8 after:absolute after:top-0 after:left-0 after:rounded-full z-10">
            </div>
          </div>
        </a>
      </div>
    </ClientOnly>
  </div>
</template>
<script setup>
const eventosFromApi = await useFetch(`/api/eventos?sort[1]=date&populate=*`);
const eventosData = ref(null);
if (eventosFromApi?.data?.value?.data) {
  eventosData.value = eventosFromApi.data.value.data;
}
</script>

<style scoped>
.neomorphism_card {
  box-shadow: 4px 4px 8px #cccfd3, -4px -4px 8px #fff;
}
</style>
