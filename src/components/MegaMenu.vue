<template>
  <div
    class="absolute z-50 top-0 left-0 h-screen w-full"
    @click="closeMegaMenu"
  >
    <div
      class="h-screen lg:h-[380px] bg-black absolute top-[72px] w-full left-0 lg:left-1/2 lg:-translate-x-1/2 lg:max-w-[calc(theme(screens.lg)-theme(spacing.14))] xl:max-w-[calc(theme(screens.xl)-theme(spacing.14))]"
      @click.stop
    >
      <div :class="`h-full grid  ${gridMenu}`">
        <template v-for="item in menuData">
          <NuxtLink :to="localePath(item.url)" @click="closeMegaMenu">
            <div
              class="h-full flex flex-col items-center justify-center"
              :style="`background-color:${item.color}`"
            >
              <div
                class="cont px-20 lg:px-14 xl:px-20 flex flex-col items-center gap-2 justify-center"
              >
                <NuxtImg
                  class="flex-none w-16"
                  v-if="item.icon"
                  :src="item.icon"
                  alt="icon"
                />
                <h3 v-if="item.label" class="text-center text-xl">
                  {{ item.label }}
                </h3>
                <NuxtLink
                  v-if="item.subitems"
                  v-for="subitem in item.subitems"
                  :to="localePath(subitem.url)"
                  class="w-full"
                >
                  <Button
                    class="w-full flex items-center"
                    type="button"
                    variant="dark_outline"
                    @click="closeMegaMenu"
                  >
                    <img
                      class="flex-none w-6 mr-2"
                      v-if="subitem.icon"
                      :src="subitem.icon"
                      alt="icon"
                    />

                    {{ subitem.label }}
                  </Button>
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
    color: "#FCC967",
    url: "/product/academy",
    label: "Poolex Academy",
    icon: "https://res.cloudinary.com/di4frs2px/image/upload/v1685726098/Capa_1_ec8166ecfa.svg?updated_at=2023-06-02T17:15:00.480Z",
    subitems: [
      {
        label: "Poolex Trade",
        url: "/product/trade",
        icon: "https://res.cloudinary.com/di4frs2px/image/upload/v1685726098/trade_5ab6e8ff0d.svg?updated_at=2023-06-02T17:15:00.314Z",
      },
      {
        label: "Poolex Space",
        url: "/product/space",
        icon: "https://res.cloudinary.com/di4frs2px/image/upload/v1685726098/space_7c6832b698.svg?updated_at=2023-06-02T17:15:00.270Z",
      },
      /* {
        label: "Poolex Signals",
        url: "/",
        icon: "https://res.cloudinary.com/di4frs2px/image/upload/v1685726098/signals_4803e7c718.svg?updated_at=2023-06-02T17:15:00.338Z",
      }, */
    ],
  },
  {
    color: "#F37171",
    label: "Poolex Investment",
    url: "/product/investment",
    icon: "https://res.cloudinary.com/di4frs2px/image/upload/v1685726098/incestment_a394a66076.svg?updated_at=2023-06-02T17:15:00.098Z",
  },
  {
    color: "#CC9CEA",
    label: "Eco Real State",
    url: "/product/eco-real-estate",
    icon: "https://res.cloudinary.com/di4frs2px/image/upload/v1685726098/ecorealstate_cdac665d4c.svg?updated_at=2023-06-02T17:15:00.173Z",
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
