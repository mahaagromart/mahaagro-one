import React, { useState } from 'react';
import Image from 'next/image';
import logo from '../../public/assets/images/img/logo.webp';
const SellerLogIn = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    captcha: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically handle form submission, e.g., API call
    console.log(formData);
  };

  const refreshCaptcha = () => {
    // Placeholder for refreshing captcha
    console.log("Refreshing captcha...");
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <Image src={logo} alt="Logo" width={100} height= {200} className="mb-4 block mx-auto" />
        <h2 className="mb-2 text-2xl font-bold text-center">Sign in</h2>
        <p className="mb-6 text-center text-gray-600">Welcome back to seller login</p>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-700">Your Email</label>
            <input 
              type="email" 
              name="email"
              placeholder="admin@gmail.com" 
              className="w-full p-2 border border-gray-300 rounded"
              value={formData.email}
              onChange={handleChange}
              required 
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-700">Password</label>
            <input 
              type="password" 
              name="password"
              placeholder="********" 
              className="w-full p-2 border border-gray-300 rounded"
              value={formData.password}
              onChange={handleChange}
              required 
            />
          </div>

          <div className="flex items-center mb-4">
            <input 
              type="checkbox" 
              className="mr-2" 
            />
            <label className="text-sm">Remember Me</label>
          </div>
          
          <div className="bg-white shadow-md rounded-lg p-6 mb-4">
            <h5 className="text-xl font-semibold mb-4">Captcha</h5>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
              <input
                type="text"
                className="form-input border-2 p-2 rounded-lg"
                name="captcha"
                placeholder="Enter captcha value"
                value={formData.captcha}
                onChange={handleChange}
                required
              />
              <div className="flex items-center space-x-2">
                <img
                  src="https://mahaagromart.com/seller/auth/code/captcha/1?captcha_session_id=default_recaptcha_id_seller_regi"
                  alt="captcha"
                  className="rounded h-10"
                />
                <button type="button" className="btn btn-outline-secondary p-1" onClick={refreshCaptcha}>
                  <i className="tio-refresh"></i>
                </button>
              </div>
            </div>
          </div>

          <button 
            type="submit" 
            className="w-full p-2 text-white bg-blue-500 rounded"
          >
            Sign in
          </button>
        </form>

        <p className="mt-4 text-center">
          <a href="#" className="text-blue-500">Forgot Password?</a>
        </p>
      </div>
    </div>
  );
};

export default SellerLogIn;