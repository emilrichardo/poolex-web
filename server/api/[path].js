export default defineEventHandler(async  (event)=>{
    const config = useRuntimeConfig();
    const {apiBase} = config.public
    const {path} = event.context.params
    const query =  getQuery(event)
    const queyParams = new URLSearchParams(query).toString();
    const apiUrl = `${apiBase}/api/${path}${queyParams && "?" + queyParams}`
    const data =  await $fetch(apiUrl)
    return data
})