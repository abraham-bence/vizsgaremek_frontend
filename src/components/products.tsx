import { Col, Row } from 'react-bootstrap';
import ProductCard from '../components/productCard';
import { useProducts } from '../core/hooks';
import { BarLoader } from 'react-spinners';
import { useEffect, useMemo, useState } from 'react';

export interface Product {
  id: number;
  name: string;
  type: string;
  price: number;
  imgSrc: string;
  manufacturer: string;
  quantity: number;
}

function Products() {
  const getProducts = useProducts();
  const data = useMemo(() => getProducts.data ?? [], [getProducts.data]);

  const [cart, setCart] = useState<Product[]>([]);
  const [cartLoaded, setCartLoaded] = useState(false);

  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarText, setSnackbarText] = useState('');

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
      const existingProductIndex = prev.findIndex((p) => p.id === product.id);
      if (existingProductIndex !== -1) {
        // If product is already in the cart, increment the quantity
        const updatedCart = [...prev];
        updatedCart[existingProductIndex] = {
          ...updatedCart[existingProductIndex],
          quantity: updatedCart[existingProductIndex].quantity + 1,
        };
        setSnackbarText(`"${product.name}" added to cart 😄`);
        setShowSnackbar(true);
        setTimeout(() => setShowSnackbar(false), 3000); // auto-hide in 3s
        return updatedCart;
      }
      setSnackbarText(`"${product.name}" added to cart 😄`);
      setShowSnackbar(true);
      setTimeout(() => setShowSnackbar(false), 3000); // auto-hide in 3s
      // If product is not in the cart, add it with quantity 1
      return [...prev, { ...product, quantity: 1 }];
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
      if (exists) {
        // If product is already liked, remove it from likes
        return prev.filter((p) => p.id !== product.id);
      }
      // If product isn't liked, add it to likes and trigger refresh
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
      <Row xs={1} md={2} lg={3} xxl={4} className="g-4 productContainer">
        {data?.map((product) => (
          <Col key={product.id}>
            <ProductCard
              product={product}
              main={true}
              onAdd={handleCartAdd}
              onLike={handleLike}
              isLiked={!!likes.find((p) => p.id === product.id)}
            />
          </Col>
        ))}
      </Row>
      {showSnackbar && (
        <div className="snackbar">
          {snackbarText}
        </div>
      )}
    </>
  );
}

export default Products;
