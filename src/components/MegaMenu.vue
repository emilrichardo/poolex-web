<template>
  <div class="absolute z-50 top-0 left-0 h-screen w-full overflow-y-auto" @click="closeMegaMenu">
    <div
      class="h-screen lg:h-[380px] bg-black absolute top-[72px] w-full left-0 lg:left-1/2 lg:-translate-x-1/2 lg:max-w-[calc(theme(screens.lg)-theme(spacing.14))] xl:max-w-[calc(theme(screens.xl)-theme(spacing.14))] "
      @click.stop>
      <div :class="`h-full grid ${gridMenu}`">
        <template v-for="item in menuData">
          <NuxtLink :to="localePath(item.url)" @click="closeMegaMenu">
            <div class="h-full flex flex-col items-center justify-center" :style="`background-color:${item.color}`">
              <div :class="`cont px-10 lg:px-14 xl:px-18 flex flex-col items-center gap-6 justify-center`">
                <div :class="`flex flex-col sm:flex-row items-center gap-2 justify-center bg-[#${item.color}] p-5 md:p-12 rounded-lg transition-all 
hover:scale-105`" :style="`box-shadow: 7px 7px 14px ${item.shadow}, -7px -7px 14px ${item.light};`">
                  <NuxtImg class="flex-none w-16 max-h-[46px]" v-if="item.icon" :src="item.icon" alt="icon" />
                  <h3 v-if="item.label" class="text-center sm:text-left text-xl text-white">
                    {{ item.label }}
                  </h3>
                </div>
                <NuxtLink v-if="item.subitems" v-for="subitem in item.subitems" :to="localePath(subitem.url)"
                  class="w-full">
                  <div class="bg-[#${item.color}] flex flex-row items-center rounded-lg px-4 py-3 transition-all 
hover:scale-105" :style="`box-shadow: 7px 7px 14px ${item.shadow}, -7px -7px 14px ${item.light};`">
                    <NuxtImg class="flex-none w-16 max-h-[32px]" v-if="subitem.icon" :src="subitem.icon" alt="icon" />
                    <h4 v-if="subitem.label" class="text-left text-lg text-white">
                      {{ subitem.label }}
                    </h4>
                  </div>
                </NuxtLink>
              </div>
            </div>
          </NuxtLink>
          {{ menuIsOpen }}
        </template>
      </div>
    </div>
  </div>
</template>
<script setup>
const localePath = useLocalePath();
const emit = defineEmits(["inFocus", "submit"]);

const closeMegaMenu = () => {
  emit("toggleMegaMenu");
  emit("closeMenu");
};

const menuData = [
  {
    color: "#8549DB",
    light: "#9954FC",
    shadow: "#713EBA",
    url: "/product/academy",
    label: "Poolex Academy",
    icon: "https://res.cloudinary.com/di4frs2px/image/upload/v1698264536/academy_icon_white_6c519c0470.svg?updated_at=2023-10-25T20:08:58.499Z",
    subitems: [
      {
        label: "Poolex Trade IA",
        url: "/product/trade",
        icon: "https://res.cloudinary.com/di4frs2px/image/upload/v1698264535/trade_icon_white_6b6680e882.svg?updated_at=2023-10-25T20:08:57.002Z",
      },
      {
        label: "Poolex Space",
        url: "/product/space",
        icon: "https://res.cloudinary.com/di4frs2px/image/upload/v1698264536/space_icon_white_08c225cad2.svg?updated_at=2023-10-25T20:08:58.217Z",
      },
      /* {
        label: "Poolex Signals",
        url: "/",
        icon: "https://res.cloudinary.com/di4frs2px/image/upload/v1685726098/signals_4803e7c718.svg?updated_at=2023-06-02T17:15:00.338Z",
      }, */
    ],
  },
  {
    color: "#6757D2",
    light: "#7664F2",
    shadow: "#584AB3",
    label: "Poolex Investment",
    url: "/product/investment",
    icon: "https://res.cloudinary.com/di4frs2px/image/upload/v1698264536/investment_icon_white_ef219a7c2b.svg?updated_at=2023-10-25T20:08:57.764Z",
  },
  {
    color: "#2DACE6",
    light: "#34C6FF",
    shadow: "#2692C4",
    label: "Eco Real State",
    url: "/product/eco-real-estate",
    icon: "https://res.cloudinary.com/di4frs2px/image/upload/v1698264535/rea_state_icon_white_9cee34d135.svg?updated_at=2023-10-25T20:08:57.132Z",
  },
];

const gridMenu = computed(
  () =>
    (menuData.length === 1 && " grid-cols-1 lg:grid-row-1") ||
    (menuData.length === 2 &&
      "grid-cols-1  lg:grid-cols-2 grid-row-2 lg:grid-row-1") ||
    (menuData.length === 3 &&
      "grid-cols-1 lg:grid-cols-3 grid-row-2 lg:grid-row-1") ||
    (menuData.length === 4 &&
      " grid-cols-1 lg:grid-cols-4 grid-row-4 lg:grid-row-1")
);
</script>
