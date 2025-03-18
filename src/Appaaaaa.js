// // import logo from './logo.svg';
// // import './App.css';

// // function App() {
// //   return (
// //     <div className="App">
// //       <header className="App-header">
// //         <img src={logo} className="App-logo" alt="logo" />
// //         <p>
// //           Edit <code>src/App.js</code> and save to reload.
// //         </p>
// //         <a
// //           className="App-link"
// //           href="https://reactjs.org"
// //           target="_blank"
// //           rel="noopener noreferrer"
// //         >
// //           Learn React
// //         </a>
// //       </header>
// //     </div>
// //   );
// // }

// // export default App;


// import React, { useState } from 'react';
// import ProductList from './components/ProductList';
// import Cart from './components/Cart';
// import Header from './components/Header';
// import 'bootstrap/dist/css/bootstrap.min.css';

// const App = () => {
//   const [cart, setCart] = useState([]);
//   const [isCartView, setIsCartView] = useState(false);
//   const [searchQuery, setSearchQuery] = useState('');

//   const addToCart = (product) => {
//     setCart([...cart, product]);
//   };

//   const removeFromCart = (product) => {
//     setCart(cart.filter((item) => item.id !== product.id));
//   };

//   const placeOrder = () => {
//     alert('Order placed successfully!');
//     setCart([]);
//   };

//   const toggleCartView = () => {
//     setIsCartView(!isCartView);
//   };

//   const handleSearch = (query) => {
//     setSearchQuery(query);
//   };

//   const updateCartItemCount = (id, quantity) => {
//     setCart((prevCart) =>
//       prevCart.map((item) =>
//         item.id === id ? { ...item, count: quantity } : item
//       )
//     );
//   };
  

//   const products = [
//     { id: 1, name: 'Tshirt', price: 100, image: 'https://media.istockphoto.com/id/1324164168/photo/short-sleeve-round-neck-t-shirt.jpg?s=1024x1024&w=is&k=20&c=4uBAQdRszirOcXQzWou2NJ78ZINprjSJ3HPM8qwL15I=' },
//     { id: 2, name: 'Cap', price: 200, image: 'https://plus.unsplash.com/premium_photo-1664304822473-57eef9116519?q=80&w=1373&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D/150' },
//     { id: 3, name: 'Ball', price: 300, image: 'https://images.unsplash.com/photo-1540848893531-5eece9a5fa64?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D/150' },
//   ];

//   // Filter products based on search query
//   const filteredProducts = products.filter(product =>
//     product.name.toLowerCase().includes(searchQuery.toLowerCase())
//   );



//   return (
//     <div>
//       <Header
//         cartCount={cart.length}
//         toggleCartView={toggleCartView}
//         isCartView={isCartView}
//         handleSearch={handleSearch}
//       />
//       <div className="container">
//         {!isCartView ? (
//           <ProductList products={filteredProducts} addToCart={addToCart} />
//         ) : (
//           <Cart cart={cart} removeFromCart={removeFromCart} placeOrder={placeOrder} updateCartItemCount={updateCartItemCount}/>
//         )}
//       </div>
//     </div>
//   );
// };

// export default App;


import React, { useState } from 'react';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import Header from './components/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import OrderHistory from './components/OrderHistory';
import SignUp from './components/SignUp';
import Login from './components/Login';

