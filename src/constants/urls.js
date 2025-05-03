export const URLS={
   //auth
   LOGIN: '/auth/login',
   SIGNUP: '/auth/signup',
   // product
   FETCH_CATEGORIES: '/categories',
   FETCH_BRANDS: '/brand',
   FETCH_PRODUCTS: '/products',
   UPDATE_PRODUCT:(ID)=> `/products${ID}`,
   DELETE_PRODUCT:(ID)=> `/products${ID}`,
   //order
   CREATE_ORDER: '/order/',
   UPDATE_ORDER:(ID)=> `/order/${ID}`,
   FETCH_ALL_ORDERS: '/order',

   // cart
   ADD_TO_CART: '/cart',
   FETCH_ITEMS_BY_USER_ID: '/cart',
   UPDATE_CART:(ID)=> `/cart/${ID}`,
   DELETE_ITEM_FROM_CART:(ID)=> `/cart/${ID}`,
   RESET_CART: '/cart/reset',

   //user
   FETCH_USER_DETAIL:'/users/own'





};

