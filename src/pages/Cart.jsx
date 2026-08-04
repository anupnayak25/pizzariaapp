import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  removeItem,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} from "../redux/cartSlice";
import { Link } from "react-router-dom";

const Cart = () => {
  const dispatch = useDispatch();
  const [showModel, setShowModel] = useState(false);
  const [address, setAddress] = useState("");
  const { cartItems, totalAmount } = useSelector((state) => state.cart);

  const handleChange = (e) => {
    setAddress(e.target.value);
  };

  const placeOrder = () => {
    if (address.trim() === "") {
      alert("Please enter a valid address!");
      return;
    }
    alert("Order placed successfully!");
    setAddress("");
    setShowModel(false);
    dispatch(clearCart());
  };

  return (
    <div className="max-w-5xl mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <div className="text-center py-20 text-gray-500 text-xl">
          Cart is Empty
        </div>
      ) : (
        <>
          <div className="space-y-5">
            {cartItems.map((item) => (
              <div
                key={item.cart_id ?? item.id}
                className="bg-white rounded-xl shadow border p-5 flex justify-between items-center"
              >
                <div className="flex gap-5">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-28 h-28 rounded-lg object-cover"
                  />
                  <div>
                    <h2 className="text-xl font-bold">{item.name}</h2>
                    <p className="text-gray-500 mt-2">₹{item.price}</p>
                    <div className="mt-3">
                      {item.ingredients && item.ingredients.length > 0 && (
                        <>
                          <p className="font-semibold">Ingredients:</p>
                          <div className="flex flex-wrap gap-2 mt-2">
                            {item.ingredients.map((ingredient, index) => (
                              <span
                                key={index}
                                className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm"
                              >
                                {ingredient}
                              </span>
                            ))}
                          </div>
                        </>
                      )}

                      {item.toppings && item.toppings.length > 0 && (
                        <>
                          <p className="font-semibold mt-2">Toppings:</p>
                          <div className="flex flex-wrap gap-2 mt-2">
                            {item.toppings.map((ingredient, index) => (
                              <span
                                key={index}
                                className="bg-orange-100 text-orange-700 px-2 py-1 rounded text-sm"
                              >
                                {ingredient}
                              </span>
                            ))}
                          </div>
                        </>
                      )}
                    </div>
                    <Link
                      to={`/build-pizza/`}
                      state={{ cartId: item.cart_id }}
                      className="text-orange-500 hover:underline"
                    >
                      <p>Customise this pizza...</p>
                    </Link>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-4">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => dispatch(decreaseQuantity(item.cart_id))}
                      className="w-9 h-9 rounded bg-gray-200 hover:bg-gray-300"
                    >
                      -
                    </button>
                    <span className="font-bold text-lg">{item.quantity}</span>
                    <button
                      onClick={() => dispatch(increaseQuantity(item.cart_id))}
                      className="w-9 h-9 rounded bg-gray-200 hover:bg-gray-300"
                    >
                      +
                    </button>
                  </div>
                  <h2 className="font-bold text-lg text-green-600">
                    ₹{item.price * item.quantity}
                  </h2>
                  <button
                    onClick={() => dispatch(removeItem(item.cart_id))}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-10 bg-white shadow rounded-xl p-6 flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold">Total : ₹{totalAmount}</h2>
              <p className="text-gray-500">{cartItems.length} Item(s)</p>
            </div>
            <button
              onClick={() => setShowModel(true)}
              className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg text-lg font-semibold"
            >
              Place Order
            </button>
          </div>
        </>
      )}
      {showModel && (
        <div
          className="fixed inset-0 z-10 bg-black/50 flex justify-center items-center"
          onClick={() => setShowModel(false)}
        >
          <div
            className="bg-white p-6 rounded-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
            <p className="text-gray-600">Total Items: {cartItems.length}</p>
            <p className="text-gray-600">Total Amount: ₹{totalAmount}</p>
            <input
              type="text"
              placeholder="Enter your address"
              value={address}
              onChange={handleChange}
              className="border p-2 rounded w-full mt-4"
            />
            <button
              onClick={placeOrder}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded mt-4"
            >
              Confirm Order
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
