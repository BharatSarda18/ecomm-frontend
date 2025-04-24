export const prodctSortOptions = [
    { name: 'Best Rating', sort: 'rating', order: 'desc', current: false },
    { name: 'Price: Low to High', sort: 'discountPrice', order: 'asc', current: false },
    { name: 'Price: High to Low', sort: 'discountPrice', order: 'desc', current: false },
];
export const productFilters =(brands,categories)=> [
    { id: 'category',name: 'Category',options: categories},
    { id: 'brand',name: 'Brands',options: brands},
];
export const ITEMS_PER_PAGE = 10;