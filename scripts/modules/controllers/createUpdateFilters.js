var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import { getFilters, getProducts, setFilters } from "../models/readDatabase.js";
import { renderProducts } from "../views/renderFilters.js";
import { renderFilters } from "./filtersController.js";
/**
 * Função para adicionar ou criar um filtro novo na tela
 * @param categoryIndex Recebe o numero da Categoria para pesquisa
 * @returns void
 */
export function filterByCategory(categoryIndex) {
    const activeFilters = getFilters();
    if (activeFilters) {
        if (categoryIndex == 0) {
            const { categories } = activeFilters, filtrado = __rest(activeFilters, ["categories"]);
            setFilters(filtrado);
            renderFilters();
            return;
        }
        const arrayNewFilters = Object.assign(Object.assign({}, activeFilters), { categories: categoryIndex });
        setFilters(arrayNewFilters);
        renderFilters();
        return;
    }
    const arrayNewFilter = { categories: categoryIndex };
    setFilters(arrayNewFilter);
    renderFilters();
}
export function filterBySubCategory(subCategorieIndex) {
    const activeFilters = getFilters();
    if (activeFilters) {
        if (subCategorieIndex == 0) {
            const { subcategories } = activeFilters, filtrado = __rest(activeFilters, ["subcategories"]);
            setFilters(filtrado);
            renderFilters();
            return;
        }
        const arrayNewFilters = Object.assign(Object.assign({}, activeFilters), { subcategories: subCategorieIndex });
        setFilters(arrayNewFilters);
        renderFilters();
        return;
    }
    const arrayNewFilter = { subcategories: subCategorieIndex };
    setFilters(arrayNewFilter);
    renderFilters();
}
export function filterByColor(indxColor) {
    const activeFilters = getFilters();
    if (activeFilters) {
        if (indxColor == 999) {
            const { colors } = activeFilters, filtrado = __rest(activeFilters, ["colors"]);
            setFilters(filtrado);
            renderFilters();
            return;
        }
        const arrayNewFilters = Object.assign(Object.assign({}, activeFilters), { colors: indxColor });
        setFilters(arrayNewFilters);
        renderFilters();
        return;
    }
    const arrayNewFilter = { colors: indxColor };
    setFilters(arrayNewFilter);
    renderFilters();
}
export function filterByPrice() {
    const activeFilters = getFilters();
    const minValue = document.querySelector(".range-min");
    const maxValue = document.querySelector(".range-max");
    if (minValue && maxValue) {
        const numberMinValue = parseInt(minValue.value);
        const numberMaxValue = parseInt(maxValue.value);
        if (activeFilters) {
            const arrayFilterPrice = Object.assign(Object.assign({}, activeFilters), { price: [numberMinValue, numberMaxValue] });
            setFilters(arrayFilterPrice);
            renderFilters();
            return;
        }
        const arrayFilterPrice = { price: [numberMinValue, numberMaxValue] };
        setFilters(arrayFilterPrice);
        renderFilters();
        return;
    }
}
export function filterByDescription(inputSearch) {
    if (inputSearch) {
        const valueFromInputDescription = inputSearch.value;
        if (valueFromInputDescription != "") {
            const getAllProducts = getProducts();
            const newFilteredProduct = getAllProducts.filter(uniqueProduct => {
                const searchDescription = uniqueProduct.description.includes(valueFromInputDescription);
                const searchTitle = uniqueProduct.title.includes(valueFromInputDescription);
                if (searchDescription || searchTitle) {
                    return uniqueProduct;
                }
            });
            renderProducts(newFilteredProduct);
            return;
        }
    }
    renderProducts(getProducts());
}
