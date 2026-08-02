import React from "react";
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

  const { cartItems, totalAmount } = useSelector((state) => state.cart);

  const placeOrder = () => {
    if (cartItems.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    alert("Order placed successfully!");

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
                    <div className="mt-3 flex space-x-2 items-center">
                      <p className="font-semibold">Ingredients : </p>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {item.ingredients.map((ingredient, index) => (
                          <span
                            key={index}
                            className="bg-orange-100 text-orange-700 px-2 py-1 rounded text-sm"
                          >
                            {ingredient}
                          </span>
                        ))}
                      </div>
                    </div>
                    <Link
                      to={`/build-pizza/`}
                      state={{ cartId:item.cart_id }}
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
                      {" "}
                      -{" "}
                    </button>
                    <span className="font-bold text-lg">{item.quantity}</span>
                    <button
                      onClick={() => dispatch(increaseQuantity(item.cart_id))}
                      className="w-9 h-9 rounded bg-gray-200 hover:bg-gray-300"
                    >
                      {" "}
                      +{" "}
                    </button>
                  </div>
                  <h2 className="font-bold text-lg text-green-600">
                    ₹{item.price * item.quantity}
                  </h2>
                  <button
                    onClick={() => dispatch(removeItem(item.cart_id))}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                  >
                    {" "}
                    Remove{" "}
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
              onClick={placeOrder}
              className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg text-lg font-semibold"
            >
              {" "}
              Place Order{" "}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
