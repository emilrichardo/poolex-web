<template>
  <div>Login</div>

  <pre class="bg-light-500">
    {{ globalOptions.userData }}
  </pre>
  <button @click="login">login</button>
  <br />
  <a :href="host" target="_blank">ir a backoffice</a>
  <br />
  <button @click="getLogOut">loggout</button>
</template>
<script setup>
import { useGlobalOptions } from "@/stores/getGlobaOptions";

const globalOptions = useGlobalOptions();

const host = "https://staging.poolex.io";
const host_academy = "https://staging.poolex.academy";

const email = "test8@email.com";
const password = "abcd1234";
const requestOptions = {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ email: email, password: password }),
};

const login = () => {
  fetch(host + "/api/v1/login", requestOptions)
    .then(async (response) => {
      const data = await response.json();

      // check for error response
      if (!response.ok) {
        // get error message from body or default to response status
        const error = (data && data.message) || response.status;
        return Promise.reject(error);
      }
      console.log(data);

      globalOptions.setUserData(data);
    })
    .catch((error) => {
      console.error("There was an error!", error);
    });
};
const getLogOut = async () => {
  try {
    const response = await fetch(`${host}/api/v1/logout`);
    const json = await response.json();
    console.log(json);
    globalOptions.setUserData(null);
  } catch (error) {}
};
</script>
