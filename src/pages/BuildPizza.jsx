import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import pizzas from "../data/pizzzaData.json";
import ingredientsData from "../data/ingredientsData.json";
import { addItem, modifyIngredients } from "../redux/cartSlice";
import { ArrowLeft } from "lucide-react";

const STEPS = ["Choose Base", "Customize", "Review & Confirm"];

function StepIndicator({ step }) {
  return (
    <div className="flex items-center justify-center gap-2 py-6">
      {STEPS.map((label, i) => {
        const num = i + 1;
        const isActive = step === num;
        const isDone = step > num;
        return (
          <div key={label} className="flex items-center">
            <div className="flex flex-col items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold
                  ${isDone ? "bg-green-500 text-white" : isActive ? "bg-amber-500 text-white" : "bg-gray-200 text-gray-500"}`}
              >
                {isDone ? "✓" : num}
              </div>
              <span
                className={`text-xs mt-1 ${isActive ? "font-semibold text-amber-600" : "text-gray-400"}`}
              >
                {label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div
                className={`w-12 h-0.5 mx-2 mb-4 ${isDone ? "bg-green-500" : "bg-gray-200"}`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

function BuildPizza() {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const location = useLocation();
  const cartItems = useSelector((state) => state.cart.cartItems);

  const { pizzaId: navPizzaId, cartId } = location.state || {};

  const [step, setStep] = useState(1);
  const [selectedPizza, setSelectedPizza] = useState(null);
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [editingCartId, setEditingCartId] = useState(null);

  useEffect(() => {
    if (cartId) {
      // user came from cart load exact data
      const cartItem = cartItems.find((item) => item.cart_id === cartId);
      if (cartItem) {
        const pizza = pizzas.find((p) => p.id === cartItem.id);
        setSelectedPizza(pizza);
        setSelectedIngredients(pizza.topping);
        setEditingCartId(cartItem.cart_id);
        setStep(2);
      }
    } else if (navPizzaId) {
      // user came from order page preselect the default toppings
      const pizza = pizzas.find((p) => p.id === navPizzaId);
      if (pizza) {
        setSelectedPizza(pizza);
        setSelectedIngredients(pizza.topping);
        setStep(2);
      }
    }
  }, []);

  const handleSelectPizza = (pizza) => {
    if (!isLoggedIn) {
      const ans = confirm("Please SignIn to Countinue...!");
      if (ans) {
        navigate("/signin", {
          state: { from: location.pathname },
        });
      }
      return;
    }
    setSelectedPizza(pizza);
    setSelectedIngredients(pizza.topping);
    setStep(2);
  };

  const toggleIngredient = (name) => {
    setSelectedIngredients((prev) =>
      prev.includes(name)
        ? prev.filter((item) => item !== name)
        : [...prev, name],
    );
  };

  const selectedIngredientObjs = ingredientsData.filter((ing) =>
    selectedIngredients.includes(ing.tname),
  );

  const basePrice = Number(selectedPizza?.price || 0);
  const toppingsPrice = selectedIngredientObjs.reduce(
    (sum, ing) => sum + ing.price,
    0,
  );
  const totalPrice = basePrice + toppingsPrice;

  const handleConfirm = () => {
    if (editingCartId) {
      dispatch(
        modifyIngredients({
          id: editingCartId,
          toppings: selectedIngredients,
          price: totalPrice,
        }),
      );
    } else {
      dispatch(
        addItem({
          id: selectedPizza.id,
          name: selectedPizza.name,
          image: selectedPizza.image,
          ingredients: selectedPizza.ingredients,
          toppings: selectedIngredients,
          price: totalPrice,
          quantity: 1,
        }),
      );
    }
    if (
      confirm(
        "Order added to the Cart Successfully!!! \n Do want to view your cart?",
      )
    ) {
      navigate("/cart");
    } else {
      navigate("/");
    }
  };

  const cameFromElsewhere = Boolean(cartId || navPizzaId);

  return (
    <div className=" relative mx-auto px-4">
      {(navPizzaId || cartId) && (
        <Link to={cartId ? "/cart" : "/order"}>
          <div className="absolute top-2 left-2 p-1 px-2 rounded-lg border-2 border-amber-600 flex text-amber-600">
            <ArrowLeft /> back
          </div>
        </Link>
      )}
      <StepIndicator step={step} />

      {step === 1 && (
        <>
          <h1 className="text-2xl font-semibold text-center mb-6">
            Choose your base pizza
          </h1>
          <div className="flex justify-around flex-wrap gap-4">
            {pizzas.map((pizza) => (
              <div
                className="text-center border-2 border-gray-200 rounded-xl p-3 cursor-pointer transition hover:border-amber-500 hover:shadow-md w-44"
                key={pizza.id}
                onClick={() => handleSelectPizza(pizza)}
              >
                <img
                  className="w-40 h-40 rounded-full object-cover border-2 border-amber-500 mx-auto"
                  src={pizza.image}
                  alt={pizza.name}
                />
                <p className="mt-2 font-medium">{pizza.name}</p>
                <p className="text-sm text-gray-500">₹{pizza.price}</p>
              </div>
            ))}
          </div>
        </>
      )}

      {step === 2 && selectedPizza && (
        <>
          <h1 className="text-2xl font-semibold text-center mb-1">
            Customize your {selectedPizza.name}
          </h1>
          <p className="text-center text-sm text-gray-500 mb-4">
            Tap a topping to add or remove it. Checked (green) = included.
          </p>

          {selectedPizza.ingredients?.length > 0 && (
            <div className="bg-gray-50 border rounded-lg p-3 mb-6 text-sm text-gray-600 text-center">
              <span className="font-medium">Base includes:</span>{" "}
              {selectedPizza.ingredients.join(", ")}
            </div>
          )}
          <div className="flex justify-between items-center py-8">
            {!cameFromElsewhere ? (
              <button
                className="px-4 py-2 border rounded-lg text-gray-600 hover:bg-gray-50"
                onClick={() => setStep(1)}
              >
                ← Back
              </button>
            ) : (
              <span />
            )}
            <p className="font-semibold text-lg">
              Running total: ₹{totalPrice}
            </p>
            <button
              className="px-5 py-2 rounded-lg bg-amber-500 text-white font-medium hover:bg-amber-600"
              onClick={() => setStep(3)}
            >
              Review →
            </button>
          </div>
          <div className="flex justify-around flex-wrap gap-4">
            {ingredientsData.map((ing) => {
              const isSelected = selectedIngredients.includes(ing.tname);
              return (
                <div
                  className={`relative text-center border-2 rounded-xl p-3 cursor-pointer transition w-36
                    ${isSelected ? "border-green-500 bg-green-50" : "border-gray-200 opacity-60 hover:opacity-100"}`}
                  key={ing.id}
                  onClick={() => toggleIngredient(ing.tname)}
                >
                  <div
                    className={`absolute top-1 right-1 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold
                      ${isSelected ? "bg-green-500 text-white" : "bg-gray-200 text-gray-400"}`}
                  >
                    {isSelected ? "✓" : ""}
                  </div>
                  <img
                    className="w-28 h-28 rounded-full object-cover border-2 border-amber-500 mx-auto"
                    src={ing.image}
                    alt={ing.tname}
                  />
                  <p className="mt-2 font-medium text-sm">{ing.tname}</p>
                  <p className="text-xs text-gray-500">+₹{ing.price}</p>
                </div>
              );
            })}
          </div>
        </>
      )}

      {step === 3 && selectedPizza && (
        <>
          <h1 className="text-2xl font-semibold text-center mb-6">
            Order Summary
          </h1>
          <div className="border rounded-xl p-6 max-w-md mx-auto">
            <div className="flex items-center gap-4 mb-4">
              <img
                className="w-16 h-16 rounded-full object-cover"
                src={selectedPizza.image}
                alt={selectedPizza.name}
              />
              <div>
                <h2 className="text-lg font-semibold">{selectedPizza.name}</h2>
                <p className="text-sm text-gray-500">Base ₹{basePrice}</p>
              </div>
            </div>

            {selectedPizza.ingredients?.length > 0 && (
              <p className="text-xs text-gray-500 mb-3">
                Includes: {selectedPizza.ingredients.join(", ")}
              </p>
            )}

            {selectedIngredientObjs.length > 0 ? (
              <ul className="divide-y">
                {selectedIngredientObjs.map((ing) => (
                  <li
                    key={ing.id}
                    className="flex justify-between py-2 text-sm"
                  >
                    <span>{ing.tname}</span>
                    <span>+₹{ing.price}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-gray-400 italic py-2">
                No extra toppings selected
              </p>
            )}

            <div className="flex justify-between pt-4 mt-2 border-t font-bold text-lg">
              <span>Total</span>
              <span>₹{totalPrice}</span>
            </div>
          </div>

          <div className="flex justify-between max-w-md mx-auto py-6">
            <button
              className="px-4 py-2 border rounded-lg text-gray-600 hover:bg-gray-50"
              onClick={() => setStep(2)}
            >
              ← Back
            </button>
            <button
              className="px-5 py-2 rounded-lg bg-green-600 text-white font-medium hover:bg-green-700"
              onClick={handleConfirm}
            >
              {editingCartId ? "Update Cart" : "Add to Cart"}
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default BuildPizza;
