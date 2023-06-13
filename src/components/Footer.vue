<template>
  <footer class="">
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
        class="menu-footer grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 py-16"
      >
        <div class="footermenu">
          <h4 class="text-2xl font-medium mb-6">
            {{ locale === "en" ? "Products" : "Productos" }}
          </h4>

          <ul v-if="useData.products" class="flex flex-col gap-3">
            <li
              class="text-dark-100 hover:underline"
              v-for="product in useData.products"
              :key="product.id"
            >
              <nuxt-link :to="localePath('/' + product.attributes.slug)">
                {{ useGetLocale(locale, product).name }}
              </nuxt-link>
            </li>
          </ul>
        </div>
        <div class="footermenu">
          <h4 class="text-2xl font-medium mb-6 max-w-[200px]">
            {{
              locale === "en"
                ? "Allied Brokers Regulations"
                : "Reglamento de Brokers aliados"
            }}
          </h4>

          <ul class="flex flex-col gap-3">
            <li><a href="https://www.atfx.com/es">ATFX</a></li>
            <li><a href="https://www.phillipcapital.com">Philip Capital</a></li>
            <li><a href="https://roboforex.com">Roboforex</a></li>
          </ul>
        </div>
        <div class="footer_about">
          <h4 class="text-2xl font-medium mb-6">
            {{ locale === "en" ? "About us" : "Sobre nosotros" }}
          </h4>
          <Button
            type="button"
            size="md"
            variant="default_outline"
            class="flex gap-4 items-center"
          >
            {{ locale === "en" ? "Presentation" : "Presentación" }}
            <Icon name="heroicons:arrow-down-tray-20-solid"></Icon>
          </Button>
        </div>
        <div class="footermenu">
          <h4 class="text-2xl font-medium mb-6">
            {{ locale === "en" ? "Language" : "Idioma" }}
          </h4>

          <div class="flex gap-4">
            <NuxtLink v-for="lang in locales" :to="switchLocalePath(lang)">{{
              lang
            }}</NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </footer>
  <div class="copy bg-light-100 py-24 text-dark-100">
    <div class="container">
      <h4 class="font-bold text-xl mb-4">Legal</h4>
      <p class="text-sm">
        POOLEX ACADEMY LLC was filed on 10 May 2022 as Limited Liability Company
        type, registered at 8450 NW 102 AVE 331 DORAL, FL 33178 . It's Document
        Number is L22000220760, . The state for this company is Florida.There
        are 2 directors of this company. The agent name of this company is:
        MARQUEZA INVESTMENTS LLC , and company's status is ACTIVE now. Poolex
        Academy Llc has been operating for 1 years 1 months, and 3 days. <br />
        Poolex Fundraising Inc filed as a Domestic Non Profit Corporation in the
        State of Florida on Saturday, February 25, 2023 and is approximately
        three months old, as recorded in documents filed with Florida Department
        of State.
      </p>
      <p class="text-sm mt-24 text-center">
        Poolex © 2023 All rights reserved.
      </p>
    </div>
  </div>
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
