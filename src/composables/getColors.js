import { ref } from "vue"



class themeObj{
    constructor({name, id, colors = [], category, active }){
        this.name = name;
        this.id=id;
        this.colors=colors;
        this.category = category;
        this.active = active
    }
}


export const useGetColors=()=>{
    const themeStylesTag = ref(null)
    //map colors
    function themeColors(colors){
        /* const themes = allThemes.map(theme=> {
            const obj = Object.entries(theme.options.colors)
            const objToArray = obj.map(([key, val]) => ({name: key, hex:val}))
            return new themeObj({
                id: theme.id,
                name: theme.name,
                colors: objToArray
            })

        }) */
        const obj = Object.entries(colors)
        const objToArray = obj.map(([key, val]) => ({name: key, hex:val}))


    themeStylesTag.value = creatVar(objToArray)



    }
    return {
        themeColors,
        themeStylesTag
    }


}



/// generate var css
 function creatVar(colors){
    const darken = [0,100,200,300];
    const Styles = darken.map(tone=>{
        return colors.map(color=>{

            if(color.name !== "id" && color.name !== "style_colors" && color.hex !== null){
                const colorRGB = color.hex.replace('#','').convertToRGB()
                return ` --${color.name}${tone !== 0 ? '-lighten-' + tone : ''}: ${shadeRGBColor("rgb("+ colorRGB + ")" , (tone /1000) )}; --${color.name}${tone !== 0 ? '-darken-' + tone : ''}: ${shadeRGBColor("rgb("+ colorRGB + ")" , -(tone /1000) )}; --accesible-${color.name}:var(${getAccessibleColor(color.hex)});`

            }
        }).join('')
    }).join('')

    return `:root{${Styles}}  `



        /* return colors.map(color=>{
            if(color.name !== "id" && color.name !== "style_colors" && color.hex !== null){
                const colorRGB = color.hex.replace('#','').convertToRGB()
                return `--${color.name}${tone !== 0 ? '-lighten-' + tone : ''}: ${shadeRGBColor("rgb("+ colorRGB + ")" , (tone /1000) )};--${color.name}${tone !== 0 ? '-darken-' + tone : ''}: ${shadeRGBColor("rgb("+ colorRGB + ")" , -(tone /1000) )}; --accesible-${color.name}:var('${getAccessibleColor(color.hex)}')`
            }
        }).join('') */

    }




//convert hex to rgb
String.prototype.convertToRGB = function(){
    var aRgbHex = this.match(/.{1,2}/g);
    var aRgb = [
        parseInt(aRgbHex[0], 16),
        parseInt(aRgbHex[1], 16),
        parseInt(aRgbHex[2], 16)
    ];
    return aRgb;
}

function shadeRGBColor(color, percent) {
    var f=color.split(","),t=percent<0?0:255,p=percent<0?percent*-1:percent,R=parseInt(f[0].slice(4)),G=parseInt(f[1]),B=parseInt(f[2]);
    return  (Math.round((t-R)*p)+R)+","+(Math.round((t-G)*p)+G)+","+(Math.round((t-B)*p)+B) ;
}



/////////////////////////////////////////////////////////////////////
// Determine the accessible color of text
/////////////////////////////////////////////////////////////////////
function getAccessibleColor  (hex)  {
    let color = hex.replace(/#/g, "")
    // rgb values
    var r = parseInt(color.substr(0, 2), 16)
    var g = parseInt(color.substr(2, 2), 16)
    var b = parseInt(color.substr(4, 2), 16)
    var yiq = (r * 299 + g * 587 + b * 114) / 1000
    return yiq >= 128 ? "--dark" : "--light"
  }
