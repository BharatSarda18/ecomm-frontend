import React from 'react';
import NavBar from '../components/navbar/NavBar';
import Footer from '../layout/Footer/Footer';
import ProductDetail from '../components/product/ProductDetail';

export default function ProductDetailPage() {
    return (
        <>
            <NavBar>
                <ProductDetail></ProductDetail>
            </NavBar>
            <Footer/>
        </>
    )
};
