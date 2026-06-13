import React, { useState } from "react";
import { ShoppingCart, Star, Heart, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/context/CartContext";

const CATEGORY_IMAGES = {
  Electronics: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&h=300&fit=crop",
  Clothing: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=300&fit=crop",
  Books: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop",
  "Home & Garden": "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop",
  Sports: "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=400&h=300&fit=crop",
  Beauty: "https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=400&h=300&fit=crop",
  Food: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop",
  Toys: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=400&h=300&fit=crop",
  Other: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop",
};

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);
  const [wishlist, setWishlist] = useState(false);

  const handleAdd = (e) => {
    e.preventDefault();
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const imgSrc = product.image_url || CATEGORY_IMAGES[product.category] || CATEGORY_IMAGES.Other;
  const stars = Math.round(product.rating || 4);
  const inStock = (product.stock_quantity || 0) > 0;

  return (
    <div className="group relative bg-white dark:bg-gray-900 rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-800 hover:border-blue-200 dark:hover:border-blue-800 hover:shadow-xl hover:shadow-blue-50 dark:hover:shadow-blue-950 transition-all duration-300">
      {/* Image */}
      <div className="relative overflow-hidden aspect-[4/3] bg-gray-50 dark:bg-gray-800">
        <img
          src={imgSrc}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => { e.target.src = CATEGORY_IMAGES.Other; }}
        />
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.is_featured && (
            <Badge className="bg-blue-600 text-white text-xs px-2 py-0.5">Featured</Badge>
          )}
          {!inStock && (
            <Badge variant="secondary" className="bg-red-100 text-red-600 text-xs px-2 py-0.5">Out of Stock</Badge>
          )}
          {product.category && (
            <Badge variant="secondary" className="bg-white/90 dark:bg-gray-900/90 text-gray-700 dark:text-gray-300 text-xs px-2 py-0.5 backdrop-blur-sm">
              {product.category}
            </Badge>
          )}
        </div>
        {/* Wishlist */}
        <button
          onClick={() => setWishlist(!wishlist)}
          className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 ${
            wishlist ? "bg-red-500 text-white" : "bg-white/90 dark:bg-gray-900/90 text-gray-400 hover:text-red-500 backdrop-blur-sm"
          }`}
        >
          <Heart className="w-4 h-4" fill={wishlist ? "currentColor" : "none"} />
        </button>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 dark:text-white text-sm leading-snug mb-1 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" style={{fontFamily:'Inter,sans-serif'}}>
          {product.name}
        </h3>
        {product.description && (
          <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 mb-2">{product.description}</p>
        )}

        {/* Stars */}
        <div className="flex items-center gap-1 mb-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className={`w-3.5 h-3.5 ${i < stars ? "text-amber-400 fill-amber-400" : "text-gray-200 dark:text-gray-700"}`} />
          ))}
          {product.review_count > 0 && (
            <span className="text-xs text-gray-400 ml-1">({product.review_count})</span>
          )}
        </div>

        <div className="flex items-center justify-between gap-2">
          <div>
            <span className="text-lg font-bold text-gray-900 dark:text-white">${(product.price || 0).toFixed(2)}</span>
          </div>
          <Button
            size="sm"
            onClick={handleAdd}
            disabled={!inStock}
            className={`text-xs gap-1.5 rounded-xl transition-all duration-200 ${
              added
                ? "bg-green-500 hover:bg-green-600 text-white"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            {added ? "Added!" : "Add"}
          </Button>
        </div>
      </div>
    </div>
  );
}