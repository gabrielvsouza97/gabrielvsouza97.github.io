import { getFilters, getProducts } from "../models/readDatabase.js";
import { ActiveFilters, ActiveFiltersKeys, Product } from "../types/types";
import { renderProducts } from "../views/renderFilters.js";


/**
 * Essa função irá pegar todos os produtos e renderizar de acordo com todos os filtros na tela
 * @returns Array de Produtos
 */
export function renderFilters(): void {
    const objectActiveFilters = getFilters();
    if(objectActiveFilters){
        const arrayFiltersActive = Object.keys(objectActiveFilters) as unknown as string[];

        const objectRenderFiltered = arrayFiltersActive.reduce((arrayPersistence: Product[] | undefined, actualKey: string) => {
            return renderAllCategories(objectActiveFilters, (actualKey as ActiveFiltersKeys), arrayPersistence);
        },getProducts())

        renderProducts(objectRenderFiltered);
    }
}

function renderAllCategories(objectActiveFilters:ActiveFilters, actualKey: ActiveFiltersKeys, actualArrayObject: Product[] | undefined){
        const arrayProducts = actualArrayObject;

        const filteredProducts = arrayProducts?.filter(uniqueProduct => {
            
            if(actualKey === "price"){
                const values = objectActiveFilters[actualKey] as number[];
                if(uniqueProduct[actualKey] >= values[0] && uniqueProduct[actualKey] <= values[1]) {
                return uniqueProduct
    
            }
            }
            if(typeof uniqueProduct[actualKey] === "object"){
                const valueFromActiveFilter = objectActiveFilters[actualKey] as number;
                if((uniqueProduct[actualKey] as number[]).includes(valueFromActiveFilter))
                return uniqueProduct;
            }
            if(typeof uniqueProduct[actualKey] === "string"){
                const valueFromActiveFilter = objectActiveFilters[actualKey] as unknown as string;
                if((uniqueProduct[actualKey] as unknown as string).includes(valueFromActiveFilter))
                return uniqueProduct;
            }
            return false;
        });

        return filteredProducts;
}
