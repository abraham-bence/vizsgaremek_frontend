import React, { useEffect, useState } from 'react'
import { Button, Card } from 'react-bootstrap'
import { MdOutlineAddShoppingCart, MdOutlineRemoveShoppingCart } from 'react-icons/md'
import { FaHeart, FaRegHeart } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

interface Order {
    id : number 
    email : string
    address : string
    status : string
    totalPrice : number
    createdAt : Date
    products : [{
        productId : number,
        quantity : number
    }]

}

interface Props {
  order: Order
}

function OrderCard({ order}: Props) {
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate(`/products/${order.id}`);
  };

  return (
    <Card className='product-card'>
      <Card.Body onClick={handleNavigation} style={{ cursor: 'pointer' }}>
        <Card.Title>{order.name}</Card.Title>
        <Card.Text>{product.price}</Card.Text>
        {product.quantity && <Card.Text>Quantity: {product.quantity}</Card.Text>}
      </Card.Body>
    </Card>
  );
}

export default OrderCard