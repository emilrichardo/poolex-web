<template>
  <div>
    <Hero :title="locale === 'es' ? 'Contacto' : 'Contact us'" :background="content.image?.image?.data?.attributes?.url"
      bgStyle="half"><template #cta>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 text-left lg:text-xl max-w-screen-md lg:max-w-none mx-auto">
          <div class="corporate">
            <h3 class="font-semibold">
              {{ locale === "es" ? "Corporativo" : "Corporate" }}
            </h3>
            <ul class="divide-y divide-slate-200">
              <li class="font-light py-4" v-for="contact in filteredContacts('corporate')">
                <h5 class="lg:text-base xl:text-lg">{{ contact.email }}</h5>
                <h4 class="lg:text-base xl:text-lg">{{ contact.phone }}</h4>
              </li>
            </ul>
          </div>
          <div class="commercial">
            <h3 class="font-semibold">
              {{ locale === "es" ? "Comercial" : "Commercial" }}
            </h3>
            <ul class="divide-y divide-slate-200">
              <li class="font-light py-4" v-for="contact in filteredContacts('commercial')">
                <h5 class="lg:text-base xl:text-lg">{{ contact.email }}</h5>
                <h4 class="lg:text-base xl:text-lg">{{ contact.phone }}</h4>
              </li>
            </ul>
          </div>
        </div>
      </template></Hero>
  </div>
</template>
<script setup>
const { content } = defineProps(["content"]);
const { locale } = useI18n();
const contactData = [
  {
    email: "presidencia@poolex.io",
    phone: "+57 312 7441958",
    group: "corporate",
  },
  {
    email: "vicepresidencia@poolex.io",
    phone: "+57 316 8892869",
    group: "corporate",
  },
  { email: "academia@poolex.io", phone: "+57 312 8231885", group: "corporate" },
  {
    email: "comercial@poolex.io",
    phone: "+57 316 8892869",
    group: "commercial",
  },
  {
    email: "crowdfunding@poolex.io",
    phone: "+57 318 2102219",
    group: "commercial",
  },
];

const filteredContacts = (group) => {
  return contactData.filter((contact) => contact.group === group);
};
</script>
