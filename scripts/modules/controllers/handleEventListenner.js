import { getCategories, getColors, getSubCategories } from "../models/readDatabase.js";
import { filterByCategory, filterByColor, filterByDescription, filterBySubCategory } from "./createUpdateFilters.js";
import { handleInputRange } from "./rangeInputController.js";
export function handleEventListenner() {
    const labelFilter = document.querySelector("#filter-btn");
    const labelSearch = document.querySelector("#search-btn");
    const iconSearch = document.querySelector("#icon-search");
    const buttonCategorie = document.querySelector("#categories-filter");
    const buttonSubCategorie = document.querySelector("#sub-filter");
    const buttonColor = document.querySelector("#list-colors");
    const searchInput = document.querySelector("input[name=search-input]");
    const darkModeButton = document.querySelector("#theme-style");
    labelFilter === null || labelFilter === void 0 ? void 0 : labelFilter.addEventListener("click", handleFilter);
    labelSearch === null || labelSearch === void 0 ? void 0 : labelSearch.addEventListener("click", handleSearch);
    iconSearch === null || iconSearch === void 0 ? void 0 : iconSearch.addEventListener("click", handleSearch);
    buttonCategorie === null || buttonCategorie === void 0 ? void 0 : buttonCategorie.addEventListener("click", handleFilterCategories);
    buttonSubCategorie === null || buttonSubCategorie === void 0 ? void 0 : buttonSubCategorie.addEventListener("click", handleFilterSubCategories);
    buttonColor === null || buttonColor === void 0 ? void 0 : buttonColor.addEventListener("click", handleFilterColors);
    searchInput === null || searchInput === void 0 ? void 0 : searchInput.addEventListener("input", handleSearchFilter);
    darkModeButton === null || darkModeButton === void 0 ? void 0 : darkModeButton.addEventListener("click", handleChangeDarkMode);
    handleInputRange();
}
function handleSearch() {
    const filterMenuWrapper = document.querySelector(".container-filter");
    const searchMenuWrapper = document.querySelector(".container-search");
    const searchContentWrapper = document.querySelector(".content-search");
    if (filterMenuWrapper === null || filterMenuWrapper === void 0 ? void 0 : filterMenuWrapper.classList.contains("active")) {
        filterMenuWrapper === null || filterMenuWrapper === void 0 ? void 0 : filterMenuWrapper.classList.remove("active");
        setTimeout(handleSearch, 500);
        return;
    }
    searchMenuWrapper === null || searchMenuWrapper === void 0 ? void 0 : searchMenuWrapper.classList.toggle("active");
    searchContentWrapper === null || searchContentWrapper === void 0 ? void 0 : searchContentWrapper.classList.toggle("active");
}
function handleFilter() {
    const filterMenuWrapper = document.querySelector(".container-filter");
    const searchMenuWrapper = document.querySelector(".container-search");
    const searchContentWrapper = document.querySelector(".content-search");
    if ((searchContentWrapper === null || searchContentWrapper === void 0 ? void 0 : searchContentWrapper.classList.contains("active")) || (searchMenuWrapper === null || searchMenuWrapper === void 0 ? void 0 : searchMenuWrapper.classList.contains("active"))) {
        searchContentWrapper === null || searchContentWrapper === void 0 ? void 0 : searchContentWrapper.classList.remove("active");
        searchMenuWrapper === null || searchMenuWrapper === void 0 ? void 0 : searchMenuWrapper.classList.remove("active");
        setTimeout(handleFilter, 500);
        return;
    }
    filterMenuWrapper === null || filterMenuWrapper === void 0 ? void 0 : filterMenuWrapper.classList.toggle("active");
}
function handleFilterCategories(event) {
    const arrayCategories = getCategories();
    const captureUlValue = event.target;
    const arrayButtonCategories = document.querySelectorAll("main section.filter .filter-product li button");
    if (arrayCategories && captureUlValue && arrayButtonCategories) {
        //Removendo a Classe de ativo do botão
        arrayButtonCategories.forEach(uniqueButton => {
            (uniqueButton.classList.contains("active")) ? uniqueButton.classList.remove("active") : "";
        });
        captureUlValue.classList.toggle("active");
        const posicaoCategoria = arrayCategories.indexOf(captureUlValue.innerText);
        if (posicaoCategoria !== -1) {
            filterByCategory(posicaoCategoria);
        }
    }
}
function handleFilterSubCategories(event) {
    const arraySubCategories = getSubCategories();
    const captureUlValue = event.target;
    const arrayButtonCategories = document.querySelectorAll("main section.container-filter .content-filter .filter-unique ul#sub-filter li button");
    if (arraySubCategories && captureUlValue && arrayButtonCategories) {
        //Removendo a Classe de ativo do botão
        arrayButtonCategories.forEach(uniqueButton => {
            (uniqueButton.classList.contains("active")) ? uniqueButton.classList.remove("active") : "";
        });
        captureUlValue.classList.toggle("active");
        const posicaoCategoria = arraySubCategories.indexOf(captureUlValue.value);
        if (posicaoCategoria !== -1) {
            filterBySubCategory(posicaoCategoria);
        }
    }
}
function handleFilterColors(event) {
    const arrayColors = getColors();
    const captureUlValue = event.target;
    const arrayButtonCategories = document.querySelectorAll("main section.container-filter .content-filter .filter-unique ul#list-colors li button");
    if (arrayColors && captureUlValue && arrayButtonCategories) {
        //Removendo a Classe de ativo do botão
        arrayButtonCategories.forEach(uniqueButton => {
            (uniqueButton.classList.contains("active")) ? uniqueButton.classList.remove("active") : "";
        });
        captureUlValue.classList.toggle("active");
        const posicaoCategoria = arrayColors.findIndex(el => {
            var _a;
            return (_a = (el.hex == captureUlValue.value)) !== null && _a !== void 0 ? _a : false;
        });
        const noFilterBtn = captureUlValue.value;
        if (posicaoCategoria !== -1 || noFilterBtn === "999") {
            const indexFilter = (noFilterBtn == "999") ? parseInt(noFilterBtn) : posicaoCategoria;
            filterByColor(indexFilter);
        }
    }
}
function handleSearchFilter(event) {
    if (event) {
        filterByDescription(event.target);
    }
}
function handleChangeDarkMode(event) {
    const iconTarget = event.target;
    const bodyStyle = document.querySelector("body");
    if (iconTarget.classList.contains("fa-solid") && bodyStyle) {
        const actualIcon = iconTarget.classList.contains("fa-sun");
        if (actualIcon) {
            bodyStyle.classList.toggle("active");
            iconTarget.classList.remove("fa-sun");
            iconTarget.classList.add("fa-moon");
            return;
        }
        bodyStyle.classList.toggle("active");
        iconTarget.classList.remove("fa-moon");
        iconTarget.classList.add("fa-sun");
        return;
    }
}
