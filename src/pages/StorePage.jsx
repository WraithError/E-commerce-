import React, { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { base44 } from "@/api/base44Client";
import { Search, SlidersHorizontal, X, Star, Package, ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ProductCard from "@/components/store/ProductCard";
import { CartProvider } from "@/context/CartContext";
import { StoreAuthProvider } from "@/context/AuthContext";

const CATEGORIES = ["All", "Electronics", "Clothing", "Books", "Home & Garden", "Sports", "Beauty", "Food", "Toys", "Other"];
const SORT_OPTIONS = [
  { label: "Featured", value: "featured" },
  { label: "Price: Low to High", value: "price_asc" },
  { label: "Price: High to Low", value: "price_desc" },
  { label: "Best Rated", value: "rating" },
  { label: "Newest", value: "newest" },
];

const FALLBACK_PRODUCTS = [
  { id: "1", name: "Premium Wireless Headphones", description: "High-fidelity sound with active noise cancellation", price: 149.99, category: "Electronics", stock_quantity: 20, rating: 5, review_count: 128, is_featured: true },
  { id: "2", name: "Organic Cotton T-Shirt", description: "Soft, sustainable fabric in multiple colors", price: 29.99, category: "Clothing", stock_quantity: 50, rating: 4, review_count: 64 },
  { id: "3", name: "JavaScript: The Good Parts", description: "A must-read for every web developer", price: 19.99, category: "Books", stock_quantity: 35, rating: 5, review_count: 312 },
  { id: "4", name: "Smart LED Desk Lamp", description: "Adjustable brightness with USB charging port", price: 59.99, category: "Electronics", stock_quantity: 15, rating: 4, review_count: 47, is_featured: true },
  { id: "5", name: "Yoga Mat Premium", description: "Non-slip surface, eco-friendly materials", price: 45.00, category: "Sports", stock_quantity: 30, rating: 4, review_count: 89 },
  { id: "6", name: "Artisan Coffee Blend", description: "Single-origin Ethiopian beans, medium roast", price: 24.99, category: "Food", stock_quantity: 100, rating: 5, review_count: 205 },
  { id: "7", name: "Vitamin C Serum", description: "Brightening formula with 20% ascorbic acid", price: 34.99, category: "Beauty", stock_quantity: 45, rating: 4, review_count: 178 },
  { id: "8", name: "Stainless Steel Water Bottle", description: "Double-walled, keeps drinks cold 24 hours", price: 39.99, category: "Sports", stock_quantity: 60, rating: 5, review_count: 291 },
  { id: "9", name: "Indoor Plant Set", description: "3 low-maintenance plants with ceramic pots", price: 54.99, category: "Home & Garden", stock_quantity: 20, rating: 4, review_count: 55, is_featured: true },
  { id: "10", name: "Bluetooth Speaker", description: "360° sound, waterproof, 12-hour battery", price: 79.99, category: "Electronics", stock_quantity: 25, rating: 4, review_count: 134 },
  { id: "11", name: "Leather Journal", description: "Handcrafted genuine leather, 200 pages", price: 27.99, category: "Books", stock_quantity: 40, rating: 5, review_count: 76 },
  { id: "12", name: "Herbal Tea Collection", description: "12 premium blends from around the world", price: 18.99, category: "Food", stock_quantity: 80, rating: 4, review_count: 143 },
];

export default function StorePage() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("featured");
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 500]);

  const { data: dbProducts = [] } = useQuery({
    queryKey: ["store-products"],
    queryFn: () => base44.entities.Product.filter({ is_active: true }),
  });

  const products = dbProducts.length > 0 ? dbProducts : FALLBACK_PRODUCTS;

  const urlParams = new URLSearchParams(window.location.search);
  const urlCategory = urlParams.get("category");
  const activeCategory = urlCategory || selectedCategory;

  const filtered = useMemo(() => {
    let result = products.filter(p => {
      const matchSearch = !search || p.name.toLowerCase().includes(search.toLowerCase()) || (p.description || "").toLowerCase().includes(search.toLowerCase());
      const matchCategory = activeCategory === "All" || p.category === activeCategory;
      const matchPrice = p.price >= priceRange[0] && p.price <= priceRange[1];
      return matchSearch && matchCategory && matchPrice;
    });

    switch (sortBy) {
      case "price_asc": return [...result].sort((a, b) => a.price - b.price);
      case "price_desc": return [...result].sort((a, b) => b.price - a.price);
      case "rating": return [...result].sort((a, b) => (b.rating || 0) - (a.rating || 0));
      case "newest": return [...result].sort((a, b) => new Date(b.created_date || 0) - new Date(a.created_date || 0));
      case "featured": default: return [...result].sort((a, b) => (b.is_featured ? 1 : 0) - (a.is_featured ? 1 : 0));
    }
  }, [products, search, activeCategory, sortBy, priceRange]);

  const featuredProducts = products.filter(p => p.is_featured).slice(0, 3);

  return (
    <div className="bg-gray-50 dark:bg-gray-950 min-h-screen">
      {/* Hero Banner */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-purple-300 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <Badge className="bg-white/20 text-white border-white/30 mb-4 text-xs uppercase tracking-wider">New Arrivals Available</Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">Discover Amazing Products</h1>
          <p className="text-blue-100 text-lg max-w-xl mx-auto mb-8">Explore our curated collection of premium products at unbeatable prices.</p>
          {/* Search Bar */}
          <div className="max-w-lg mx-auto relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white text-gray-900 text-sm font-medium shadow-xl placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-white/50"
            />
            {search && (
              <button onClick={() => setSearch("")} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-8 scrollbar-hide">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => { setSelectedCategory(cat); window.history.replaceState({}, '', '/store'); }}
              className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 shrink-0 ${
                activeCategory === cat
                  ? "bg-blue-600 text-white shadow-md shadow-blue-200 dark:shadow-none"
                  : "bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-blue-200 hover:text-blue-600"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Toolbar */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Showing <span className="font-semibold text-gray-900 dark:text-white">{filtered.length}</span> products
          </p>
          <div className="flex items-center gap-3">
            <div className="relative">
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
                className="appearance-none pl-3 pr-8 py-2 text-sm bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
              >
                {SORT_OPTIONS.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Products Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-24">
            <Package className="w-16 h-16 text-gray-300 dark:text-gray-700 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No products found</h3>
            <p className="text-gray-500 dark:text-gray-400">Try adjusting your search or filters.</p>
            <Button onClick={() => { setSearch(""); setSelectedCategory("All"); }} className="mt-4" variant="outline">
              Clear filters
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}