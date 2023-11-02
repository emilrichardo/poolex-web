import { defineStore } from "pinia";
export const useGlobalData = defineStore("data", {
  state: () => ({
    team: null,
    products: null,
    myBackoffices: null,
    myProducts: null,
    whoami: null,
    events: null,
  }),
  actions: {
    async setProducts(data) {
      try {
        const d = await data;
        this.products = d;
      } catch (error) {
        console.log(error);
      }
    },
    async setTeam(data) {
      try {
        const d = await data;
        this.team = d;
      } catch (error) {
        console.log(error);
      }
    },
    async setMyBO(data) {
      try {
        const user = await data;
        this.myBackoffices = user;
      } catch (error) {
        console.log(error);
      }
    },
    async setEvents(data) {
      try {
        const d = await data;
        this.events = d;
      } catch (error) {
        console.log(error);
      }
    },

    async setMyProducts(data) {
      try {
        const user = await data;
        this.myProducts = user;
      } catch (error) {
        console.log(error);
      }
    },

    async setWhoami(data) {
      try {
        const user = await data;
        this.whoami = user;
      } catch (error) {
        console.log(error);
      }
    },
  },
  persist: {
    storage: persistedState.localStorage,
  },
});
