import React from "react";
import { LogIn, ShoppingCart } from "lucide-react";
import logo from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/userSlice";
import { clearCart } from "../redux/cartSlice";

function NavBar() {
  const user = useSelector((state) => state.user.currentUser);
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const cartCount = useSelector((state) => state.cart.totalQuantity);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <div className="z-0">
      <nav className="bg-black text-gray-200">
        <div className=" mx-auto flex items-center justify-between h-16 px-5">
          <div className="flex items-center gap-10">
            <Link to="/">
              <div className="flex gap-5">
                <h1 className="text-3xl font-light">Pizzeria</h1>
                <div className="text-3xl w-0.5 rounded bg-gray-200"></div>
                <img className="h-10" src={logo} />
              </div>
            </Link>

            <ul className="flex gap-8 text-sm ">
              <li className="cursor-pointer hover:text-orange-400">
                <Link to="/order">Order Pizza</Link>
              </li>

              <li className="cursor-pointer hover:text-orange-400">
                <Link to="/build-pizza"> Build Ur Pizza</Link>
              </li>
            </ul>
          </div>
          <div className="flex align-middle space-x-4">
            {isLoggedIn ? (
              <div className="flex space-x-3 items-center text-center">
                <p>Hello, {user.name}</p>
                <button className="bg-white/20 border-2 border-white p-1.5 px-4 mx-2" onClick={() =>{ dispatch(logout());   dispatch(clearCart()); navigate('/'); }}>Logout</button>
                <Link to="/cart">
                  <button className=" relative bg-orange-500 hover:bg-orange-600 px-5 py-2 rounded flex items-center gap-2">
                    {cartCount > 0 && (
                      <div className="absolute -top-1 -right-1 bg-red-500 rounded-full px-1 text-xs">
                        {cartCount}
                      </div>
                    )}
                    Shopping cart
                    <ShoppingCart size={18} />
                  </button>
                </Link>
              </div>
            ) : (
              <>
                <Link to="/signin" state={{ from: location.pathname }}>
                  <button className="bg-orange-500 hover:bg-orange-600 px-5 py-2 rounded flex items-center gap-2">
                    <LogIn size={18} />
                    Sign In
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}

export default NavBar;
