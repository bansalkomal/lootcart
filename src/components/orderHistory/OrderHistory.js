import React, { useEffect, useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { Heart, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { apiRequest, formatDate, getUserId } from '../helpers/helper';
import { BASE_URL } from '../helpers/Contants';

const OrderHistory = () => {
  let navigate = useNavigate();

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Simulating an API call to fetch order history
    const fetchOrders = async () => {
      try{
        const orderDetails = await apiRequest(BASE_URL + "orders/user/"+getUserId(), "GET");
        if(orderDetails && orderDetails?.length > 0){
          setOrders(orderDetails);

          // setorderDetailsDetails(orderDetails);

        }


      }catch(e){
        console.log('Blog error: ', e)
      }
      // const mockOrders = [
      //   {
      //     id: 1,
      //     date: "2024-03-01",
      //     items: [
      //       { name: "Smartphone", price: 399.99, count: 1 },
      //       { name: "Wireless Headphones", price: 100, count: 1 }
      //     ],
      //     total: 499.99,
      //     status: "Delivered",
      //   },
      //   {
      //     id: 2,
      //     date: "2024-02-20",
      //     items: [
      //       { name: "Laptop", price: 999.99, count: 1 },
      //       { name: "Mouse", price: 100, count: 1 }
      //     ],
      //     total: 1099.99,
      //     status: "Shipped",
      //   },
      //   {
      //     id: 3,
      //     date: "2024-02-10",
      //     items: [
      //       { name: "Cap", price: 200, count: 1 },
      //       { name: "T-shirt", price: 300, count: 2 }
      //     ],
      //     total: 800,
      //     status: "Processing",
      //   },
      // ];
      // setOrders(mockOrders);
    };

    fetchOrders();
  }, []);

  const handleMoveToHome = () => {
    navigate("/dashboard");
  };

  const getOrderStatus = (orderDate) => {
    const orderDateObj = new Date(orderDate);
    const today = new Date();
    const diffInMs = today - orderDateObj;
    const diffInDays = diffInMs / (1000 * 60 * 60 * 24);

    return diffInDays < 2 ? 'Pending' : 'Delivered';
};


  return (
    <div className="container mt-5">
      <div className="d-flex align-items-center pb-2">
        <button className="btn btn-light me-3 back-btn" onClick={handleMoveToHome}>
          <ArrowLeft size={20} /> Back
        </button>
        <h1 className="text-center flex-grow-1 mb-1">ORDER HISTORY</h1>
      </div>

      {orders.length === 0 ? (
        <p className="text-center">No orders found.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered text-center" >
            <thead className="table-dark" >
              <tr>
                <th style={{backgroundColor: 'black'}}>Order ID</th>
                <th style={{backgroundColor: 'black'}}>Date</th>
                <th style={{backgroundColor: 'black'}}>Items</th>
                <th style={{backgroundColor: 'black'}}>Total Amount</th>
                <th style={{backgroundColor: 'black'}}>Status</th>
              </tr>
            </thead>
            <tbody>
              {orders && orders?.length > 0 && orders.map((order, indexOrder) => (
                <tr key={order?.id}>
                  <td>{indexOrder + 1}</td>
                  <td>{formatDate(order?.orderDate)}</td>
                  
                  <td>
                    {order && order?.orderItems.length>0 && order?.orderItems.map((item, index) => (
                      <div key={index}>
                        <img
                            src={item?.product?.imageUrl}
                            alt={item?.product?.name}
                            className="img-thumbnail mr-3"
                            style={{ width: "60px", height: "60px" }}
                          />
                        {item?.product?.name} (x{item?.quantity}) - ${item?.price.toFixed(2)}
                        {index < order?.orderItems?.length - 1 && <hr className="my-2" style={{ borderWidth: "2px", borderColor: 'black' }} />}
                      </div>
                    ))}
                  </td>
                  <td>${order?.totalPrice?.toFixed(2)}</td>
                  <td>{getOrderStatus(order?.orderDate)}</td>
                  {/* <td>{order?.status || 'Delivered'}</td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default OrderHistory;


// import React from 'react';

// const OrderHistory = ({  }) => {
//     const orders = ([
//         {
//           id: 1,
//           total: 400,
//           items: [
//             { name: 'Tshirt', price: 100, count: 2 },
//             { name: 'Cap', price: 200, count: 1 },
//           ],
//         },
//         {
//           id: 2,
//           total: 500,
//           items: [
//             { name: 'Ball', price: 300, count: 1 },
//             { name: 'Tshirt', price: 100, count: 2 },
//           ],
//         },
//         {
//           id: 3,
//           total: 200,
//           items: [
//             { name: 'Cap', price: 200, count: 1 },
//           ],
//         },
//       ]);
//   return (
//     <div className="container">
//       <h2>Order History</h2>
//       {orders.length === 0 ? (
//         <p>No previous orders found.</p>
//       ) : (
//         <ul className="list-group">
//           {orders.map((order, index) => (
//             <li key={index} className="list-group-item">
//               <h5>Order #{index + 1}</h5>
//               <p>Total: ${order.total}</p>
//               <ul>
//                 {order.items.map((item, i) => (
//                   <li key={i}>
//                     {item.name} (x{item.count}) - ${item.price * item.count}
//                   </li>
//                 ))}
//               </ul>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default OrderHistory;
