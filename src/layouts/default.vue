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
              Link: {
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
      link: {
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
          card: {
            populate: "*",
          },
          testimonial: {
            populate: "*",
          },
          item: {
            populate: "*",
          },
          Link: {
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

const eventsFromApi = await useFetch(`/api/eventos?sort[0]=date&populate=*`);
useData.setEvents(eventsFromApi.data?.value?.data);

// my backoffice

const queryBo = qs.stringify(
  {
    fields: [
      "name",
      "description",
      "slug",
      "color",
      "register_link",
      "api_endpoint",
      "active",
      "backoffice_url",
      "broker_url",
    ],

    populate: {
      localizations: "*",
      icon: {
        fields: ["url"],
      },
      Featured_image: {
        fields: ["url"],
        populate: {
          fields: ["data"],
        },
      },
    },
  },
  {
    encodeValuesOnly: true, // prettify URL
  }
);

const boFromApi = await useFetch(`/api/products?${queryBo}`);

useData.setMyBO(boFromApi.data.value.data);

// styles

const { themeColors, themeStylesTag } = useGetColors();

themeColors(optionsFromApi.data?.value?.data?.attributes?.colors);
// meta datos
useHead({
  style: [{ children: themeStylesTag }],
});
</script>
