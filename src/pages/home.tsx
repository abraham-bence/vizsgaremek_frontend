import React, { useState, useEffect } from 'react';
import NavigationBar from '../components/navbar';
import TypesContainer from '../components/typesContainer';
import Products from '../components/products';
import { useProducts } from '../core/hooks';
import Footer from '../components/footer';

function HomePage() {

  return (
    <div>
      <div className="navborder fixed">
        <NavigationBar className={`my-navbar `} />
      </div>
      <div className='homeContainer'>

        <div className="hero">
          <div className="hero-overlay">
            <h1>Build your PC with us!</h1>
          </div>
        </div>

        <TypesContainer />

        <div className='mx-3'>
          <Products />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default HomePage;
