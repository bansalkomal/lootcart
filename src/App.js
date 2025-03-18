import logo from './logo.svg';
import './App.css';
import Dashboard from './components/dashboard/Dashboard';
import Login from './components/auth/Login';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ShoppingCart from './components/cart/ShoppingCart';
import OrderComplete from './components/cart/OrderComplete';
// import OrderStepper from './components/helpers/OrderStepper';
import Stepper from './components/helpers/Stepper';
import CheckoutDetials from './components/cart/CheckoutDetails';
import Wishlist from './components/wishList/Wishlist';
import BlogPage from './components/navbar/BlogPage';
import CompareList from './components/comparelist/CompareList';
import OrderHistory from './components/orderHistory/OrderHistory';
import ProductList from './components/ProductList';
import ProductDetails from './components/products/ProductDetails';
import { PageProvider } from './components/helpers/PageContext';
import NewsPage from './components/footer/NewsPage';
import ProductForm from './components/products/ProductForm';
import ApplyFilter from './components/dashboard/ApplyFilter';
import ProtectedRoute from './ProtectedRoute';

function App() {
  return (
    // <PageProvider>

    
    <div className="App">
           
      <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<Login />}> */}
          <Route index 
          // element={<Login />}
          element={
            localStorage.getItem('isLoggedIn') === true 
              ? <Navigate to="/dashboard" replace /> 
              : <Login />
          } 
           />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/shoppingCart" 
          element={
            <ProtectedRoute>
          <ShoppingCart />

            </ProtectedRoute>
          } />
          <Route path="/orderComplete" element={<OrderComplete />} />
          <Route path="/checkoutDetails" element={<CheckoutDetials />} />

          {/* <Route path="/orderStepper" element={<OrderStepper />} /> */}
          <Route path="/stepper" element={<Stepper />} />
          <Route path="/wishlist" 
          element={
            <ProtectedRoute>
              <Wishlist />

            </ProtectedRoute>
          } />
          <Route path="/blogpage" element={<BlogPage />} />
          <Route path="/comparelist" element={<CompareList />} />
          <Route path="/orderHistory" 
          element={
            <ProtectedRoute>
          <OrderHistory />

            </ProtectedRoute>
          } />
          <Route path={`/product/:id`}element={<ProductDetails />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/add-product" element={<ProductForm onSave={(product) => console.log('Product added:', product)} />} />
          <Route path="/update-product/:id" element={<ProductForm onSave={(product) => console.log('Product updated:', product)} />} />
          <Route path="/filters" element={<ApplyFilter />} />
          

          {/* <Route path="*" element={<NoPage />} /> */}
        {/* </Route> */}
      </Routes>
    </BrowserRouter>
    </div>
    // {/* </Pag.eProvider> */}
  );
}

export default App;