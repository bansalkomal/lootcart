import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";

const AboutUs = () => {
  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">ABOUT US !!</h1>

      <section className="mb-5">
        <h3>Our Story</h3>
        <p>
          Welcome to MCart, your ultimate destination for online shopping! We aim to
          deliver a seamless and enjoyable shopping experience with a wide range of
          products across multiple categories. Whether you're searching for the latest
          fashion trends or everyday essentials, we've got you covered.
        </p>
      </section>

      <section className="mb-5">
        <h3>Our Mission</h3>
        <p>
          Our mission is to provide our customers with top-quality products,
          exceptional customer service, and a user-friendly platform. We strive to
          make online shopping easier, faster, and more convenient.
        </p>
      </section>

      <section className="mb-5">
        <h3>Why Choose Us?</h3>
        <ul>
          <li>Wide variety of products across multiple categories.</li>
          <li>Secure payment methods and fast delivery.</li>
          <li>User-friendly interface for smooth navigation.</li>
          <li>Excellent customer support to assist you at every step.</li>
        </ul>
      </section>

      <section>
        <h3>Contact Us</h3>
        <p>
          Got questions? We'd love to hear from you! Reach out to us at
          <strong> support@mcart.com</strong> and our team will assist you promptly.
        </p>
      </section>
    </div>
  );
};

export default AboutUs;
