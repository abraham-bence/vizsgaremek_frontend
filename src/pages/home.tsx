import React from 'react'
import NavigationBar from '../components/navbar'
import TypesContainer from '../components/typesContainer'
import Products from '../components/products'

function Home() {
  return (
    <div>
      <NavigationBar className='my-navbar-primary' />
      <div className="hero">
        <div className="hero-overlay">
          <h1>Build your PC with us!</h1>
        </div>
      </div>
      <TypesContainer/>
      <Products/>
      
    </div>
  )
}

export default Home