import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { ShoppingBag, ArrowRight, X, Filter } from 'lucide-react';
import { useLocation, useNavigate } from "react-router";
import { Button, Modal } from 'react-bootstrap';
import ImageCarousel from "./ImageCarousel";
import BlogPage from "../navbar/BlogPage";
import HomePage from "../navbar/HomePage";
import AboutUs from "../navbar/AboutUs";
import ContactUs from "../navbar/ContactUs";
import ProductsList from "../products/ProductList";
import Footer from "../footer/Footer";
import ApplyFilter from "./ApplyFilter";
import { BASE_URL } from "../helpers/Contants";
import { apiRequest, getUserId } from "../helpers/helper";
import ProductForm from "../products/ProductForm";
import { getUnit } from "@mui/material/styles/cssUtils";

const Dashboard = () => {
  let navigate = useNavigate();
  const location = useLocation();
  const isMoveFromLogin = location.state?.isMoveFromLogin;
  const isLoggedIn = localStorage.getItem('isLoggedIn');
  const userDetails = JSON.parse(localStorage.getItem('userDetails'));

  const existingCompareProducts =  JSON.parse(localStorage.getItem("compareProducts")) || [];
  const [compareProducts, setCompareProducts] = useState(existingCompareProducts);
  const [cartCountAndTotalDetails, setCartCountAndTotalDetails] = useState();
  const [bannerVisible, setBannerVisible] = useState(true);
  const [position, setPosition] = useState({ left: 0 });
  const [direction, setDirection] = useState(1);
  const [activePage, setActivePage] = useState("home");
  const [isBannerHovered, setIsBannerHovered] = useState(false);

  const [showDropdown, setShowDropdown] = useState(null);
  const [showSubList, setShowSubList] = useState(null);
  const [showSubSubList, setShowSubSubList] = useState(null);
  const [showFilter, setShowFilter] = useState(null);
  const [categories, setCategories] = useState();
  const [wishlistCount, setWishlistCount] = useState()
  const [isCallWishListCount, setIsCallWishListCount] = useState()
  const [isCallCountAndTotal, setIsCallCountAndTotal] = useState()

  const [listCategoryId, setListCategoryId] = useState();
  const [listSubCategoryId, setListSubCategoryId] = useState();
  const [listSubSubCategoryId, setListSubSubCategoryId] = useState();

  const [showForm, setShowForm] = useState(false);

  const handleAddProduct = (product) => {
    // setSelectedProduct(product);
    setShowForm(true);
};



const handleAddProductClose = () => setShowForm(false);

  
  const imageArray = [
    "https://media.istockphoto.com/id/1073935306/photo/girls-carrying-shopping-bags.jpg?s=612x612&w=0&k=20&c=JB-TrME32dc0VTnaXVxsbJIExZqR71m-iyVOnG-7puM=",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2YKU5V7C8fjG0iwoz35nINJLUF_FUjsp_wA&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgVXR1Wv0Lp7MnqQZhVG31loyvR-S4oUn9Qg&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfjgYH8jUc0T5Uvo8GieVuurmk_RcraPouUg&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOJsZLnqyrrziFFucvdYwRGbVE5LqGLnim5g&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3ES43H1DtBA5Bt1VqxNeiX031BX6q1eTmxA&s"
  ];


  const [searchQuery, setSearchQuery] = useState("");
 
  useEffect(() => {
    const fetchCartTotal = async () => {

      try{
        const cartCountAndTotal = await apiRequest(BASE_URL + "cart/user/specific/"+getUserId(), "GET");
        if(cartCountAndTotal){
          setCartCountAndTotalDetails(cartCountAndTotal);

        }


      }catch(e){
        console.log('Blog error: ', e)
      }finally{
        setIsCallCountAndTotal(false)
      }
    };

    fetchCartTotal();
  }, [isCallCountAndTotal]);

  useEffect(() => {
    const fetchCategory = async () => {

      try{
        const category = await apiRequest(BASE_URL + "categories/dropdown", "GET");
        if(category){
          setCategories(category);

        }


      }catch(e){
        console.log('Blog error: ', e)
      }
    };


    fetchCategory();
  }, []);


  useEffect(() => {

    const fetchWishListCount = async () => {
      try{
        const count = await apiRequest(BASE_URL + "wishlist/count/"+getUserId(), "GET");
        setWishlistCount(count);
        
      }catch(e){
        console.log('Blog error: ', e)
      }finally{
        setIsCallWishListCount(false)
      }
    };
    fetchWishListCount();

  
  }, [isCallWishListCount]);

  const [maxProducts, setMaxProducts] = useState();
   
  const lowerCaseQuery = searchQuery.toString().toLowerCase();

  const filteredProducts = maxProducts && maxProducts?.length &&maxProducts.filter((product) => {
    return (
      product.name?.toLowerCase().includes(lowerCaseQuery) ||
      product.productCode?.toString().includes(lowerCaseQuery) ||
      product.size?.toLowerCase().includes(lowerCaseQuery) ||
      product.color?.toLowerCase().includes(lowerCaseQuery) ||
      product.price?.toString().includes(lowerCaseQuery)
    );
  });


  useEffect(() => {
    if (isBannerHovered) return;

    const moveBanner = setInterval(() => {
      setPosition((prev) => {
        let newLeft = prev.left + direction * 1.5;

        if (newLeft <= 0) {
          setDirection(1);
        } else if (newLeft >= 80) {
          setDirection(-1);
        }

        return { left: newLeft };
      });
    }, 50);

    return () => clearInterval(moveBanner);
  }, [direction, isBannerHovered]);

  const handleCart = () => {
    navigate("/shoppingCart");
  };

  const handleMoveToWishlist = () => {
    navigate("/wishlist");
  };

  const handleOrderHistory = () => {
    navigate("/orderHistory")
  }

  const handleFilter = () => {
    // navigate("/filters")
    setShowFilter(true);
  }

  const handleClose = () => {
    setShowFilter(false); // Close the ApplyFilter component
  };

  const handleApply = async (filter) => {
    console.log("Filters applied!", filter);
    try{
     
      const product = await apiRequest(
        `${BASE_URL}products/filter?` +
        `${filter?.priceRange?.min ? `minPrice=${filter.priceRange.min}&` : ''}` +
        `${filter?.priceRange?.max ? `maxPrice=${filter.priceRange.max}&` : ''}` +
        `${filter?.branch ? `brancd=${filter.branch}&` : ''}` +
        `${filter?.color ? `color=${filter.color}&` : ''}` +
        `${filter?.price ? `price=${filter.price}&` : ''}` +
        `${filter?.size ? `size=${filter.size}&` : ''}` +
        `${listSubCategoryId ? `subCategoryItemId=${listSubCategoryId}` : ''}` 
        
        ,
        "GET"
    );
      setMaxProducts(product)
    

    }catch(e){
      console.log(' error: ', e)
    }finally{
      setShowFilter(false); // Close after applying filters

    }
  };

  const handleClearFilter =async () => {
    try{
     handleCategoryClick(listCategoryId, listSubCategoryId, listSubSubCategoryId)
    

    }catch(e){
      console.log(' error: ', e)
    }finally{
      setShowFilter(false); // Close after applying filters

    }
  }

  const handleCategoryClick =async (genderId, categoryId, subCategoryId) => {
    // console.log('Gender ID:', genderId);
    // console.log('Category ID:', categoryId);
    // console.log('SubCategory ID:', subCategoryId);
    setActivePage('category')

    setListCategoryId(genderId);
    setListSubCategoryId(categoryId);
    setListSubSubCategoryId(subCategoryId);
    
    // Example: Navigate or fetch data based on the selection
    if (subCategoryId) {
      console.log(`Navigating to subcategory: ${subCategoryId}`);
    } else if (categoryId) {
      console.log(`Navigating to category: ${categoryId}`);
    } else {
      console.log(`Navigating to gender: ${genderId}`);
    }
    try{
      let category;
      if(subCategoryId){
        category = await apiRequest(BASE_URL + `products/by-category-subcategory-subcategory-item?categoryId=${genderId}&subCategoryId=${categoryId}&subCategoryItemId=${subCategoryId}`, "GET");

      }else{
        category = await apiRequest(BASE_URL + `products/by-category-subcategory?categoryId=${genderId}&subCategoryId=${categoryId}`, "GET");

      }
      if(category && category?.length){
        setMaxProducts(category);
        // setCategories(category);

      }else{
        setMaxProducts([]);
      }


    }catch(e){
      console.log('Blog error: ', e)
    }
  
  };
  const handleSave = async (updatedProduct) => {
    console.log('add product:', updatedProduct);
    try{
      let payload= {
        
          name:updatedProduct?.name,
          description: updatedProduct?.description,
          price: updatedProduct?.price,
          stock: updatedProduct?.stock,
          brand: updatedProduct?.brand,
          imageUrl: updatedProduct?.imageUrl || updatedProduct?.image,
          color: updatedProduct?.color,
          size: updatedProduct?.size,
          subCategoryItemId:updatedProduct?.subCategoryItem?.id || listSubCategoryId,
      
      }
          const wishlistData = await apiRequest(BASE_URL + "products/", "POST", payload);
          if(wishlistData?.name){
            handleCategoryClick(listCategoryId, listSubCategoryId, listSubSubCategoryId)
          }
          // setProductData([wishlistData])
        }catch(e){
          console.log(' error: ', e)
        }
    setShowForm(false);
  };
  const handleLogout = () => {
    localStorage.clear();
    navigate('/')

  }

  const handleLogin = () => {
    navigate('/dashboard')

  }

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between align-items-center py-2 border-bottom">
        {isLoggedIn ? <div>
          <span> {userDetails ? `${userDetails.email} | ${userDetails?.mobileNumber}` : ''}</span>
        </div>:
        <>{"\u00A0"}</>}
        <div>
          {isLoggedIn ? <button className="btn btn-light mx-2" onClick={handleLogout}>Logout</button> : <></>}
          <button className="btn btn-light mx-2" onClick={() => handleMoveToWishlist()}>Wishlist{wishlistCount?.count>0?"("+wishlistCount?.count+")":'' }</button>
          <button
            className="btn btn-light mx-2"
            onClick={() => navigate('/comparelist')}
          >
            Compare { compareProducts?.length > 0 ? '('+ (compareProducts?.length)+')' : ''}
          </button>
          <button className="btn btn-light mx-2" onClick={() => handleOrderHistory()}>Order History</button>
        </div>
      </div>

      <div className="d-flex justify-content-between align-items-center py-3">
        <h1 className="logo mt-2">Shop</h1>
        {activePage == 'category' &&  <>
          {userDetails?.role == 'admin' &&<Button variant="success" onClick={handleAddProduct}><span>Add Product</span></Button>}
          <input
            type="text"
            className="form-control w-30 mx-3 mt-2"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <span className="bg-danger p-2 rounded d-flex" onClick={handleFilter} style={{color: 'white'}}>
            <Filter className="text-white" size={20} /> Filter
          </span>
          {showFilter && (
            <ApplyFilter show={showFilter} onClose={handleClose} onApply={handleApply} handleClearFilter={handleClearFilter}/>
          )}
        </>}
        
        <div className="d-flex">
          <button
            className=" btn btn-light mx-2 d-flex align-items-center mx-2 "
            onClick={() => handleCart()}
            style={{minWidth: "15rem", maxWidth: '20rem'}}
          >
            <span className="bg-danger p-2 rounded">
              <ShoppingBag className="text-white" size={20} />
            </span>
            {cartCountAndTotalDetails?.count &&<>
            <span className="text-dark mx-2">{cartCountAndTotalDetails?.count} item(s)/</span>
            <span className="text-danger fw-semibold">${cartCountAndTotalDetails?.finalPrice || cartCountAndTotalDetails?.totalPrice}</span>
            </>}
            
            <ArrowRight className="text-secondary ms-2" size={20} />
          </button>
        </div>
      </div>

      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <ul className="navbar-nav">
            <li className="nav-item">
              <button className="nav-link text-white" onClick={() =>
setActivePage("home")}>Home</button>
            </li>
            {categories && categories?.map((gender) => (
              <li
                key={gender?.id}
                className="nav-item position-relative"
                onMouseEnter={() => setShowDropdown(gender.id)}
                onMouseLeave={() => setShowDropdown(null)}
              >
                <button
                  className="nav-link text-white d-flex align-items-center"
                  onClick={() => setShowDropdown(showDropdown === gender?.id ? null : gender?.id)}
                >
                  {gender?.name} <span className="ms-1">▼</span>
                </button>
                {showDropdown === gender?.id && (
                  <div
                    className="dropdown-menu show position-absolute bg-black text-white"
                    style={{ top: '100%', left: 0 }}
                  >
                    {gender?.subCategories && gender?.subCategories.map((category) => (
                      <div
                        key={category?.id}
                        className="dropdown-item position-relative"
                        onMouseEnter={() => setShowSubList(category?.id)}
                        onMouseLeave={() => setShowSubList(null)}
                        onClick={() => handleCategoryClick(gender?.id, category?.id, null)}
                        style={{
                          backgroundColor: showSubList === category?.id ? 'red' : 'transparent',
                          color: 'white',
                          display: 'flex',
                          justifyContent: 'space-between',
                          cursor: 'pointer'
                        }}
                      >
                        <span>{category?.name}</span>{category?.subCategoryItems.length>0 && <span className="ms-1">▶</span>}
                        {category?.subCategoryItems.length>0 && showSubList === category?.id && (
                          <div
                            className="position-absolute start-100 top-0 bg-black text-white border p-2"
                            style={{ minWidth: '12rem', maxWidth: '15rem' }}
                          >
                            {category?.subCategoryItems && category?.subCategoryItems.map((item) => (
                              <p 
                                key={item.id}
                                className="mb-1"
                                style={{ backgroundColor: showSubSubList === item.id ? 'red' : 'transparent' }}
                                onMouseEnter={() => setShowSubSubList(item.id)}
                                onMouseLeave={() => setShowSubSubList(null)}
                                onClick={() => handleCategoryClick(gender.id, category.id, item.id)}
                              >
                                {item.name}
                              </p>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </li>
            ))};

            <li className="nav-item">
              <button className="nav-link text-white" onClick={() => setActivePage("blog")}>Blog</button>
            </li>
            <li className="nav-item">
              <button className="nav-link text-white" onClick={() => setActivePage("contactus")}>Contact Us</button>
            </li>
            <li className="nav-item">
              <button className="nav-link text-white" onClick={() => setActivePage("aboutus")}>About Us</button>
            </li>
          </ul>
        </div>
      </nav>

      <main className="p-3 row g-4">
       {/* {isMoveFromLogin && bannerVisible && (
          <div
            className="position-absolute p-4 rounded shadow z-3"
            style={{
              top: '40%',
              left: `${position.left}%`,
              transform: 'translateY(-50%)',
              transition: 'left 0.5s linear',
              width: '20%',
              background: "rgb(50, 205, 50)"
            }}
            onMouseEnter={() => setIsBannerHovered(true)}
            onMouseLeave={() => setIsBannerHovered(false)}
          >
            <Button variant="link" className="position-absolute top-0 end-0" onClick={() => setBannerVisible(false)}>
              <X size={24} />
            </Button>
            <h1 className="fs-3 fw-bold">NEW STOCK AVAILABLE !!</h1>
            <p>Modern design, Multiple sizes, High quality.</p>
            <p className="mt-3" style={{textDecoration: "underline"}}>Grab Now !!</p>
          </div>
        )} */}

        <div className="col-12">
          {activePage === "home" && <HomePage />}
          {activePage === "blog" && <BlogPage />}
          {activePage === "aboutus" && <AboutUs />}
          {activePage === "contactus" && <ContactUs />}
          {activePage === "category" && <ProductsList setIsCallCountAndTotal={setIsCallCountAndTotal} 
          setIsCallWishListCount= {setIsCallWishListCount} setActivePage={setActivePage} 
          setCompareProducts={setCompareProducts} key={searchQuery} products={filteredProducts}
          handleCategoryClick={handleCategoryClick}
          listCategoryId={listCategoryId}
          listSubCategoryId={listSubCategoryId}
          listSubSubCategoryId={listSubSubCategoryId}
           />} 


        </div>
      </main>
        <div>
          <Footer/>
        </div>
       {showForm && <Modal
                show={showForm} 
                onHide={handleAddProductClose} 
                centered 
                size="xl"
                dialogClassName="fullscreen-modal"
            >
                <Modal.Body>
                    <div className="p-4 bg-light rounded">
                        <ProductForm
                            // product={selectedProduct} 
                            onSave={handleSave}
                            isAdd={true}
                        />
                        <Button variant="secondary" onClick={handleAddProductClose} className="mt-3">
                            Close
                        </Button>
                    </div>
                </Modal.Body>
            </Modal>}
    </div>
  );
};

export default Dashboard;
