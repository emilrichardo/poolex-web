<template>
  <Header />

  <main class="in-h-full">
    <slot />
  </main>
  <Footer />
</template>
<script setup>
import qs from "qs";
import { computed, ref } from "vue";
import { useGlobalOptions } from "@/stores/getGlobaOptions";
import { useGlobalData } from "@/stores/getGlobaData";

import { useGetColors } from "@/composables/getColors";
import { on } from "events";

const { locales, locale } = useI18n();
const useData = useGlobalData();
const useOptions = useGlobalOptions();

const isLoading = ref(true);
onBeforeMount(() => {
  isLoading.value = true;
});

onMounted(() => {
  isLoading.value = false;
});

/* if (localStorage.getItem("userData")) {
  const storageUserData = JSON.parse(localStorage.getItem("userData"));
  useOptions.setUserData(storageUserData);
}

if (localStorage.getItem("myBackoffices")) {
  const storageBo = JSON.parse(localStorage.getItem("myBackoffices"));
  useData.setMyBO(storageBo);
} */

const query = qs.stringify({
  populate: {
    header: {
      populate: "*",
    },
    colors: {
      populate: "*",
    },
    Social_networks: {
      populate: "*",
    },
    localizations: {
      populate: {
        header: {
          populate: "*",
        },
      },
    },
  },
});

const optionsFromApi = await useFetch(`/api/option?${query}`);

useOptions.setOptions(optionsFromApi);

const queryProducts = qs.stringify(
  {
    populate: {
      localizations: {
        populate: {
          sections: {
            populate: {
              headings: {
                populate: "*",
              },
              image: {
                populate: "*",
              },
              features: {
                populate: "*",
              },
              background: {
                populate: "*",
              },
              video: {
                populate: "*",
              },
              style: {
                populate: "*",
              },
              internal_margin: {
                populate: "*",
              },
              icons: {
                populate: "*",
              },
              logo: {
                populate: "*",
              },
              brands: {
                populate: "*",
              },
              calculator: {
                populate: "*",
              },
              text: {
                populate: "*",
              },
              membership: {
                populate: "*",
              },
              team: {
                populate: "*",
              },
              plan: {
                populate: "*",
              },
              testimonial: {
                populate: "*",
              },
              item: {
                populate: "*",
              },
            },
          },
        },
      },
      Featured_image: {
        populate: "*",
      },
      icon: {
        populate: "*",
      },
      sections: {
        populate: {
          headings: {
            populate: "*",
          },
          image: {
            populate: "*",
          },
          features: {
            populate: "*",
          },
          background: {
            populate: "*",
          },
          video: {
            populate: "*",
          },
          style: {
            populate: "*",
          },
          internal_margin: {
            populate: "*",
          },
          icons: {
            populate: "*",
          },
          logo: {
            populate: "*",
          },
          brands: {
            populate: "*",
          },
          calculator: {
            populate: "*",
          },
          text: {
            populate: "*",
          },
          membership: {
            populate: "*",
          },
          team: {
            populate: "*",
          },
          plan: {
            populate: "*",
          },
          testimonial: {
            populate: "*",
          },
          item: {
            populate: "*",
          },
        },
      },
    },
  },
  {
    encodeValuesOnly: true, // prettify URL
  }
);

const productsFromApi = await useFetch(`/api/products?${queryProducts}`);

useData.setProducts(productsFromApi.data?.value?.data);
useData.setMyBO(productsFromApi.data.value.data);

// styles

const { themeColors, themeStylesTag } = useGetColors();

themeColors(optionsFromApi.data.value.data.attributes.colors);

// meta datos
useHead({
  style: [{ children: themeStylesTag }],
});
</script>
