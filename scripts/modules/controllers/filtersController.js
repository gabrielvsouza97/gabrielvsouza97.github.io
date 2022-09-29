import { getFilters, getProducts } from "../models/readDatabase.js";
import { renderProducts } from "../views/renderFilters.js";
/**
 * Essa função irá pegar todos os produtos e renderizar de acordo com todos os filtros na tela
 * @returns Array de Produtos
 */
export function renderFilters() {
    const objectActiveFilters = getFilters();
    if (objectActiveFilters) {
        const arrayFiltersActive = Object.keys(objectActiveFilters);
        const objectRenderFiltered = arrayFiltersActive.reduce((arrayPersistence, actualKey) => {
            return renderAllCategories(objectActiveFilters, actualKey, arrayPersistence);
        }, getProducts());
        renderProducts(objectRenderFiltered);
    }
}
function renderAllCategories(objectActiveFilters, actualKey, actualArrayObject) {
    const arrayProducts = actualArrayObject;
    const filteredProducts = arrayProducts === null || arrayProducts === void 0 ? void 0 : arrayProducts.filter(uniqueProduct => {
        if (actualKey === "price") {
            const values = objectActiveFilters[actualKey];
            if (uniqueProduct[actualKey] >= values[0] && uniqueProduct[actualKey] <= values[1]) {
                return uniqueProduct;
            }
        }
        if (typeof uniqueProduct[actualKey] === "object") {
            const valueFromActiveFilter = objectActiveFilters[actualKey];
            if (uniqueProduct[actualKey].includes(valueFromActiveFilter))
                return uniqueProduct;
        }
        if (typeof uniqueProduct[actualKey] === "string") {
            const valueFromActiveFilter = objectActiveFilters[actualKey];
            if (uniqueProduct[actualKey].includes(valueFromActiveFilter))
                return uniqueProduct;
        }
        return false;
    });
    return filteredProducts;
}
