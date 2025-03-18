import React from "react";
import "../../assets/styles/orderComplete.css";


const CheckoutDetails = ({
  cartItems,
  cartCountAndTotalDetails,

}) => {

  console.log('cccc', cartItems)
  // const orderItems = [
  //   {
  //     id: 1,
  //     name: "Majestic Beecroft Sweater For Men",
  //     price: 800,
  //     quantity: 1,
  //     subtotal: 800,
  //     image: "https://via.placeholder.com/100",
  //     size: "L",
  //     color: "Red",
  //     productCode: "12345678",
  //   },
  //   {
  //     id: 2,
  //     name: "Majestic Beecroft Sweater For Men",
  //     price: 800,
  //     quantity: 1,
  //     subtotal: 800,
  //     image: "https://via.placeholder.com/100",
  //     size: "L",
  //     color: "Black",
  //     productCode: "12345678",
  //   },
  //   {
  //     id: 3,
  //     name: "Majestic Beecroft Sweater For Men",
  //     price: 800,
  //     quantity: 1,
  //     subtotal: 800,
  //     image: "https://via.placeholder.com/100",
  //     size: "L",
  //     color: "Blue",
  //     productCode: "12345678",
  //   },
  //   {
  //     id: 4,
  //     name: "Majestic Beecroft Sweater For Men",
  //     price: 800,
  //     quantity: 1,
  //     subtotal: 800,
  //     image: "https://via.placeholder.com/100",
  //     size: "L",
  //     color: "White",
  //     productCode: "12345678",
  //   },
  // ];

  const calculateSubtotal = () => {
    // return orderItems.reduce((total, item) => total + item.subtotal, 0);
  };

  return (
    <div className="container">
      {/* <h1 className="text-center mb-4">Selected Products</h1> */}
      <div className="row">
        {/* Order Summary Table */}
        <div className="col-lg-12 mb-4">
          <table className="table table-bordered text-center">
            <thead className="thead-light">
              <tr>
                <th>Product Name</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Subtotal</th>
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
                  <td>{item?.quantity}</td>
                  <td>${item?.product?.price * item?.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="d-flex justify-content-between">
            <p className="font-weight-bold">Cart Subtotal:</p>
            <p>${cartCountAndTotalDetails?.totalPrice}</p>
          </div>
          {cartCountAndTotalDetails?.couponDiscount > 0 && <p className="d-flex justify-content-between">
                <span>Coupon:</span>
                <span>-${cartCountAndTotalDetails?.couponDiscount}</span>
              </p>}
          <div className="d-flex justify-content-between">
            <p className="font-weight-bold">Shipping:</p>
            <p>{cartCountAndTotalDetails?.shippingCharge == 0 ? 'Free Shipping' : '$' + cartCountAndTotalDetails?.shippingCharge}</p>

          </div>
          <div className="d-flex justify-content-between font-weight-bold">
            <p>Order Total:</p>
            <p>${cartCountAndTotalDetails?.finalPrice}</p>
          </div>
        </div>

        {/* Customer Details */}
        {/* <div className="col-lg-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Customer Details</h5>
              <p>
                <strong>Email:</strong> your@email.com
              </p>
              <p>
                <strong>Phone:</strong> +1 800 234 5678
              </p>
              <hr />
              <h5 className="card-title">Billing Address</h5>
              <p>Shop, Valencia Road, Dumaguete City, Negros Oriental 80118, Philippines</p>
              <hr />
              <h5 className="card-title">Shipping Address</h5>
              <p>Shop, Valencia Road, Dumaguete City, Negros Oriental 80118, Philippines</p>
            </div>
          </div>
          <button className="btn btn-dark btn-block mt-4">Back to Shopping</button>
        </div> */}
      </div>
    </div>
  );
};

export default CheckoutDetails;
