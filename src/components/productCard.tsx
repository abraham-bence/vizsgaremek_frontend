import React, { useEffect, useState } from 'react'
import { Product } from '../components/products'
import { Button, Card } from 'react-bootstrap'
import { MdOutlineAddShoppingCart, MdOutlineRemoveShoppingCart } from 'react-icons/md'
import { FaHeart, FaRegHeart } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

interface Props {
  product: Product
  main?: boolean
  onAdd?: (product: Product) => void
  onLike?: (product: Product) => void
  isLiked?: boolean;
  onRemove?: (product: Product) => void
}

function ProductCard({ product, main, onAdd, onLike, isLiked, onRemove }: Props) {
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate(`/products/${product.id}`);
  };

  return (
    <Card className='product-card'>
      <Card.Img
        onClick={handleNavigation}
        style={{ cursor: 'pointer' }}
        variant="top"
        src={'http://localhost:3000/uploads/' + product.imgSrc}
      />
      <Card.Body onClick={handleNavigation} style={{ cursor: 'pointer' }}>
        <Card.Title>{product.name}</Card.Title>
        <Card.Text>{product.price}</Card.Text>
        {product.quantity && <Card.Text>Quantity: {product.quantity}</Card.Text>}
      </Card.Body>
      {main ? (
        <Card.Footer>

          <div className='btn-container'>
            <Button onClick={() => onLike?.(product)}>
              {isLiked ? <FaHeart className='icon heart' /> : <FaRegHeart className='icon heart' />}
            </Button>
            {!onRemove ? (
              <Button onClick={() => onAdd?.(product)}>
                <MdOutlineAddShoppingCart className='icon' />
              </Button>
            ) : (
              <Button onClick={() => onRemove?.(product)}>
                <MdOutlineRemoveShoppingCart className='icon' />
              </Button>
            )}
          </div>
        </Card.Footer>
      ) : null}
    </Card>
  );
}

export default ProductCard