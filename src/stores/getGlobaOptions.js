import {defineStore} from 'pinia'
export const useGlobalOptions = defineStore('options',{

    state:()=>({
        options: null,
        userData: null,


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
        async setUserData(data){
            try {
                const user= await data
                this.userData = user
            } catch (error) {
                console.log(error);
            }

        },


    }

})
