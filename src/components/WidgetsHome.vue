<template>
  <section id="widgets" class="py-14">
    <div class="container mx-auto">
      <draggable
        v-model="allCards"
        tag="div"
        class="card-group grid grid-cols-1 lg:grid-cols-3 gap-8"
      >
        <template #item="{ element: card }">
          <div :class="card.cols == 2 && '   lg:col-span-2'">
            <ClientOnly>
              <Card
                :title="card.title"
                :color="card.color"
                :isDraggable="card.isDraggable"
              >
                <template #card-body>
                  <div class="relative h-full">
                    <template v-if="card.type == 'backoffices'">
                      <div class="grid lg:grid-cols-3 gap-4 py-4 px-6">
                        <CardProduct
                          v-for="product in globalData.myBackoffices"
                          :title="product.attributes.name"
                          :color="product.attributes.color"
                          :icon="product.attributes.icon"
                          :isRegister="product.success"
                          :attributes="product.attributes"
                        />
                      </div>
                    </template>
                    <template v-if="card.type == 'weather'">
                      <WidgetWeather></WidgetWeather>
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
  },
  {
    id: "2",
    title: "Weather",
    color: "#76A2F8",
    cols: "1",
    isDraggable: true,
    type: "weather",
    content: "",
    menu: "",
  },
  {
    id: "3",
    title: "Stocks",
    color: "#94AED7",
    cols: "1",
    isDraggable: true,
    type: "stocks",
    content: "",
    menu: "",
  },
  {
    id: "4",
    title: "Cryptos",
    color: "#F99999",
    cols: "1",
    isDraggable: true,
    type: "cryptos",
    content: "",
    menu: "",
  },
  {
    id: "5",
    title: "Poolex News",
    color: "#87CB7C",
    cols: "1",
    isDraggable: true,
    type: "news",
    content: "",
    menu: "",
  },
]);
</script>
