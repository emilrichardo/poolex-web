import {defineStore} from 'pinia'
export const useGlobalOptions = defineStore('options',{

    state:()=>({
        options: null,
        lang: "en",


    }),
    actions:{
        async setOptions(data){
            try {
                const op= await data
                this.options = op
            } catch (error) {
                console.log(error);
            }

        },
        async setLang(data){
            try {
                const op= await data
                this.lang = op
            } catch (error) {
                console.log(error);
            }

        },


    }

})
