import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { ShoppingCart, Trash2, Plus, Minus, ArrowLeft, ShoppingBag, Tag, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

const CATEGORY_IMAGES = {
  Electronics: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=120&h=120&fit=crop",
  Clothing: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=120&h=120&fit=crop",
  Books: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=120&h=120&fit=crop",
  "Home & Garden": "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=120&h=120&fit=crop",
  Sports: "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=120&h=120&fit=crop",
  Beauty: "https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=120&h=120&fit=crop",
  Food: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=120&h=120&fit=crop",
  Other: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=120&h=120&fit=crop",
};

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, clearCart, cartTotal } = useCart();
  const [coupon, setCoupon] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const discount = couponApplied ? cartTotal * 0.1 : 0;
  const shipping = cartTotal > 50 ? 0 : 4.99;
  const finalTotal = cartTotal - discount + shipping;

  const applyCoupon = () => {
    if (coupon.toLowerCase() === "save10") {
      setCouponApplied(true);
    }
  };

  const handleCheckout = () => {
    setOrderPlaced(true);
    clearCart();
  };

  if (orderPlaced) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-gray-50 dark:bg-gray-950 px-4">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingBag className="w-10 h-10 text-green-600 dark:text-green-400" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">Order Placed!</h2>
          <p className="text-gray-500 dark:text-gray-400 mb-8">Thank you for your purchase. You'll receive a confirmation email shortly.</p>
          <Link to="/store">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white gap-2 rounded-xl px-8">
              <ArrowLeft className="w-4 h-4" />
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-gray-50 dark:bg-gray-950 px-4">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 bg-blue-50 dark:bg-blue-950 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingCart className="w-10 h-10 text-blue-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Your cart is empty</h2>
          <p className="text-gray-500 dark:text-gray-400 mb-8">Looks like you haven't added anything to your cart yet.</p>
          <Link to="/store">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white gap-2 rounded-xl px-8">
              <ShoppingCart className="w-4 h-4" />
              Start Shopping
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 dark:bg-gray-950 min-h-screen py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link to="/store" className="p-2 rounded-xl hover:bg-white dark:hover:bg-gray-900 border border-gray-200 dark:border-gray-700 transition-colors">
            <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Shopping Cart</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">{cartItems.length} item{cartItems.length !== 1 ? "s" : ""}</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map(item => {
              const imgSrc = item.image_url || CATEGORY_IMAGES[item.category] || CATEGORY_IMAGES.Other;
              return (
                <div key={item.id} className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-4 flex gap-4">
                  <img
                    src={imgSrc}
                    alt={item.name}
                    className="w-20 h-20 rounded-xl object-cover shrink-0 bg-gray-100 dark:bg-gray-800"
                    onError={(e) => { e.target.src = CATEGORY_IMAGES.Other; }}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white text-sm leading-snug" style={{fontFamily:'Inter,sans-serif'}}>{item.name}</h3>
                        {item.category && (
                          <Badge variant="secondary" className="text-xs mt-1">{item.category}</Badge>
                        )}
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="flex items-center justify-between mt-3">
                      <span className="font-bold text-gray-900 dark:text-white">${(item.price * item.quantity).toFixed(2)}</span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-7 h-7 rounded-lg border border-gray-200 dark:border-gray-700 flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-7 text-center text-sm font-semibold text-gray-900 dark:text-white">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-7 h-7 rounded-lg border border-gray-200 dark:border-gray-700 flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                    <p className="text-xs text-gray-400 mt-1">${item.price.toFixed(2)} each</p>
                  </div>
                </div>
              );
            })}

            <button onClick={clearCart} className="text-sm text-red-500 hover:text-red-600 flex items-center gap-1 mt-2 transition-colors">
              <Trash2 className="w-3.5 h-3.5" />
              Clear cart
            </button>
          </div>

          {/* Order Summary */}
          <div className="space-y-4">
            {/* Coupon */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-5">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                <Tag className="w-4 h-4 text-blue-600" />
                Coupon Code
              </h3>
              <div className="flex gap-2">
                <Input
                  value={coupon}
                  onChange={e => setCoupon(e.target.value)}
                  placeholder="Enter code (SAVE10)"
                  className="h-9 text-sm rounded-xl"
                  disabled={couponApplied}
                />
                <Button
                  size="sm"
                  onClick={applyCoupon}
                  disabled={couponApplied || !coupon}
                  className="rounded-xl bg-blue-600 hover:bg-blue-700"
                >
                  Apply
                </Button>
              </div>
              {couponApplied && (
                <p className="text-xs text-green-600 dark:text-green-400 mt-2">✓ 10% discount applied!</p>
              )}
            </div>

            {/* Summary */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-5">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Order Summary</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Subtotal</span>
                  <span className="font-medium text-gray-900 dark:text-white">${cartTotal.toFixed(2)}</span>
                </div>
                {couponApplied && (
                  <div className="flex justify-between text-green-600 dark:text-green-400">
                    <span>Discount (10%)</span>
                    <span>-${discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Shipping</span>
                  <span className={shipping === 0 ? "text-green-600 dark:text-green-400 font-medium" : "font-medium text-gray-900 dark:text-white"}>
                    {shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                {shipping === 0 && (
                  <p className="text-xs text-green-600 dark:text-green-400">✓ Free shipping on orders over $50</p>
                )}
                <div className="pt-3 border-t border-gray-100 dark:border-gray-800 flex justify-between">
                  <span className="font-bold text-gray-900 dark:text-white">Total</span>
                  <span className="font-bold text-xl text-gray-900 dark:text-white">${finalTotal.toFixed(2)}</span>
                </div>
              </div>

              <Button
                onClick={handleCheckout}
                className="w-full mt-5 h-12 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold shadow-lg shadow-blue-200 dark:shadow-none gap-2 transition-all"
              >
                Proceed to Checkout
                <ChevronRight className="w-4 h-4" />
              </Button>

              <p className="text-xs text-center text-gray-400 mt-3">🔒 Secure checkout. SSL encrypted.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}