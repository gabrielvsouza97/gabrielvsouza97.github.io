import { filterByPrice } from "./createUpdateFilters.js";

export function handleInputRange(){
    const rangeSlider = document.querySelectorAll(".container-range-slider input") ;
    const progressSlider = document.querySelector(".container-range-slider .progress-slider") as HTMLDivElement;
    const labelMinValue = document.querySelector("#min-value") as HTMLSpanElement;
    const labelMaxValue = document.querySelector("#max-value") as HTMLSpanElement;
    let gap = 120;

    rangeSlider.forEach(targetInput =>{
        targetInput.addEventListener("input", event => {
            let minValue = parseInt((rangeSlider[0] as HTMLInputElement)?.value);
            let maxValue = parseInt((rangeSlider[1] as HTMLInputElement)?.value);
            let classInput = (event.target as HTMLInputElement)?.className;

                if(maxValue - minValue < gap){
                    if(classInput === "range-min"){
                        (rangeSlider[0] as HTMLInputElement).value = maxValue - gap + "";
                    } else {
                        (rangeSlider[1] as HTMLInputElement).value = minValue + gap + "";
                    }
                } 
                else{
                    progressSlider.style.left = (minValue / parseInt((rangeSlider[0] as HTMLInputElement).max)) * 100 + "%";
                    progressSlider.style.right = 100 - (maxValue / parseInt((rangeSlider[1] as HTMLInputElement).max)) * 100 + "%";
                }

                const valorMin = parseInt((rangeSlider[0] as HTMLInputElement).value);
                const valorMax = parseInt((rangeSlider[1] as HTMLInputElement).value);
                const arrayFormated = [
                    valorMin.toLocaleString("pt-br", {style: "currency", currency: "BRL"}),
                    valorMax.toLocaleString("pt-br", {style: "currency", currency: "BRL"})
                ]
                
                labelMinValue.innerText = arrayFormated[0]+ "";
                labelMaxValue.innerText = arrayFormated[1]+ ""; 

                filterByPrice();
        })
    })
}