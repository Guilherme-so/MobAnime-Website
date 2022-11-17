import {atom} from "recoil"

export const toogleSidebar = atom({
    key: "toogleSidebar",
    default: false 
})

export const searchState = atom({
    key: 'search',
    default: false
})

export const searchFind = atom({
  key: "findSearch",
  default: undefined  
})
