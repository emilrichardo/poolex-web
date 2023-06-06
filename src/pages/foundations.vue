<template>
  <div class="page-fundation relative z-0">
    <Hero
      title="Poolex Foundation"
      caption=""
      background="https://res.cloudinary.com/di4frs2px/image/upload/v1685714215/hero_foundation_d87d8cdb1c.jpg?updated_at=2023-06-02T13:56:55.882Z"
      bgStyle="half"
    >
      <template #cta>
        <h4 class="text-2xl font-semibold text-product">
          Un sueño hecho realidad
        </h4>
      </template>
    </Hero>
    <BlocksMedia :content="blockMedia_1"></BlocksMedia>
  </div>
</template>
<script setup>
const blockMedia_1 = {
  id: 234,
  headings: {
    headline: "¿Quiénes somos?",
    /* sub_headline: "subheadline", */
    caption:
      "Poolex Fundation es una ONG fundada en Bogotá, Colombia en enero de 2022, por los presidents de Poolex: Ana María Forero y Juan Manuel Jiménez. Esta ONG encamina cada uno de sus esfuerzos por ayudar a todas aquellas personas sin hogar, o con una situación de vulnerabilidad.",
  },
  image_side: "left",
  image: {
    image_caption:
      "Cada uno de los usuarios Poolex que desean aportar, hacen posible que sigamos trabajando en beneficio de los niños, a través de Poolex Foundation.",
    image: {
      data: {
        attributes: {
          url: "https://res.cloudinary.com/di4frs2px/image/upload/v1685716014/foundation_about_a912fab655.jpg?updated_at=2023-06-02T14:26:55.004Z",
        },
      },
    },
  },
  features: [],
};

useHead({
  title: "Foundations - Poolex",
  meta: [
    {
      name: "description",
      content:
        "Poolex Fundation es una ONG fundada en Bogotá, Colombia en enero de 2022, por los presidents de Poolex: Ana María Forero y Juan Manuel Jiménez. Esta ONG encamina cada uno de sus esfuerzos por ayudar a todas aquellas personas sin hogar, o con una situación de vulnerabilidad.",
    },
  ],
  /*   bodyAttrs: {
    class: "theme-" + product.value.attributes.slug,
  },
  style: [{ children: productColor.value }], */
});
</script>

<style>
.page-fundation {
  --product: #9747ff;
}
</style>
