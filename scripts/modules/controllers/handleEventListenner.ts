import { getCategories, getColors, getSubCategories } from "../models/readDatabase.js";
import { filterByCategory, filterByColor, filterByDescription, filterBySubCategory } from "./createUpdateFilters.js";
import { handleInputRange } from "./rangeInputController.js";

export function handleEventListenner():void{
    const labelFilter:HTMLDivElement | null = document.querySelector("#filter-btn");
    const labelSearch:HTMLDivElement | null = document.querySelector("#search-btn");
    const iconSearch:HTMLDivElement | null = document.querySelector("#icon-search");
    const buttonCategorie: HTMLUListElement | null = document.querySelector("#categories-filter");
    const buttonSubCategorie: HTMLUListElement | null = document.querySelector("#sub-filter");
    const buttonColor: HTMLUListElement | null = document.querySelector("#list-colors");
    const searchInput: HTMLInputElement | null = document.querySelector("input[name=search-input]");
    const darkModeButton: HTMLButtonElement | null = document.querySelector("#theme-style");
    
    labelFilter?.addEventListener("click", handleFilter);
    labelSearch?.addEventListener("click", handleSearch);
    iconSearch?.addEventListener("click", handleSearch);
    buttonCategorie?.addEventListener("click", handleFilterCategories);
    buttonSubCategorie?.addEventListener("click", handleFilterSubCategories);
    buttonColor?.addEventListener("click", handleFilterColors);
    searchInput?.addEventListener("input", handleSearchFilter);
    darkModeButton?.addEventListener("click", handleChangeDarkMode);
    handleInputRange()

}

function handleSearch(): void{
    const filterMenuWrapper:HTMLDivElement | null = document.querySelector(".container-filter");
    const searchMenuWrapper:HTMLDivElement | null = document.querySelector(".container-search");
    const searchContentWrapper:HTMLDivElement | null = document.querySelector(".content-search");

    if(filterMenuWrapper?.classList.contains("active")){
        filterMenuWrapper?.classList.remove("active");
        setTimeout(handleSearch, 500);
        return
    }

    searchMenuWrapper?.classList.toggle("active");
    searchContentWrapper?.classList.toggle("active");
}

function handleFilter(): void{
    const filterMenuWrapper:HTMLDivElement | null = document.querySelector(".container-filter");
    const searchMenuWrapper:HTMLDivElement | null = document.querySelector(".container-search");
    const searchContentWrapper:HTMLDivElement | null = document.querySelector(".content-search");

    if(searchContentWrapper?.classList.contains("active") || searchMenuWrapper?.classList.contains("active")){
        searchContentWrapper?.classList.remove("active");
        searchMenuWrapper?.classList.remove("active");
        setTimeout(handleFilter, 500);
        return
    }
    
    filterMenuWrapper?.classList.toggle("active");
}

function handleFilterCategories(event:Event):void{
    const arrayCategories = getCategories();
    const captureUlValue = (event.target as HTMLButtonElement);
    const arrayButtonCategories = document.querySelectorAll("main section.filter .filter-product li button");

    if(arrayCategories && captureUlValue && arrayButtonCategories){
        //Removendo a Classe de ativo do botão
        arrayButtonCategories.forEach(uniqueButton => {
            (uniqueButton.classList.contains("active")) ? uniqueButton.classList.remove("active") :"";
        });

        captureUlValue.classList.toggle("active");

        const posicaoCategoria = arrayCategories.indexOf(captureUlValue.innerText);

        if(posicaoCategoria !== -1){
            filterByCategory(posicaoCategoria);
        }
    }
}

function handleFilterSubCategories(event:Event):void {
    const arraySubCategories = getSubCategories();
    const captureUlValue = (event.target as HTMLButtonElement);
    const arrayButtonCategories = document.querySelectorAll("main section.container-filter .content-filter .filter-unique ul#sub-filter li button");

    if(arraySubCategories && captureUlValue && arrayButtonCategories){
        //Removendo a Classe de ativo do botão
        arrayButtonCategories.forEach(uniqueButton => {
            (uniqueButton.classList.contains("active")) ? uniqueButton.classList.remove("active") :"";
        });

        captureUlValue.classList.toggle("active");

        const posicaoCategoria = arraySubCategories.indexOf(captureUlValue.value);
        if(posicaoCategoria !== -1){
            filterBySubCategory(posicaoCategoria);
        }
    }
}

function handleFilterColors(event:Event):void {
    const arrayColors = getColors();
    const captureUlValue = (event.target as HTMLButtonElement);
    const arrayButtonCategories = document.querySelectorAll("main section.container-filter .content-filter .filter-unique ul#list-colors li button");

    if(arrayColors && captureUlValue && arrayButtonCategories){
        //Removendo a Classe de ativo do botão
        arrayButtonCategories.forEach(uniqueButton => {
            (uniqueButton.classList.contains("active")) ? uniqueButton.classList.remove("active") :"";
        });

        captureUlValue.classList.toggle("active");
        const posicaoCategoria = arrayColors.findIndex(el => {
            return (el.hex == captureUlValue.value)?? false;
        })
        const noFilterBtn = captureUlValue.value;
        if(posicaoCategoria !== -1 || noFilterBtn === "999"){
            const indexFilter = (noFilterBtn == "999") ? parseInt(noFilterBtn) : posicaoCategoria;
            filterByColor(indexFilter);
        }
    }
}

function handleSearchFilter(event:Event){
    if(event){
        filterByDescription(event.target);
    }
}

function handleChangeDarkMode(event:Event){
    const iconTarget = event.target as HTMLInputElement;
    const bodyStyle = document.querySelector("body") as HTMLBodyElement;

    if(iconTarget.classList.contains("fa-solid") && bodyStyle){
        const actualIcon = iconTarget.classList.contains("fa-sun");

        if(actualIcon){
            bodyStyle.classList.toggle("active");
            iconTarget.classList.remove("fa-sun");
            iconTarget.classList.add("fa-moon")
            return;
        }
        bodyStyle.classList.toggle("active");
        iconTarget.classList.remove("fa-moon");
        iconTarget.classList.add("fa-sun")
        return;

    }
}
