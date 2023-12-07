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


        <form action="https://formsubmit.co/comercial@poolex.io" method="POST"
          class="col-span-1 md-col-span-2 grid grid-cols-6 gap-2 w-full mb-4 md:mb-2 bg-[#f0f4f8] px-6 py-12 my-auto rounded-md">
          <h2 class="col-span-6 heading text-2xl font-medium mb-8 text-center">
            {{ locale === "es" ? "Envíanos tus dudas" : "Send us your questions" }}
          </h2>
          <input type="hidden" name="_next" value="https://landingst.poolex.io/contact">
          <input type="hidden" name="_captcha" value="false">
          <div class="col-span-6 md:col-span-3 input-group flex flex-col gap-1">
            <label class="text-sm w-full text-left" for="name">
              {{ locale === "es" ? "Nombre" : "Name" }}
            </label>
            <input class="py-2 px-2 focus:outline-primary" v-model="dataModal.name" type="text" id="name" name="name"
              :class="{ 'border-red-500': dataModal.name.length < 3 }" />
          </div>

          <div class="col-span-6 md:col-span-3 input-group flex flex-col gap-1">
            <label class="text-sm w-full text-left" for="email">
              {{ locale === "es" ? "Email" : "Email" }}
            </label>
            <input class="py-2 px-2 focus:outline-primary" v-model="dataModal.email" type="email" id="email" name="email"
              :class="{ 'border-red-500': dataModal.email.length < 3 }" />
          </div>

          <div class="col-span-6 input-group flex flex-col gap-1">
            <label class="text-sm w-full text-left" for="message">
              {{ locale === "es" ? "Mensaje" : "Message" }}
            </label>
            <textarea class="py-2 px-2 h-24 focus:outline-primary" v-model="dataModal.message" id="message" name="message"
              :class="{ 'border-red-500': dataModal.message.length < 3 }"></textarea>
          </div>

          <p class="col-span-6 text-slate-600">
            {{ locale === "es" ?
              "Compartenos tus dudas" :
              "Complete the data (name,email, message) " }}
          </p>

          <Button type="submit" variant="default" size="sm" class="text-white col-span-6 h-9"
            :disabled="isSubmitDisabled">
            {{ locale === "es" ? "Enviar" : "Send" }}
          </Button>
        </form>
      </template>
    </Hero>
  </div>
</template>
<script setup>
const { content } = defineProps(["content"]);
const { locale } = useI18n();
const dataModal = ref({ name: "", email: "", message: "" })
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

const isSubmitDisabled = computed(() => {
  return Object.values(dataModal.value).some(field => field.length < 3);
});

const filteredContacts = (group) => {
  return contactData.filter((contact) => contact.group === group);
};


</script>
