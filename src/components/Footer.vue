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
            <li><a href="">ATFX</a></li>
            <li><a href="">Philip Capital</a></li>
            <li><a href="">Roboforex</a></li>
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
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Hendrerit gravida
        rutrum quisque non tellus orci. Rhoncus urna neque viverra justo nec.
        Volutpat lacus laoreet non curabitur gravida arcu ac tortor. Malesuada
        nunc vel risus commodo viverra. Ornare aenean euismod elementum nisi
        quis eleifend quam adipiscing vitae. Eget nunc lobortis mattis aliquam
        faucibus purus. Scelerisque felis imperdiet proin fermentum leo vel orci
        porta non. Feugiat nibh sed pulvinar proin gravida hendrerit. Elementum
        nibh tellus molestie nunc non blandit massa enim nec. Dignissim
        suspendisse in est ante in nibh mauris. Adipiscing vitae proin sagittis
        nisl rhoncus mattis rhoncus urna. Et egestas quis ipsum suspendisse
        ultrices gravida dictum fusce. Velit sed ullamcorper morbi tincidunt
        ornare massa eget egestas. Tellus rutrum tellus pellentesque eu
        tincidunt.
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
