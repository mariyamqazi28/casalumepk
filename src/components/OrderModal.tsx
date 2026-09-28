import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Printer, Calendar, MapPin, Phone, X } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useCart } from '../context/CartContext';
import { Logo } from './Logo';

export const OrderModal: React.FC = () => {
  const { isOrderModalOpen, setIsOrderModalOpen, lastOrder, clearCart } = useCart();

  useEffect(() => {
    if (isOrderModalOpen) {
      try {
        confetti({
          particleCount: 45,
          spread: 55,
          origin: { y: 0.55 },
          colors: ['#8B5A2B', '#C5A880', '#DED7CC', '#171513']
        });
      } catch {
        // optional
      }
    }
  }, [isOrderModalOpen]);

  if (!isOrderModalOpen || !lastOrder) return null;

  const handleClose = () => {
    clearCart();
    setIsOrderModalOpen(false);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-2 xs:p-3 sm:p-4 overflow-hidden">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
          className="fixed inset-0 bg-black/75 backdrop-blur-sm"
        />

        {/* Compact Modal Window (Sleek height, visible without scrolling) */}
        <motion.div
          initial={{ scale: 0.94, opacity: 0, y: 15 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.94, opacity: 0, y: 15 }}
          transition={{ type: 'spring', damping: 25, stiffness: 320 }}
          className="relative w-full max-w-lg bg-[#FAF7F2] rounded-sm shadow-2xl border border-[#C5A880]/40 overflow-hidden z-10 max-h-[92vh] flex flex-col print:m-0 print:border-none print:shadow-none"
        >
          {/* 1. Compact Luxury Header Banner */}
          <div className="bg-[#141210] text-[#FAF7F2] px-3.5 py-2.5 xs:px-4 xs:py-3 sm:px-5 sm:py-3.5 relative flex items-center justify-between border-b border-[#8B5A2B]/20">
            <div className="flex items-center gap-2.5 xs:gap-3 min-w-0">
              {/* Checkmark circle */}
              <div className="w-7 h-7 xs:w-8 xs:h-8 rounded-full bg-[#8B5A2B] text-white flex items-center justify-center shadow-sm shrink-0">
                <Check className="w-3.5 h-3.5 xs:w-4 xs:h-4 stroke-[2.5]" />
              </div>
              <div className="min-w-0">
                <h2 className="text-xs sm:text-sm font-semibold tracking-[0.14em] sm:tracking-[0.16em] uppercase text-white leading-tight truncate">
                  Order Confirmed
                </h2>
                <p className="text-[9.5px] xs:text-[10px] text-[#C5A880] font-mono tracking-wider truncate">
                  #{lastOrder.orderId} • {lastOrder.estimatedDelivery}
                </p>
              </div>
            </div>

            <button
              onClick={handleClose}
              className="text-[#DED7CC] hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors print:hidden shrink-0"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* 2. Compact Receipt Body (Designed to fit without scrolling) */}
          <div className="p-3 sm:p-5 space-y-2.5 sm:space-y-3 flex-1 overflow-y-auto">
            {/* Items List (Compact row layout) */}
            <div className="bg-white p-2.5 sm:p-3 rounded-2xs border border-[#EAE4D9]">
              <div className="flex items-center justify-between text-[10px] uppercase tracking-wider text-[#8B5A2B] font-semibold border-b border-stone-100 pb-1 mb-2">
                <span>Items Ordered ({lastOrder.items.length})</span>
                <span>Amount</span>
              </div>
              
              <div className="space-y-1.5 max-h-32 overflow-y-auto pr-1">
                {lastOrder.items.map(item => (
                  <div key={item.id} className="flex items-center justify-between text-xs py-0.5 gap-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <div className="w-7 h-8 bg-[#F5F0E6] rounded-2xs overflow-hidden flex-shrink-0">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="leading-tight min-w-0">
                        <span className="font-medium text-[#171513] text-[11px] sm:text-[11.5px] uppercase block truncate">
                          {item.product.name}
                        </span>
                        <span className="text-[9px] sm:text-[9.5px] text-[#786E60] font-mono">
                          {item.selectedVolume} × {item.quantity}
                        </span>
                      </div>
                    </div>
                    <span className="font-mono text-xs font-semibold text-[#171513] whitespace-nowrap shrink-0">
                      Rs. {(item.unitPrice * item.quantity).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Delivery Address & Contact (Compact 2-col strip) */}
            <div className="grid grid-cols-1 xs:grid-cols-2 gap-2 bg-white p-2.5 rounded-2xs border border-[#EAE4D9] text-[11px]">
              <div className="space-y-0.5">
                <span className="text-[9px] uppercase tracking-wider text-[#8B5A2B] font-semibold flex items-center gap-1">
                  <MapPin className="w-2.5 h-2.5" /> Ship To:
                </span>
                <p className="font-medium text-[#171513] truncate">{lastOrder.customer.fullName}</p>
                <p className="text-[#5C5449] text-[10px] line-clamp-1">
                  {lastOrder.customer.address}, {lastOrder.customer.city}
                </p>
              </div>

              <div className="space-y-0.5 xs:border-l xs:border-stone-100 xs:pl-2.5 pt-1.5 xs:pt-0 border-t xs:border-t-0 border-stone-100">
                <span className="text-[9px] uppercase tracking-wider text-[#8B5A2B] font-semibold flex items-center gap-1">
                  <Phone className="w-2.5 h-2.5" /> Details:
                </span>
                <p className="text-[#171513] font-mono text-[10.5px]">{lastOrder.customer.phone}</p>
                <p className="text-[#5C5449] text-[10px] capitalize truncate">
                  {lastOrder.customer.paymentMethod === 'cod' ? 'Cash on Delivery' : 'Bank Transfer'} • {lastOrder.customer.preferredTiming.split(' ')[0]}
                </p>
              </div>
            </div>

            {/* Financial Summary & Total (Single compact strip) */}
            <div className="bg-[#F5F0E6]/80 px-2.5 xs:px-3 py-2 rounded-2xs border border-[#EAE4D9] flex flex-col xs:flex-row xs:items-center justify-between gap-1 xs:gap-2 text-xs">
              <div className="flex items-center gap-2 xs:gap-3 text-[#5C5449] text-[10.5px] xs:text-[11px]">
                <span>Subtotal: <strong className="font-mono text-[#171513]">Rs. {lastOrder.subtotal.toLocaleString()}</strong></span>
                <span>•</span>
                <span>Delivery: <strong className="text-[#2E5A36]">{lastOrder.shippingFee === 0 ? 'FREE' : `Rs. ${lastOrder.shippingFee}`}</strong></span>
              </div>
              <div className="flex items-center gap-1.5 justify-between xs:justify-start">
                <span className="text-[9.5px] xs:text-[10px] uppercase tracking-wider text-[#786E60]">Total:</span>
                <span className="font-mono text-sm font-bold text-[#8B5A2B]">
                  Rs. {lastOrder.total.toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          {/* 3. Compact Bottom Actions Bar */}
          <div className="px-3.5 sm:px-4 py-2.5 bg-white border-t border-[#EAE4D9] flex flex-col-reverse xs:flex-row items-stretch xs:items-center justify-between gap-2 print:hidden">
            <button
              onClick={handlePrint}
              className="w-full xs:w-auto px-3 py-2 xs:py-1.5 text-[10.5px] xs:text-[11px] uppercase tracking-wider font-medium text-[#423C34] hover:text-[#171513] border border-[#DED7CC] rounded-sm flex items-center justify-center gap-1.5 hover:bg-[#FAF7F2] transition-colors"
            >
              <Printer className="w-3 h-3" />
              <span>Print Receipt</span>
            </button>

            <button
              onClick={handleClose}
              className="w-full xs:w-auto px-4 py-2 xs:py-1.5 bg-[#171513] text-white hover:bg-[#8B5A2B] text-[10.5px] xs:text-[11px] uppercase tracking-[0.12em] xs:tracking-[0.16em] font-medium rounded-sm transition-colors shadow-2xs text-center justify-center"
            >
              Continue Shopping
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
