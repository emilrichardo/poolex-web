<template>
  <component class="page-components" v-for="section in useGetLocaleSections(locale, page).sections" :key="section.id"
    :is="formatName(section.__component)" :content="section"></component>
</template>

<script setup>
import qs from "qs";
import { useGetLocale, useGetLocaleSections } from "@/composables/getLocale";
const { locales, locale } = useI18n();
const route = useRoute();

const page = ref(null);

const query = qs.stringify(
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

const productsFromApi = await useFetch(`/api/pages?${query}`);

if (productsFromApi.error !== null) {
  const res = computed(() => {
    if (productsFromApi.data) {
      const pageFilter = productsFromApi.data.value.data.filter(
        (page) => page.attributes?.slug === route.params.pages
      )[0];
      if (pageFilter) {
        return pageFilter;
      } else {
        throw createError({ statusCode: 404, statusMessage: "Page Not Found" });
        return "";
      }
    }
  });

  page.value = res.value;
}

useHead({
  title: page.value.attributes?.Title + " - Poolex",
  meta: [
    {
      name: "description",
      content: page.value.attributes?.description,
    },
  ],
});

const formatName = (name) => {
  const newName = name
    .replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
      return index === 0 ? word.toUpperCase() : word.toUpperCase();
    })
    .replace(/\s+/g, "")
    .replace(".", "")
    .replace("-", "")
    .replace(" ", "");
  return newName;
};
</script>

<style scoped>
.page-components {
  --product: #9747ff;
}

.image-caption {
  color: #fff;
}
</style>
