
"use client";
import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_PROFESSIONAL_COURIER_MANIFEST } from '@/utils/gql/MUTATION';


const OrderForm = () => {
  const [formData, setFormData] = useState({
    orderNumber: '',
    customerName: '',
    shippingAddress: '',
    shippingDate: '',
    productCode: '',
    productName: '',
    quantity: '', // Updated field
    paymentMethod: 'COD', // Default to COD
  });

  const [addManifest, { data, loading, error }] = useMutation(ADD_PROFESSIONAL_COURIER_MANIFEST);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData({ ...formData, [name]: type === 'radio' ? value : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
 
    try {
      const { data } = await addManifest({
        variables: {
          orderNumber: formData.orderNumber,
          customerName: formData.customerName,
          shippingAddress: formData.shippingAddress,
          shippingDate: formData.shippingDate,
          productCode: formData.productCode,
          productName: formData.productName,
          quantity: parseInt(formData.quantity, 10),
          paymentMethod: formData.paymentMethod,
        },
      });

      if (data) {
        alert('Form submitted successfully!');
        setFormData({
          orderNumber: '',
          customerName: '',
          shippingAddress: '',
          shippingDate: '',
          productCode: '',
          productName: '',
          quantity: '',
          paymentMethod: 'COD',
        });
      }
    } catch (err) {
      console.error('Error:', err);
      alert('An error occurred while submitting the form.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-12 bg-gradient-to-br from-blue-100 to-blue-300 shadow-2xl rounded-lg">
      {/* <h2 className="text-4xl font-extrabold mb-8 text-gray-800 text-center">Professional Courier Manifest Form</h2> */}
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-1">
            <label htmlFor="orderNumber" className="block text-lg font-medium text-gray-700">Order Number</label>
            <input
              type="text"
              id="orderNumber"
              name="orderNumber"
              value={formData.orderNumber}
              onChange={handleChange}
              className="mt-2 block w-full border-gray-300 rounded-lg shadow-lg focus:border-blue-600 focus:ring-blue-600 sm:text-lg transition duration-150 ease-in-out"
              required
            />
          </div>
          <div className="flex-1">
            <label htmlFor="customerName" className="block text-lg font-medium text-gray-700">Customer Name</label>
            <input
              type="text"
              id="customerName"
              name="customerName"
              value={formData.customerName}
              onChange={handleChange}
              className="mt-2 block w-full border-gray-300 rounded-lg shadow-lg focus:border-blue-600 focus:ring-blue-600 sm:text-lg transition duration-150 ease-in-out"
              required
            />
          </div>
        </div>

        <div>
          <label htmlFor="shippingAddress" className="block text-lg font-medium text-gray-700">Shipping Address</label>
          <textarea
            id="shippingAddress"
            name="shippingAddress"
            value={formData.shippingAddress}
            onChange={handleChange}
            rows="6"
            className="mt-2 block w-full border-gray-300 rounded-lg shadow-lg focus:border-blue-600 focus:ring-blue-600 sm:text-lg transition duration-150 ease-in-out"
            required
          />
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-1">
            <label htmlFor="shippingDate" className="block text-lg font-medium text-gray-700">Shipping Date</label>
            <input
              type="date"
              id="shippingDate"
              name="shippingDate"
              value={formData.shippingDate}
              onChange={handleChange}
              className="mt-2 block w-full border-gray-300 rounded-lg shadow-lg focus:border-blue-600 focus:ring-blue-600 sm:text-lg transition duration-150 ease-in-out"
              required
            />
          </div>
          <div className="flex-1">
            <label htmlFor="productCode" className="block text-lg font-medium text-gray-700">Product Code</label>
            <input
              type="text"
              id="productCode"
              name="productCode"
              value={formData.productCode}
              onChange={handleChange}
              className="mt-2 block w-full border-gray-300 rounded-lg shadow-lg focus:border-blue-600 focus:ring-blue-600 sm:text-lg transition duration-150 ease-in-out"
              required
            />
          </div>
        </div>

        <div className="flex flex-col">
          <label htmlFor="productName" className="block text-lg font-medium text-gray-700">Product Name</label>
          <input
            type="text"
            id="productName"
            name="productName"
            value={formData.productName}
            onChange={handleChange}
            className="mt-2 block w-full border-gray-300 rounded-lg shadow-lg focus:border-blue-600 focus:ring-blue-600 sm:text-lg transition duration-150 ease-in-out"
            required
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="quantity" className="block text-lg font-medium text-gray-700">Quantity</label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            className="mt-2 block w-full border-gray-300 rounded-lg shadow-lg focus:border-blue-600 focus:ring-blue-600 sm:text-lg transition duration-150 ease-in-out"
            required
          />
        </div>

        <fieldset className="flex flex-col">
          <legend className="block text-lg font-medium text-gray-700 mb-2">Payment Method</legend>
          <div className="flex items-center space-x-4">
            <input
              type="radio"
              id="cod"
              name="paymentMethod"
              value="COD"
              checked={formData.paymentMethod === 'COD'}
              onChange={handleChange}
              className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="cod" className="text-lg font-medium text-gray-700">COD</label>
          </div>
          <div className="flex items-center space-x-4 mt-2">
            <input
              type="radio"
              id="prepaid"
              name="paymentMethod"
              value="Prepaid"
              checked={formData.paymentMethod === 'Prepaid'}
              onChange={handleChange}
              className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="prepaid" className="text-lg font-medium text-gray-700">Prepaid</label>
          </div>
        </fieldset>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 px-6 rounded-lg shadow-lg transition duration-150 ease-in-out ${
            loading ? 'bg-blue-300 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-500'
          } text-white`}
        >
          {loading ? 'Submitting...' : 'Submit'}
        </button>
        {error && <p className="text-red-500 mt-4">Error: {error.message}</p>}
      </form>
    </div>
  );
};

export default OrderForm;
