var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { createFilter, renderProducts } from "../views/renderFilters.js";
export const getData = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield fetch("/database/database.json").then(res => res.json());
    const keys = Object.keys(result);
    keys.map(key => {
        localStorage.setItem(key, JSON.stringify(result[key]));
    });
    localStorage.removeItem("activefilters");
    const allProducts = getProducts();
    createFilter();
    renderProducts(allProducts);
});
/**
 * Função para criar os filtros na tela.
 * @return void
 */
export function getProducts() {
    const localObjects = localStorage.getItem("products");
    const treatedObjects = JSON.parse(localObjects);
    return treatedObjects;
}
export function getColors() {
    const localColors = localStorage.getItem("colors");
    const treatedColors = JSON.parse(localColors);
    return treatedColors;
}
export function getCategories() {
    const localCategories = localStorage.getItem("categories");
    if (localCategories) {
        return JSON.parse(localCategories);
    }
}
export function getSubCategories() {
    const localSubCategories = localStorage.getItem("subcategories");
    const treatedCategories = JSON.parse(localSubCategories);
    return treatedCategories;
}
export function getPersonSex() {
    const localPersonSex = localStorage.getItem("personsex");
    const treatedPersonSex = JSON.parse(localPersonSex);
    return treatedPersonSex;
}
export function getSize() {
    const localSize = localStorage.getItem("size");
    const treatedSize = JSON.parse(localSize);
    return treatedSize;
}
export function getFilters() {
    const localFilter = localStorage.getItem("activefilters");
    if (localFilter) {
        return JSON.parse(localFilter);
    }
    return null;
}
export function setFilters(filters) {
    localStorage.setItem("activefilters", JSON.stringify(filters));
}
