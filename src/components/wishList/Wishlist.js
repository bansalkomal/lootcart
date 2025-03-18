import React, { useEffect, useState } from "react";
import "../../assets/styles/shoppingCart.css";
import "../../assets/styles/common.css";
import { useNavigate } from "react-router-dom";
import { Heart, ArrowLeft, ShoppingCart } from 'lucide-react';
import { BASE_URL } from "../helpers/Contants";
import { apiRequest, getUserId } from "../helpers/helper";

const Wishlist = () => {
  let navigate = useNavigate();

  const [wishlistItems, setWishlistItems] = useState()

  useEffect(() => {
    // Simulating an API call to fetch order history
    const fetchWishList = async () => {
      try{
        const wishlistData = await apiRequest(BASE_URL + "wishlist/" + getUserId(), "GET");
        if(wishlistData && wishlistData?.items?.length > 0){
          setWishlistItems(wishlistData);

          // setorderDetailsDetails(orderDetails);

        }else{
          let items= {items: []}
          setWishlistItems(items)
        }


      }catch(e){
        console.log('Blog error: ', e)
      }
    };
    
    fetchWishList();
  }, []);
  //   [
  //   {
  //     id: 1,
  //     name: "Majestic Beecroft Sweater For Men",
  //     price: 600,
  //     image: "https://via.placeholder.com/100",
  //     size: "L",
  //     color: "Red",
  //     productCode: "12345678",
  //   },
  //   {
  //     id: 2,
  //     name: "Majestic Beecroft Sweater For Men",
  //     price: 600,
  //     image: "https://via.placeholder.com/100",
  //     size: "L",
  //     color: "Black",
  //     productCode: "12345678",
  //   },
  //   {
  //     id: 3,
  //     name: "Majestic Beecroft Sweater For Men",
  //     price: 600,
  //     image: "https://via.placeholder.com/100",
  //     size: "L",
  //     color: "Blue",
  //     productCode: "12345678",
  //   },
  // ]);

  const removeItem = async (id) => {
    try{
      let payload= {
        id,
        isAdd: false,
      }
      const wishlistData = await apiRequest(BASE_URL + "wishlist/create/"+getUserId(), "POST", payload);

      
      if(wishlistData.message = "Product removed from wishlist"){
        setWishlistItems((prevItems) => ({
          ...prevItems,
          items: prevItems.items.filter((item) => item.product.id !== id)
        }));
        // setWishlistItems(wishlistData);

        // setorderDetailsDetails(orderDetails);

      }


    }catch(e){
      console.log('Blog error: ', e)
    }
    
    
    // setWishlistItems((prevItems) => prevItems.items.filter((item) => item.id !== id));
  };

  const moveToCart = async (item) => {
    // console.log("Move to Cart: ", item);
    try{
      let payload = [{
        id:item?.id,
        quantity: 1,
        isAdd: "true",
      }];
      const wishlistData = await apiRequest(BASE_URL + "cart/create/"+getUserId(), "POST", payload);
      if(wishlistData && wishlistData?.cartItems?.length > 0){
        // setWishlistItems(wishlistData);
        removeItem(item?.id)
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

  const handleMoveToHome = () => {
    navigate("/dashboard");
  };

  return (
    <div className="container py-4">
      <div className="d-flex align-items-center">
        <button className="btn btn-light me-3 back-btn" onClick={handleMoveToHome}>
          <ArrowLeft size={20} /> Back
        </button>
        <h1 className="text-center flex-grow-1 mb-1">WISHLIST</h1>
      </div>
{console.log('www', wishlistItems?.items)}
      {wishlistItems?.items?.length == 0 ? 
      <div>No Products in Wishlist!</div>
      :
      <div className="row pt-2">
        <div className="col-lg-12 mb-4">
          <table className="table table-bordered text-center">
            <thead className="thead-light">
              <tr>
                <th>Product Name</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {wishlistItems?.items?.length>0 && wishlistItems?.items?.map((item) => (
                <tr key={item.id}>{console.log('immm', item)}
                  <td className="d-flex align-items-center">
                    <img
                      src={item?.product?.imageUrl}
                      alt={item?.product?.name}
                      className="img-thumbnail mr-3"
                      style={{ width: "60px", height: "60px" }}
                    />
                    <div>
                      <p className="mb-0">{item?.product?.name}</p>
                      <small className="text-muted">Size: {item?.product?.size}, Color: {item?.product?.color}</small>
                      <br />
                      <small className="text-muted">Product Code: {item?.product?.productCode}</small>
                    </div>
                  </td>
                  <td>${item?.product?.price}</td>
                  <td>
                    <button
                      onClick={() => moveToCart(item?.product)}
                      className="btn btn-sm btn-dark me-2"
                    >
                      Move to Cart <ShoppingCart size={16} />
                    </button>
                    <button
                      onClick={() => removeItem(item?.product?.id)}
                      className="btn btn-sm btn-danger"
                    >
                      Remove <Heart size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>}
    </div>
  );
};

export default Wishlist;
