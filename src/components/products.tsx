
import { Col, Row } from 'react-bootstrap';
import ProductCard from '../components/productCard';
import { useProducts } from '../core/hooks';
import { BarLoader } from 'react-spinners';
import { useEffect, useMemo, useState } from 'react';

export interface Product {
  id: number
  name: string
  type: string
  price: number
  imgSrc: string
  manufacturer: string
}

interface Props {
  data: Product[]
}


function Products() {
  const getProducts = useProducts()
  const data = useMemo(() => getProducts.data ?? [], [getProducts.data]);


  const [cart, setCart] = useState<Product[]>([]);
  const [cartLoaded, setCartLoaded] = useState(false);

  const [likes, setLikes] = useState<Product[]>([]);
  const [likesLoaded, setLikesLoaded] = useState(false);

  // Load cart from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('cart');
    if (stored) setCart(JSON.parse(stored));
    setCartLoaded(true);
  }, []);

  // Save to localStorage
  useEffect(() => {
    if (cartLoaded) {
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  }, [cart, cartLoaded]);

  const handleCartAdd = (product: Product) => {
    setCart((prev) => {
      const exists = prev.find((p) => p.id === product.id);
      if (exists) return prev;
      return [...prev, product];
    });
  };

  // Load likes from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('likes');
    if (stored) setLikes(JSON.parse(stored));
    setLikesLoaded(true);
  }, []);

  // Save to localStorage
  useEffect(() => {
    if (likesLoaded) {
      localStorage.setItem('likes', JSON.stringify(likes));
    }
  }, [likes, likesLoaded]);

  const handleLike = (product: Product) => {
    setLikes((prev) => {
      const exists = prev.find((p) => p.id === product.id);
      if (exists) return prev;
      return [...prev, product];
    });
  };

  if (getProducts.isLoading) {
    return (
      <div className="flex w-100 justify-center items-center">
        <BarLoader height={8} width="100%" color="#4a91e248" />
      </div>
    );
  }

  return (
    <>
      {/* <NavigationBar /> */}
      <Row xs={1} md={2} lg={3} xxl={4} className="g-4 productContainer">
        {data?.map((product) => (
          <Col key={product.id}>
            <ProductCard product={product} main={true} onAdd={handleCartAdd} onLike={handleLike} />
          </Col>

        ))}
      </Row>
    </>

  )
}

export default Products