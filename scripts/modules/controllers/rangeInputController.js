import { filterByPrice } from "./createUpdateFilters.js";
export function handleInputRange() {
    const rangeSlider = document.querySelectorAll(".container-range-slider input");
    const progressSlider = document.querySelector(".container-range-slider .progress-slider");
    const labelMinValue = document.querySelector("#min-value");
    const labelMaxValue = document.querySelector("#max-value");
    let gap = 120;
    rangeSlider.forEach(targetInput => {
        targetInput.addEventListener("input", event => {
            var _a, _b, _c;
            let minValue = parseInt((_a = rangeSlider[0]) === null || _a === void 0 ? void 0 : _a.value);
            let maxValue = parseInt((_b = rangeSlider[1]) === null || _b === void 0 ? void 0 : _b.value);
            let classInput = (_c = event.target) === null || _c === void 0 ? void 0 : _c.className;
            if (maxValue - minValue < gap) {
                if (classInput === "range-min") {
                    rangeSlider[0].value = maxValue - gap + "";
                }
                else {
                    rangeSlider[1].value = minValue + gap + "";
                }
            }
            else {
                progressSlider.style.left = (minValue / parseInt(rangeSlider[0].max)) * 100 + "%";
                progressSlider.style.right = 100 - (maxValue / parseInt(rangeSlider[1].max)) * 100 + "%";
            }
            const valorMin = parseInt(rangeSlider[0].value);
            const valorMax = parseInt(rangeSlider[1].value);
            const arrayFormated = [
                valorMin.toLocaleString("pt-br", { style: "currency", currency: "BRL" }),
                valorMax.toLocaleString("pt-br", { style: "currency", currency: "BRL" })
            ];
            labelMinValue.innerText = arrayFormated[0] + "";
            labelMaxValue.innerText = arrayFormated[1] + "";
            filterByPrice();
        });
    });
}
