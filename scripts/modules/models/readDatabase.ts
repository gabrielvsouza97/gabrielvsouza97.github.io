
import {ActiveFilters, ColorsFilter, Product} from "../types/types";
import {createFilter, renderProducts } from "../views/renderFilters.js";


export const getData = async () => {
    const result = await fetch("/database/database.json").then(res => res.json());
    const keys = Object.keys(result);
    keys.map( key =>{
        localStorage.setItem(key,JSON.stringify(result[key]))
    });
    localStorage.removeItem("activefilters");
    const allProducts:Product[] = getProducts();
    createFilter();
    renderProducts(allProducts)
 }

 /**
  * Função para criar os filtros na tela.
  * @return void
  */


export function getProducts():Product[]{
    const localObjects = localStorage.getItem("products"); 
    const treatedObjects:Product[] = JSON.parse((localObjects as string));

    return treatedObjects;
}

export function getColors():ColorsFilter[]{
    const localColors = localStorage.getItem("colors");
    const treatedColors:ColorsFilter[] = JSON.parse((localColors as string))
    return treatedColors;
}

export function getCategories():string[] | undefined {
    const localCategories = localStorage.getItem("categories");
    if(localCategories){  
        return  JSON.parse(localCategories);
    } 
}

export function getSubCategories():string[]{
    const localSubCategories = localStorage.getItem("subcategories");
    const treatedCategories:[] = JSON.parse((localSubCategories as string));
    return treatedCategories;
}

export function getPersonSex():[]{
    const localPersonSex = localStorage.getItem("personsex");
    const treatedPersonSex = JSON.parse((localPersonSex as string));
    return treatedPersonSex;
}

export function getSize():[] {
    const localSize = localStorage.getItem("size");
    const treatedSize = JSON.parse((localSize as string));
    return treatedSize;
}

export function getFilters():ActiveFilters | null {
    const localFilter = localStorage.getItem("activefilters");
    
    if(localFilter){
        return JSON.parse(localFilter);
    }
    return null;
}

export function setFilters(filters:ActiveFilters): void {
    localStorage.setItem("activefilters", JSON.stringify(filters))
}