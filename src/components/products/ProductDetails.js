import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { ShoppingCart, ArrowLeft } from 'lucide-react';
import { Button, Modal, Form } from 'react-bootstrap';
import { usePage } from '../helpers/PageContext';
import "../../assets/styles/productDetails.css";
import { apiRequest, getUserId } from '../helpers/helper';
import { BASE_URL } from '../helpers/Contants';

const ProductDetails = ({ productstry }) => {
    let navigate = useNavigate();
    const location = useLocation();
    const { id } = useParams();
    const [zoomStyle, setZoomStyle] = useState({});
    const [inStock, setInStock] = useState(true); // Add state for stock status
    const [showReviewModal, setShowReviewModal] = useState(false); // State to manage review modal visibility
    const [product, setProduct] = useState();
    const [isChange, setIsChange] = useState();
    // let products = productstry;

    const [rating, setRating] = useState(0);
    const [reviewText, setReviewText] = useState('');
    
    // const handleReviewSubmit = (e) => {
    //     e.preventDefault();
    //     console.log('Review Text:', reviewText);
    //     console.log('Rating:', rating);
        
    //     // Submit logic here (e.g., API call)
    // };

    // if(!products){
    //     products = [{
    //         id: id,
    //         name: `Product ${id}`,
    //         price: (Math.random() * 100).toFixed(2),
    //         image:  "https://media.istockphoto.com/id/1073935306/photo/girls-carrying-shopping-bags.jpg?s=612x612&w=0&k=20&c=JB-TrME32dc0VTnaXVxsbJIExZqR71m-iyVOnG-7puM=",
    //         size: "L",
    //         color: "Red",
    //         productCode: `12345678${id}`,
    //         inStock: Math.random() > 0.5 // Randomly set stock status for demo purposes
    //       }]
    // }

    // const product = products && products.find(p => p.id == parseInt(id));
    useEffect(() => {
        const fetchDetails = async () => {
    
          try{
            const details = await apiRequest(BASE_URL + "products/" + id, "GET");
            setProduct(details);
            setIsChange(false)
          }catch(e){
            console.log('Blog error: ', e)
          }
        };
    
        fetchDetails();
      }, [isChange]);

    if (!product) {
        return <div>Product not found</div>;
    }

    const handleMoveToHome = () => {
        navigate("/dashboard");
    };

    // const handleMouseMove = (e) => {
    //     const { left, top, width, height } = e.target.getBoundingClientRect();
    //     const lensSize = 150;
    //     const x = e.pageX - left - lensSize / 2;
    //     const y = e.pageY - top - lensSize / 2;
    //     const backgroundX = ((e.pageX - left) / width) * 100;
    //     const backgroundY = ((e.pageY - top) / height) * 100;
    //     setZoomStyle({
    //         left: `${x}px`,
    //         top: `${y}px`,
    //         backgroundPosition: `${backgroundX}% ${backgroundY}%`,
    //         backgroundImage: `url(${product.image})`,
    //         display: 'block',
    //     });
    // };

    const handleMouseMove = (e) => {
        const { left, top, width, height } = e.target.getBoundingClientRect();
        const lensSize = 150;
        const x = e.pageX - left - lensSize / 2;
        const y = e.pageY - top - lensSize / 2;
        const backgroundX = ((e.pageX - left) / width) * 100;
        const backgroundY = ((e.pageY - top) / height) * 100;
        
        setZoomStyle({
            left: `${x}px`,
            top: `${y}px`,
            width: `${lensSize}px`,
            height: `${lensSize}px`,
            backgroundImage: `url(${product.imageUrl})`,
            backgroundPosition: `${backgroundX}% ${backgroundY}%`,
            backgroundSize: "200%", // Zoom factor
            backgroundRepeat: "no-repeat",
            display: 'block',
        });
    };
    

    const handleMouseLeave = () => {
        setZoomStyle({ display: 'none' });
    };

    const handleShowReviewModal = () => {
        setShowReviewModal(true);
    };

    const handleCloseReviewModal = () => {
        setShowReviewModal(false);
        
    };

    const handleReviewSubmit = async (e) => {
        e.preventDefault();
        // Handle review submission logic here
        try{
            let payload = {
                rating: rating,
                comment: reviewText,
            }
            const review = await apiRequest(BASE_URL +  `reviews/add?productId=${id}&userId=1` , "POST", payload);
            if(review){
                setIsChange(true)
            }
            // setProduct(details);
        }catch(e){
            console.log('error', e)
        }
        handleCloseReviewModal();
    };

    const moveToCart = async (item) => {
        // console.log("Move to Cart: ", item);
        try{
          let payload = [{
            id:item,
            quantity: 1,
            isAdd: "true",
          }];
          const wishlistData = await apiRequest(BASE_URL + "cart/create/"+getUserId(), "POST", payload);
          if(wishlistData && wishlistData?.cartItems?.length > 0){
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
    

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="d-flex align-items-center pb-2">
                    <button className="btn btn-light me-3 back-btn" onClick={handleMoveToHome}>
                        <ArrowLeft size={20} /> Back
                    </button>
                    <h1 className="text-center flex-grow-1 mb-1">{product.name}</h1>
                </div>
                <div className="col-md-12 text-center mb-3">
                    {/* <span style={{ color: product.inStock ? 'green' : 'red' }}>
                        <span className={`dot ${product.inStock ? 'dot-green' : 'dot-red'}`}></span>
                        Availability: {product.inStock ? 'In Stock' : 'Out of Stock'}
                    </span> */}
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
                </div>
                <div className="col-md-6">
                    <div
                        className="img-zoom-container"
                        onMouseMove={handleMouseMove}
                        onMouseLeave={handleMouseLeave}
                    >
                        <img src={product.imageUrl} className="img-fluid" alt={product.name} />
                        <div className="img-zoom-lens" style={zoomStyle}></div>
                    </div>
                </div>
                <div className="col-md-6">
                    <p className="text-muted">Product Brand: {product?.brand}</p>

                    <p className="text-muted">Product Code: {product?.productCode}</p>
                    <p className="text-muted">Category: {product?.subCategoryItem?.name}</p>
                    <h2>${product?.price}</h2>
                    <p className="text-muted"><del>${(product?.price * 1.2).toFixed(2)}</del></p>
                    <p>{product?.description}</p>
                    <div className="d-flex align-items-center mb-3">
                        <span className="me-2">Color: {product?.color}</span>
                        {/* <div className="d-flex">
                            <div className="color-box bg-white me-2"></div>
                            <div className="color-box bg-black me-2"></div>
                            <div className="color-box bg-red me-2"></div>
                            <div className="color-box bg-blue me-2"></div>
                            <div className="color-box bg-yellow me-2"></div>
                        </div> */}
                    </div>
                    <div className="d-flex align-items-center mb-3">
                        <span className="me-2">Size: {product?.size}</span>
                        {/* <div className="d-flex">
                            <button className="btn btn-outline-secondary me-2">S</button>
                            <button className="btn btn-outline-secondary me-2">M</button>
                            <button className="btn btn-outline-secondary me-2">L</button>
                            <button className="btn btn-outline-secondary me-2">XL</button>
                        </div> */}
                    </div>
                    <div className="d-flex align-items-center">
                        <Button variant="primary" className="d-flex align-items-center me-2" onClick={() => moveToCart(product?.id)}>
                            <ShoppingCart size={16} className="me-2" /> Add to Cart
                        </Button>
                        <Button variant="secondary" onClick={handleShowReviewModal}>
                            Add Review
                        </Button>
                    </div>
                </div>
            </div>
            <div className="row mt-5">
                <div className="col-md-12">
                    <div>
                        <ul className="nav nav-tabs" id="myTab" role="tablist">
                            <li className="nav-item" role="presentation">
                                <button
                                    className="nav-link active"
                                    id="description-tab"
                                    data-bs-toggle="tab"
                                    data-bs-target="#description"
                                    type="button"
                                    role="tab"
                                    aria-controls="description"
                                    aria-selected="true"
                                >
                                    Description
                                </button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button
                                    className="nav-link"
                                    id="additional-info-tab"
                                    data-bs-toggle="tab"
                                    data-bs-target="#additional-info"
                                    type="button"
                                    role="tab"
                                    aria-controls="additional-info"
                                    aria-selected="false"
                                >
                                    Additional Info
                                </button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button
                                    className="nav-link"
                                    id="reviews-tab"
                                    data-bs-toggle="tab"
                                    data-bs-target="#reviews"
                                    type="button"
                                    role="tab"
                                    aria-controls="reviews"
                                    aria-selected="false"
                                >
                                    Reviews
                                </button>
                            </li>
                        </ul>
                        <div className="tab-content" id="myTabContent">
                            <div
                                className="tab-pane fade show active"
                                id="description"
                                role="tabpanel"
                                aria-labelledby="description-tab"
                            >
                                <p className="mt-3">
                                    {product.description || "This is a high-quality product made with precision and care. It is designed to offer the best performance and durability."}
                                </p>
                                <ul>
                                    <li>✅ High-quality materials</li>
                                    <li>✅ Long-lasting performance</li>
                                    <li>✅ 1-year warranty included</li>
                                </ul>
                            </div>
                            <div
                                className="tab-pane fade"
                                id="additional-info"
                                role="tabpanel"
                                aria-labelledby="additional-info-tab"
                            >
                                <p className="mt-3">
                                    Here are some additional details about the product:
                                </p>
                                <ul>
                                    <li>📏 Dimensions: 12 x 8 x 4 inches</li>
                                    <li>⚖️ Weight: 1.5 kg</li>
                                    <li>🎨 Available Colors: Red, Blue, Black</li>
                                    <li>📦 Shipping: Free shipping worldwide</li>
                                </ul>
                            </div>
                            {/* <div
                                className="tab-pane fade"
                                id="reviews"
                                role="tabpanel"
                                aria-labelledby="reviews-tab"
                            >
                                <p className="mt-3">
                                    Here's what customers are saying:
                                </p>
                                <div className="mb-3">
                                    ⭐⭐⭐⭐⭐ "Absolutely love this product! It exceeded my expectations." - Jane D.
                                </div>
                                <div className="mb-3">
                                    ⭐⭐⭐⭐ "Good value for the price, works as advertised." - Mark T.
                                </div>
                                <div className="mb-3">
                                    ⭐⭐⭐ "It's okay, but I had some minor issues with delivery." - Sarah L.
                                </div>
                            </div> */}
                            <div
    className="tab-pane fade"
    id="reviews"
    role="tabpanel"
    aria-labelledby="reviews-tab"
>
    <p className="mt-3">Here's what customers are saying:</p>
    
    {product?.reviews.length > 0 ? (
        product?.reviews.map((review) => (
            <div key={review.id} className="mb-3">
                <div>
                    {/* Render Stars */}
                    {Array.from({ length: 5 }, (_, i) => (
                        <span key={i} style={{ color: i < review.rating ? '#FFD700' : '#ccc' }}>
                            ★
                        </span>
                    ))}
                </div>
                <div className="mt-1">
                    "{review.comment}"
                </div>
                <div style={{ fontSize: '0.8rem', color: '#666' }}>
                    {new Date(review.reviewDate).toLocaleDateString()}
                </div>
                {<hr className="my-2" style={{ borderWidth: "2px", borderColor: 'black' }} />}

            </div>
        ))
    ) : (
        <p>No reviews yet.</p>
    )}
</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Review Modal */}
            <Modal show={showReviewModal} onHide={handleCloseReviewModal}>
    <Modal.Header closeButton>
        <Modal.Title>Add Review</Modal.Title>
    </Modal.Header>
    <Modal.Body>
        <Form onSubmit={handleReviewSubmit}>
            <Form.Group className="mb-3" controlId="reviewText">
                <Form.Label>Review</Form.Label>
                <Form.Control 
                    as="textarea" 
                    rows={3} 
                    required 
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="rating">
                <Form.Label>Rating (0-5)</Form.Label>
                <Form.Select 
                    value={rating} 
                    onChange={(e) => setRating(Number(e.target.value))} 
                    required
                >
                    <option value="">Select Rating</option>
                    {[0, 1, 2, 3, 4, 5].map((r) => (
                        <option key={r} value={r}>{r}</option>
                    ))}
                </Form.Select>
            </Form.Group>

            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    </Modal.Body>
</Modal>

        </div>
    );
};

export default ProductDetails;