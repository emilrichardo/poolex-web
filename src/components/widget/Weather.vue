<template>
  <div class="py-8 px-6">
    <div
      class="w-full h-full min-h-[100px] flex justify-center items-center"
      v-if="!weatherData"
    >
      <Icon
        name="line-md:loading-twotone-loop"
        class="text-primary"
        size="32px"
      ></Icon>
    </div>
    <div v-else class="grid grid-cols-2">
      <div class="col1">
        <h3 class="text-lg font-semibold">
          {{ weatherData.data?.location?.name }}
        </h3>
        <p class="date text-xs">{{ today }}</p>
        <ul class="card-list border border-light-500 rounded-lg mt-6">
          <li
            class="flex justify-between px-4 lg:px-8 py-3 text-dark-200 text-sm"
          >
            <span>Precipitaciones</span>
            <span>{{ weatherData.data.current.precip_in }}</span>
          </li>
          <li
            class="flex justify-between px-4 lg:px-8 py-3 text-dark-200 text-sm"
          >
            <span>Humedad</span>
            <span>{{ weatherData.data.current.humidity }}</span>
          </li>
          <li
            class="flex justify-between px-4 lg:px-8 py-3 text-dark-200 text-sm"
          >
            <span>Viento</span>
            <span>{{ weatherData.data.current.wind_kph }} km/h</span>
          </li>
        </ul>
      </div>
      <div class="col2 text-center">
        <img
          class="mx-auto w-full max-w-[69px] mb-8"
          v-if="weatherData.data.current.condition.icon"
          :src="weatherData.data.current.condition.icon"
          :alt="weatherData.data.current.condition.text"
        />
        <h5>{{ weatherData.data.current.condition.text }}</h5>
        <h4
          class="text-4xl lg:text-6xl mt-4"
          v-if="weatherData.data.current.temp_c"
        >
          {{ weatherData.data.current.temp_c }}
        </h4>
      </div>
    </div>
  </div>
</template>
<script setup>
const runtimeConfig = useRuntimeConfig();

const today = new Date().toLocaleDateString("en-US", {
  weekday: "long",
  month: "long",
  day: "numeric",
  year: "numeric",
});

const weatherData = ref(null);

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    async function (position) {
      try {
        let latitude = position.coords.latitude;
        let longitude = position.coords.longitude;
        const res = await useFetch(
          `${runtimeConfig.public.apiWeather}/current.json?key=${runtimeConfig.public.apiWeatherKey}&q=${latitude},${longitude}`
        );
        weatherData.value = res;
      } catch (error) {
        console.log("Error al obtener los datos del clima:", error.message);
      }
    },
    function (error) {
      switch (error.code) {
        case error.PERMISSION_DENIED:
          console.log("El usuario denegó el permiso para la geolocalización");
          // Asignar valores predeterminados si se deniega el permiso
          let latitude = 4.60971;
          let longitude = -74.08175;
          // Realizar la llamada a la API de WeatherAPI con los valores predeterminados
          fetchData(latitude, longitude);
          break;
        case error.POSITION_UNAVAILABLE:
          console.log("La información de ubicación no está disponible");
          break;
        case error.TIMEOUT:
          console.log(
            "La solicitud para obtener la ubicación del usuario ha expirado"
          );
          break;
        case error.UNKNOWN_ERROR:
          console.log(
            "Se produjo un error desconocido al obtener la ubicación"
          );
          break;
      }
    }
  );
} else {
  console.log("La geolocalización no es compatible en este navegador");
}

async function fetchData(latitude, longitude) {
  const res = await useFetch(
    `${runtimeConfig.public.apiWeather}/current.json?key=${runtimeConfig.public.apiWeatherKey}&q=${latitude},${longitude}`
  );
  weatherData.value = res;
}
</script>
