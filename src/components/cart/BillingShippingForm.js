import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../assets/styles/billingShipping.css";
import { BASE_URL } from "../helpers/Contants";
import { apiRequest, getUserId } from "../helpers/helper";

const BillingShippingForm = ({ setIsShowNextOnBilling, setIsShowNextOnBillingSave}) => {
  const [billingDetails, setBillingDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    country: "",
    city: "",
    state: "",
    zip: "",
  });

  const [shippingDetails, setShippingDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    country: "",
    city: "",
    state: "",
    zip: "",
  });

  const [isSameAddress, setIsSameAddress] = useState(false);
  const [emailAddress, setEmailAddress] = useState();

  useEffect(() => {
    const callApi = async () => {
      try{
      let response = await apiRequest(BASE_URL + "addresses/" + getUserId());
      if(response ){
        setEmailAddress(response);
        // setCartTotal(response?.totalPrice);
        // if(response?.cartItems){
        //   setCartItems(response?.cartItems);

        // }
        let apiData = response;
        setBillingDetails((prev) => ({
          ...prev,
          firstName: apiData.billingAddress.firstName || "",
          lastName: apiData.billingAddress.lastName || "",
          email: apiData.email || "", // Email coming from root
          phone: apiData.mobileNumber || "", // phone coming from root
          company: apiData.billingAddress.company || "",
          country: apiData.billingAddress.country || "",
          city: apiData.billingAddress.city || "",
          state: apiData.billingAddress.state || "",
          zip: apiData.billingAddress.zip || "",
        }));
      
        setShippingDetails((prev) => ({
          ...prev,
          firstName: apiData.shippingAddress.firstName || "",
          lastName: apiData.shippingAddress.lastName || "",
          email: apiData.email || "", // Reusing email for shippingDetails if needed
          company: apiData.shippingAddress.company || "",
          country: apiData.shippingAddress.country || "",
          city: apiData.shippingAddress.city || "",
          state: apiData.shippingAddress.state || "",
          zip: apiData.shippingAddress.zip || "",
        }));
        setIsShowNextOnBillingSave(true)
      }
      console.log('mmmm', response)
    }catch(err){
      console.log('Error in fetching : ', err)
    }
    }

    callApi()
   
  },[])

  const handleBillingChange = (e) => {
    const { name, value } = e.target;
    setBillingDetails((prev) => {
      const updatedBilling = { ...prev, [name]: value };
      if (isSameAddress) {
        setShippingDetails(updatedBilling);
      }
      return updatedBilling;
    });
  };

  const handleShippingChange = (e) => {
    const { name, value } = e.target;
    setShippingDetails({ ...shippingDetails, [name]: value });
  };

  const handleSameAddressChange = () => {
    const newValue = !isSameAddress;
    setIsSameAddress(newValue);
    if (newValue) {
      // If "Same as billing" is checked, copy billing to shipping
      setShippingDetails(billingDetails);
    } else {
      // If "Ship to different address" is selected, clear shipping fields
      setShippingDetails({
        firstName: "",
        lastName: "",
        email: "",
        company: "",
        country: "",
        city: "",
        state: "",
        zip: "",
      });
    }
  };
  

  const handleContinue = async () => {
    console.log("Billing Details:", billingDetails);
    console.log("Shipping Details:", shippingDetails);

      
    try{
      let payload;

      if(isSameAddress){
        payload= {
          firstName: billingDetails?.firstName,
          lastName: billingDetails?.lastName,
          email: billingDetails?.email,
          phone: billingDetails?.phone,
          company: billingDetails?.company,
          country: billingDetails?.country,
          city: billingDetails?.city,
          state:billingDetails?.state,
          zip:billingDetails?.zip,
          deliveryAndBillingAddressesAreSame: isSameAddress,
        }
      }else{
        payload={
          firstName: billingDetails?.firstName,
          lastName: billingDetails?.lastName,
          email: billingDetails?.email,
          phone: billingDetails?.phone,
          company: billingDetails?.company,
          country: billingDetails?.country,
          city: billingDetails?.city,
          state:billingDetails?.state,
          zip:billingDetails?.zip,
          shipping_firstName: shippingDetails?.firstName,
          shipping_lastName: shippingDetails?.lastName,
          shipping_email: shippingDetails?.email,
          shipping_phone: shippingDetails?.phone,
          shipping_company: shippingDetails?.company,
          shipping_country: shippingDetails?.country,
          shipping_city: shippingDetails?.city,
          shipping_state:shippingDetails?.state,
          shipping_zip:shippingDetails?.zip,

          deliveryAndBillingAddressesAreSame: isSameAddress,
      }
      }
      let response = await apiRequest(BASE_URL + "addresses/"+ getUserId() +"/billing", "POST", payload);
      if(response ){
        alert(response?.message)
        setIsShowNextOnBillingSave(true);
        // setCartTotal(response?.totalPrice);
        // if(response?.cartItems){
        //   setCartItems(response?.cartItems);
        // }
      }else{
        setIsShowNextOnBillingSave(false)
      }
    }catch(err){
      console.log('Error in saving : ', err)
    }
  };

  const isFormComplete = () => {
    const billingComplete = Object.values(billingDetails).every(
      (val) => val.trim() !== ""
    );
    const shippingComplete = isSameAddress
      ? true
      : Object.values(shippingDetails).every((val) => val.trim() !== "");
    return billingComplete && shippingComplete;
  };


  useEffect(() => {
    const complete = isFormComplete();
    setIsShowNextOnBilling(complete);
  }, [billingDetails, shippingDetails, isSameAddress]);

  return (
    <div className="container">
      <div className="form-container">
        {/* Billing Section */}
        <div className="section">
          <div className="section-header">BILLING INFORMATION</div>
          <div className="row">
            {Object.keys(billingDetails).map((field, index) => (
              <div className="col-md-6" key={index}>
                <label>
                  {field.replace(/([A-Z])/g, " $1").toUpperCase()} *
                </label>
                <input
                  type={field === "email" ? "email" : "text"}
                  name={field}
                  value={billingDetails[field]}
                  className="form-control"
                  onChange={handleBillingChange}
                />
              </div>
            ))}
            <div className="col-md-12">
              <input
                type="checkbox"
                checked={isSameAddress}
                onChange={handleSameAddressChange}
              />{" "}
              My delivery and billing addresses are the same
              <br />
              <input
                type="checkbox"
                checked={!isSameAddress}
                onChange={handleSameAddressChange}
              />{" "}
              Ship to a different address
            </div>
          </div>
        </div>

        {/* Shipping Section */}
        <div className="section">
          <div className="section-header">SHIPPING ADDRESS</div>
          <div className="row">
            {Object.keys(shippingDetails).map((field, index) => (
              <div className="col-md-6" key={index}>
                <label>
                  {field.replace(/([A-Z])/g, " $1").toUpperCase()} *
                </label>
                <input
                  type={field === "email" ? "email" : "text"}
                  name={field}
                  value={shippingDetails[field]}
                  className="form-control"
                  onChange={handleShippingChange}
                  disabled={isSameAddress}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Continue Button */}
        <div className="text-center mt-4">
          <button
            className={`btn btn-dark continue-btn ${!isFormComplete() ? "disabled-cursor" : ""}`}
            onClick={handleContinue}
            disabled={!isFormComplete()}
          >
            Save Address!
          </button>


        </div>
      </div>
    </div>
  );
};

export default BillingShippingForm;
