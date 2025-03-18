import React, { useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";

const ContactUs = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Your message has been sent successfully!');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">CONTACT US !!</h1>

      <p className="text-center mb-5">
        Have questions or need assistance? Reach out to us – we're here to help!
      </p>

      <div className="row justify-content-center">
        <div className="col-md-8">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Enter your name"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Enter your email"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="message" className="form-label">Message</label>
              <textarea
                className="form-control"
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                placeholder="Enter your message"
                rows="5"
              ></textarea>
            </div>

            <button type="submit" className="btn btn-primary w-100">Submit</button>
          </form>

          <div className="mt-5">
            <h4>Contact Information</h4>
            <p>Email: support@mcart.com</p>
            <p>Phone: +1 (800) 123-4567</p>
            <p>Address: 123 MCart Avenue, Tech City, TC 45678</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
