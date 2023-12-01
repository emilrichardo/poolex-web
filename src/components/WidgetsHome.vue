<template>
  <!--  <pre>{{ globalData.myProducts }}</pre> -->
  <section id="widgets" class="py-14">
    <div class="container mx-auto">
      <draggable :disabled="screenWidth < 1200" v-model="allCards" :item-key="(item) => item.id" tag="div"
        class="card-group grid grid-cols-1 lg:grid-cols-3 gap-8">
        <template #item="{ element: card }">
          <div :class="card.cols == 2 && 'neomorphism lg:col-span-2'">
            <ClientOnly>
              <Card :title="card.title" :color="card.color" :isDraggable="card.isDraggable">
                <template #card-body>
                  <div :class="`relative h-full ${card?.background ? 'bg-[' + card.background + ']' : ''} `">
                    <template v-if="card.type == 'backoffices'">
                      <div class="grid lg:grid-cols-3 gap-6 py-5 px-6">
                        <CardProduct v-if="globalData.myProducts" v-for="product in globalData?.myProducts"
                          :title="product?.attributes?.name" :color="product?.attributes?.color"
                          :icon="product?.attributes?.icon" :isRegister="product?.success" :data="product" />
                        <CardProduct v-else v-for="product in globalData?.myBackoffices"
                          :title="product?.attributes?.name" :color="product?.attributes?.color"
                          :icon="product?.attributes?.icon" :isRegister="product?.success" :data="product" />
                      </div>
                    </template>
                    <template v-if="card.type == 'events'">
                      <WidgetEvents />
                    </template>
                    <template v-if="card.type == 'stocks'">
                      <WidgetPrices :type="card.type"></WidgetPrices>
                    </template>
                    <template v-if="card.type == 'cryptos'">
                      <WidgetPricesCrypto></WidgetPricesCrypto>
                    </template>
                    <template v-if="card.type == 'news'">
                      <WidgetNews></WidgetNews>
                    </template>
                  </div>
                </template>
              </Card>
            </ClientOnly>
          </div>
        </template>
      </draggable>
    </div>


  </section>
</template>

<script setup>
import { ref } from "vue";
import draggable from "vuedraggable";
import { useGlobalData } from "@/stores/getGlobaData";
const { locale } = useI18n();

const globalData = useGlobalData();
const allCards = ref([
  {
    id: "1",
    title: "Poolex",
    color: "#9747FF",
    cols: "2",
    isDraggable: true,
    type: "backoffices",
    content: "",
    menu: "",
    background: "#EDEEFD"
  },
  {
    id: "2",
    title: `${locale.value === "es" ? "Proximos eventos" : "Upcoming events"}`,
    color: "#0AAFFB",
    cols: "1",
    isDraggable: true,
    type: "events",
    content: "",
    menu: "",
    background: "#EDF5FD"
  },
  {
    id: "3",
    title: "Stocks",
    color: "#766bf8",
    cols: "1",
    isDraggable: true,
    type: "stocks",
    content: "",
    menu: "",
    background: "#fff"
  },
  {
    id: "4",
    title: `${locale.value === "es" ? "Criptomonedas" : "Cryptos"}`,
    color: "#d747ff",
    cols: "1",
    isDraggable: true,
    type: "cryptos",
    content: "",
    menu: "",
    background: "#fff"
  },
  {
    id: "5",
    title: `${locale.value === "es" ? "Noticias Poolex" : "Poolex News"}`,
    color: "#87CB7C",
    cols: "1",
    isDraggable: true,
    type: "news",
    content: "",
    menu: "",
    background: "#fff"
  },
]);


const screenWidth = ref(0);

const handleResize = () => {
  screenWidth.value = window.innerWidth;
};





onMounted(() => {
  if (typeof window !== "undefined") {
    screenWidth.value = window.innerWidth;
    window.addEventListener("resize", handleResize);
  }
});

onUnmounted(() => {
  if (typeof window !== "undefined") {
    window.removeEventListener("resize", handleResize);
  }
});
</script>
