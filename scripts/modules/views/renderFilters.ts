import { Product, ColorsFilter } from "../types/types";

export function createFilter() : void {
    const filterTypes = ["categories", "subcategories", "colors", "personsex", "colors"]
    const arrayFilters = filterTypes.map(keySearch => {
        const item = localStorage.getItem(keySearch);
        //Forçando o item como String. 
        return JSON.parse((item as string))
    });
    renderCategories(arrayFilters[0])
    renderSubFilter(arrayFilters[1])
    renderColors(arrayFilters[2])
};

export function renderCategories(data:[]):void {
    const listCategories: HTMLUListElement  | null= document.querySelector("#categories-filter");
    if(listCategories){
        data.map((element, index) => {
            const activeClass = (index == 0) ? `class="active"` : "";
            listCategories.innerHTML += `
            <li><button ${activeClass}>${element}</button></li>            
            `;
        });
    }
}

export function renderSubFilter (data:[]):void {
    const listSubCatetories: HTMLUListElement | null = document.querySelector("#sub-filter");
    if(listSubCatetories){
        data.map((element, index) => {
            const activeClass = (index == 0) ? `class="active"` : "";
            listSubCatetories.innerHTML += `       
            <li id="${element}"><button value="${element}" ${activeClass}>${element}</button></li>            
            `;
        })
    }
}

export function renderColors (data:ColorsFilter[]){
    const listColors = document.querySelector("#list-colors");
    if(listColors){
        listColors.innerHTML = `
        <li>
            <button value="999" class="active">
                  Sem Filtro
            </button>
        </li>        
        `;
        data.map((element,index) => {
            const activeClass = (index == 0) ? `class="active"` : "";
            listColors.innerHTML += `
                <li>
                    <button value="${element.hex}">
                        <i class="fa-solid fa-circle" style="color:${element.hex}"></i>
                         ${element.colorname}
                    </button>
                </li>        
                `;  
        })

    }
}

export function renderProducts(data:Product[] | undefined){
    const listContents: HTMLDivElement | null = document.querySelector(".contents");
    if(listContents){
        listContents.innerHTML = "";
        data?.map(element => {
            const price = element.price.toLocaleString("pt-br", {style: "currency", currency: "BRL"});
            listContents.innerHTML += `
            <div class="unique-content">
                <div class ="image"><img src="${element.url}"/></div>
                <div class="info-content">
                    <h2>${element.title}</h2>
                    <h3>${price}</h3>
                </div>
            </div>
            `;
        })
    } 
}