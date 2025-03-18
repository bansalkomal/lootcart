import React, { useEffect, useState } from "react";
import "../../assets/styles/shoppingCart.css";
import "../../assets/styles/common.css";
import { useNavigate } from "react-router-dom";
import { ShoppingBag, ArrowRight, ArrowLeft } from 'lucide-react';
import { apiRequest, getUserId } from "../helpers/helper";
import { BASE_URL } from "../helpers/Contants";

const ShoppingCart = () => {

  let navigate = useNavigate();
  const [couponCode, setCouponCode] = useState('');
  const [cartItems, setCartItems] = useState();
  const [cartTotal, setCartTotal] = useState();
  // const [couponCode, setCouponCode] = useState("");
  const [isApplied, setIsApplied] = useState(false);
  const [cartCountAndTotalDetails, setCartCountAndTotalDetails] = useState();
  const [isChange, setIsChange] = useState(false);


  useEffect(() => {
    const callApi = async () => {
      try{
      let response = await apiRequest(BASE_URL+"cart/user/"+getUserId());
      if(response ){
        setCartTotal(response?.totalPrice);
        if(response?.cartItems){
          setCartItems(response?.cartItems);
          if(response?.couponCode){
            setCouponCode(response?.couponCode)
            setIsApplied(true)
          }
          

        }
      }
      console.log('mmmm', response)
    }catch(err){
      console.log('Error in fetching : ', err)
    }
    }

    callApi()
   
  },[])

  useEffect(() => {
    const fetchCartTotal = async () => {

      try{
        const cartCountAndTotal = await apiRequest(BASE_URL + "cart/user/specific/"+getUserId(), "GET");
        if(cartCountAndTotal){
          setCartCountAndTotalDetails(cartCountAndTotal);

        }


      }catch(e){
        console.log('Blog error: ', e)
      }
    };

    fetchCartTotal();
  }, [isChange]);

  //   [{
  //     id: 1,
  //     name: "Majestic Beecroft Sweater For Men",
  //     price: 600,
  //     quantity: 1,
  //     image: "https://via.placeholder.com/100",
  //     size: "L",
  //     color: "Red",
  //     productCode: "12345678",
  //   },
  //   {
  //     id: 2,
  //     name: "Majestic Beecroft Sweater For Men",
  //     price: 600,
  //     quantity: 1,
  //     image: "https://via.placeholder.com/100",
  //     size: "L",
  //     color: "Black",
  //     productCode: "12345678",
  //   },
  //   {
  //     id: 3,
  //     name: "Majestic Beecroft Sweater For Men",
  //     price: 600,
  //     quantity: 1,
  //     image: "https://via.placeholder.com/100",
  //     size: "L",
  //     color: "Blue",
  //     productCode: "12345678",
  //   },
  //   {
  //     id: 4,
  //     name: "Majestic Beecroft Sweater For Men",
  //     price: 600,
  //     quantity: 1,
  //     image: "https://via.placeholder.com/100",
  //     size: "L",
  //     color: "White",
  //     productCode: "12345678",
  //   },
  // ]

  const updateQuantity = async(id, quantity, isAdd) => {
    
    //call api and pass the parameters
   
      try{
      let payload=[{
        id,
        quantity,
        isAdd,
    }];
          <ShoppingCart />
      let response = await apiRequest(BASE_URL+"cart/create/"+getUserId(), "POST", payload);
      if(response ){
        setCartTotal(response?.totalPrice);
        if(response?.cartItems){
          setCartItems(response?.cartItems);
        }
      }
      // console.log('mmmm', response)
    }catch(err){
      console.log('Error in fetching : ', err)
    }finally{
      setIsChange(!isChange);
    }
    

    // setCartItems((prevItems) =>
    //   prevItems.map((item) =>
    //     item.id === id
    //       ? {
    //           ...item,
    //           quantity: Math.max(1, isAdd ? item.quantity + 1 : item.quantity - 1),
    //         }
    //       : item
    //   )
    // );
  };

  const removeItem = async(id) => {

     
    try{
      let payload=[{
        id,
        quantity:0,
   
    }];
      let response = await apiRequest(BASE_URL+"cart/create/"+getUserId(), "POST", payload);
      if(response ){
        setCartTotal(response?.totalPrice);
        if(response?.cartItems){
          setCartItems(response?.cartItems);
        }
      }
      // console.log('mmmm', response)
    }catch(err){
      console.log('Error in fetching : ', err)
    }finally{
      setIsChange(!isChange);
    }


    //call api and pass quantity 0 

    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const calculateSubtotal = () => {
    return cartTotal;
    // return cartItems?.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleCheckout = () => {
    navigate('/stepper');
  }

  const handleMoveToHome = () => {
    navigate("/dashboard")
  }

  const applyCoupon =  async () => {
    if (!couponCode) return;

    // setLoading(true);
    // try {
      // const response = await axios.post("/api/apply-coupon", {
      //   couponCode,
      //   isCoupon: true,
      // });
      //setIsApplied(true);
      try{
        let payload={
          couponCode,
          isApplied: true,
        };

        let response = await apiRequest(BASE_URL + "cart/apply-coupon/"+getUserId(), "POST", payload);
        if (response.message === "Coupon applied successfully") {
          alert("Coupon applied successfully!");

          setIsApplied(true);
    
          // Fetch updated cart details after applying the coupon
          const updatedCart = await apiRequest(BASE_URL + "cart/user/specific/"+getUserId(), "GET");
    
          if (updatedCart) {
            setCartTotal(updatedCart.finalPrice || 0);
            //setCartItems(updatedCart.cartItems || []);
          }
    
          
        } else {
          //alert("Invalid Coupon");
          setIsApplied(false);
        }
      } catch (error) {
        console.error("Error applying coupon:", error);
        //alert("Failed to apply coupon");
        setIsApplied(false);
      } finally{
        setIsChange(!isChange);
      }
    
    };

    //   let response;

    //   if (response.data.success) {
    //     setIsApplied(true);
    //   } else {
    //     alert("Invalid Coupon");
    //   }
    // } catch (error) {
    //   console.error("Error applying coupon:", error);
    //   alert("Failed to apply coupon");
    // } finally {
    //   // setLoading(false);
    // }
  // };

  const removeCoupon = async() => {
    // setCouponCode("");
    // setIsApplied(false);
    if (!couponCode) return;

    // setLoading(true);
    // try {
      // const response = await axios.post("/api/apply-coupon", {
      //   couponCode,
      //   isCoupon: true,
      // });
      //setIsApplied(true);
      try{
        let payload={
          couponCode,
          isApplied: false,
        };

        let response = await apiRequest(BASE_URL + "cart/apply-coupon/"+getUserId(), "POST", payload);
        console.log('ressss', response)
        if (response.message === "Coupon removed successfully") {
          alert("Coupon removed successfully!");

          setIsApplied(false);
          setCouponCode('');
    
          // Fetch updated cart details after applying the coupon
          const updatedCart = await apiRequest(BASE_URL + "cart/user/specific/"+getUserId(), "GET");
    
          if (updatedCart) {
            setCartTotal(updatedCart.finalPrice || 0);
            // setCartItems(updatedCart.cartItems || []);
          }
    
          
        } else {
          console.error("Invalid coupon");
          //alert("Invalid Coupon");
          setIsApplied(false);
        }
      } catch (error) {
        console.error("Error removing coupon:", error);
        //alert("Failed to apply coupon");
        setIsApplied(false);
      } finally{
        setIsChange(!isChange);
      }
  };

  return (
    <div className="container py-4">
      <div className="d-flex align-items-center">
        <button className="btn btn-light me-3 back-btn" onClick={() => handleMoveToHome()}>
          <ArrowLeft size={20} /> Back
        </button>
        <h1 className="text-center flex-grow-1 mb-1" >Shopping Cart</h1>
      </div>
      {cartItems && cartItems?.length > 0  ? <div className="row pt-2">
        {/* Cart Items */}
        <div className="col-lg-8 mb-4">
          <table className="table table-bordered text-center">
            <thead className="thead-light">
              <tr>
                <th>Product Name</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Subtotal</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {cartItems && cartItems?.length > 0 && cartItems.map((item) => (
                <tr key={item?.product?.id}>
                  <td className="d-flex align-items-center">
                    <img
                      src={item?.product?.imageUrl}
                      alt={item?.product?.name}
                      className="img-thumbnail mr-3"
                      style={{ width: "60px", height: "60px" }}
                    />
                    <div>
                      <p className="mb-0">{item?.product?.name}</p>
                      <small className="text-muted"> Color: {item?.product?.color}</small>
                      <br />
                      <small className="text-muted">Product Code: {item?.product?.productCode}</small>
                    </div>
                  </td>
                  <td>${item?.product?.price}</td>
                  <td>
                    <div className="d-flex justify-content-center align-items-center">
                      <button
                        // onClick={() => console.log('hello')}
                        onClick={() => updateQuantity(item?.product?.id, item?.quantity, false)}
                        // className="btn btn-sm btn-outline-secondary"
                        className={`btn btn-sm btn-outline-secondary quantity-btn ${item?.quantity === 1 ? "disabled-btn" : ""}`}
                        disabled = {item?.quantity <= 1}
                      >
                        -
                      </button>
                      <span className="mx-2">{item?.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item?.product?.id, item?.quantity,true)}
                        className="btn btn-sm btn-outline-secondary"
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td>${item?.product?.price * item?.quantity}</td>
                  <td>
                    <button
                      onClick={() => removeItem(item?.product?.id)}
                      className="btn btn-sm btn-danger"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="d-flex justify-content-between">
            {/* <input
              type="text"
              placeholder="Enter coupon"
              className="form-control w-50 mr-2"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
            />
            <button className="btn btn-dark">Apply</button> */}
            {/* <button className="btn btn-dark">Update Cart</button> */}
            <input
        type="text"
        placeholder="Enter coupon"
        className="form-control w-50 mr-2"
        value={couponCode}
        onChange={(e) => setCouponCode(e.target.value)}
        disabled={isApplied}
      />
      {!couponCode || !isApplied ? (
        <button className="btn btn-dark" onClick={applyCoupon} >
          {/* {loading ? "Applying..." : "Apply"} */}
          Apply
        </button>
      ) : (
        <button className="btn btn-danger" onClick={removeCoupon}>
          Remove
        </button>
      )}
          </div>
        </div>

        {/* Cart Summary */}
        <div className="col-lg-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Cart Detail</h5>
              <p className="d-flex justify-content-between">
                <span>Cart Subtotal:</span>
                <span>${cartCountAndTotalDetails?.totalPrice}</span>
              </p>
              {cartCountAndTotalDetails?.couponDiscount > 0 && <p className="d-flex justify-content-between">
                <span>Coupon:</span>
                <span>-${cartCountAndTotalDetails?.couponDiscount}</span>
              </p>}
              <p className="d-flex justify-content-between">
                <span>Shipping:</span>
                <span>{cartCountAndTotalDetails?.shippingCharge == 0 ? 'Free Shipping' : '$' + cartCountAndTotalDetails?.shippingCharge}</span>
              </p>
              <p className="d-flex justify-content-between font-weight-bold">
                <span>Order Total:</span>
                <span>${cartCountAndTotalDetails?.finalPrice}</span>
              </p>
              {/* <h5 className="mt-4">Calculate Shipping</h5>
              <select className="form-control mb-3">
                <option>Country</option>
                <option>USA</option>
                <option>Canada</option>
                <option>UK</option>
              </select>
              <input type="text" className="form-control mb-3" placeholder="State/Province" />
              <input type="text" className="form-control mb-3" placeholder="Postal Code" /> */}
              <button className="btn btn-warning btn-block position-relative btn-moving-right-animation" onClick={handleCheckout}>
                Proceed to Checkout
                <ArrowRight className="text-black ms-2 arrow-move-right" size={30} />
              </button>
            </div>
          </div>
        </div>
      </div> : 
      <>{'No Products !!'}</>}
    </div>
  );

      };
      

export default ShoppingCart;
