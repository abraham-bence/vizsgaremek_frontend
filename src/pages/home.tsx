import React, { useMemo } from 'react'
import NavigationBar from '../components/navbar'
import TypesContainer from '../components/typesContainer'
import Products from '../components/products'
import { useProducts } from '../core/hooks'

function Home() {

  const getProducts = useProducts()
  const products = useMemo(() => getProducts.data ?? [], [getProducts.data]);
  return (
    <div>
      <NavigationBar className='my-navbar-primary' />
      <div className="hero">
        <div className="hero-overlay">
          <h1>Build your PC with us!</h1>
        </div>
      </div>
      <TypesContainer />
      <Products data={products} />

    </div>
  )
}

export default Home