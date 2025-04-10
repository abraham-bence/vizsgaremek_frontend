import React, { useEffect, useState } from 'react'
import { Product } from '../components/products'
import { Button, Card } from 'react-bootstrap'
import { MdOutlineAddShoppingCart } from 'react-icons/md'
import { FaHeart, FaRegHeart } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

interface Props {
    product: Product
    main?: boolean
    onAdd?: (product: Product) => void
    onLike?: (product: Product) => void

}

function ProductCard({ product, main, onAdd, onLike }: Props) {

    const navigate = useNavigate()

    const [likes, setLikes] = useState<Product[]>([]);
    const [likesLoaded, setLikesLoaded] = useState(false);
    // Load likes from localStorage
    useEffect(() => {
        const stored = localStorage.getItem('likes');
        if (stored) setLikes(JSON.parse(stored));
        setLikesLoaded(true);
    }, []);


    const handleNavigation = () => {
        navigate(`/products/${product.id}`)
    }

    const heart = () => {
        {
            let isLiked = false;
            likes.map((like) => {
                if(like.id == product.id && likesLoaded) {
                    isLiked = true
                }
            })
            return !isLiked? <FaRegHeart className='icon heart' /> : <FaHeart className='icon heart'/> 


        }
    }

    return (
        <Card className='product-card' >
            <Card.Img variant="top" src={'http://localhost:3000/uploads/' + product.imgSrc} />
            <Card.Body onClick={handleNavigation}>
                <Card.Title>{product.name}</Card.Title>
                <Card.Text>
                    {product.price}
                </Card.Text>

            </Card.Body>
            <Card.Footer>
                {main ? (
                    <div className='btn-container'>
                        <Button onClick={() => { onLike ? onLike(product) : null }}> {heart()} </Button>
                        <Button onClick={() => { onAdd ? onAdd(product) : null }}> <MdOutlineAddShoppingCart className='icon' /> </Button>
                    </div>
                ) : null}
            </Card.Footer>
        </Card>
    )
}

export default ProductCard