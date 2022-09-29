export type ColorsFilter = {
    hex: string;
    colorname: string;
};

export type Product = {
    id: number;
    categories: number[];
    subcategories: number[];
    personsex: number;
    title: string;
    description: string;
    size: number[];
    colors: number[];
    price: number;
    url: string;
}

export type ActiveFilters = {
    categories?:number;
    subcategories?:number;
    personsex?: number;
    size?: number;
    colors?: number;
    price?: number[];
}

export type ActiveFiltersKeys = keyof ActiveFilters;