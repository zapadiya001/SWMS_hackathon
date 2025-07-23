// import { motion } from "framer-motion"
// import { ShoppingCart, Star, Filter, Search } from "lucide-react"
// import { useState, useEffect } from "react"
// import { useCart } from "../context/CartContext"
// import { useNavigate } from "react-router-dom"
// import PageTransition from "../components/PageTransition"

// const Shop = () => {
//   const [searchTerm, setSearchTerm] = useState("")
//   const [selectedCategory, setSelectedCategory] = useState("all")

//   const [products, setProducts] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState(null)

//   const { addToCart } = useCart()
//   const navigate = useNavigate()

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const response = await fetch("http://localhost:9705/ecoProduct") // Replace with your production URL if needed
//         const data = await response.json()
//         if (data.success) {
//           setProducts(data.data)
//         } else {
//           setError("Failed to fetch products")
//         }
//       } catch (err) {
//         setError("Something went wrong while fetching products")
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchProducts()
//   }, [])

//   const categories = [
//     { id: "all", name: "All Products" },
//     { id: "composting", name: "Composting" },
//     { id: "bags", name: "Bags" },
//     { id: "diy", name: "DIY Kits" },
//     { id: "utensils", name: "Utensils" },
//     { id: "electronics", name: "Electronics" },
//   ]

//   const filteredProducts = products.filter((product) => {
//     const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase())
//     const matchesCategory = selectedCategory === "all" || product.category === selectedCategory
//     return matchesSearch && matchesCategory
//   })

//   return (
//     <PageTransition>
//       <div className="mx-auto max-w-7xl px-6 py-24 space-y-12">
//         {/* Header */}
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8 }}
//           className="text-center space-y-4"
//         >
//           <h1 className="text-4xl lg:text-5xl font-semibold tracking-tight">Eco-Friendly Store</h1>
//           <p className="text-gray-300 max-w-2xl mx-auto">
//             Curated essentials to step up your green game — add to cart, explore, repeat.
//           </p>
//         </motion.div>

//         {/* Search and Filter */}
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8, delay: 0.2 }}
//           className="flex flex-col md:flex-row gap-4 items-center justify-between"
//         >
//           <div className="relative flex-1 max-w-md">
//             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
//             <input
//               type="text"
//               placeholder="Search products..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="w-full pl-10 pr-4 py-2 bg-neutral-800 border border-white/10 rounded-lg focus:border-lime-400 focus:outline-none transition-colors"
//             />
//           </div>

//           <div className="flex items-center gap-2">
//             <Filter className="w-4 h-4 text-gray-400" />
//             <select
//               value={selectedCategory}
//               onChange={(e) => setSelectedCategory(e.target.value)}
//               className="bg-neutral-800 border border-white/10 rounded-lg px-4 py-2 focus:border-lime-400 focus:outline-none transition-colors"
//             >
//               {categories.map((category) => (
//                 <option key={category.id} value={category.id}>
//                   {category.name}
//                 </option>
//               ))}
//             </select>
//           </div>
//         </motion.div>

//         {/* Products Grid */}
//         <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
//           {filteredProducts.map((product, index) => (
//             <motion.div
//               key={product.id}
//               initial={{ opacity: 0, y: 30 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6, delay: index * 0.1 }}
//               whileHover={{ y: -5 }}
//               className="bg-neutral-900/80 border border-white/5 rounded-xl overflow-hidden hover:border-lime-400/50 transition-all duration-300 group"
//             >
//               <div className="relative">
//                 <img
//                   src={product.image || "/placeholder.svg"}
//                   alt={product.name}
//                   className="h-48 w-full object-cover group-hover:scale-105 transition-transform duration-300"
//                 />
//                 {product.badge && (
//                   <div className="absolute top-3 left-3 px-2 py-1 bg-lime-500 text-neutral-950 text-xs font-medium rounded">
//                     {product.badge}
//                   </div>
//                 )}
//               </div>

//               <div className="p-6 space-y-4">
//                 <div>
//                   <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
//                   <p className="text-sm text-gray-300">{product.description}</p>
//                 </div>

//                 <div className="flex items-center gap-2">
//                   <div className="flex items-center gap-1">
//                     {[...Array(5)].map((_, i) => (
//                       <Star
//                         key={i}
//                         className={`w-4 h-4 ₹ {
//                           i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-600"
//                         }`}
//                       />
//                     ))}
//                   </div>
//                   <span className="text-sm text-gray-400">
//                     {product.rating} ({product.reviews} reviews)
//                   </span>
//                 </div>

