import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../assets/styles/stepper.css";
import "../../assets/styles/common.css";
import OrderComplete from "../cart/OrderComplete";
import BillingShippingForm from "../cart/BillingShippingForm";
import CheckoutDetials from "../cart/CheckoutDetails";
import { useNavigate } from "react-router";
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { apiRequest, getUserId } from "../helpers/helper";
import { BASE_URL } from "../helpers/Contants";

const steps = [
  "CHECKOUT OPTION",
  "BILLING & SHIPPING",
  "PAYMENT METHOD",
  "ORDER COMPLETE",
];

const stepsHeader = [
  "CHECKOUT PRODUCTS",
  "BILLING & SHIPPING DETAILS",
  "PAYMENT METHOD",
  "ORDER COMPLETE",
];

const Stepper = () => {
  let navigate = useNavigate();

  const [currentStep, setCurrentStep] = useState(0);
  const [cartItems, setCartItems] = useState();
  const [cartCountAndTotalDetails, setCartCountAndTotalDetails] = useState();
  const [isShowNextOnBilling, setIsShowNextOnBilling] = useState();
  const [isShowNextOnBillingSave, setIsShowNextOnBillingSave] = useState(false);

  useEffect(() => {
    const callApi = async () => {
      try{
      let response = await apiRequest(BASE_URL + "cart/user/"+getUserId());
      if(response ){
        // setCartTotal(response?.totalPrice);
        if(response?.cartItems){
          setCartItems(response?.cartItems);

        }
      }
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
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNext = async () => {

    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
      scrollToTop();

      if(currentStep == 2){
        try{
          const payload = cartItems && cartItems.map(item => ({
            id: item.product.id.toString(),
            quantity: item.quantity.toString(),
            price: item.product.price.toString()
          }));
          let response = await apiRequest(BASE_URL + "orders/create/"+getUserId(), "POST", payload);
          if(response ){
            let cart = await apiRequest(BASE_URL + "cart/user/"+getUserId(), "DELETE");
            // setEmailAddress(response);
            // setCartTotal(response?.totalPrice);
            // if(response?.cartItems){
            //   setCartItems(response?.cartItems);
    
            // }
          }
        }catch(err){
          console.log('Error in fetching : ', err)
        }
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      scrollToTop();
    } else {
      navigate("/shoppingCart");
    }
  };

  const renderContent = () => {
    switch (currentStep) {
      case 0:
        return <CheckoutDetials cartItems={cartItems} cartCountAndTotalDetails={cartCountAndTotalDetails}/>;
      case 1:
        return <BillingShippingForm setIsShowNextOnBilling={setIsShowNextOnBilling} setIsShowNextOnBillingSave={setIsShowNextOnBillingSave}/>;
      case 2:
        return <div className="content">💳 <h3>Payment Method</h3> <p>Choose your payment method.</p></div>;
      case 3:
        return <OrderComplete  cartItems={cartItems} cartCountAndTotalDetails={cartCountAndTotalDetails} />;
      default:
        return null;
    }
  };

  return (
    <div className="container mt-2">
      {/* Stepper */}
      <div className="stepper">
        {steps.map((step, index) => (
          <div
            key={index}
            className={`step ${index === currentStep ? "active" : ""} ${
              index < currentStep ? "completed" : ""
            } ${index === steps.length - 1 && currentStep === index ? "final-step" : ""}`}
          >
            {step}
          </div>
        ))}
      </div>

      <div className="text-center">
        <button
          className="btn btn-secondary me-2 btn-moving-left-animation"
          style={{ width: '15rem' }}
          onClick={handleBack}
        >
          <ArrowLeft className="arrow-move-left" size={20} /> Back
        </button>

        <div className="current-step-title" style={{ display: "inline-block", margin: "0 2rem", fontWeight: "bold", fontSize: "1.2rem" }}>
          {stepsHeader[currentStep]}
        </div>
        {currentStep < steps.length - 1 ? (
          <button 
            className="btn btn-primary btn-moving-right-animation" 
            style={{ width: '15rem' , backgroundColor: `${currentStep == 1 &&( !isShowNextOnBilling || !isShowNextOnBillingSave)? 'lightgray' : ''}`}} 
            onClick={handleNext}
            disabled={currentStep == 1 && (!isShowNextOnBilling || !isShowNextOnBillingSave)}
            >
            Next <ArrowRight className="arrow-move-right" size={20} />
          </button>
        ):
        <button 
            // className="btn btn-primary btn-moving-right-animation" 
            style={{ width: '15rem' , border: '0'}} 
            // onClick={handleNext}
            // disabled={currentStep == 1 && (!isShowNextOnBilling || !isShowNextOnBillingSave)}
            >
            {/* Next <ArrowRight className="arrow-move-right" size={20} /> */}
          </button>
        }
      </div>

      {/* Step Content */}
      <div className="mt-0">{renderContent()}</div>

    </div>
  );
};

export default Stepper;
