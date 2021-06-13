import Cookies from "js-cookie"

const isAuthenticated = (name: string) =>{
    if (Cookies.get(name)) {
        return true 
    } else {
        return false
    }
}

export default isAuthenticated