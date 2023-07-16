import { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { getProducts } from "../../helpers/product";
import ProductGridSingle from "../../components/product/ProductGridSingle";
import {API_URL} from '../../config/app.define' 
const ProductGrid = ({
  spaceBottomClass,
  type,
  limit
}) => {
  const { products } = useSelector((state) => state.product);
  const currency = useSelector((state) => state.currency);
  const { cartItems } = useSelector((state) => state.cart);
  const { wishlistItems } = useSelector((state) => state.wishlist);
  const { compareItems } = useSelector((state) => state.compare);
  const [apiProducts, setApiProducts] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/Product/top5bestsale`)
      .then(response => response.json())
      .then(data => setApiProducts(data))
      .catch(error => console.log(error));
  }, []);

  const prods = getProducts(apiProducts, type, limit);
  
  return (
    <Fragment>
      {prods?.map(product => {
        return (
          <div className="col-xl-3 col-md-6 col-lg-4 col-sm-6" key={product.productId}>
            <ProductGridSingle
              spaceBottomClass={spaceBottomClass}
              product={product}
              currency={currency}
              cartItem={
                cartItems.find((cartItem) => cartItem.id === product.productId)
              }
              wishlistItem={
                wishlistItems.find(
                  (wishlistItem) => wishlistItem.id === product.productId
                )
              }
              compareItem={
                compareItems.find(
                  (compareItem) => compareItem.id === product.productId
                )
              }
            />
          </div>
        );
      })}
    </Fragment>
  );
};

ProductGrid.propTypes = {
  spaceBottomClass: PropTypes.string,
  category: PropTypes.string,
  type: PropTypes.string,
  limit: PropTypes.number
};

export default ProductGrid;
