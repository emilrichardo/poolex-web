const setCookies = (name, value, domain)=>{
    document.cookie = `${name}=${value}; domain=${domain}; path=/`;
}
export default setCookies