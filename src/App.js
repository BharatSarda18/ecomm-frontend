import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage";
import PageNotFound from "./pages/404Page";
import UserProfilePage from "./pages/UserProfilePage";
import UserOrdersPage from "./pages/UserOrdersPage";
import OrderSuccessPage from "./pages/OrderSuccessPage";
import ProductList from "./components/product/ProductList";
import NavBar from "./components/navbar/NavBar";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import AdminProductDetailPage from "./pages/AdminProductDetailPage";
import AdminProductFormPage from "./pages/AdminProductFormPage";
import AdminOrdersPage from "./pages/AdminOrdersPage.";
import AdminHome from "./pages/AdminHome";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {  setUserInfo } from './redux/userSlice';
import {  updateCartState } from './redux/cartSlice';
import Procted from "./components/procted/Procted";
import ProtectedAdmin from "./components/procted/ProtectedAdmin";
import { Toaster } from 'react-hot-toast';
import MainLayout from "./components/MainLayout";
import { getAxiosBaseService, postAxiosBaseService } from "./services/baseService";
import { URLS } from "./constants/urls";

const router=createBrowserRouter([

  {path:'/dashboard', element:<MainLayout/>,children:[
    {path:'',element:(<Procted> <HomePage/></Procted>)},
    {path:'admin',element:(<ProtectedAdmin><AdminHome/></ProtectedAdmin>)},
    {path:'cart',element:(<Procted><CartPage/></Procted>)},
    {path:'checkout',element:(<Procted><CheckoutPage/></Procted>)},
    {path:'product-detail/:_id',element:(<Procted><ProductDetailPage/></Procted>)},
    {path:'admin/product-detail/:id',element:(<ProtectedAdmin><AdminProductDetailPage/></ProtectedAdmin>)},
    {path:'admin/product-form',element:(<ProtectedAdmin><AdminProductFormPage/></ProtectedAdmin>)},
    {path:'admin/orders',element:(<ProtectedAdmin><AdminOrdersPage/></ProtectedAdmin>)},
    {path:'admin/product-form/edit/:id',element:(<ProtectedAdmin><AdminProductFormPage/></ProtectedAdmin>)},
    {path:'order-success/:id',element:(<Procted><OrderSuccessPage/></Procted>)},
    {path:'my-orders',element:(<Procted><UserOrdersPage/></Procted>)},
    {path:'profile',element:(<Procted><UserProfilePage/></Procted>)},
  ]},

  {path:'/login',element:(<LoginPage/>)},
  {path:'/signup',element:(<SignupPage/>)},
  {path:'*',element:(<PageNotFound/>)}
])

function App() {

  const dispatch = useDispatch();
  const user =localStorage.getItem("token");
  //  useSelector((state) => state.auth.loggedInUserToken);


  useEffect(() => {

    const fetchUserDetails=async()=>{
      try {
        const cartData= await postAxiosBaseService(URLS.FETCH_ALL_ORDERS);
        dispatch(updateCartState(cartData?.data?.data));

        const UserDetails= await getAxiosBaseService(URLS.FETCH_USER_DETAIL);
        dispatch(setUserInfo(UserDetails?.data?.data));

        
       } catch (error) {
         
       }

    }
    if (user) {
      fetchUserDetails();
    }
  }, [dispatch, user]);
  return (
    <div className=" h-full">
        <Toaster position="top-right" />
       <RouterProvider router={router} />
    </div>
  );
}

export default App;
