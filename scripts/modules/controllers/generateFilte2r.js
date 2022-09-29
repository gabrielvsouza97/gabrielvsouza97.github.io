import { getFilters, setFilters } from "../models/readDatabase.js";
export function filterByCategory(categoryIndex) {
    const activeFilters = getFilters();
    if (activeFilters) {
        const arrayNewFilters = Object.assign(Object.assign({}, activeFilters), { categories: categoryIndex });
        setFilters(arrayNewFilters);
        return;
    }
    const arrayNewFilter = { categories: categoryIndex };
    setFilters(arrayNewFilter);
}
