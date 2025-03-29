
import { Col, Row } from 'react-bootstrap';
import ProductCard from '../components/productCard';
import { useProducts } from '../core/hooks';
import { BarLoader } from 'react-spinners';

export interface Product {
    id: number
    name: string
    type: string
    price: number
    imgSrc: string
    manufacturer: string
}

interface Props {
    data : Product[]
}


function Products({data} : Props) {
    const getProducts = useProducts()
    const products = getProducts.data ?? [];

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
            <Row xs={1} md={4} className="g-4 productContainer">
                {products?.map((product) => (
                    <Col key={product.id}>
                        <ProductCard product={product} />
                    </Col>

                ))}
            </Row>
        </>

    )
}

export default Products