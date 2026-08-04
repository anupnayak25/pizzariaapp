import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../redux/cartSlice";
import { Link, useNavigate } from "react-router-dom";
import { X } from "lucide-react";

const PizzaCard = ({ pizza }) => {
  const [showModel, setShowModel] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const navigate = useNavigate();

  const checkLogIn = () => {
    if (!isLoggedIn) {
      const ans = confirm("Please SignIn to Countinue...!");
      if (ans) {
        navigate("/signin", {
          state: { from: location.pathname },
        });
      }
      return;
    }
    setShowModel(true);
  };

  const dispatch = useDispatch();
  return (
    <div className="bg-white rounded-xl text-xs border overflow-hidden flex p-5 gap-5">
      <div className="flex flex-col justify-between">
        <div>
          <div className="flex justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <h2 className="text-xl font-bold text-gray-800">
                  {pizza.name}
                </h2>
                <span
                  className={`text-xs px-2 py-1 rounded-full font-semibold ${
                    pizza.type === "veg"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {pizza.type.toUpperCase()}
                </span>
              </div>
              <p className="text-gray-600  leading-6 mb-3">
                {pizza.description}
              </p>
            </div>
            <img
              src={pizza.image}
              alt={pizza.name}
              className="w-30 h-30 rounded-full object-cover border-4 border-orange-100 shadow"
            />
          </div>

          <div className="mb-3">
            <span className="font-semibold text-gray-800">Ingredients:</span>

            <div className="flex flex-wrap gap-2 mt-2">
              {pizza.ingredients.map((item, index) => (
                <span
                  key={index}
                  className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
          <div>
            <span className="font-semibold text-gray-800">Toppings:</span>

            <div className="flex flex-wrap gap-2 mt-2">
              {pizza.topping.map((item, index) => (
                <span
                  key={index}
                  className="bg-orange-100 text-orange-700 text-xs px-2 py-1 rounded-full"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="flex justify-between">
          <h3 className="text-2xl font-bold text-green-700 mt-5">
            ₹{pizza.price}
          </h3>
          <button
            onClick={() => checkLogIn()}
            className="mt-4 bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-semibold transition"
          >
            Add to Cart
          </button>
        </div>
      </div>
      {showModel && (
        <div
          className="fixed inset-0 z-10 bg-black/50 flex justify-center items-center"
          onClick={() => setShowModel(false)}
        >
          <div
            className="relative bg-white w-1/3 rounded-xl text-lg flex-col justify-center space-y-5 p-8 text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="absolute top-0.5 right-0.5 text-red-600 cursor-pointer"
              onClick={() => {
                setShowModel(false);
              }}
            >
              <X />
            </div>
            <h3 className="text-2xl font-bold">{pizza.name}</h3>
            <p className="text-gray-500 mt-1">
              Select quantity or customize your pizza.
            </p>
            <div className="flex justify-around items-center">
              <p className="text-xl ">Quantity</p>
              <p>:</p>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                  className="w-9 h-9 rounded bg-gray-200 hover:bg-gray-300"
                >
                  -
                </button>
                <span className="font-bold text-lg">{quantity}</span>
                <button
                  onClick={() => setQuantity((prev) => prev + 1)}
                  className="w-9 h-9 rounded bg-gray-200 hover:bg-gray-300"
                >
                  +
                </button>
              </div>
            </div>
            <Link
              to={`/build-pizza/`}
              state={{ pizzaId: pizza.id }}
              className="text-orange-500 hover:underline"
            >
              <p>Customise this pizza...</p>
            </Link>
            <button
              onClick={() => {
                dispatch(
                  addItem({
                    id: pizza.id,
                    name: pizza.name,
                    image: pizza.image,
                    ingredients: pizza.ingredients ?? [],
                    toppings: pizza.topping ?? pizza.toppings ?? [],
                    price: pizza.price,
                    quantity,
                  }),
                );
                setShowModel(false);
              }}
              className="mt-4 bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-semibold transition"
            >
              Add To Cart
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PizzaCard;
