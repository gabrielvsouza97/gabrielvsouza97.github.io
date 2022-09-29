import { getFilters, getProducts, setFilters } from "../models/readDatabase.js";
import { ActiveFilters } from "../types/types.js";
import { renderProducts } from "../views/renderFilters.js";
import { renderFilters } from "./filtersController.js";


/**
 * Função para adicionar ou criar um filtro novo na tela
 * @param categoryIndex Recebe o numero da Categoria para pesquisa
 * @returns void
 */
export function filterByCategory(categoryIndex:number): void {
    const activeFilters = getFilters() as ActiveFilters;

    if(activeFilters){
        if(categoryIndex == 0){
            const {categories, ...filtrado} = activeFilters;
            setFilters(filtrado);
            renderFilters();
            return;
        }
        const arrayNewFilters:ActiveFilters = {...activeFilters, categories:categoryIndex};
        setFilters(arrayNewFilters);
        renderFilters();
        return;
    }
        const arrayNewFilter:ActiveFilters = {categories:categoryIndex};
        setFilters(arrayNewFilter)
        renderFilters();

}

export function filterBySubCategory(subCategorieIndex:number): void {
    const activeFilters = getFilters();
    if(activeFilters){
        if(subCategorieIndex == 0){
            const {subcategories, ...filtrado} = activeFilters;
            setFilters(filtrado);
            renderFilters();
            return;
        }
        const arrayNewFilters:ActiveFilters = {...activeFilters, subcategories:subCategorieIndex};
        setFilters(arrayNewFilters);
        renderFilters();
        return;
    }
        const arrayNewFilter:ActiveFilters = {subcategories:subCategorieIndex};
        setFilters(arrayNewFilter)
        renderFilters();
}

export function filterByColor(indxColor:number): void {
    const activeFilters = getFilters();
    if(activeFilters){
        if(indxColor == 999){
            const {colors, ...filtrado} = activeFilters;
            setFilters(filtrado);
            renderFilters();
            return;
        }
        const arrayNewFilters:ActiveFilters = {...activeFilters, colors:indxColor};
        setFilters(arrayNewFilters);
        renderFilters();
        return;
    }
        const arrayNewFilter:ActiveFilters = {colors:indxColor};
        setFilters(arrayNewFilter)
        renderFilters();
}

export function filterByPrice(){
    const activeFilters = getFilters();
    const minValue = document.querySelector(".range-min") as HTMLInputElement;
    const maxValue = document.querySelector(".range-max") as HTMLInputElement;

    if(minValue && maxValue){
        const numberMinValue = parseInt(minValue.value);
        const numberMaxValue = parseInt(maxValue.value);
        if(activeFilters){
            const arrayFilterPrice = {...activeFilters, price:[numberMinValue,numberMaxValue]};
            setFilters(arrayFilterPrice);
            renderFilters();
            return;
        }
        const arrayFilterPrice = {price:[numberMinValue,numberMaxValue]};
        setFilters(arrayFilterPrice);
        renderFilters();
        return;
    }
}

export function filterByDescription(inputSearch:EventTarget | null):void {
    if(inputSearch){
        const valueFromInputDescription = (inputSearch as HTMLInputElement).value;
        if(valueFromInputDescription != ""){
            const getAllProducts = getProducts();
            const newFilteredProduct = getAllProducts.filter(uniqueProduct => {
                const searchDescription = uniqueProduct.description.includes(valueFromInputDescription);
                const searchTitle = uniqueProduct.title.includes(valueFromInputDescription);
                if(searchDescription || searchTitle){
                    return uniqueProduct;
                }
            })
            renderProducts(newFilteredProduct);
            return;
        }
    }

    renderProducts(getProducts());
}