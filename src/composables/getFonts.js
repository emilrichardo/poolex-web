
import { ref } from "vue";


export const useGetFonts = () => {
    const themeFontsStyle = ref(null);
    const themeFontsImports = ref(null);
    function themefonts (allThemes){
        themeFontsStyle.value =  toStyles(allThemes)
        themeFontsImports.value = toImports(allThemes)
    }
    return {
        themefonts,
        themeFontsImports,
        themeFontsStyle
    };
};


/// function convert imports
function toImports(themes){
    const res =  themes.map(t=>{
        const obj =Object.entries(t.fonts)
        const objToArray = obj.map(([key, val]) => ({name: key, data:val}))
        const importFont = (url) => url && `@import url('${url}');`
        const set = objToArray.map(f=>{
            const res = ref(null)
            if(f.name === "id"){
                res.value = null
            } else{
                res.value = f.data?.font_url && `${importFont(f.data.font_url)} `
            }
            return res.value
        }).join('')
        return `${set} `
    }).join('')

    return   res
}

/// function convert style
 function toStyles(themes){
    const res =  themes.map(t=>{
        const obj =Object.entries(t.fonts)
        const objToArray = obj.map(([key, val]) => ({name: key, data:val}))

        const set = objToArray.map(f=>{
            const res = ref(null)
            if(f.name === "id"){
                res.value = null
            } else{
                res.value =  `--${f.name.replace('_', '-')}: ${ f.data?.name !== undefined ? f.data?.font_family : "var(--font-base)"}; `
            }
            return res.value
        }).join('')
        return `.${t.theme}{${set}} `
    }).join('')

    return  res
}