"use client";
import React, { useState } from "react";
import { ShoppingCart, X, Minus, Plus, Check } from "lucide-react";
import supabase from "../app/utils/supabase";
import CheckoutSuccessToast from "./CheckoutSuccessToast";

export default function CheckoutPopup({ isOpen, onClose, selectedPackage }) {
  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    gender: "",
    mobileNo: "",
    emailId: "",
    address: "",
    pinCode: "",
    preferableDate: "",
    preferableTime: ""
  });

  const [quantity, setQuantity] = useState(1);
  const [showSuccess, setShowSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleQuantityChange = (increment) => {
    setQuantity(prev => Math.max(1, prev + increment));
  };

  const handleSubmit = async () => {
    setLoading(true);
    const pkg = selectedPackage || mockPackage;
    const total = calculateTotal();
    const { error } = await supabase.from("checkout_orders").insert([
      {
        name: formData.name,
        dob: formData.dob,
        gender: formData.gender,
        mobile_no: formData.mobileNo,
        email_id: formData.emailId,
        address: formData.address,
        pin_code: formData.pinCode,
        preferable_date: formData.preferableDate,
        preferable_time: formData.preferableTime,
        package_title: pkg.title,
        package_price: pkg.price,
        quantity: quantity,
        total_amount: total,
      },
    ]);
    setLoading(false);
    if (!error) {
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3500);
      onClose();
    } else {
      alert("Something went wrong! Please try again.");
    }
  };

  const calculateTotal = () => {
    if (!selectedPackage) return 0;
    const price = parseInt(selectedPackage.price.replace(/[₹,]/g, ''));
    return price * quantity;
  };

  const getPackageCost = () => {
    if (!selectedPackage) return 18000;
    return parseInt(selectedPackage.price.replace(/[₹,]/g, ''));
  };

  // Mock selectedPackage for demonstration
  const mockPackage = selectedPackage || {
    title: "Advanced",
    price: "₹18,000",
    features: Array(7).fill("test")
  };

  if (!isOpen) return (
    <CheckoutSuccessToast show={showSuccess} onClose={() => setShowSuccess(false)} />
  );

  return (
    <>
      <CheckoutSuccessToast show={showSuccess} onClose={() => setShowSuccess(false)} />
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[92vh] overflow-y-auto">
          {/* Header */}
          <div className="relative p-6 pb-4">
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors w-8 h-8 rounded-full bg-[#F5F5F5] flex items-center justify-center"
            >
              <X className="w-4 h-4" />
            </button>
            
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Checkout</h2>
            
            {/* Separator Line */}
            <div className="w-full h-px bg-gray-200 mb-5"></div>

            {/* Package Info */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 border border-purple-200">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <div className="bg-white rounded-2xl p-4 shadow-lg border-2 border-purple-300">
                    <img src="/assets/checkout.png" alt="Checkout" className="w-10 h-10" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-gray-900 mb-1">{mockPackage.title} plan</h3>
                    <p className="text-gray-600 mb-1 text-sm">Includes 5+ tests</p>
                    <p className="text-gray-500 mb-2 text-sm">₹{getPackageCost().toLocaleString()}/Package</p>
                    <button 
                      onClick={onClose}
                      className="text-[#654BFF] hover:text-[#5a40e6] font-medium text-sm underline"
                    >
                      Change plan
                    </button>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="text-xl font-bold text-gray-900 mb-3">
                    ₹{calculateTotal().toLocaleString()}
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center bg-white rounded-full border border-gray-200">
                    <button 
                      onClick={() => handleQuantityChange(-1)}
                      className="p-2 hover:bg-gray-50 rounded-l-full transition-colors"
                      disabled={quantity <= 1}
                    >
                      <Minus className="w-4 h-4 text-gray-600" />
                    </button>
                    <span className="px-4 py-2 text-sm font-medium min-w-[40px] text-center">{quantity}</span>
                    <button 
                      onClick={() => handleQuantityChange(1)}
                      className="p-2 hover:bg-gray-50 rounded-r-full transition-colors"
                    >
                      <Plus className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="px-6 pb-6">
            <div className="space-y-4">
              {/* Name */}
              <div>
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-full border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-100 outline-none transition-all text-gray-900 placeholder-gray-500 text-sm"
                />
              </div>

              {/* DOB and Gender */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <input
                    type="date"
                    name="dob"
                    placeholder="Date of Birth"
                    value={formData.dob}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-full border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-100 outline-none transition-all text-gray-900 placeholder-gray-500 text-sm"
                  />
                </div>
                <div>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-full border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-100 outline-none transition-all text-gray-900 placeholder-gray-500 text-sm"
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              {/* Contact Fields */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <input
                    type="tel"
                    name="mobileNo"
                    placeholder="Mobile Number"
                    value={formData.mobileNo}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-full border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-100 outline-none transition-all text-gray-900 placeholder-gray-500 text-sm"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    name="emailId"
                    placeholder="Email ID"
                    value={formData.emailId}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-full border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-100 outline-none transition-all text-gray-900 placeholder-gray-500 text-sm"
                  />
                </div>
              </div>

              {/* Address */}
              <div>
                <input
                  type="text"
                  name="address"
                  placeholder="Address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-full border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-100 outline-none transition-all text-gray-900 placeholder-gray-500 text-sm"
                />
              </div>

              {/* PIN Code */}
              <div>
                <input
                  type="text"
                  name="pinCode"
                  placeholder="PIN Code"
                  value={formData.pinCode}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-full border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-100 outline-none transition-all text-gray-900 placeholder-gray-500 text-sm"
                />
              </div>

              {/* Preferable Date and Time */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <input
                    type="date"
                    name="preferableDate"
                    placeholder="Preferable Date"
                    value={formData.preferableDate}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-full border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-100 outline-none transition-all text-gray-900 placeholder-gray-500 text-sm"
                  />
                </div>
                <div>
                  <select
                    name="preferableTime"
                    value={formData.preferableTime}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-full border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-100 outline-none transition-all text-gray-900 placeholder-gray-500 text-sm"
                  >
                    <option value="">Select Time</option>
                    <option value="9-10 AM">9-10 AM</option>
                    <option value="10-11 AM">10-11 AM</option>
                    <option value="11-12 PM">11-12 PM</option>
                    <option value="12-1 PM">12-1 PM</option>
                    <option value="1-2 PM">1-2 PM</option>
                    <option value="2-3 PM">2-3 PM</option>
                    <option value="3-4 PM">3-4 PM</option>
                    <option value="4-5 PM">4-5 PM</option>
                    <option value="5-6 PM">5-6 PM</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={onClose}
                className="py-2.5 px-6 rounded-full border border-gray-200 text-gray-700 font-medium hover:bg-gray-50 transition-all text-sm"
                style={{ minWidth: '90px' }}
                disabled={loading}
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="py-2.5 px-6 rounded-full text-white font-medium hover:opacity-90 transition-all shadow-lg text-sm disabled:opacity-60"
                style={{ backgroundColor: '#654BFF', minWidth: '110px' }}
                disabled={loading}
              >
                {loading ? "Processing..." : "Request"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}