import {defineStore} from 'pinia'
export const useGlobalOptions = defineStore('options',{

    state:()=>({
        options: null,

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


    }

})
