<template>
  <div class="m-2 mr-1 pr-2 pt-3 pb-3 scrollContained overflow-x-hidden max-h-[300px] gap-3 grid">
    <ClientOnly>
      <div v-for="item in eventosData"
        class="neomorphism_card p-2 w-full bg-[#EDF5FD] hover:bg-[#deefff] rounded-md relative">
        <a class="flex flex-row" :href="item.attributes.url" target="_blank">

          <NuxtImg class="z-20 min-h-[40px] max-h-[70px] rounded-md bg-cover bg-gray-500" alt="image_news_events"
            :src="imageTest" />
          <div class="flex flex-col w-full pl-2">

            <div class="flex flex-row justify-between">
              <h4 class="flex text-slate-800 text-xs capitalize">{{ item.attributes.modo }}</h4>
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
      {{ console.log("EVENTOS----") }}
      {{ console.log(eventosData) }}
    </ClientOnly>
  </div>
</template>
<script setup>
import { onMounted } from "vue";
import qs from "qs";

const imageTest = "https://img.freepik.com/foto-gratis/cerrar-al-entrevistado-microfono-tomando-declaraciones_23-2149037853.jpg?w=2000&t=st=1698425408~exp=1698426008~hmac=8a93227ac9bcb184cd3acb3e225bbefc7f180c09622781781ddd3e43fac441a8";

// eventos
const queryEventos = qs.stringify({
  populate: {
    localizations: {
      populate: {
        eventos: {
          populate: "*",
        },
      },
    },
    eventos: {
      populate: "*",
      populate: {
        image: {
          populate: "*",
        },
      },
    },
    content: {
      populate: "*",
    },
  }
});

const eventosFromApi = await useFetch(`/api/eventos?${queryEventos}`);
const eventMultilang = ref(null);
const eventosData = ref(null);

onMounted(() => {
  console.log("si se ejecuta")
  if (eventosFromApi?.data?.value?.data) {
    eventosData.value = eventosFromApi.data.value.data;
    eventMultilang.value = eventosFromApi.data.value.data;
  }
});
</script>

<style scoped>
.neomorphism_card {
  box-shadow: 4px 4px 8px #cccfd3, -4px -4px 8px #fff;
}
</style>
