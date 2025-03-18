import React, { useState } from 'react';
import { Navbar, Nav, Form, FormControl, Button, Modal, Row, Col } from 'react-bootstrap';
import { FaShoppingCart, FaArrowLeft } from 'react-icons/fa';
import './Header.css';

const Header = ({ 
  cartCount, 
  toggleCartView, 
  isCartView, 
  handleSearch,
  onSearch, 
  onApplyFilters,
  toggleOrderHistoryView,
  handleRefresh,
  isOrderHistoryView,
  handleLogout,
  isLoggedIn,
  toggleLoginView,

 }) => {
  const [searchText, setSearchText] = useState('');
  const [showFilterPanel, setShowFilterPanel] = useState(false);
  const [filters, setFilters] = useState({
    availability: 'all',
    priceRange: [0, 500], // Default price range (min: 0, max: 500)
    rating: '',
    color: '',
    brand: ''
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  const applyFilters = () => {
    onApplyFilters(filters);
    setShowFilterPanel(false);
  };

  const clearFilters = () => {
    const defaultFilters = {
      availability: 'all',
      priceRange: [0, 500], // Reset to default price range
      rating: '',
      color: '',
      brand: ''
    };
    setFilters(defaultFilters);
    onApplyFilters(defaultFilters);
    setShowFilterPanel(false); // Close the filter panel
  };

   // Handle both min and max price slider changes
   const handleMinPriceChange = (e) => {
    const minPrice = parseInt(e.target.value, 10);
    if (minPrice <= filters.priceRange[1]) { // Ensure min doesn't exceed max
      setFilters({ ...filters, priceRange: [minPrice, filters.priceRange[1]] });
    }
  };

  const handleMaxPriceChange = (e) => {
    const maxPrice = parseInt(e.target.value, 10);
    if (maxPrice >= filters.priceRange[0]) { // Ensure max doesn't go below min
      setFilters({ ...filters, priceRange: [filters.priceRange[0], maxPrice] });
    }
  };

  const handleInputChange = (e) => {
    setSearchText(e.target.value);
    handleSearch(e.target.value);
  };

  return (
    <>
    <Navbar bg="light" expand="lg" className="mb-4 px-4" style={{display: 'flex', justifyContent:'space-between'}}>
      <Navbar.Brand href="#home" onClick={handleRefresh}>MyWebsite</Navbar.Brand>
      <Nav className="ml-auto">
        {!isCartView && !isOrderHistoryView && (
          <Form inline className="mr-3 mx-2">
            <FormControl
              type="text"
              placeholder="Search Products"
              className="mr-sm-2"
              value={searchText}
              onChange={handleInputChange}
            />

            
          </Form>
        )}

        {/* Filter Button */}
        {!isCartView && !isOrderHistoryView && (

          <Button className="mr-3" variant="secondary" onClick={() => setShowFilterPanel(!showFilterPanel)}>
            Filter
          </Button>
        )}
        {!isCartView && isLoggedIn &&
          <Button className="mr-0 mx-2" variant="secondary" onClick={toggleOrderHistoryView}>
            Order History
          </Button>
          

        }
        {isCartView ? (
          <Button variant="outline-primary" onClick={toggleCartView}>
            <FaArrowLeft /> Back
          </Button>
        ) : (
          <Button variant="outline-primary" className={`${isLoggedIn ? "" : 'mx-2'}`} onClick={toggleCartView}>
            <FaShoppingCart /> Cart ({cartCount})
          </Button>
        )}
      </Nav>
      <Nav className="ml-auto">
        {!isLoggedIn ? (
          <Button variant="outline-primary" onClick={() => toggleLoginView(false)}>
            Login
          </Button>
        ) : (
          <Button variant="outline-danger" onClick={handleLogout}>
            Logout
          </Button>
        )}
      </Nav>

       {/* Filter Modal */}
      
      
    </Navbar>

    {/* Sliding Filter Panel */}
    {showFilterPanel &&
       <div className={`filter-panel ${showFilterPanel ? 'open' : ''}`}>
       <div className="filter-content p-3">
         <h5>Filter Products</h5>
         <Form>
           {/* Availability */}
           <Form.Group as={Row}>
             <Form.Label column sm={4}>Availability</Form.Label>
             <Col sm={8}>
               <Form.Control as="select" name="availability" value={filters.availability} onChange={handleFilterChange}>
                 <option value="all">All</option>
                 <option value="inStock">In Stock</option>
                 <option value="outOfStock">Out of Stock</option>
               </Form.Control>
             </Col>
           </Form.Group>

           {/* Price Range (Min and Max Sliders) */}
           <Form.Group as={Row}>
             <Form.Label column sm={4}>Price Range</Form.Label>
             <Col sm={4}>
               <input
                 type="range"
                 className="form-range"
                 min="0"
                 max="500"
                 value={filters.priceRange[0]}
                 onChange={handleMinPriceChange}
               />
               <div className="d-flex justify-content-between">
                 <span>Min: ${filters.priceRange[0]}</span>
               </div>
             </Col>
             <Col sm={4}>
               <input
                 type="range"
                 className="form-range"
                 min="0"
                 max="500"
                 value={filters.priceRange[1]}
                 onChange={handleMaxPriceChange}
               />
               <div className="d-flex justify-content-between">
                 <span>Max: ${filters.priceRange[1]}</span>
               </div>
             </Col>
           </Form.Group>

           {/* Rating */}
           <Form.Group as={Row}>
             <Form.Label column sm={4}>Rating</Form.Label>
             <Col sm={8}>
               <Form.Control as="select" name="rating" value={filters.rating} onChange={handleFilterChange}>
                 <option value="">All</option>
                 <option value="1">1 and up</option>
                 <option value="2">2 and up</option>
                 <option value="3">3 and up</option>
                 <option value="4">4 and up</option>
                 <option value="5">5 stars</option>
               </Form.Control>
             </Col>
           </Form.Group>

           {/* Color */}
           <Form.Group as={Row}>
             <Form.Label column sm={4}>Color</Form.Label>
             <Col sm={8}>
               <Form.Control
                 type="text"
                 placeholder="Color"
                 name="color"
                 value={filters.color}
                 onChange={handleFilterChange}
               />
             </Col>
           </Form.Group>

           {/* Brand */}
           <Form.Group as={Row}>
             <Form.Label column sm={4}>Brand</Form.Label>
             <Col sm={8}>
               <Form.Control
                 type="text"
                 placeholder="Brand"
                 name="brand"
                 value={filters.brand}
                 onChange={handleFilterChange}
               />
             </Col>
           </Form.Group>
         </Form>

         {/* Apply and Clear Filter Buttons */}
         <div className="d-flex justify-content-between mt-3">
           <Button variant="primary" onClick={applyFilters}>
             Apply Filters
           </Button>
           <Button variant="danger" onClick={clearFilters}>
             Clear Filters
           </Button>
         </div>

         {/* Close Filter Panel */}
         <Button variant="secondary" className="mt-3" onClick={() => setShowFilterPanel(false)}>
           Close
         </Button>
       </div>
     </div>
      }
    </>
  );
};

export default Header;
