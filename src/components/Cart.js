import React from 'react';
import { Button, ListGroup, ListGroupItem, Table } from 'react-bootstrap';

const Cart = ({ cart, removeFromCart, placeOrder, updateCartItemCount }) => {
  const getTotal = () => {
    return cart.reduce((acc, item) => acc + item.price * (item.count || 1), 0).toFixed(2);
  };

  return (
    <div className="row">
      {/* Left Column: Cart Items List */}
      <div className="col-md-6">
        <h2 className="mb-3">Cart Items</h2>
        {cart.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <ListGroup>
            {cart.map((item) => (
              <ListGroupItem key={item.id} className="d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center">
                  {item.name} - ${item.price.toFixed(2)}
                  
                  {/* Count Wheel */}
                  
                </div>
                <div>
                <div className="d-flex"> 
                  <div className="d-flex align-items-center mx-3">
                      <Button
                        variant={item?.count==1 ? "outline-secondary" : "outline-danger"}
                        size="sm"
                        onClick={() => {
                          const newCount = (item.count || 1) - 1;
                          if (newCount > 0) {
                            item.count = newCount;
                            updateCartItemCount(item.id, newCount);
                          }
                        }}
                        
                        disabled={item?.count==1}
                      >
                        -
                      </Button>
                      <span className="mx-2">{item.count || 1}</span>
                      <Button
                        variant="outline-success"
                        size="sm"
                        onClick={() => {
                          const newCount = (item.count || 1) + 1;
                          item.count = newCount;
                          updateCartItemCount(item.id, newCount);
                        }}
                      >
                        +
                      </Button>
                    </div>
                  <Button variant="danger" size="sm" onClick={() => removeFromCart(item)}>
                    Remove
                  </Button>
                </div>
                </div>
                
              </ListGroupItem>
            ))}
          </ListGroup>
        )}
      </div>

      {/* Right Column: Summary Table */}
      <div className="col-md-6">
        <h2 className="mb-3">Summary</h2>
        {cart.length > 0 && (
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Count</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>${item.price.toFixed(2)}</td>
                  <td>{item.count || 1}</td>
                  <td>${(item.price * (item.count || 1)).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
        <h4>Total: ${getTotal()}</h4>
        {cart.length > 0 && (
          <Button className="mt-3" variant="success" onClick={placeOrder}>
            Place Order
          </Button>
        )}
      </div>
    </div>
  );
};

export default Cart;
