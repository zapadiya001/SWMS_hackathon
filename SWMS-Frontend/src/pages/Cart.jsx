import { useState } from "react"
import { useCart } from "../context/CartContext"

const Cart = () => {
  const { cartItems, getTotalPrice, removeFromCart } = useCart()
  const [loading, setLoading] = useState(false)

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script")
      script.src = "https://checkout.razorpay.com/v1/checkout.js"
      script.onload = () => resolve(true)
      script.onerror = () => resolve(false)
      document.body.appendChild(script)
    })
  }

  const payNow = async () => {
    setLoading(true)

    const isScriptLoaded = await loadRazorpayScript()
    if (!isScriptLoaded) {
      alert("❌ Failed to load Razorpay. Please check your internet connection.")
      setLoading(false)
      return
    }

    const amountInPaise = Math.round(getTotalPrice() * 100)

    try {
      const response = await fetch("http://localhost:9705/razorpay/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: amountInPaise }),
      })

      const data = await response.json()
      if (!data || !data.order || !data.order.id) {
        throw new Error("Invalid Razorpay order response")
      }

      const options = {
        key: "rzp_test_4ex35mPBKEB3Rb",
        amount: data.order.amount,
        currency: "INR",
        name: "Eco Store",
        description: "Thank you for shopping!",
        order_id: data.order.id,
        handler: function (response) {
          alert("✅ Payment successful!\nPayment ID: " + response.razorpay_payment_id)
        },
        prefill: {
          name: "Dhruv",
          email: "example@gmail.com",
          contact: "9999999999"
        },
        theme: {
          color: "#84cc16"
        }
      }

      const razorpayObject = new window.Razorpay(options)
      razorpayObject.open()
    } catch (err) {
      console.error("❌ Payment initiation failed:", err)
      alert("❌ Payment failed. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <h2 className="text-3xl font-bold mb-6">🛒 Your Cart</h2>
      {cartItems.length === 0 ? (
        <p className="text-gray-400">Your cart is empty.</p>
      ) : (
        <div className="space-y-6">
          {cartItems.map((item, idx) => (
            <div key={idx} className="flex justify-between items-center border-b pb-2">
              <div>
                <span className="font-medium">{item.name}</span>
                <span className="ml-4 text-gray-500">₹{item.price}</span>
              </div>
              <button
                onClick={() => removeFromCart(item)}
                className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded text-sm"
              >
                Remove
              </button>
            </div>
          ))}

          <div className="text-right font-semibold text-xl">
            Total: ₹{getTotalPrice()}
          </div>

          <button
            onClick={payNow}
            disabled={loading}
            className="mt-4 px-6 py-3 bg-lime-500 hover:bg-lime-400 text-neutral-950 rounded-lg font-bold disabled:opacity-50"
          >
            {loading ? "Processing..." : "Pay with Razorpay"}
          </button>
        </div>
      )}
    </div>
  )
}

export default Cart
