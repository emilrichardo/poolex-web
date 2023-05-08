<template>
  <footer class="bg-light-100">
    <!--  {{ useData.products }} -->

    <div class="container mx-auto">
      <div class="social-links flex gap-4 justify-center py-24">
        <a
          v-for="link in socialLinks"
          class="cursor-pointer text-dark-100 hover:text-primary transition-all hover:scale-110 text-2xl"
          :href="link.url"
        >
          <Icon :name="`${link.icon_tag}`" />
          <span class="hidden">{{ link.name }}</span>
        </a>
      </div>
      <hr class="border-t border-light-500" />
      <div
        class="menu-footer grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-5 py-16"
      >
        <div class="footermenu">
          <h4 class="text-2xl font-bold mb-6">Products</h4>

          <ul v-if="useData.products" class="flex flex-col gap-3">
            <li
              class="text-dark-100 bg-primary p-4 text-light hover:underline"
              v-for="product in useData.products"
              :key="product.id"
            >
              <nuxt-link :to="localePath('/' + product.attributes.slug)">
                <pre> {{useGetLocale(locale, product, "name", )}}  <!-- {{ localText(product, "name") }} --></pre>
              </nuxt-link>
            </li>
          </ul>
        </div>
        <div class="footermenu">
          <h4 class="text-2xl font-bold mb-6">Contact</h4>
        </div>
        <div class="footermenu">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui eos
          aperiam unde rerum esse beatae assumenda doloribus reiciendis vel
          expedita omnis quisquam ut, doloremque, alias at quis! Molestias
          incidunt reiciendis cum possimus inventore.
        </div>
        <div class="footermenu">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui eos
          aperiam unde rerum esse beatae assumenda doloribus reiciendis vel
          expedita omnis quisquam ut, doloremque, alias at quis! Molestias
          incidunt reiciendis cum possimus inventore.
        </div>
      </div>
      <div class="flex gap-4">
        <NuxtLink v-for="lang in locales" :to="switchLocalePath(lang)">{{
          lang
        }}</NuxtLink>
      </div>
    </div>
  </footer>
  {{ localePath("/home") }}
</template>
<script setup>
import { useGlobalOptions } from "@/stores/getGlobaOptions";
import { useGlobalData } from "@/stores/getGlobaData";
import { useGetLocale } from "@/composables/getLocale";

const localePath = useLocalePath();
const switchLocalePath = useSwitchLocalePath();
const { locales, locale } = useI18n();

const useOptions = useGlobalOptions();
const useData = useGlobalData();

const socialLinks = useOptions.options.data.data.attributes.Social_networks;
</script>
