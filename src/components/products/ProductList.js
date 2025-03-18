import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart, Eye, RefreshCw, Heart } from 'lucide-react';
import { OverlayTrigger, Tooltip, Button, Modal } from 'react-bootstrap';
import ProductCompare from './ProductCompareButton';
import ProductCompareButton from './ProductCompareButton';
import "../../assets/styles/productTile.css";
import { apiRequest, getUserId } from '../helpers/helper';
import { BASE_URL } from '../helpers/Contants';
import ProductForm from './ProductForm';
import { getUnit } from '@mui/material/styles/cssUtils';

const ProductsList = ({ setCompareProducts, products, setActivePage, setIsCallWishListCount, 
  setIsCallCountAndTotal,
  handleCategoryClick,
  listCategoryId,
  listSubCategoryId,
  listSubSubCategoryId,
}) => {
  const navigate = useNavigate();
// console.log('pppp', products)
const userDetails = JSON.parse(localStorage.getItem('userDetails'));
  const [productData, setProductData] = useState([])

  useEffect(() => {
    setProductData(products)
  }, [products])

  const handleProductClick = (id) => {
    navigate(`/product/${id}`, {
      // state: { setActivePage },
    });
  };

  const handleAddToWishlist =async (id) => {
    try{
      let payload = {
        id,
        isAdd: "true",
      }
      const wishlist = await apiRequest(BASE_URL + "wishlist/create/"+getUserId(), "POST", payload);
      // setProductData([wishlist])
      setIsCallWishListCount(true);
      alert(`${wishlist?.message}`)
      // if(orderDetails && orderDetails?.length > 0){
      //   setOrders(orderDetails);

        // setorderDetailsDetails(orderDetails);

      // }


    }catch(e){
      console.log('Blog error: ', e)
    }
  }


  const moveToCart = async (item) => {
    // console.log("Move to Cart: ", item);
    setIsCallCountAndTotal(true)
    try{
      let payload = [{
        id:item,
        quantity: 1,
        isAdd: "true",
      }];
      const wishlistData = await apiRequest(BASE_URL + "cart/create/"+getUserId(), "POST", payload);

      if(wishlistData && wishlistData?.cartItems?.length > 0){
        setIsCallCountAndTotal(true)
        // setWishlistItems(wishlistData);
        // removeItem(item?.id)
        // setWishlistItems((prevItems) => ({
        //   ...prevItems,
        //   items: prevItems.items.filter((item) => item.product.id !== item?.id)
        // }));

        // setorderDetailsDetails(orderDetails);

      }


    }catch(e){
      console.log('Blog error: ', e)
    }
    // removeItem(itemId);
  };

  const handleRemove = async (id) => {
    // console.log('pppp', id)
    try{
 
      const wishlistData = await apiRequest(BASE_URL + "products/"+ id, "DELETE");
      if(wishlistData){
        handleCategoryClick(listCategoryId, listSubCategoryId, listSubSubCategoryId)

      }
    }catch(e){
      console.log(' error: ', e)
    }
  }

  // const handleSaveUpdate =async () => {
  //   try{
  //     const wishlistData = await apiRequest(BASE_URL + "products/1", "PUT");
  //   }catch(e){
  //     console.log(' error: ', e)
  //   }
  // }

  // const handleUpdate =  (product) => {
  //   console.log('ppppppdcsd', product)
  //   // console.log('pppp', id)
  //   try{
  //     <ProductForm product={product} onSave={(data) => console.log('Updated product:', data)}/>
  //     // const wishlistData = await apiRequest(BASE_URL + "products/1", "PUT");
  //   }catch(e){
  //     console.log(' error: ', e)
  //   }
  // }
  const [showForm, setShowForm] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const handleUpdate = (product) => {
        setSelectedProduct(product);
        setShowForm(true);
    };

    const handleSave = async (updatedProduct) => {
        // console.log('Updated product:', updatedProduct);
        try{
          let payload= {
            
              name:updatedProduct?.name,
              description: updatedProduct?.description,
              price: updatedProduct?.price,
              stock: updatedProduct?.stock,
              brand: updatedProduct?.brand,
              imageUrl: updatedProduct?.imageUrl,
              color: updatedProduct?.color,
              size: updatedProduct?.size,
              subCategoryItemId:updatedProduct?.subCategoryItem?.id
          
          }
              const wishlistData = await apiRequest(BASE_URL + "products/"+updatedProduct?.id, "PUT", payload);
              if(wishlistData){
                handleCategoryClick(listCategoryId, listSubCategoryId, listSubSubCategoryId)
              }
              // setProductData([wishlistData])
            }catch(e){
              console.log(' error: ', e)
            }
        setShowForm(false);
    };

    const handleClose = () => setShowForm(false);

  return (
    <div className="row">
      {productData && productData?.length > 0 ? productData?.map((product) => (
        <div key={product?.id} className="col-md-3 mb-4">
          <div className="card">
            <img src={product?.imageUrl} className="card-img-top" alt={product?.name} style={{width: 'auto', height: '14rem'}}/>
            <div className="card-body">
              <h5 className="card-title">{product?.name}
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '10px', justifyContent:'center' }}>
                <span> {`(Availability`}</span>
                <span style={{
                  height: '10px',
                  width: '10px',
                  backgroundColor: `${product?.stock ? 'green' : 'red'}`,
                  borderRadius: '50%',
                  display: 'inline-block'
                }}></span>
                <span style={{color: `${product?.stock ? 'green' : 'red'}`}}>{product?.stock ? 'In Stock)' : 'Out of Stock)'}</span>
              </div>

                {/* <span style={{fontSize: '10px'}}>Availability: <span className="h-3 w-3 bg-green-500 rounded-full"> " </span> {product?.inStock ? 'In Stock' : 'Out of Stock'}</span> */}
              </h5>
              <p className="card-text">${product?.price}</p>
              <p className="card-text">Size: {product?.size}</p>
              <p className="card-text">Color: {product?.color}</p>
              <div className="d-flex justify-content-between mt-3">
                <OverlayTrigger
                  placement="top"
                  overlay={<Tooltip id={`tooltip-top-cart-${product?.id}`}>Add to Cart</Tooltip>}
                >
                  <button className="btn btn-outline-primary" onClick={() => moveToCart(product?.id)}>
                    <ShoppingCart size={16} />
                  </button>
                </OverlayTrigger>
                <OverlayTrigger
                  placement="top"
                  overlay={<Tooltip id={`tooltip-top-view-${product?.id}`}>View Details</Tooltip>}
                >
                  <button className="btn btn-outline-secondary" onClick={() => handleProductClick(product?.id)}>


                    <Eye size={16} />
                  </button>
                </OverlayTrigger>
                {/* <OverlayTrigger
                  placement="top"
                  overlay={<Tooltip id={`tooltip-top-compare-${product?.id}`}>Compare</Tooltip>}
                > */}
                  {/* <button className="btn btn-outline-secondary" onClick={handleCompare}>
                    <RefreshCw size={16} />
                  </button> */}
                  <ProductCompareButton setCompareProducts={setCompareProducts} product={product} />
                {/* </OverlayTrigger> */}
                <OverlayTrigger
                  placement="top"
                  overlay={<Tooltip id={`tooltip-top-wishlist-${product?.id}`}>Add to Wishlist</Tooltip>}
                >
                  <button className="btn btn-outline-secondary" onClick={() => handleAddToWishlist(product?.id)}>
                    <Heart size={16} 
                    // fill="red" color="red"
                    />
                  </button>
                </OverlayTrigger>
              </div>
              {userDetails?.role == 'admin' &&<div className="product-actions mt-3">
                <Button variant="success" onClick={() => handleUpdate(product)}>Update</Button>
                <Button variant="danger" onClick={() => handleRemove(product?.id)}>Remove</Button>
              </div>}
            </div>
          </div>
        </div>
      ))
    :
    <div>No Products !</div>
    }
    {/* {showForm && (
                <ProductForm 
                    product={selectedProduct} 
                    onSave={handleSave}
                />
            )} */}
            <Modal
                show={showForm} 
                onHide={handleClose} 
                centered 
                size="xl"
                dialogClassName="fullscreen-modal"
            >
                <Modal.Body>
                    <div className="p-4 bg-light rounded">
                        <ProductForm 
                            product={selectedProduct} 
                            onSave={handleSave}
                        />
                        <Button variant="secondary" onClick={handleClose} className="mt-3">
                            Close
                        </Button>
                    </div>
                </Modal.Body>
            </Modal>
        
    </div>
  );
};

export default ProductsList;