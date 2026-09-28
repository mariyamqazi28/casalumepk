import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, Plus, Minus, ArrowRight, ShieldCheck, Lock, ArrowLeft } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { CheckoutFormState, OrderConfirmationData } from '../types';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeItem,
    clearCart,
    subtotal,
    shippingFee,
    total,
    setIsOrderModalOpen,
    setLastOrder
  } = useCart();

  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'checkout'>('cart');
  const [formData, setFormData] = useState<CheckoutFormState>({
    fullName: '',
    phone: '',
    email: '',
    address: '',
    city: 'Karachi',
    preferredTiming: 'Standard (2-4 Days)',
    paymentMethod: 'cod',
    orderNotes: ''
  });

  const [formErrors, setFormErrors] = useState<Partial<Record<keyof CheckoutFormState, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);



  const validateForm = () => {
    const errors: Partial<Record<keyof CheckoutFormState, string>> = {};
    if (!formData.fullName.trim()) errors.fullName = 'Full name is required';
    if (!formData.phone.trim() || formData.phone.length < 10) {
      errors.phone = 'Valid phone number is required (e.g. 0300 1234567)';
    }
    if (!formData.address.trim()) errors.address = 'Complete delivery address is required';
    if (!formData.city.trim()) errors.city = 'Please select or enter your city';

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      const orderNumber = 'CL-' + Math.floor(100000 + Math.random() * 900000);
      const estimatedDeliveryDate = new Date();
      estimatedDeliveryDate.setDate(estimatedDeliveryDate.getDate() + 3);

      const orderData: OrderConfirmationData = {
        orderId: orderNumber,
        items: [...cart],
        subtotal,
        shippingFee,
        total,
        customer: { ...formData },
        createdAt: new Date().toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        }),
        estimatedDelivery: estimatedDeliveryDate.toLocaleDateString('en-US', {
          weekday: 'long',
          month: 'short',
          day: 'numeric'
        })
      };

      setLastOrder(orderData);
      setIsSubmitting(false);
      setIsCartOpen(false);
      setIsOrderModalOpen(true);
      // Reset view
      setCheckoutStep('cart');
    }, 600);
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setIsCartOpen(false)}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Slide-Out Drawer Panel */}
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-0 sm:pl-10">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="w-full sm:w-[420px] max-w-full sm:max-w-md bg-[#FAF7F2] text-[#171513] shadow-2xl flex flex-col border-l border-[#8B5A2B]/15"
            >
              {/* Drawer Header */}
              <div className="p-3.5 sm:p-5 border-b border-[#EAE4D9] flex items-center justify-between bg-white">
                <div className="flex items-center gap-2">
                  {checkoutStep === 'checkout' && (
                    <button
                      onClick={() => setCheckoutStep('cart')}
                      className="p-1 -ml-1 text-[#5C5449] hover:text-[#171513] transition-colors"
                      aria-label="Back to Cart"
                    >
                      <ArrowLeft className="w-5 h-5" />
                    </button>
                  )}
                  <div>
                    <h2 className="text-xs sm:text-sm uppercase tracking-[0.16em] sm:tracking-[0.2em] font-bold text-[#171513]">
                      {checkoutStep === 'cart' ? 'Shopping Flacon Drawer' : 'Instant Luxury Order'}
                    </h2>
                    <p className="text-[10px] sm:text-[11px] text-[#786E60]">
                      {checkoutStep === 'cart'
                        ? `${cart.length} unique scent${cart.length !== 1 ? 's' : ''} in cart`
                        : 'Direct Checkout • Cash on Delivery available'}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setIsCartOpen(false)}
                  className="p-1.5 sm:p-2 text-[#786E60] hover:text-[#171513] transition-colors rounded-full hover:bg-stone-100"
                  aria-label="Close cart drawer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Drawer Content */}
              <div className="flex-1 overflow-y-auto p-3.5 sm:p-5">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                    <div className="w-16 h-16 rounded-full bg-[#EAE4D9]/60 flex items-center justify-center text-[#8B5A2B]">
                      <ShieldCheck className="w-8 h-8 opacity-60" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium uppercase tracking-wider text-[#171513]">Your Cart is Empty</p>
                      <p className="text-xs text-[#786E60] max-w-xs">
                        Indulge in our signature extraits, rare perfumes, or handcrafted scented candles.
                      </p>
                    </div>
                    <button
                      onClick={() => setIsCartOpen(false)}
                      className="px-6 py-2.5 bg-[#171513] text-white text-xs uppercase tracking-[0.2em] font-medium rounded-sm hover:bg-[#8B5A2B] transition-colors"
                    >
                      Browse Fragrances
                    </button>
                  </div>
                ) : checkoutStep === 'cart' ? (
                  /* Cart Items View */
                  <div className="space-y-4">
                    {cart.map(item => (
                      <div
                        key={item.id}
                        className="bg-white p-2.5 sm:p-3.5 rounded-sm border border-[#EAE4D9] flex gap-2.5 sm:gap-3.5 shadow-[0_2px_12px_rgba(0,0,0,0.06)]"
                      >
                        {/* Thumbnail */}
                        <div className="w-16 h-20 sm:w-20 sm:h-24 bg-[#F5F0E6] rounded-sm overflow-hidden flex-shrink-0">
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            className="w-full h-full object-cover object-center"
                          />
                        </div>

                        {/* Details */}
                        <div className="flex-1 flex flex-col justify-between min-w-0">
                          <div>
                            <div className="flex items-start justify-between gap-1">
                              <h3 className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#171513] truncate">
                                {item.product.name}
                              </h3>
                              <button
                                onClick={() => removeItem(item.id)}
                                className="text-[#9E9282] hover:text-red-700 transition-colors p-1 shrink-0"
                                title="Remove item"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                            <p className="text-[10px] sm:text-[11px] text-[#8B5A2B] font-mono mt-0.5">
                              Size: {item.selectedVolume}
                            </p>
                          </div>

                          <div className="flex flex-wrap items-center justify-between gap-1.5 mt-2 pt-2 border-t border-stone-100">
                            {/* Quantity Controls */}
                            <div className="flex items-center border border-[#DED7CC] rounded-sm bg-[#FAF7F2]">
                              <button
                                onClick={() => updateQuantity(item.id, -1)}
                                className="px-1.5 sm:px-2 py-1 text-[#423C34] hover:bg-[#EAE4D9] transition-colors"
                                aria-label="Decrease quantity"
                              >
                                <Minus className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                              </button>
                              <span className="px-2 sm:px-2.5 text-xs font-mono font-medium text-[#171513]">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.id, 1)}
                                className="px-1.5 sm:px-2 py-1 text-[#423C34] hover:bg-[#EAE4D9] transition-colors"
                                aria-label="Increase quantity"
                              >
                                <Plus className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                              </button>
                            </div>

                            {/* Price */}
                            <div className="text-right">
                              <span className="text-xs font-semibold text-[#171513] font-mono whitespace-nowrap">
                                Rs. {(item.unitPrice * item.quantity).toLocaleString()}
                              </span>
                              {item.quantity > 1 && (
                                <span className="block text-[9.5px] sm:text-[10px] text-[#9E9282] font-mono whitespace-nowrap">
                                  Rs. {item.unitPrice.toLocaleString()} each
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  /* Slide-Over Checkout Form */
                  <form id="checkout-form" onSubmit={handlePlaceOrder} className="space-y-4">
                    <div className="bg-[#FAF7F2] p-3 rounded-sm border border-[#C5A880]/40 text-xs text-[#5C5449] flex items-center gap-2">
                      <Lock className="w-4 h-4 text-[#8B5A2B] flex-shrink-0" />
                      <span>Direct Artisanal Order — Fast Dispatch Across Pakistan</span>
                    </div>

                    {/* Customer Full Name */}
                    <div>
                      <label className="block text-xs uppercase tracking-wider font-medium text-[#423C34] mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                        placeholder="e.g. Mariyam Khan"
                        className="w-full px-3.5 py-2.5 bg-white border border-[#DED7CC] rounded-sm text-xs text-[#171513] focus:border-[#8B5A2B] focus:outline-none"
                      />
                      {formErrors.fullName && (
                        <p className="text-[11px] text-red-600 mt-1">{formErrors.fullName}</p>
                      )}
                    </div>

                    {/* Contact Number */}
                    <div>
                      <label className="block text-xs uppercase tracking-wider font-medium text-[#423C34] mb-1">
                        Contact Number (WhatsApp/Mobile) *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={e => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="e.g. 0300 1234567"
                        className="w-full px-3.5 py-2.5 bg-white border border-[#DED7CC] rounded-sm text-xs text-[#171513] focus:border-[#8B5A2B] focus:outline-none"
                      />
                      {formErrors.phone && (
                        <p className="text-[11px] text-red-600 mt-1">{formErrors.phone}</p>
                      )}
                    </div>

                    {/* Email (Optional) */}
                    <div>
                      <label className="block text-xs uppercase tracking-wider font-medium text-[#423C34] mb-1">
                        Email Address (for receipt tracking)
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                        placeholder="mariyam@example.com"
                        className="w-full px-3.5 py-2.5 bg-white border border-[#DED7CC] rounded-sm text-xs text-[#171513] focus:border-[#8B5A2B] focus:outline-none"
                      />
                    </div>

                    {/* Delivery Address */}
                    <div>
                      <label className="block text-xs uppercase tracking-wider font-medium text-[#423C34] mb-1">
                        Delivery Address *
                      </label>
                      <textarea
                        required
                        rows={2}
                        value={formData.address}
                        onChange={e => setFormData({ ...formData, address: e.target.value })}
                        placeholder="House / Apartment #, Street, Phase / Block, Area"
                        className="w-full px-3.5 py-2 bg-white border border-[#DED7CC] rounded-sm text-xs text-[#171513] focus:border-[#8B5A2B] focus:outline-none resize-none"
                      />
                      {formErrors.address && (
                        <p className="text-[11px] text-red-600 mt-1">{formErrors.address}</p>
                      )}
                    </div>

                    {/* City Selection */}
                    <div className="grid grid-cols-1 xs:grid-cols-2 gap-2.5 sm:gap-3">
                      <div>
                        <label className="block text-xs uppercase tracking-wider font-medium text-[#423C34] mb-1">
                          City *
                        </label>
                        <select
                          value={formData.city}
                          onChange={e => setFormData({ ...formData, city: e.target.value })}
                          className="w-full px-3 py-2.5 bg-white border border-[#DED7CC] rounded-sm text-xs text-[#171513] focus:border-[#8B5A2B] focus:outline-none"
                        >
                          <option value="Karachi">Karachi</option>
                          <option value="Lahore">Lahore</option>
                          <option value="Islamabad">Islamabad</option>
                          <option value="Rawalpindi">Rawalpindi</option>
                          <option value="Faisalabad">Faisalabad</option>
                          <option value="Multan">Multan</option>
                          <option value="Peshawar">Peshawar</option>
                          <option value="Sialkot">Sialkot</option>
                          <option value="Gujranwala">Gujranwala</option>
                          <option value="Quetta">Quetta</option>
                          <option value="Other">Other City</option>
                        </select>
                      </div>

                      {/* Preferred Delivery Timing */}
                      <div>
                        <label className="block text-xs uppercase tracking-wider font-medium text-[#423C34] mb-1">
                          Preferred Timing *
                        </label>
                        <select
                          value={formData.preferredTiming}
                          onChange={e => setFormData({ ...formData, preferredTiming: e.target.value })}
                          className="w-full px-3 py-2.5 bg-white border border-[#DED7CC] rounded-sm text-xs text-[#171513] focus:border-[#8B5A2B] focus:outline-none"
                        >
                          <option value="Anytime (Standard 2-4 Days)">Standard (2-4 Days)</option>
                          <option value="Morning Delivery (9:00 AM - 1:00 PM)">Morning (9AM - 1PM)</option>
                          <option value="Evening Delivery (3:00 PM - 7:00 PM)">Evening (3PM - 7PM)</option>
                          <option value="Weekend Delivery">Weekend Delivery</option>
                        </select>
                      </div>
                    </div>

                    {/* Payment Method Selector */}
                    <div>
                      <label className="block text-xs uppercase tracking-wider font-medium text-[#423C34] mb-1.5">
                        Payment Method
                      </label>
                      <div className="grid grid-cols-1 xs:grid-cols-2 gap-2">
                        <label
                          className={`flex items-center gap-2 p-2.5 border rounded-sm cursor-pointer transition-colors text-xs ${
                            formData.paymentMethod === 'cod'
                              ? 'border-[#8B5A2B] bg-[#F5F0E6] font-medium'
                              : 'border-[#DED7CC] bg-white'
                          }`}
                        >
                          <input
                            type="radio"
                            name="paymentMethod"
                            checked={formData.paymentMethod === 'cod'}
                            onChange={() => setFormData({ ...formData, paymentMethod: 'cod' })}
                            className="text-[#8B5A2B] focus:ring-0"
                          />
                          <span className="truncate">Cash on Delivery</span>
                        </label>

                        <label
                          className={`flex items-center gap-2 p-2.5 border rounded-sm cursor-pointer transition-colors text-xs ${
                            formData.paymentMethod === 'bank_transfer'
                              ? 'border-[#8B5A2B] bg-[#F5F0E6] font-medium'
                              : 'border-[#DED7CC] bg-white'
                          }`}
                        >
                          <input
                            type="radio"
                            name="paymentMethod"
                            checked={formData.paymentMethod === 'bank_transfer'}
                            onChange={() => setFormData({ ...formData, paymentMethod: 'bank_transfer' })}
                            className="text-[#8B5A2B] focus:ring-0"
                          />
                          <span className="truncate">Bank Transfer</span>
                        </label>
                      </div>
                    </div>

                    {/* Special Instructions */}
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider font-medium text-[#786E60] mb-1">
                        Special Order Notes (Optional)
                      </label>
                      <input
                        type="text"
                        value={formData.orderNotes}
                        onChange={e => setFormData({ ...formData, orderNotes: e.target.value })}
                        placeholder="Gift wrap request or landmark guidance..."
                        className="w-full px-3 py-2 bg-white border border-[#DED7CC] rounded-sm text-xs text-[#171513] focus:border-[#8B5A2B] focus:outline-none"
                      />
                    </div>
                  </form>
                )}
              </div>

              {/* Drawer Footer & Action Bar */}
              {cart.length > 0 && (
                <div className="p-3.5 sm:p-5 border-t border-[#EAE4D9] bg-white space-y-3">
                  {/* Financial Breakdown */}
                  <div className="space-y-1.5 text-xs text-[#5C5449]">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span className="font-mono text-[#171513]">Rs. {subtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Courier Shipping</span>
                      <span className="font-mono text-[#171513]">
                        {shippingFee === 0 ? (
                          <span className="text-[#2E5A36] font-semibold">FREE</span>
                        ) : (
                          `Rs. ${shippingFee}`
                        )}
                      </span>
                    </div>
                    <div className="flex justify-between pt-2 border-t border-stone-100 text-sm font-semibold text-[#171513]">
                      <span>Grand Total</span>
                      <span className="font-mono text-base text-[#8B5A2B]">Rs. {total.toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Primary Action Button */}
                  {checkoutStep === 'cart' ? (
                    <button
                      onClick={() => setCheckoutStep('checkout')}
                      className="w-full py-3.5 bg-[#171513] text-[#FAF7F2] hover:bg-[#8B5A2B] transition-colors rounded-sm text-xs uppercase tracking-[0.2em] font-medium flex items-center justify-center gap-2 shadow-md focus:outline-none"
                    >
                      <span>Proceed to Checkout</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      form="checkout-form"
                      disabled={isSubmitting}
                      className="w-full py-3.5 bg-[#8B5A2B] text-white hover:bg-[#5C3818] transition-colors rounded-sm text-xs uppercase tracking-[0.2em] font-medium flex items-center justify-center gap-2 shadow-lg focus:outline-none disabled:opacity-75"
                    >
                      {isSubmitting ? (
                        <span>Processing Order...</span>
                      ) : (
                        <>
                          <ShieldCheck className="w-4 h-4" />
                          <span>Place Order • Rs. {total.toLocaleString()}</span>
                        </>
                      )}
                    </button>
                  )}
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};