//                 <div className="flex items-center justify-between">
//                   <span className="text-xl font-semibold text-lime-400">₹ {product.price}</span>
//                   <button
//                     onClick={() => {
//                       addToCart(product)
//                       navigate("/cart")
//                     }}
//                     className="flex items-center gap-2 px-4 py-2 bg-lime-500 hover:bg-lime-400 text-neutral-950 rounded-lg transition-colors font-medium"
//                   >
//                     <ShoppingCart className="w-4 h-4" />
//                     Add to Cart
//                   </button>
//                 </div>
//               </div>
//             </motion.div>
//           ))}
//         </div>

//         {/* No Products */}
//         {filteredProducts.length === 0 && (
//           <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
//             <p className="text-gray-400">No products found matching your criteria.</p>
//           </motion.div>
//         )}
//       </div>
//     </PageTransition>
//   )
// }

// export default Shop
import { motion } from "framer-motion"
import { ShoppingCart, Star, Filter, Search } from "lucide-react"
import { useState, useEffect } from "react"
import { useCart } from "../context/CartContext.jsx"
import { useNavigate } from "react-router-dom"
import PageTransition from "../components/PageTransition"

const Shop = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const { addToCart } = useCart()
  const navigate = useNavigate()

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:9705/ecoProduct")
        const data = await response.json()
        if (data.success) {
          setProducts(data.data)
        } else {
          setError("Failed to fetch products")
        }
      } catch (err) {
        setError("Something went wrong while fetching products")
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  const categories = [
    { id: "all", name: "All Products" },
    { id: "composting", name: "Composting" },
    { id: "bags", name: "Bags" },
    { id: "diy", name: "DIY Kits" },
    { id: "utensils", name: "Utensils" },
    { id: "electronics", name: "Electronics" },
  ]
console.log("Rendering product:", products);
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <PageTransition>
      <div className="mx-auto max-w-7xl px-6 py-24 space-y-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-4"
        >
          <h1 className="text-4xl lg:text-5xl font-semibold tracking-tight">Eco-Friendly Store</h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Curated essentials to step up your green game — add to cart, explore, repeat.
          </p>
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col md:flex-row gap-4 items-center justify-between"
        >
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-neutral-800 border border-white/10 rounded-lg focus:border-lime-400 focus:outline-none transition-colors"
            />
          </div>

          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-400" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-neutral-800 border border-white/10 rounded-lg px-4 py-2 focus:border-lime-400 focus:outline-none transition-colors"
            >
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </motion.div>

        {/* Products Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProducts.map((product, index) => (
            
            <motion.div
              key={product._id || product.id || index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-neutral-900/80 border border-white/5 rounded-xl overflow-hidden hover:border-lime-400/50 transition-all duration-300 group"
            >
            
            
              <div className="relative">
                <img
                  src={product.imageUrl || "/placeholder.svg"}
                  alt={product.name}
                  className="h-48 w-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {product.badge && (
                  <div className="absolute top-3 left-3 px-2 py-1 bg-lime-500 text-neutral-950 text-xs font-medium rounded">
                    {product.badge}
                  </div>
                )}
              </div>

              <div className="p-6 space-y-4">
                <div>
                  <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
                  <p className="text-sm text-gray-300">{product.description}</p>
                </div>

                {/* <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={`₹ {product._id || product.id}-star-₹ {i}`}
                        className={`w-4 h-4 ₹ {
                          i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-600"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-400">
                    {product.rating} ({product.reviews} reviews)
                  </span>
                </div> */}

                <div className="flex items-center justify-between">
                  <span className="text-xl font-semibold text-lime-400">₹ {product.price.toFixed(2)}</span>
                  <button
                    onClick={() => {
                      addToCart(product)
                      navigate("/cart")
                    }}
                    className="flex items-center gap-2 px-4 py-2 bg-lime-500 hover:bg-lime-400 text-neutral-950 rounded-lg transition-colors font-medium"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    Add to Cart
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* No Products */}
        {filteredProducts.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
            <p className="text-gray-400">No products found matching your criteria.</p>
          </motion.div>
        )}
      </div>
    </PageTransition>
  )
}

export default Shop