const App = () => {
  const [cart, setCart] = useState([]);
  const [isCartView, setIsCartView] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    availability: 'all',
    priceRange: [0, 500],
    rating: '',
    color: '',
    brand: ''
  });
  const [orders, setOrders] = useState([]); 
  const [isOrderHistoryView, setIsOrderHistoryView] = useState(false); 
  const [products, setProducts] = useState([ 
    { id: 1, name: 'Tshirt', price: 100, rating: 4, color: 'red', brand: 'Brand A', availability: 'inStock', image: 'https://media.istockphoto.com/id/1324164168/photo/short-sleeve-round-neck-t-shirt.jpg?s=1024x1024&w=is&k=20&c=4uBAQdRszirOcXQzWou2NJ78ZINprjSJ3HPM8qwL15I=' },
    { id: 2, name: 'Cap', price: 200, rating: 5, color: 'blue', brand: 'Brand B', availability: 'outOfStock', image: 'https://plus.unsplash.com/premium_photo-1664304822473-57eef9116519?q=80&w=1373&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D/150' },
    { id: 3, name: 'Ball', price: 300, rating: 3, color: 'green', brand: 'Brand C', availability: 'inStock', image: 'https://images.unsplash.com/photo-1540848893531-5eece9a5fa64?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D/150' },
  ]);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [showLogin, setShowLogin] = useState(false);  
  const [showSignUp, setShowSignUp] = useState(false);

  const handleLogin = (email, password) => {
    // This is just a placeholder for actual authentication logic
    if (email && password) {
      setIsLoggedIn(true);
      setShowLogin(false);
    } else {
      alert('Invalid login credentials!');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCart([]); // Clear cart on logout
  };

  const handleSignUp = (email, password, role) => {
    console.log(`Email: ${email}, Password: ${password}, Role: ${role}`);
    if (role === 'admin') {
      console.log("Admin account created!");
    } else {
      console.log("User account created!");
    }
  
    setIsLoggedIn(true);  // Mark the user as logged in
    setShowSignUp(false); // Hide the signup form
  };
  

  const addToCart = (product) => {
    if (!isLoggedIn) {
      setShowLogin(true); // Show login if not logged in
    } else {
      const productInCart = cart.find((item) => item.id === product.id);
      if (productInCart) {
        setCart(
          cart.map((item) =>
            item.id === product.id ? { ...item, count: (item.count || 1) + 1 } : item
          )
        );
      } else {
        setCart([...cart, { ...product, count: 1 }]);
      }
    }
  };

  const removeFromCart = (product) => {
    setCart(cart.filter((item) => item.id !== product.id));
  };

  const placeOrder = () => {
    if (!isLoggedIn) {
      setShowLogin(true); // Show login if trying to place order
    } else {
      alert('Order placed successfully!');
      setCart([]);
    }
  };
  const toggleCartView = () => {
    setIsCartView(!isCartView);
    setIsOrderHistoryView(false); // Ensure order history is closed when switching to cart
  };

  const toggleLoginView = () => {
    setShowLogin(!showLogin)
    
    // setIsCartView(!isCartView);
    // setIsOrderHistoryView(false); // Ensure order history is closed when switching to cart
  };

  const toggleOrderHistoryView = () => {
    setIsOrderHistoryView(!isOrderHistoryView);
    setIsCartView(false); // Ensure cart is closed when viewing order history
  };

  // const toggleCartView = () => {
  //   setIsCartView(!isCartView);
  // };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const updateCartItemCount = (id, quantity) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, count: quantity } : item
      )
    );
  };

  const applyFilters = (newFilters) => {
    setFilters(newFilters);
  };

  
  // Filter products based on search query and filters
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesAvailability =
      filters.availability === 'all' || product.availability === filters.availability;
    const matchesPrice =
      (filters.priceRange[0] === 0 || product.price >= filters.priceRange[0]) &&
      (filters.priceRange[1] === 500 || product.price <= filters.priceRange[1]);
    const matchesRating = !filters.rating || product.rating >= parseInt(filters.rating);
    const matchesColor = !filters.color || product.color.toLowerCase() === filters.color.toLowerCase();
    const matchesBrand = !filters.brand || product.brand.toLowerCase().includes(filters.brand.toLowerCase());

    return matchesSearch && matchesAvailability && matchesPrice && matchesRating && matchesColor && matchesBrand;
  });

  const handleRefresh = () => {
    setIsOrderHistoryView(false);
    setIsCartView(false)

  }

    // Add new product
    const addProduct = (product) => {
      const newProduct = { ...product, id: products.length + 1 };
      setProducts([...products, newProduct]);
    };
  
    // Delete product
    const deleteProduct = (id) => {
      setProducts(products.filter((product) => product.id !== id));
    };

    // if (!isLoggedIn) {
    //   return isSignUp ? (
    //     <SignUp onSignUp={handleSignUp} onSwitchToLogin={() => setIsSignUp(false)} />
    //   ) : (
    //     <Login onLogin={handleLogin} onSwitchToSignUp={() => setIsSignUp(true)} />
    //   );
    // }

    const handleBackLogin = () => {
      setShowLogin(false);
      setShowSignUp(false);
    }
 
  return (
    <div>
      {!showLogin && !showSignUp && <Header
        cartCount={cart.length}
        toggleCartView={toggleCartView}
        isCartView={isCartView}
        handleSearch={handleSearch}
        onApplyFilters={applyFilters}
        toggleOrderHistoryView={toggleOrderHistoryView}
        handleRefresh={handleRefresh}
        isOrderHistoryView={isOrderHistoryView}
        handleLogout={handleLogout}
        isLoggedIn={isLoggedIn}
        toggleLoginView={toggleLoginView}
      />}
      <div className="container">
        
        {!showLogin ?
        !isOrderHistoryView ? 
        !isCartView ? (
          <ProductList 
            products={filteredProducts} 
            addToCart={addToCart} 
            addProduct={addProduct}
            deleteProduct={deleteProduct}
          
          />
        ) : (
          <Cart cart={cart} removeFromCart={removeFromCart} placeOrder={placeOrder} updateCartItemCount={updateCartItemCount}/>
        ) 
        : 
        (
          <OrderHistory orders={orders} />
        ) 
        :
        (!showSignUp ? 
          <Login handleBackLogin={handleBackLogin} onLogin={handleLogin} onSwitchToSignUp={() => setShowSignUp(true)} />
          :
          <SignUp handleBackLogin={handleBackLogin} onSignUp={handleSignUp} onSwitchToLogin={() => setShowSignUp(false)} />
          )
      
      }

        

      {/* Show login screen when user needs to login */}
      {/* {showLogin && <Login onLogin={handleLogin} onSwitchToSignUp={() => setShowSignUp(true)} />} */}
      
      {/* Show sign-up screen */}
      {/* {showSignUp && <SignUp onSignUp={handleSignUp} onSwitchToLogin={() => setShowSignUp(false)} />} */}


      </div>
      {/* // {isOrderHistoryView && <OrderHistory orders={orders} />} */}
    </div>
  );
};

export default App;
