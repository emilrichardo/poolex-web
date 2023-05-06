import {defineStore} from 'pinia'
export const useGlobalData = defineStore('data',{

    state:()=>({
        team: null,
        products: null
    }),
    actions:{
        async setTeam(data){
            try {
                const d= await data
                this.team = d
            } catch (error) {
                console.log(error);
            }
        },
        async setProducts(data){
            try {
                const d= await data
                this.products = d
            } catch (error) {
                console.log(error);
            }

        },

    }

})
